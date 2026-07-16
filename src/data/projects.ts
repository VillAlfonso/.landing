/**
 * Projects, newest first. `tech` holds stack ids (src/data/stack.ts) —
 * unknown ids still render as plain text chips and auto-appear in the
 * credentials toolbox. `featured` pins a project to the home page (top 3).
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
};

export const projects: Project[] = [
  {
    slug: "aaaflow",
    title: "aaaflow studio",
    year: "2026",
    description:
      "a local-first video studio: type a script — or just an idea — and a finished, human-looking youtube video comes out the other end. one consumer gpu, zero cloud, voice-first pipeline, channels minted by prompt. two of its videos are live on youtube right now.",
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
    href: "https://github.com/VillAlfonso/AAAFlow",
    featured: true,
  },
  {
    slug: "this-site",
    title: "this website",
    year: "2026",
    description:
      "the grid-paper portfolio you are reading. black, white, and a lot of springs.",
    tech: ["javascript", "claude"],
    featured: true,
  },
];
