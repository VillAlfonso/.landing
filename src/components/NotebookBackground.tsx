"use client";

import { motion, useScroll, useTransform } from "motion/react";

/**
 * The sheet itself: a faint squared-paper grid with two mismatched
 * heavy-line cadences (vertical every 4 cells offset to cell 3,
 * horizontal every 5 cells) so the rhythm never feels symmetric.
 * Drifts a touch slower than the page for a quiet parallax.
 */
export default function NotebookBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * -0.06);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-32 -bottom-[60rem]">
        <svg className="h-full w-full">
          <defs>
            <pattern id="cells" width="26" height="26" patternUnits="userSpaceOnUse">
              <path
                d="M26 0H0V26"
                fill="none"
                stroke="var(--grid-line)"
                strokeWidth="1"
              />
            </pattern>
            <pattern id="rule-v" width="104" height="26" patternUnits="userSpaceOnUse">
              <path d="M78.5 0V26" stroke="var(--grid-strong)" strokeWidth="1" />
            </pattern>
            <pattern id="rule-h" width="26" height="130" patternUnits="userSpaceOnUse">
              <path d="M0 104.5H26" stroke="var(--grid-strong)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cells)" />
          <rect width="100%" height="100%" fill="url(#rule-v)" />
          <rect width="100%" height="100%" fill="url(#rule-h)" />
        </svg>
      </motion.div>
      {/* left margin rule, doubled like a stitched edge */}
      <div className="absolute inset-y-0 left-[38px] w-px bg-[var(--margin-line)] md:left-[64px]" />
      <div className="absolute inset-y-0 left-[42px] w-px bg-[var(--margin-line)] opacity-60 md:left-[68px]" />
    </div>
  );
}
