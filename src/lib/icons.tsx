import {
  siClaude,
  siVite,
  siCapacitor,
  siSqlite,
  siGooglegemini,
  siQwen,
  siGit,
  siModelcontextprotocol,
  siHtml5,
  siJson,
  siNextdotjs,
  siYoutube,
  siFlask,
  siTailwindcss,
  siDotnet,
  siCss,

  siCloudflare,
  siFastapi,
  siFfmpeg,
  siJavascript,
  siOllama,
  siPython,
  siReact,
  siTypescript,
} from "simple-icons";
import type { ReactNode } from "react";

/**
 * Brand marks for the stack. Two tiers:
 *  1. simpleIconPaths — official single-path glyphs from the simple-icons package
 *  2. doodleIcons — hand-drawn ink fallbacks for brands simple-icons doesn't carry
 * StackIcon checks tier 1 first. When adding a new tool, try simple-icons first
 * (named export `si<Brandname>`), and only draw a doodle if it's missing.
 *
 * iconColors: the page itself is strictly black & white — the brand marks carry
 * the ONLY color on the site, which is exactly why they pop. Use the official
 * hex from simple-icons when available. Marks that are themselves black/white
 * (ollama) get no entry and render in ink instead.
 */

export const simpleIconPaths: Record<string, string> = {
  claude: siClaude.path,
  "vite": siVite.path,
  "capacitor": siCapacitor.path,
  "sqlite": siSqlite.path,
  "gemini": siGooglegemini.path,
  "qwen3-tts": siQwen.path,
  "git": siGit.path,
  "mcp": siModelcontextprotocol.path,
  "html": siHtml5.path,
  "json schema": siJson.path,
  "next.js": siNextdotjs.path,
  "youtube data api": siYoutube.path,
  "flask": siFlask.path,
  "tailwind css": siTailwindcss.path,
  ".net framework": siDotnet.path,
  "css": siCss.path,

  python: siPython.path,
  javascript: siJavascript.path,
  cloudflare: siCloudflare.path,
  fastapi: siFastapi.path,
  ffmpeg: siFfmpeg.path,
  ollama: siOllama.path,
  react: siReact.path,
  typescript: siTypescript.path,
};

export const iconColors: Record<string, string> = {
  claude: `#${siClaude.hex}`,
  "vite": `#${siVite.hex}`,
  "capacitor": `#${siCapacitor.hex}`,
  "gemini": `#${siGooglegemini.hex}`,
  "qwen3-tts": `#${siQwen.hex}`,
  "git": `#${siGit.hex}`,
  "html": `#${siHtml5.hex}`,
  "youtube data api": `#${siYoutube.hex}`,
  "flask": `#${siFlask.hex}`,
  "tailwind css": `#${siTailwindcss.hex}`,
  ".net framework": `#${siDotnet.hex}`,
  "css": `#${siCss.hex}`,

  python: `#${siPython.hex}`,
  javascript: `#${siJavascript.hex}`,
  cloudflare: `#${siCloudflare.hex}`,
  fastapi: `#${siFastapi.hex}`,
  ffmpeg: `#${siFfmpeg.hex}`,
  react: `#${siReact.hex}`,
  typescript: `#${siTypescript.hex}`,
  comfyui: "#3b82f6",
  aws: "#ff9900",
  remotion: "#0b84f3",
};

export type DoodleIcon = (props: { className?: string }) => ReactNode;

// Semantic line icons identify capabilities when a packaged brand mark is unavailable.
function pictogram(path: string): DoodleIcon {
  return function Pictogram({ className }) {
    return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
  };
}

export const fallbackIcon = pictogram("M8 5 2 12l6 7 M16 5l6 7-6 7 M14 3l-4 18");

