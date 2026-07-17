# Deploying updates to the live site

This site is a Next.js app in this folder (`C:\.landing`), pushed to GitHub
(`VillAlfonso/.landing`) and served on your Vercel domain. Below are the exact
commands to copy‑paste. Run them from **this folder** in PowerShell.

---

## 1. The normal update (almost every time)

You changed some text, a project, styling, an image — anything under `C:\.landing`.
Push it and Vercel deploys to your domain automatically:

```powershell
git add -A
git commit -m "update site"
git push
```

Done. Vercel sees the push to `master`, rebuilds, and goes live on your domain in
~1–2 minutes. Track it at <https://vercel.com/dashboard>.

> This works because your Vercel project is connected to this GitHub repo (the
> setup you get from "import repo + add domain"). If it ever says nothing
> deployed, use the CLI in section 3.

---

## 2. If you changed a showcase / project deep‑dive

The showcase pages (the AAAFlow page, etc.) are **generated** from
`C:\.showcase-kit`. After editing a project there, rebuild it into this repo
**first**, then push:

```powershell
python C:\.showcase-kit\build_site.py --projects C:\.showcase-kit\examples --out C:\.landing\public\showcase
git add -A
git commit -m "update showcase"
git push
```

(The rebuild regenerates `public/showcase/`. If you skip it, your showcase edits
won't show up on the live site.)

---

## 3. Deploy straight from your machine (optional — no git)

The Vercel CLI is installed. To push a **production** deploy directly:

```powershell
vercel --prod
```

The first time, it asks to link — pick your existing project. To preview changes
on a throwaway URL **without** touching production first:

```powershell
vercel
```

That prints a preview link you can open and check before going live.

---

## 4. Confirm it went live

```powershell
vercel ls
```

Shows recent deployments and their status. Or just open your domain in a private/
incognito window (that dodges the browser cache so you see the fresh version).

---

## Keeping the tooling (nice to have)

The theme + content for the showcase live in the **separate** `C:\.showcase-kit`
repo (its own git). To save those edits so they aren't lost:

```powershell
cd C:\.showcase-kit
git add -A
git commit -m "update showcase template + content"
cd C:\.landing
```

This step is only about backing up the generator — it does **not** affect the live
site (section 2's rebuild already baked the output into `public/showcase/`).
