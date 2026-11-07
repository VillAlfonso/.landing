"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { SquiggleUnderline, StarDoodle } from "./doodles";

const LINKS = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/credentials", label: "credentials" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-0 top-0 z-30 mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-5 pb-4 pt-6 sm:flex-row sm:items-center sm:pt-9 md:px-10">
      <Link
        href="/"
        className="group inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold lowercase tracking-tight"
      >
        <StarDoodle className="h-3 w-3 text-ink/70 transition-transform duration-300 group-hover:rotate-90" />
        Quert Alfonso M. Villafuerte
      </Link>

      <div className="flex w-full items-center justify-between gap-4 sm:w-auto md:gap-7">
        <nav className="flex items-center gap-3.5 md:gap-6">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative pb-1 text-[12px] lowercase transition-colors ${
                  active ? "text-ink" : "text-ink/50 hover:text-ink"
                }`}
              >
                {link.label}
                {active && (
                  <SquiggleUnderline className="absolute -bottom-0.5 left-0 h-[5px] w-full text-ink/70" />
                )}
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
