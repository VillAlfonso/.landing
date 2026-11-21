import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import nodemailer from "nodemailer";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { CONTACT_EMAIL, CONTACT_HOSTS, CONTACT_ORIGINS, contactConfigured, contactMail, parseContact, readLimitedJson } from "@/lib/contact";

export const runtime = "nodejs";
export const maxDuration = 30;
const reply = (status: number, message: string) => Response.json({ message }, { status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "3600" } : {}) } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  const local = process.env.NODE_ENV === "development" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
  if (!CONTACT_ORIGINS.includes(origin) && !local) return reply(403, "Please send your message from the contact page.");
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return reply(415, "Unsupported request format.");
  if (!contactConfigured()) return reply(503, "The form is unavailable. Please use the email link instead.");
  // Vercel overwrites this header. Never use arbitrary client-supplied IP fields.
  const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() : local ? "127.0.0.1" : undefined;
  if (!ip || !isIP(ip)) return reply(503, "The form is unavailable. Please use the email link instead.");

  try {
    const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN!, retry: false });
    const hash = (v: string) => createHmac("sha256", process.env.TURNSTILE_SECRET_KEY!).update(v).digest("hex");
    const limit = async (prefix: string, count: number, duration: "10 m" | "1 h" | "1 d", key: string) => {
      const result = await new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(count, duration), prefix: `contact:${prefix}`, analytics: false, timeout: 0 }).limit(key);
      // Reject rather than bypass protection if a dependency ever reports a timeout.
      if (result.reason === "timeout") throw new Error("rate limit unavailable");
      return result.success;
    };
    if (!await limit("attempts", 10, "10 m", hash(ip))) return reply(429, "Too many attempts. Please try again later.");
    let raw: unknown;
    try { raw = await readLimitedJson(request); } catch { return reply(400, "Please check the message fields and try again."); }
    const data = parseContact(raw);
    if (!data) return reply(400, "Please check the message fields and complete the verification.");
    if (data.website) return reply(400, "Unable to submit this message.");

    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: data.token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
    });
    if (!verification.ok) throw new Error("verification unavailable");
    const verdict = await verification.json();
    const hosts = local ? [...CONTACT_HOSTS, "localhost", "127.0.0.1"] : CONTACT_HOSTS;
    if (verdict.success !== true || verdict.action !== "contact" || !hosts.includes(verdict.hostname)) return reply(400, "Verification expired or failed. Please verify again.");

    // A persistent token lock also covers concurrent replay during verification convergence.
    if (!await redis.set(`contact:token:${hash(data.token)}`, "used", { nx: true, ex: 600 })) return reply(400, "Please complete a new verification.");
    if (!await limit("ip", 3, "1 h", hash(ip)) || !await limit("email", 3, "1 h", hash(data.email)) || !await limit("daily", 30, "1 d", "all")) return reply(429, "The message limit has been reached. Please try later or use the email link.");
    const duplicate = hash(`${data.email}\n${data.subject}\n${data.message}`);
    if (!await redis.set(`contact:duplicate:${duplicate}`, "pending", { nx: true, ex: 600 })) return reply(429, "This message was recently submitted. Please wait before trying again.");

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com", port: 465, secure: true,
      auth: { user: CONTACT_EMAIL, pass: process.env.GMAIL_APP_PASSWORD!.replace(/\s/g, "") },
      connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 10000,
      tls: { minVersion: "TLSv1.2" }, disableFileAccess: true, disableUrlAccess: true,
    });
    try {
      const sent = await transport.sendMail(contactMail(data));
      if (!sent.accepted?.length) throw new Error("delivery not accepted");
    } finally { transport.close(); }
    return reply(200, "Your message has been sent. Thank you for getting in touch.");
  } catch {
    // Do not log submitted text, addresses, credentials, or provider error payloads.
    console.error("contact delivery or protection service unavailable");
    return reply(503, "We could not confirm delivery. Please wait before retrying, or use the email link.");
  }
}
