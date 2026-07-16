---
name: portfolio-curator
description: Use when Reblobler wants to add or change portfolio content in this repo — a new project, a tool/tech for the stack, credly badges, education rows, socials, tagline, or status — or says things like "add my new project", "put X in my stack", "update my skills", "add my badge".
---

# Portfolio Curator

## Overview

This site is data-driven: pages render from `src/data/*`. Curating means editing
data files and (rarely) the icon registry — never hardcoding content into
components. The design system is strict monochrome "engineer's notebook";
every change must keep it intact.

## Data map

| File | Owns |
|---|---|
| `src/data/projects.ts` | project rows (newest first), `featured` pins to home (top 3), `sample: true` marks placeholders |
| `src/data/stack.ts` | tools — each entry auto-floats in the hero banner + appears in the credentials toolbox |
| `src/data/credentials.ts` | education rows + credly badges (`image` = images.credly.com url, `href` = public badge url) |
| `src/data/profile.ts` | name, tagline, status, email, socials (rows hidden while `href` is empty) |
| `src/lib/icons.tsx` | icon registry: `simpleIconPaths` (official marks) + `doodleIcons` (hand-drawn fallbacks) |
| `src/components/Hero.tsx` | `LOGO_SLOTS` — curated float positions; spares auto-assign as the stack grows |

## Adding a project

1. Collect: title, year, 1–2 sentence description (lowercase, dry, concrete — no
   "crafting digital experiences" copy), tech list, optional link, featured?
2. Append to `projects.ts`. Delete `sample: true` rows once real work replaces them.
3. For every tech id not yet in `stack.ts`, add a stack entry — the banner and
   toolbox pick it up automatically. Then resolve its icon:

   ```bash
   node -e "const si=require('simple-icons');console.log(si.siBRANDNAME?si.siBRANDNAME.path.slice(0,40):'missing')"
   ```

   - Export exists → named-import it in `src/lib/icons.tsx` and add to `simpleIconPaths`.
   - Missing → draw a doodle in `doodleIcons`: 24×24 viewBox, `stroke="currentColor"`,
     strokeWidth 1.6–1.8, round caps/joins, match the wobbly hand-drawn style of the
     existing comfyui/aws entries.
4. If the stack outgrows `LOGO_SLOTS`, add slots: keep clear of the name zone
   (avoid x < 60 with y > 60), size 28–66 px, depth 0.2–1.0, alternate spin signs.
5. The credentials "toolbox" and tech chips derive automatically — never hand-edit a skills list.

## Adaptive layout rules

- More than 3 `featured` → keep only the best 3 flagged; home slices to 3.
- 7+ projects → group `/projects` rows by year with a small mono year divider.
- A project with a demo video → put the hosted link in `href`; rows stay
  type-first. If imagery is ever added, frame it like `StickerPortrait`
  (white sticker, ink border, hard offset shadow) — never a bare rectangle.

## Design constraints (non-negotiable)

- Zero hue. Only `var(--ink)` / `var(--paper)` plus alpha. No accents, no gradients.
- Fonts stay: Anton (display), IBM Plex Mono (body), Caveat (handwriting).
- Background scribbles: Caveat, opacity ≤ 0.12, `aria-hidden`, pointer-events-none.
- Motion: springs only (stiffness 100–260, damping 12–24); every scroll/mount
  animation must no-op under `useReducedMotion`.
- Icons render single-color via `currentColor` so both themes work.

## Verify (required before claiming done)

1. `npm run build` — must pass clean.
2. `npm run dev`, then screenshot the hero (new logo floats and pops in),
   a project row (chips render, unknown ids fall back to text), and the
   credentials toolbox — in light AND dark (`localStorage.theme = "dark"`).

## Common mistakes

| Mistake | Fix |
|---|---|
| Writing content into components | Content lives in `src/data/*` only |
| Guessing simple-icons export names | Run the node check; guessed imports break the build |
| Colored brand logos "for pop" | Monochrome is the design; pop comes from motion |
| Hand-editing the toolbox/skills list | It derives from stack + project tech |
| New tech id in a project but not in stack.ts | Chip renders as plain text — add the stack entry |
