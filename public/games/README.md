# Browser game recreations

These are client-only ports for the portfolio, not C# binaries running in a browser.
Open `/projects/quantumnquandary` or `/projects/discrete-math-instincts` for the
case study, screenshots, source link, and embedded play surface. Each game also
runs independently at `/games/<slug>/index.html`.

## quantumnquandary

Based on `VillAlfonso/Final-Project-ITEC-102`, originally committed in 2023.
`art.json` contains ASCII frames extracted from the C# `Console.WriteLine`
verbatim strings, menu art, original credits, and animation sequence names.
The original on-screen title spells **Quantum Quandary**; the portfolio uses
**quantumnquandary** as requested by its creator.

Original credits: Quert Alfonso M. Villafuerte (player vs player, mechanics,
front-end game creation and animation), Riz Ivan G. Verana (menu), and
Angelo S. Averion (single player and menu design).

The browser implementation follows the original documented action costs and
counter rules, fixes inconsistent charge deductions and result branches, and
uses nonblocking animation timers. Both choices are hidden until locked in.
The bot samples its own affordable moves without reading the player's move.
Multiplayer is local to one device, not networked.

## Discrete Math Instincts

Based on the creator's 2024 C# .NET Framework Windows Forms project `asds`.
The layout uses the original Designer's 540 × 627 client area and control
coordinates. `hearts0.png` through `hearts3.png` are the original PNG assets.
The browser shell adds navigation, pause, keyboard help, and responsive scaling.

Repairs: parse negation and implication correctly, award streak progress once
per answer, change Advanced-mode values at ten-point milestones, reset all
lanes/timers on replay, replace the broken local help path with a truth table,
and use localStorage (with an in-memory fallback) for high scores. No network
service, account, telemetry, or personal data is needed to play.

## Verification

Run `node --test scripts/games.test.mjs` from the repository root for the full
36-pair duel matrix, truth-table/negation combinations, expression generation,
resource limits, and streak rewards. Browser checks should also cover keyboard
and touch input, both game-over paths, restart, pause, lane unlocks, and mobile
scaling. Local screenshots in `showcase/<slug>/media` capture actual gameplay.

Visual fidelity uses the original artwork and layout. OS window chrome,
font availability, rasterization, and animation timing can differ by browser.
