/** Spiral-binding holes along the top edge of the sheet. Scrolls away with the page. */
export default function BindingStrip() {
  const holes = Array.from({ length: 40 });
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[10px] z-10 flex justify-center gap-[17px] overflow-hidden opacity-70"
    >
      {holes.map((_, i) => (
        <span
          key={i}
          className="relative block h-[9px] w-[9px] shrink-0 rounded-full border border-ink/25 bg-paper"
        >
          <span className="absolute left-1/2 top-[-9px] h-[8px] w-px -translate-x-1/2 bg-ink/20" />
        </span>
      ))}
    </div>
  );
}
