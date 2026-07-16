/**
 * The toolbox. One entry per tool you actually use.
 *
 * `id` keys into the icon registry (src/lib/icons.tsx) — official mark from
 * simple-icons when it exists, hand-drawn doodle fallback otherwise.
 * Every entry automatically gets a floating slot in the hero banner and a
 * chip in the credentials toolbox; project tech chips reference these ids.
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
];
