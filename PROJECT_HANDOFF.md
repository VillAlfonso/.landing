# Portfolio project handoff

Last updated: November 7, 2026. This is a project summary, not a verbatim chat export.

## Project and deployment

- Owner: Quert Alfonso M. Villafuerte, GitHub `VillAlfonso`.
- Checkout: `C:\.landing`; GitHub: https://github.com/VillAlfonso/.landing
- Production: https://www.quert.site (quert.site redirects here).
- Vercel project: `quert`, account/team `villalfonsos-projects`.
- Pushes to `master` trigger production deployment. Build with `npm run build` first; verify Vercel status and public pages after pushing.
- Existing Git author: `VillAlfonso <quertgamer@gmail.com>`.
- Git credentials are managed by the local credential manager. Never copy authentication tokens into this file or a chat.

## User decisions

- Keep the monochrome notebook design, grid background, Anton / IBM Plex Mono / Caveat fonts, light/dark themes, and responsive layouts.
- AAAFlow Studio is the homepage's featured project and has a screenshot banner.
- All project cards open `/projects/<slug>` inside the site, not GitHub directly.
- Each subpage has a GitHub button, back links, overview, features, workflow, and implementation/scope notes.
- All eleven portfolio repositories are public, including ark, showcase-kit, Capture, and Reanimen (the user explicitly requested those visibility changes).
- Add actual screenshots and demos using the user's showcase-kit. Do not fabricate product screenshots or metrics. Label empty/demo states honestly.
- Use permanent redactions on public certificate PDFs, never CSS blur over original files. Keep originals, verification codes, passwords, signatures, and identity photos out of Git.

## Content facts

- Fourth-year BSIT, Web and Mobile Application Development, LSPU San Pablo; expected graduation 2027.
- Based in San Pablo City, Laguna; seeking a 400-hour internship, open to onsite work outside Laguna.
- Computer Systems Servicing NC II: issued October 31, 2026; valid through October 30, 2031.
- 15th IT Skills Olympics: University of Makati, November 4, 2026; school representative in Python Programming, participation (not a claimed placement).
- IT Specialist — Cloud Computing, Certiport/Pearson: May 21, 2026; certificate states five-year expiry.
- LoRA experience is described as hands-on experimentation creating adapters for local LLMs, not expert credentials.

## Source map

- `src/data/projects.ts`: list, technologies, repository links, featured flag.
- `src/data/projectDetails.ts`: project-specific narrative and scope.
- `src/data/profile.ts` and `credentials.ts`: personal profile and credentials.
- `src/app/projects/[slug]/page.tsx`: static detail routes.
- `src/components/ProjectGallery.tsx`: gallery, native dialog enlargement, videos.
- `src/components/ProjectRow.tsx`: internal project link and preview thumbnail.
- `src/components/FeaturedProject.tsx`: AAAFlow banner.
- `public/certificates/`: flattened, permanently redacted public PDFs and previews.

## Showcase-kit workflow

- Upstream cloned to `C:\.showcase-kit` from https://github.com/VillAlfonso/showcase-kit.
- `scripts/showcase-kit/`: vendored build/probe scripts, schema, notebook template, and provenance README.
- `showcase/<slug>/showcase.json`: schema-valid entries, captions, links, sections, and media references.
- New source captures are in `showcase/<slug>/media/`; existing AAAFlow assets are referenced from `public/showcase/media/aaaflow/` to avoid duplicating its videos.
- Run `python scripts/build_showcases.py` after changing entries or captures. It builds the 11-project showcase and `src/data/showcaseMedia.json`, which the Next.js gallery and thumbnails consume.
- Generated HTML, manifest, and public media are committed. Vercel only needs the usual Next.js build; Python is not required on Vercel.
- Preserve `/showcase/index.html#/p/<slug>` compatibility and its back links to `/projects/<slug>`.

## Capture provenance and limits

- Existing AAAFlow screenshots/clips came from the original showcase.
- Ark, Prosody, Data Gatherer, frame extractor, YTauto, Reanimen, and Revelator frontend were run locally for captures.
- Frame viewer uses frames extracted from the sample video already in the public repository.
- Revelator shows unauthenticated screens only; no real account/document data.
- Capture shows a real offline pure-core demonstration, styled as terminal output; no hooks or provider requests were activated.
- YTauto's screenshot shows its planning interface before generation, not fabricated trend results.
- Reanimen uses its bundled sample script; the screenshot does not demonstrate completed narration/rendering.
- Showcase-kit screenshot is actual build output; portfolio screenshots show the previous live version.

## Verification and continuation

- Run `npm run build` and `git diff --check`.
- Check desktop and 390px mobile in both themes, screenshot layout, image enlargement and Escape/focus behavior, videos, GitHub/back links, and all 11 generated showcase routes.
- `.playwright-mcp/` is ignored and contains temporary clones, local environments, probes, screenshots, and review scripts. Do not commit that directory.
- A new account should open this checkout (or clone the GitHub repository), read this file and `AGENTS.md`, inspect `git status` / recent commits, and verify the live deployment before continuing.
- This handoff is not a transfer of the original conversation or hidden model state. Keep any full chat export privately, outside the public repository.
