# reblobler — portfolio

Minimalist black & white portfolio on squared notebook paper. Next.js 16 +
Tailwind v4 + Motion. Light/dark from one monochrome token pair.

## Run

```bash
npm run dev    # http://localhost:3000
npm run build  # production build
```

## Edit content (no component changes needed)

| What | Where |
|---|---|
| Projects | `src/data/projects.ts` |
| Stack / banner logos | `src/data/stack.ts` (+ icons in `src/lib/icons.tsx`) |
| Education + credly badges | `src/data/credentials.ts` |
| Name, tagline, email, socials | `src/data/profile.ts` |
| Profile picture | `public/reblobler.png` |

Or just tell Claude Code about new work — the **portfolio-curator** skill
(`.claude/skills/portfolio-curator/`) wires up data, tech chips, banner logos
and the auto-derived toolbox.

## Design system

- Paper `#f6f5f0` / ink `#17150f`, inverted in dark mode. No other colors.
- Anton (display) · IBM Plex Mono (body) · Caveat (margin scribbles).
- Faint asymmetric grid, spiral binding, margin rule: `src/components/NotebookBackground.tsx` and `BindingStrip.tsx`.
- Hero zero-gravity logo field: `src/components/Hero.tsx` (`LOGO_SLOTS`).
