# Contact form activation

The form delivers only to **quertvillafuerte10@gmail.com**, using Gmail SMTP over TLS. Reply in Gmail to respond to the visitor. No automatic email is sent to visitors.

## Private configuration

In [Vercel environment variables](https://vercel.com/villalfonsos-projects/quert/settings/environment-variables), add these five variables to **Production**, then redeploy the latest production deployment. Do not paste secrets into chat, GitHub, or frontend code.

| Variable | Value |
| --- | --- |
| `GMAIL_APP_PASSWORD` | App Password created while signed into quertvillafuerte10@gmail.com |
| `TURNSTILE_SITE_KEY` | Public site key from a Cloudflare Turnstile Managed widget |
| `TURNSTILE_SECRET_KEY` | Secret for the same widget |
| `UPSTASH_REDIS_REST_URL` | HTTPS REST URL from an Upstash Redis database |
| `UPSTASH_REDIS_REST_TOKEN` | REST token for that database |

1. Enable Google 2-Step Verification, then create an [App Password](https://myaccount.google.com/apppasswords) named `quert.site contact`. Use this generated password, never your normal Google password. [Google instructions](https://support.google.com/accounts/answer/185833).
2. Create a [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) Managed widget for `quert.site` and `www.quert.site`. Keep hostname validation enabled. Copy its two keys. The application sets and verifies the `contact` action. [Verification documentation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
3. Create an [Upstash Redis database](https://console.upstash.com/redis), then copy its REST URL and REST token. Persistent storage makes the limits apply across Vercel server instances.
4. Save all five variables in Vercel and redeploy. The form stays disabled if any are missing. Do not use Turnstile test keys in Production.
5. Open https://www.quert.site/contact and submit one test message. Check the receiving Gmail inbox and Spam folder; reply should address the visitor. A successful form response means Gmail accepted the message, not that inbox placement is guaranteed.

## Protections and behavior

- Server-side field validation, 16 KB request limit, plain-text messages, fixed sender and recipient; no attachments.
- Server-verified Turnstile token, hostname and action checks, single-use token lock, hidden spam field, and same-site origin checks.
- Up to 10 attempts per IP per 10 minutes; 3 validated submissions per IP and email per hour; 30 total per day. Counts include attempts that later fail delivery.
- Repeated identical messages blocked for 10 minutes. No automatic SMTP retries, avoiding duplicate delivery after an ambiguous timeout.
- IPs, email addresses, and duplicate keys are HMAC-hashed in Redis. Message text is not stored there; temporary records expire. Turnstile receives the visitor IP for verification. Submitted messages are stored in the receiving Gmail account.
- Missing configuration or unavailable protection services prevent sending. The direct email link remains available.

If delivery fails, check the Vercel configuration and provider dashboards. Logs deliberately omit message text, addresses, passwords, and provider error payloads. To disable sending, remove `GMAIL_APP_PASSWORD` and redeploy. Review Gmail access and revoke the App Password if it is ever exposed.

Run the automated protection checks with `node --test scripts/contact.test.cjs` and the production build with `npm run build`.
