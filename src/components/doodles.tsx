/** Hand-drawn ink accents. All stroke in currentColor so they follow the theme. */

export function SquiggleUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 9"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 6C18 2 34 8 52 5C70 2 88 8 118 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowDownDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 44"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2c-4.5 8.5 5 12.5 1 21-1.8 3.8-.6 7-1 12" />
      <path d="M6.5 32.5 12 41l5.5-8.5" />
    </svg>
  );
}

export function AxesDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 72"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 6v58M6 10l4-5 4 5" />
      <path d="M6 64h84M86 60l5 4-5 4" />
      <path d="M18 14c12 46 48 46 64 2" />
      <path d="M30 64v3M50 64v3M70 64v3M10 44h-3M10 26h-3" opacity="0.7" />
    </svg>
  );
}

export function ShieldDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M32 6c8 5 16 5 21 4-1 14-2 30-21 40C13 40 12 24 11 10c5 1 13 1 21-4Z" />
      <path d="M24 30l6 7 11-14" />
    </svg>
  );
}

export function StarDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z"
        fill="currentColor"
      />
    </svg>
  );
}
