"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

type Turnstile = { render: (el: HTMLElement, options: Record<string, unknown>) => string; reset: (id: string) => void; remove: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile } }

export default function ContactForm({ enabled, siteKey }: { enabled: boolean; siteKey: string }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const sending = useRef(false);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const renderWidget = useCallback(() => {
    if (!box.current || !window.turnstile || widget.current !== null) return;
    widget.current = window.turnstile.render(box.current, {
      sitekey: siteKey, action: "contact", theme: "auto", size: "flexible",
      callback: (value: string) => setToken(value),
      "expired-callback": () => setToken(""),
      "error-callback": () => { setToken(""); setMessage("Verification could not load. Please refresh or use the email link."); },
    });
  }, [siteKey]);
  useEffect(() => {
    if (enabled) renderWidget();
    return () => { if (widget.current !== null) window.turnstile?.remove(widget.current); widget.current = null; };
  }, [enabled, renderWidget]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || !enabled || !token) return;
    sending.current = true; setBusy(true); setMessage("");
    const form = event.currentTarget;
    const fields = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fields), token }),
        signal: AbortSignal.timeout(30000),
      });
      const result = await response.json();
      setMessage(result.message ?? "Please try again later or use the email link.");
      if (response.ok) form.reset();
    } catch { setMessage("Delivery could not be confirmed. Please wait before retrying or use the email link."); }
    finally {
      setToken(""); if (widget.current !== null) window.turnstile?.reset(widget.current);
      sending.current = false; setBusy(false);
    }
  }
  const input = "mt-2 block w-full rounded border border-ink/25 bg-paper px-3 py-3 text-sm text-ink outline-none focus:border-ink focus:ring-1 focus:ring-ink disabled:opacity-50";
  return (
    <section className="mt-10 max-w-2xl" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className="font-display text-2xl uppercase">send a message</h2>
      {!enabled && <p className="mt-3 text-[13px] leading-6 text-ink/65">The form is currently unavailable. You can reach me directly through the email link above.</p>}
      <form onSubmit={submit} className="mt-6" aria-busy={busy}>
        <fieldset disabled={!enabled || busy} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-[12px]">Name<input className={input} name="name" autoComplete="name" required maxLength={80} /></label>
            <label className="block text-[12px]">Email<input className={input} type="email" name="email" autoComplete="email" required maxLength={254} /></label>
          </div>
          <label className="block text-[12px]">Subject<input className={input} name="subject" required maxLength={120} /></label>
          <label className="block text-[12px]">Message<textarea className={`${input} min-h-40 resize-y`} name="message" required minLength={10} maxLength={4000} rows={6} /></label>
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" maxLength={200} /></label></div>
          {enabled && <div ref={box} className="min-h-[65px]" />}
          <p className="text-[11px] leading-5 text-ink/55">Your name, email, and message are used to respond to your inquiry. Bot verification and temporary submission limits help prevent spam. Please do not include passwords or sensitive documents.</p>
          <button disabled={!enabled || busy || !token} className="rounded border border-ink bg-ink px-6 py-3 text-[13px] text-paper disabled:cursor-not-allowed disabled:opacity-40">{busy ? "sending…" : "send message →"}</button>
        </fieldset>
        <p role="status" aria-live="polite" className="mt-4 text-[13px] leading-6">{message}</p>
      </form>
      {enabled && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={renderWidget} onError={() => setMessage("Verification could not load. Please use the email link.")} />}
    </section>
  );
}
