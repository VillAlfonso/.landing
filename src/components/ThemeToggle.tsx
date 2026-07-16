"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "switch to light mode" : "switch to dark mode"}
      className="text-ink/60 transition-[color,transform] duration-300 hover:text-ink"
      style={{ transform: dark ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <svg viewBox="0 0 20 20" className="h-[17px] w-[17px]" aria-hidden="true">
        <circle
          cx="10"
          cy="10"
          r="7.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M10 2.5a7.5 7.5 0 0 0 0 15Z" fill="currentColor" />
      </svg>
    </button>
  );
}
