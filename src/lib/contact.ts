export const CONTACT_EMAIL = "quertvillafuerte10@gmail.com";
export const CONTACT_ORIGINS = ["https://quert.site", "https://www.quert.site"];
export const CONTACT_HOSTS = ["quert.site", "www.quert.site"];
export const MAX_BODY_BYTES = 16_384;

export type ContactInput = { name: string; email: string; subject: string; message: string; token: string; website: string };

export function parseContact(value: unknown): ContactInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const limits: Record<keyof ContactInput, number> = { name: 80, email: 254, subject: 120, message: 4000, token: 2048, website: 200 };
  const result = {} as ContactInput;
  for (const field of Object.keys(limits) as (keyof ContactInput)[]) {
    if (typeof data[field] !== "string" || (data[field] as string).length > limits[field]) return null;
    result[field] = (data[field] as string).trim();
  }
  if (!result.name || !result.subject || result.message.length < 10 || !result.token) return null;
  if ([result.name, result.email, result.subject].some(v => /[\r\n\x00-\x1f\x7f]/.test(v))) return null;
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(result.message)) return null;
  if (!/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i.test(result.email)) return null;
  result.email = result.email.toLowerCase();
  return result;
}

export function contactConfigured(env: Record<string, string | undefined> = process.env) {
  return ["GMAIL_APP_PASSWORD", "TURNSTILE_SITE_KEY", "TURNSTILE_SECRET_KEY", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"].every(k => Boolean(env[k]?.trim()));
}

// Plain text only. Visitors can never set the sender, recipient, or attachments.
export function contactMail(data: ContactInput) {
  return {
    from: { name: "quert.site contact", address: CONTACT_EMAIL },
    to: CONTACT_EMAIL,
    replyTo: { name: data.name, address: data.email },
    subject: `[quert.site] ${data.subject}`,
    text: `Website contact message\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export async function readLimitedJson(request: Request) {
  if (!request.body) throw new Error("empty body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new Error("body too large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
