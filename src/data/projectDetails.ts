export type ProjectDetail = {
  category: string;
  purpose: string;
  features: { title: string; body: string }[];
  workflow: string[];
  implementation: string;
  scope: string;
  source?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  showcase?: string;
};

export const projectDetails: Record<string, ProjectDetail> = {
  alafuenca: {
    "category": "web development · hotel booking demo",
    "purpose": "Bring hotel discovery and reservations into one website, from browsing rooms and event spaces to submitting a booking for staff review.",
    "features": [
      {
        "title": "Hotel discovery",
        "body": "A photographic landing page introduces suites, dining, amenities, and event spaces. Room listings are backed by MySQL and grouped by room type."
      },
      {
        "title": "Reservation workflow",
        "body": "Booking handlers calculate room-night totals and a 75% down payment, generate booking codes, and store pending reservations for review."
      },
      {
        "title": "Stripe integration",
        "body": "The PHP backend creates PaymentIntents with manual capture. Admin handlers include confirmation, capture, and cancellation paths tied to booking status."
      },
      {
        "title": "Guest and staff views",
        "body": "The code includes session-based accounts, a Google sign-in integration, and administration pages for rooms, events, users, and orders."
      }
    ],
    "workflow": [
      "Browse the hotel, room types, and event spaces.",
      "Sign in and choose reservation dates.",
      "Submit the booking through the demo payment flow.",
      "Review the pending reservation from the administration screens."
    ],
    "implementation": "Server-rendered PHP pages use MySQL through PDO and MySQLi. Composer dependencies include the Stripe PHP SDK, Google API client, and PHPMailer. Bootstrap, Tailwind CSS, JavaScript, Swiper, and AOS support the interface.",
    "scope": "A demo hotel project, not a live reservation service. Screenshots show the original public-facing pages running locally. Database-backed bookings, Google sign-in, payment capture, and email delivery require separate configuration and were not exercised for this showcase.",
    "source": "https://github.com/VillAlfonso/Alafuenca"
  },
  "discrete-math-instincts": {
    category: "game development · propositional logic",
    purpose: "Turn truth tables into a quick reaction game: read the variable assignments, evaluate the falling expression, and answer before it reaches the bottom.",
    features: [
      { title: "Logic under pressure", body: "Evaluate negation, AND, OR, implication, and biconditional expressions. The closest expression is highlighted blue, with keyboard and on-screen answer controls." },
      { title: "Three hearts, growing difficulty", body: "Extra lanes unlock at 8 and 20 points. A seven-answer streak restores a heart or adds a bonus point, while Advanced mode changes truth values at ten-point milestones." },
      { title: "The original desktop layout", body: "The browser edition keeps the 540 × 627 Windows Forms playfield, button positions, fonts where available, and original pixel-heart artwork. High scores are saved locally." },
    ],
    workflow: ["Choose Normal or Advanced and press START.", "Read p, q, r, and s at the top.", "Answer the blue expression with A / D or True / False.", "Build a streak, survive new lanes, and beat your high score."],
    implementation: "The original is a C# .NET Framework Windows Forms application. This JavaScript recreation uses the Designer coordinates and original image assets. Its pure truth evaluator handles negation and both implication directions correctly, with separate state for scoring, timers, and replay.",
    scope: "A playable browser recreation, not an embedded Windows executable. The original answer-evaluation, repeated streak rewards, timer resets, and Advanced-mode milestone behavior were repaired. Browser font rendering and window chrome differ by device. Scores stay on this device; no account is required.",
  },
  quantumnquandary: {
    category: "game development · console strategy",
    purpose: "Expand rock-paper-scissors into a duel where resource management matters: save charges, predict an attack, or spend them on a decisive counter.",
    features: [
      { title: "Six competing actions", body: "Charge and Surrender cost nothing. Gun costs two, Mirror three, Kamehameha five, and Nuclear Bomb eight. Both players lock in before the round is revealed." },
      { title: "Solo or same-device duels", body: "Play against a computer choosing from its affordable actions, or challenge a second player on one keyboard. Touch buttons provide the same actions." },
      { title: "Original ASCII animation", body: "The title artwork, battle frames, and team credits come directly from the original C# source. The browser edition animates those frames in a fixed console-style playfield." },
    ],
    workflow: ["Choose single player or player vs player.", "Start with two charges and lock in an affordable action.", "Watch both moves resolve through the original ASCII frames.", "Continue until one action wins, then replay or return to the menu."],
    implementation: "Originally built entirely as a terminal game in C# — no graphical user interface or game engine. All visuals were text and ASCII characters printed to the console, with keyboard input. The original project is Final-Project-ITEC-102 (2023). Quert Alfonso M. Villafuerte is credited for player-vs-player, game mechanics, front-end game creation, and animation; Riz Ivan G. Verana for menus; Angelo S. Averion for single-player and menu design. The browser port separates the action rules, state machine, and extracted artwork.",
    scope: "A browser recreation using the original visual assets and documented rules, with valid charge deductions and consistent counters. It includes same-device multiplayer, not online matchmaking. The GitHub button links to this public browser edition; original team credits remain in-game. Browser fonts and timing may differ from the Windows console.",
  },
  aaaflow: {
    category: "local AI · video production",
    purpose: "Bring the steps of making a narrated video into one workspace: script, voice, visuals, editing, preview, and export. The timeline follows the actual narration so scenes stay aligned with what is being said.",
    features: [
      { title: "Voice-led timing", body: "Generate narration per scene and use the resulting audio duration to drive the timeline, instead of forcing speech into a fixed scene length." },
      { title: "Connected creative tools", body: "Combine local speech and image generation, ComfyUI workflows, animation, and final video assembly in a browser-based studio." },
      { title: "Channel identity", body: "Channel personas, visual prompts, and editing presets help keep a project's outputs consistent. Voice Lab and per-scene editing provide room to refine the result." },
    ],
    workflow: ["Start with a storyboard and channel direction.", "Generate narration and build the audio-led timeline.", "Generate or refine visuals and edit the scene sequence.", "Preview the assembled video and prepare the final export."],
    implementation: "A JavaScript interface talks to Python/FastAPI services that coordinate model inference, background jobs, project storage, and media processing. The larger workflow integrates ComfyUI, local models, Remotion, and FFmpeg.",
    scope: "A local-first personal production tool with two published videos. Model setup, GPU memory, and generation time affect the experience; online publishing and external services are separate from local inference.",
    source: "https://github.com/VillAlfonso/AAAFlow",
    image: "/showcase/media/aaaflow/06-preview-play.png",
    imageAlt: "AAAFlow Studio video preview and production navigation",
    video: "/showcase/media/aaaflow/06-preview-play.mp4",
    showcase: "/showcase/index.html#/p/aaaflow",
  },
  revelator: {
    category: "institutional capstone · web & mobile",
    purpose: "Support document screening for CCJE personnel at LSPU San Pablo with an application that brings image submission, assisted analysis, and review history together.",
    features: [
      { title: "Document screening", body: "Submit document images for Gemini-assisted analysis, with the result supporting a person's review." },
      { title: "Accounts & history", body: "Authenticated access and stored scan history keep document screening organized across sessions." },
      { title: "Web & mobile foundation", body: "A React interface built with Vite and Capacitor supports a shared application foundation for browser and mobile use." },
    ],
    workflow: ["Sign in to an account.", "Submit a document image for screening.", "Review the assisted analysis.", "Return to previous scans through the stored history."],
    implementation: "React/Vite provides the interface, while FastAPI handles backend requests. SQLAlchemy and SQLite support persistence, and Gemini supplies the image-analysis integration.",
    scope: "An institutional capstone and screening aid. Analysis is intended for human review and does not establish document authenticity by itself.",
  },
  ark: {
    category: "developer tooling · backup & recovery",
    purpose: "Large project folders mix source code, replaceable dependencies, and files that cannot be downloaded again. Ark organizes those differences into a reviewable archive before a project is removed or moved.",
    features: [
      { title: "Git-aware preservation", body: "Save repository history as a Git bundle and preserve uncommitted work as a patch. Detect nested repositories and problematic gitlinks." },
      { title: "File classification", body: "Separate re-downloadable caches and dependencies from locally generated data, outputs, and other irreplaceable files. Ambiguous items are saved and flagged." },
      { title: "Integrity checks", body: "SHA-256 manifests verify the archive after creation or transport, with restore hints explaining what needs to be fetched again." },
    ],
    workflow: ["Scan the project and review its classification.", "Inspect or adjust the archive plan.", "Build the archive with history, patches, and preserved files.", "Verify the archive and review the restoration checklist."],
    implementation: "Python standard-library tools power the CLI, web interface, and MCP server. The archive includes a runbook, restore hints, classification plan, and integrity manifests.",
    scope: "Classification uses heuristics and Git information. Review the plan before deleting source files; Ark creates a local archive and does not upload it or download replacement dependencies.",
  },
  "showcase-kit": {
    category: "developer tooling · portfolio publishing",
    purpose: "Turn a codebase into an understandable portfolio entry by combining repository facts, a written explanation, and captured media in a reusable format.",
    features: [
      { title: "Repository probes", body: "Collect deterministic facts such as languages, dependencies, routes, and Git information to support the project description." },
      { title: "Browser capture", body: "Use a scripted Playwright tour to record a running application and produce screenshots and clips for the showcase." },
      { title: "Static publishing", body: "Combine structured showcase entries into a self-contained portfolio with individual project views and responsive light/dark presentation." },
    ],
    workflow: ["Inspect the codebase and collect facts.", "Capture the running application's relevant workflows.", "Write a structured showcase entry and attach media.", "Build the static portfolio output."],
    implementation: "Python scripts handle probing, capture, and HTML generation. A JSON schema defines the content format, and the browser-capture step uses Playwright.",
    scope: "The kit was used for the existing aaaflow showcase on this site. Captures require a running app; static analysis alone cannot demonstrate runtime behavior.",
    showcase: "/showcase/index.html#/p/aaaflow",
  },
  prosody: {
    category: "creative tools · speech & audio",
    purpose: "Give a script more controllable delivery through inline emotion tags and reusable voice settings, with an optional voice-conversion stage.",
    features: [
      { title: "Emotion-tagged scripts", body: "Split text into segments using tags and highlight each segment in the editor. Untagged passages use a default emotion." },
      { title: "Prosody Lab", body: "Tune pitch, speed, and volume, preview the result, and save the configuration as a reusable emotion preset." },
      { title: "Audio timeline", body: "Generate segment audio, follow it on a timeline, and export the combined result. Optional RVC conversion changes voice character." },
    ],
    workflow: ["Write a script with emotion tags.", "Tune and preview the delivery presets.", "Choose the voice and optionally enable an RVC model.", "Generate, review the timeline, and download audio."],
    implementation: "FastAPI serves a plain JavaScript interface. The pipeline parses segments, calls Edge-TTS, optionally applies local RVC, then uses FFmpeg for audio processing and export. JSON files persist settings.",
    scope: "The base voice uses the online Edge-TTS service. RVC runs locally and requires a compatible model and environment; emotion tags control configured delivery parameters.",
  },
  ytauto: {
    category: "web application · trend analytics",
    purpose: "Compare potential YouTube topics through a dashboard that gathers public video signals and scores candidates without pretending to know private audience-retention data.",
    features: [
      { title: "Trend dashboard", body: "Bring candidate videos and their public performance signals into a Next.js interface." },
      { title: "Engagement proxy", body: "Combine view velocity, engagement rate, and an age penalty into a proxy score for comparing candidates." },
      { title: "Backend caching", body: "Cache and aggregate requests on the server so the browser does not query YouTube directly." },
    ],
    workflow: ["Retrieve and cache public video data.", "Filter candidates and calculate proxy scores.", "Compare candidates in the dashboard.", "Use the signals to guide further topic research."],
    implementation: "A Next.js frontend is paired with a FastAPI backend for ingestion, caching, and scoring. The repository separates analytics from future rendering work.",
    scope: "Trend analytics and proxy scoring are implemented. Historical storage, automated video rendering, and a mobile wrapper are roadmap items; the score is not an audience-retention measurement.",
  },
  capture: {
    category: "desktop experiment · Windows automation",
    purpose: "Explore a user-controlled workflow for selecting a screen region, requesting AI assistance, and replaying generated text into an editor, with explicit pause and cancellation controls.",
    features: [
      { title: "Explicit submission", body: "Select a region first, then submit it through a separate action. Capturing a region does not itself send an API request." },
      { title: "Separate status monitor", body: "The background application owns capture and input handling; a separate monitor reports state without taking over its lifecycle." },
      { title: "Rehearsal & cancellation", body: "An offline rehearsal mode exercises the workflow with a fixed snippet. Pause, restart, and cancellation controls manage local state." },
    ],
    workflow: ["Start the app and enable the controls.", "Select the intended region and explicitly submit it.", "Review request state in the monitor.", "Replay, pause, or discard generated editor input."],
    implementation: "Python coordinates Windows input hooks, screen capture, API requests, process ownership, and a separate monitoring process. Local rehearsal avoids live API traffic during workflow checks.",
    scope: "A Windows-specific experiment. Editor focus, keyboard layouts, and automatic indentation affect replay. Local cancellation discards the answer but cannot undo a request already received by the provider.",
  },
  aaadatagatherer: {
    category: "media analysis · evidence preparation",
    purpose: "Condense a video into a portable evidence pack that makes its timing, spoken content, cuts, and movement easier to inspect or pass into a later analysis workflow.",
    features: [
      { title: "Timed transcripts", body: "Use Whisper word timestamps to connect narration and pauses with the shot timeline." },
      { title: "Visual & pacing evidence", body: "Detect cuts, estimate motion through optical flow, and summarize cutting pace, speaking pace, and loudness." },
      { title: "Portable exports", body: "Produce a PDF report with frame sheets alongside Markdown and JSON for reading or further processing." },
    ],
    workflow: ["Provide video links and select analysis options.", "Download media and transcribe the audio.", "Analyze shots, motion, and pacing.", "Export a report with timestamped frame sheets."],
    implementation: "Python coordinates yt-dlp, Whisper, video analysis, and report generation. Frame-sampling options balance visual coverage against the size of the evidence pack.",
    scope: "The tool prepares evidence; v1 does not run a local LLM to interpret it. Transcript and optical-flow outputs are estimates, and denser sampling produces larger reports.",
  },
  aaavidtoimages: {
    category: "media utilities · frame extraction",
    purpose: "Make video frames easier to collect and browse for subsequent analysis, with control over how frequently images are extracted and how much duplication is retained.",
    features: [
      { title: "Configurable extraction", body: "Choose extraction rate and output quality to balance the number of images against the level of detail needed." },
      { title: "Frame gallery", body: "Browse extracted frames in the web interface and return to saved jobs through the job history." },
      { title: "Near-duplicate filtering", body: "Use perceptual hashes to help remove visually similar frames before further review." },
    ],
    workflow: ["Provide a video source.", "Choose the frame rate and quality settings.", "Extract images and filter similar frames.", "Browse the resulting gallery or revisit a saved job."],
    implementation: "A Flask application orchestrates yt-dlp and FFmpeg. Pillow and imagehash support image handling and perceptual comparisons.",
    scope: "A frame-preparation utility rather than a semantic video-understanding model. Sampling and similarity thresholds determine which visual changes are retained.",
  },
  reanimen: {
    category: "creative tools · script-to-video",
    purpose: "Build narrated videos from a script using a deliberately simple black canvas, sourced images and GIF cutaways, and captions synchronized to the spoken words.",
    features: [
      { title: "Scene-based editing", body: "Build scenes from a script, then adjust layouts, cuts, motion, caption position, and visual style individually." },
      { title: "Media sourcing", body: "Derive search terms from the narration and find images or GIFs through media providers, retaining attribution in project data." },
      { title: "Narration & rendering", body: "Generate scene narration with word boundaries for captions, optionally convert its voice through RVC, and render an MP4 with Remotion." },
    ],
    workflow: ["Paste the script and build scenes.", "Review sourced images and GIFs.", "Generate narration and tune scene presentation.", "Render and download the finished MP4."],
    implementation: "The editor connects Remotion rendering with a Python Edge-TTS bridge. Optional local RVC conversion preserves timing, while cached audio avoids unnecessary regeneration.",
    scope: "Edge-TTS and media search require online services; optional RVC inference runs locally. Sourced media still needs a rights review before publication.",
  },
  "this-site": {
    category: "portfolio · web development",
    purpose: "Present my projects, skills, and credentials in a portfolio that feels like an engineer's notebook, with enough detail for a recruiter or collaborator to explore the work.",
    features: [
      { title: "Data-driven projects", body: "Shared project data powers the project list, detail pages, technology chips, and credentials toolbox." },
      { title: "Notebook presentation", body: "A grid-paper background, expressive typography, and brand-colored icons carry across responsive light and dark layouts." },
      { title: "Inspectable evidence", body: "Project source links, an aaaflow media showcase, and permanently redacted certificate PDFs provide supporting material." },
    ],
    workflow: ["Browse featured work on the homepage.", "Open a project to read its workflow and implementation.", "Explore source code or available demos.", "Review credentials and contact details."],
    implementation: "Next.js App Router, React, TypeScript, and Tailwind CSS provide the site structure. Motion handles animation, reduced-motion preferences are supported, and GitHub pushes trigger Vercel deployment.",
    scope: "This is the portfolio itself. Project demonstrations are linked where available; the site does not run the local AI applications on the visitor's device.",
  },
};
