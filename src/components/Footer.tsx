export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto mt-16 w-full max-w-6xl px-5 pb-10 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-ink/10 pt-5 text-[11px] text-ink/45">
        <span>© 2026 Quert Alfonso M. Villafuerte</span>
        <span className="-rotate-2 font-hand text-[15px] text-ink/35">
          thanks for scrolling :)
        </span>
        <span className="hidden sm:inline">ink, grid paper & react</span>
        <a href="#top" className="transition-colors hover:text-ink">
          ↑ top
        </a>
      </div>
    </footer>
  );
}
