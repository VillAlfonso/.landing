---
name: portfolio-curator
description: Use when Reblobler wants to add or change portfolio content in this repo — a new project, a tool/tech for the stack, credly badges, education rows, socials, tagline, or status — or says things like "add my new project", "put X in my stack", "update my skills", "add my badge", or mentions showcasing a codebase.
---

# Portfolio Curator

## Overview

This site is data-driven: pages render from `src/data/*`. Curating means editing
data files and (rarely) the icon registry — never hardcoding content into
components. The page chrome is strict black & white "engineer's notebook";
the ONLY color on the site comes from brand logos — that contrast is the point.

## Data map

| File | Owns |
|---|---|
| `src/data/projects.ts` | project rows (newest first), `featured` pins to home (top 3) |
| `src/data/stack.ts` | tools — each entry auto-floats in the hero banner + appears in the credentials toolbox |
| `src/data/credentials.ts` | education rows + credly badges (`image` = images.credly.com url, `href` = public badge url) |
| `src/data/profile.ts` | name, tagline, status, email, socials (rows hidden while `href` is empty) |
| `src/lib/icons.tsx` | icon registry: `simpleIconPaths` + `doodleIcons` (hand-drawn fallbacks) + `iconColors` (brand hex) |
| `src/components/Hero.tsx` | `LOGO_SLOTS` — curated float positions; spares auto-assign as the stack grows |

## Working in tandem with showcase-kit

The kit at `C:\.showcase-kit` turns codebases into showcase entries
(`showcase.json` + media) and builds per-project detail pages.

- **Adding a project that has a showcase entry** (look for
  `showcase/showcase.json` in its repo or `C:\.showcase-kit\examples\<slug>\`):
  source name, year, tech[], and description raw material from it — don't
  re-interview the user. Keep the portfolio row short; the showcase page holds
  the deep dive. For `href` prefer, in order: deployed showcase detail page →
  repo link → published demo/video (from its `links[]`).
- **Creating a showcase entry for a new codebase**: copy
  `C:\.showcase-kit\.claude\skills\showcase\` into that repo's `.claude/skills/`
  and follow it there (probe.py → study → playwright captures → showcase.json;
  `build_site.py` renders the site).

## Adding a project

1. Collect (or pull from showcase.json): title, year, 1–2 sentence lowercase
   dry description, tech list, link, featured?
2. Append to `projects.ts`, newest first.
3. Big meaningful tools go in `stack.ts` (they float in the banner). Niche
   model/library names can stay out — they render as text chips on the row and
   auto-appear in the credentials toolbox.
4. For each new stack id, resolve its icon + color:

   ```bash
   node -e "const si=require('simple-icons');console.log(si.siBRANDNAME?si.siBRANDNAME.hex:'missing')"
   ```

   - Export exists → named-import in `src/lib/icons.tsx`, add to
     `simpleIconPaths`, and add `` `#${siBrand.hex}` `` to `iconColors`.
   - Missing → draw a doodle in `doodleIcons` (24×24 viewBox,
     `stroke="currentColor"`, strokeWidth 1.6–1.8, round caps, wobbly like the
     comfyui/aws entries) and add the official brand hex to `iconColors`.
   - Mark is itself black/white (e.g. ollama) → NO `iconColors` entry; it
     follows the ink color so it stays visible in both themes.
5. If the stack outgrows `LOGO_SLOTS`, add slots. The identity block is
   CENTERED: keep x 32–68 / y 20–80 clear; sizes 44–100 px, depth 0.2–1.0,
   alternate spin signs. If a slot sits at an edge within y 35–70, give it an
   `sy` (small-screen y) that clears the text band on phones.
6. The credentials toolbox and tech chips derive automatically — never
   hand-edit a skills list.

## Design constraints (non-negotiable)

- Page chrome is zero-hue: only `var(--ink)` / `var(--paper)` plus alpha.
  Never color text, borders, buttons or backgrounds — color belongs to brand
  marks (via `iconColors`) and project media only.
- Fonts stay: Anton (display), IBM Plex Mono (body), Caveat (handwriting).
- Background scribbles: Caveat, opacity ≤ 0.12, `aria-hidden`, pointer-events-none.
- Motion: springs only (stiffness 100–260, damping 12–24); every scroll/mount
  animation must no-op under `useReducedMotion`.
- The profile portrait is a static centered sticker. It never floats, spins,
  or joins the logo field.

## Verify (required before claiming done)

1. `npm run build` — must pass clean.
2. `npm run dev`, then screenshot the hero (new logo floats/pops, no overlap
   with the centered identity block), a project row (chips render; unknown ids
   fall back to text), and the credentials toolbox — light AND dark
   (`localStorage.theme = "dark"`), desktop AND ~390px mobile.

## Common mistakes

| Mistake | Fix |
|---|---|
| Writing content into components | Content lives in `src/data/*` only |
| Guessing simple-icons export names or brand hexes | Run the node check; use `si<Brand>.hex` |
| Coloring page chrome "for pop" | Color belongs to brand marks only — the B&W page is why they pop |
| Hand-editing the toolbox/skills list | It derives from stack + project tech |
| Floating the profile pic with the logos | It's static and centered, always |
| Re-asking for project facts that showcase.json already has | Source from the showcase entry |