export const doodleIcons: Record<string, DoodleIcon> = {
  "wan 2.2": pictogram("M3 5h14v14H3z M17 9l5-3v12l-5-3 M7 9l6 3-6 3z"),
  "krea2": pictogram("M3 3h18v18H3z M3 16l5-6 5 7 4-4 4 5 M15 7h.01"),
  "ace-step": pictogram("M4 10v4 M8 6v12 M12 3v18 M16 7v10 M20 10v4"),
  "whisper": pictogram("M9 5a3 3 0 016 0v7a3 3 0 01-6 0z M6 10v2a6 6 0 0012 0v-2 M12 18v4 M8 22h8"),
  "real-esrgan": pictogram("M3 9V3h6 M15 3h6v6 M21 15v6h-6 M9 21H3v-6 M8 8h8v8H8z"),
  "sha-256": pictogram("M12 2l8 3v6c0 5-4 8-8 11-4-3-8-6-8-11V5z M9 9l-1 7 M14 9l-1 7 M7 11h9 M7 14h9"),
  "playwright": pictogram("M3 4l8 2v6c-4 5-8 1-8-3z M5 8h1 M8 9h1 M5 11l3 1 M12 5l9-2v8c-1 6-7 7-9 3 M15 8h1 M18 7h1 M15 12q2 3 4-1"),
  "edge-tts": pictogram("M3 9h4l5-5v16l-5-5H3z M16 8q5 4 0 8 M19 5q7 7 0 14"),
  "rvc": pictogram("M3 8v8 M6 5v14 M9 8v8 M13 6h7l-2-2 M20 6l-2 2 M21 16h-7l2-2 M14 16l2 2"),
  "windows": pictogram("M3 4l8-1v8H3z M13 3l8-1v9h-8z M3 13h8v8l-8-1z M13 13h8v9l-8-1z"),
  "desktop automation": pictogram("M3 3h18v13H3z M8 21h8 M12 16v5 M8 8l3-2v6 M15 6l2 3-2 3"),
  "vision APIs": pictogram("M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 100 6 3 3 0 000-6"),
  "yt-dlp": pictogram("M3 3h18v13H3z M9 6l6 3-6 3z M12 16v6 M8 19l4 3 4-3"),
  "optical flow": pictogram("M3 5h11l-3-3 M14 5l-3 3 M3 12h18l-3-3 M21 12l-3 3 M3 19h11l-3-3 M14 19l-3 3"),
  "pdf": pictogram("M5 2h9l5 5v15H5z M14 2v6h5 M8 12h8 M8 16h5"),
  "pillow": pictogram("M3 5h18v14H3z M3 16l5-6 5 7 4-4 4 5 M15 8h.01"),
  "imagehash": pictogram("M3 3h14v14H3z M4 13l4-5 5 6 M18 13l-1 9 M22 13l-1 9 M15 16h8 M15 19h8"),
  "video editing": pictogram("M3 4h18v13H3z M9 7l6 3-6 3z M3 21h18 M7 19v4 M16 19v4"),
  "motion": pictogram("M2 6h8 M2 12h5 M2 18h8 M12 5l9 7-9 7z"),
  "c#": pictogram("M12 4a8 8 0 100 16 M16 6l-2 12 M21 6l-2 12 M13 10h10 M12 14h10"),
  "windows forms": pictogram("M3 3h18v18H3z M3 8h18 M6 5h.01 M9 5h.01 M6 12h5 M6 16h5 M14 12h4v5h-4z"),
  "console application": pictogram("M2 3h20v18H2z M6 8l4 4-4 4 M13 16h5"),
  "ascii animation": pictogram("M3 3h18v18H3z M7 6l-1 8 M11 6l-1 8 M5 9h8 M5 12h8 M15 14l5 3-5 3z"),

  comfyui: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.2" y="2.8" width="8.6" height="6.2" rx="1.6" />
      <rect x="13.2" y="15" width="8.6" height="6.2" rx="1.6" />
      <path d="M10.8 5.9c5.6 0-2.4 12.2 2.4 12.2" />
      <circle cx="10.8" cy="5.9" r="1" fill="currentColor" stroke="none" />
      <circle cx="13.2" cy="18.1" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  aws: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="5" height="5" rx="0.8" />
      <rect x="9.5" y="4" width="5" height="5" rx="0.8" />
      <rect x="16" y="4" width="5" height="5" rx="0.8" />
      <path d="M3.5 15c4.8 4.4 12.2 4.4 17 .2" />
      <path d="M20.5 15.2l-3-.6M20.5 15.2l-1 2.8" />
    </svg>
  ),
  remotion: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M10 8.5 16 12l-6 3.5Z" fill="currentColor" stroke="none" />
    </svg>
  ),
};
