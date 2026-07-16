/**
 * A faint handwritten margin note. Background noise by design —
 * position it with absolute utilities, keep opacity under ~0.12.
 */
export default function Scribble({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none font-hand text-ink ${className}`}
    >
      {children}
    </span>
  );
}
