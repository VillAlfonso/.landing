import {
  siClaude,
  siCloudflare,
  siFastapi,
  siFfmpeg,
  siJavascript,
  siOllama,
  siPython,
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
  python: siPython.path,
  javascript: siJavascript.path,
  cloudflare: siCloudflare.path,
  fastapi: siFastapi.path,
  ffmpeg: siFfmpeg.path,
  ollama: siOllama.path,
};

export const iconColors: Record<string, string> = {
  claude: `#${siClaude.hex}`,
  python: `#${siPython.hex}`,
  javascript: `#${siJavascript.hex}`,
  cloudflare: `#${siCloudflare.hex}`,
  fastapi: `#${siFastapi.hex}`,
  ffmpeg: `#${siFfmpeg.hex}`,
  comfyui: "#3b82f6",
  aws: "#ff9900",
  remotion: "#0b84f3",
};

export type DoodleIcon = (props: { className?: string }) => ReactNode;

export const doodleIcons: Record<string, DoodleIcon> = {
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
