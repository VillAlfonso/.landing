import { simpleIconPaths, doodleIcons, iconColors, fallbackIcon } from "@/lib/icons";

/**
 * Renders a stack tool's mark. Brand color by default — the page is
 * monochrome precisely so these can pop. `colored={false}` falls back to ink.
 */
export default function StackIcon({
  id,
  className = "",
  colored = true,
}: {
  id: string;
  className?: string;
  colored?: boolean;
}) {
  const style =
    colored && iconColors[id] ? { color: iconColors[id] } : undefined;

  const path = simpleIconPaths[id];
  if (path) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={style}
        aria-hidden="true"
      >
        <path d={path} fill="currentColor" />
      </svg>
    );
  }
  const Doodle = doodleIcons[id] ?? fallbackIcon;
  if (Doodle) {
    return (
      <span className={`block ${className}`} style={style} aria-hidden="true">
        <Doodle className="h-full w-full" />
      </span>
    );
  }
  return null;
}
