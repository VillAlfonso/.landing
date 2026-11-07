/**
 * Projects, newest first. `tech` holds stack ids (src/data/stack.ts) —
 * unknown ids still render as plain text chips and auto-appear in the
 * credentials toolbox. `featured` identifies the homepage's lead project.
 *
 * Projects with a showcase-kit entry (C:\.showcase-kit) should source their
 * copy, tech and links from that project's showcase.json — see the
 * portfolio-curator skill.
 */
export type Project = {
  slug: string;
  title: string;
  year: string;
  description: string;
  tech: string[];
  href?: string;
  featured?: boolean;
  sample?: boolean;
  privateSource?: boolean;
  playable?: boolean;
};

export const projects: Project[] = [
  {
    slug: "revelator",
    title: "revelator",
    year: "2026",
    description:
      "my institutional capstone: a web and mobile-capable document screening app for CCJE personnel at LSPU San Pablo. react meets fastapi, authenticated accounts, scan history, and gemini-assisted image analysis for human review.",
    tech: ["react", "vite", "capacitor", "python", "fastapi", "sqlite", "gemini"],
    href: "https://github.com/VillAlfonso/Revelator",
  },
  {
    slug: "aaaflow",
    title: "aaaflow studio",
    year: "2026",
    description:
      "a local-first video studio connecting scripts, voices, generated visuals, and final video assembly on a consumer gpu. a voice-first pipeline with channel personas shaped by prompts; two resulting videos are published on youtube.",
    tech: [
      "python",
      "fastapi",
      "javascript",
      "comfyui",
      "wan 2.2",
      "qwen3-tts",
      "krea2",
      "ace-step",
      "remotion",
      "whisper",
      "real-esrgan",
      "ffmpeg",
      "ollama",
    ],
    // in-site showcase page (public/showcase, built by showcase-kit)
    href: "/showcase/index.html#/p/aaaflow",
    featured: true,
  },
  {
    slug: "ark",
    title: "ark",
    year: "2026",
    description:
      "a git-aware project archiver that separates code, re-downloadable dependencies, and irreplaceable local files. bundles history, preserves uncommitted work, and verifies backups with SHA-256 manifests. python standard library, with a web UI and MCP tools.",
    tech: ["python", "git", "sha-256", "mcp"],
    href: "https://github.com/VillAlfonso/ark",
  },
  {
    slug: "showcase-kit",
    title: "showcase kit",
    year: "2026",
    description:
      "a reusable kit for turning codebases into portfolio case studies. repository probes, browser captures, structured project data, and a static-site builder bring the work together. the aaaflow showcase on this site was built with it.",
    tech: ["python", "playwright", "html", "json schema"],
    href: "https://github.com/VillAlfonso/showcase-kit",
  },
  {
    slug: "prosody",
    title: "prosody",
    year: "2026",
    description:
      "a browser-based speech studio with inline emotion tags, pitch and pacing controls, reusable presets, and a segment timeline. edge-TTS supplies the online base voice; an optional local RVC stage handles voice conversion.",
    tech: ["python", "fastapi", "javascript", "edge-tts", "rvc", "ffmpeg"],
    href: "https://github.com/VillAlfonso/Prosody",
  },
  {
    slug: "ytauto",
    title: "ytauto",
    year: "2026",
    description:
      "a youtube trend dashboard pairing a next.js frontend with a fastapi backend. server-side caching and an engagement proxy help compare candidate videos without claiming access to private retention data. automated video rendering is on the roadmap.",
    tech: ["typescript", "next.js", "python", "fastapi", "youtube data api"],
    href: "https://github.com/VillAlfonso/YTauto",
  },
  {
    slug: "capture",
    title: "capture",
    year: "2026",
    description:
      "a windows desktop experiment for user-triggered region capture and AI-assisted editor input. separates the background app from a status monitor, with pause, cancellation, and offline rehearsal controls. screenshots are submitted only on an explicit action.",
    tech: ["python", "windows", "desktop automation", "vision APIs"],
    href: "https://github.com/VillAlfonso/Capture",
  },
  {
    slug: "aaadatagatherer",
    title: "aaa data gatherer",
    year: "2026",
    description:
      "turns video links into compact evidence packs: word-timed transcripts, scene cuts, motion labels, pacing metrics, and timestamped frame sheets. exports PDF, markdown, and JSON for analysis; prepares evidence rather than running a local LLM.",
    tech: ["python", "whisper", "yt-dlp", "optical flow", "pdf"],
    href: "https://github.com/VillAlfonso/AAADataGatherer",
  },
  {
    slug: "aaavidtoimages",
    title: "aaa vid to images",
    year: "2026",
    description:
      "a video-to-frame workbench with configurable extraction rate and image quality, saved job history, and a browsable frame gallery. perceptual hashing helps remove near-duplicate frames before further analysis.",
    tech: ["python", "flask", "ffmpeg", "yt-dlp", "pillow", "imagehash"],
    href: "https://github.com/VillAlfonso/AAAvidtoimages",
  },
  {
    slug: "reanimen",
    title: "reanimen",
    year: "2026",
    description:
      "a script-to-video editor built around a black canvas, sourced images and GIFs, word-synced captions, and narration. edit each scene, optionally convert the voice locally with RVC, then render an MP4 through remotion.",
    tech: ["remotion", "python", "edge-tts", "rvc", "video editing"],
    href: "https://github.com/VillAlfonso/Reanimen",
  },
  {
    slug: "this-site",
    title: "this website",
    year: "2026",
    description:
      "the grid-paper portfolio you are reading. black, white, and a lot of springs.",
    tech: ["typescript", "react", "next.js", "tailwind css", "motion"],
    href: "https://github.com/VillAlfonso/.landing",
  },
  {
    slug: "discrete-math-instincts",
    title: "Discrete Math Instincts",
    year: "2024",
    description: "a falling-expression logic game originally built with C# and Windows Forms. read the truth values, answer true or false, and protect your three hearts. now playable in the browser with the original layout and sprites.",
    tech: ["c#", ".net framework", "windows forms", "javascript", "html", "css"],
    href: "https://github.com/VillAlfonso/.landing/tree/master/public/games/discrete-math-instincts",
    playable: true,
  },
  {
    slug: "quantumnquandary",
    title: "quantumnquandary",
    year: "2023",
    description: "originally a purely terminal-based C# game: no graphical interface or game engine, just text, keyboard input, and ASCII animation. a duel about charging, defending, and reading your opponent. six actions, single-player and local two-player modes, and hand-built ASCII battle animations. the browser recreation reuses the original artwork.",
    tech: ["c#", "console application", "ascii animation", "javascript", "html", "css"],
    href: "https://github.com/VillAlfonso/.landing/tree/master/public/games/quantumnquandary",
    playable: true,
  },
];
