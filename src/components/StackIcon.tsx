import { simpleIconPaths, doodleIcons } from "@/lib/icons";

export default function StackIcon({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const path = simpleIconPaths[id];
  if (path) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d={path} fill="currentColor" />
      </svg>
    );
  }
  const Doodle = doodleIcons[id];
  if (Doodle) return <Doodle className={className} />;
  return null;
}
