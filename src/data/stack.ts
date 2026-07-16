/**
 * The toolbox. One entry per tool you actually use.
 *
 * `id` keys into the icon registry (src/lib/icons.tsx) — official mark +
 * brand color from simple-icons when it exists, hand-drawn doodle fallback
 * otherwise. Every entry automatically gets a floating slot in the hero
 * banner and a chip in the credentials toolbox; project tech chips reference
 * these ids. Niche tools without a good mark can stay out of the stack —
 * they'll render as text chips and still show up in the toolbox.
 */
export type StackItem = { id: string; name: string };

export const stack: StackItem[] = [
  { id: "claude", name: "Claude" },
  { id: "comfyui", name: "ComfyUI" },
  { id: "python", name: "Python" },
  { id: "javascript", name: "JavaScript" },
  { id: "remotion", name: "Remotion" },
  { id: "aws", name: "AWS" },
  { id: "cloudflare", name: "Cloudflare" },
  { id: "fastapi", name: "FastAPI" },
  { id: "ffmpeg", name: "FFmpeg" },
  { id: "ollama", name: "Ollama" },
];
