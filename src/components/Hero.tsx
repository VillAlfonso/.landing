"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { profile } from "@/data/profile";
import { stack } from "@/data/stack";
import StackIcon from "./StackIcon";
import StickerPortrait from "./StickerPortrait";
import Scribble from "./Scribble";
import { ArrowDownDoodle, AxesDoodle } from "./doodles";

/**
 * Zero-gravity banner. Each stack logo gets a slot: position (% of hero),
 * size (px), depth (0–1, closer = bigger/darker/faster parallax), spin
 * factor and idle-drift duration. Slots beyond the stack length are spares —
 * new stack entries pick up the next free slot automatically.
 */
type Slot = {
  x: number;
  y: number;
  s: number;
  d: number;
  r: number;
  dur: number;
};

const LOGO_SLOTS: Slot[] = [
  { x: 56, y: 7, s: 54, d: 0.95, r: 1.2, dur: 7.5 },
  { x: 12, y: 15, s: 46, d: 0.6, r: -0.9, dur: 8.5 },
  { x: 86, y: 38, s: 64, d: 1.0, r: 0.7, dur: 6.5 },
  { x: 30, y: 7, s: 36, d: 0.45, r: -1.4, dur: 9.1 },
  { x: 49, y: 34, s: 34, d: 0.4, r: 1.6, dur: 8.2 },
  { x: 5, y: 44, s: 52, d: 0.8, r: -0.6, dur: 7.1 },
  { x: 65, y: 54, s: 48, d: 0.7, r: 1.0, dur: 9.4 },
  // spares — used automatically as the stack grows
  { x: 90, y: 8, s: 30, d: 0.3, r: 1.3, dur: 7.8 },
  { x: 22, y: 33, s: 32, d: 0.5, r: -0.8, dur: 8.8 },
  { x: 48, y: 55, s: 30, d: 0.35, r: -1.1, dur: 8.4 },
  { x: 76, y: 74, s: 38, d: 0.55, r: 0.9, dur: 7.3 },
  { x: 8, y: 72, s: 32, d: 0.4, r: -1.2, dur: 9.6 },
];

const GLYPHS = [
  { ch: "∑", x: 34, y: 56, size: 26, d: 0.3, r: 0.5, rot: -10, dur: 9 },
  { ch: "π", x: 93, y: 64, size: 30, d: 0.35, r: -0.4, rot: 8, dur: 8 },
  { ch: "∫", x: 3, y: 30, size: 34, d: 0.25, r: 0.4, rot: -6, dur: 10 },
  { ch: "√2", x: 60, y: 34, size: 20, d: 0.2, r: -0.5, rot: 12, dur: 9.5 },
];

function FieldItem({
  slot,
  i,
  p,
  reduce,
  hover = true,
  children,
}: {
  slot: Slot;
  i: number;
  p: MotionValue<number>;
  reduce: boolean;
  hover?: boolean;
  children: ReactNode;
}) {
  const start = Math.min(i * 0.02, 0.2);
  const end = Math.min(0.42 + i * 0.05, 0.85);
  const opacity = useTransform(p, [start, end], [1, 0]);
  const scale = useTransform(p, [start, end], [1, 0.15]);
  const rotate = useTransform(p, [start, end], [0, 320 * slot.r]);
  const y = useTransform(p, [0, 1], [0, -170 * slot.d]);

  if (reduce) {
    return (
      <div
        className="absolute"
        style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{ left: `${slot.x}%`, top: `${slot.y}%`, opacity, scale, rotate, y }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 13,
          mass: 0.9,
          delay: 0.2 + i * 0.07,
        }}
        whileHover={hover ? { scale: 1.15, rotate: 8 } : undefined}
      >
        <div
          className="bob"
          style={
            {
              "--bob-dur": `${slot.dur}s`,
              "--bob-delay": `${-(i * 1.7) % 6}s`,
            } as CSSProperties
          }
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // the spring is what makes the exit poppy — it overshoots a little
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 22, mass: 0.8 });

  const titleY = useTransform(p, [0, 1], [0, 110]);
  const titleOpacity = useTransform(p, [0, 0.6, 0.92], [1, 1, 0]);
  const cueOpacity = useTransform(p, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px]">
      {/* floating monochrome logo field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {stack.map((item, i) => {
          const slot = LOGO_SLOTS[i % LOGO_SLOTS.length];
          return (
            <FieldItem key={item.id} slot={slot} i={i} p={p} reduce={reduce}>
              <div
                className="pointer-events-auto text-ink"
                style={{
                  width: slot.s,
                  height: slot.s,
                  opacity: 0.3 + slot.d * 0.7,
                  filter: slot.d < 0.5 ? "blur(0.6px)" : undefined,
                }}
              >
                <StackIcon id={item.id} className="h-full w-full" />
              </div>
            </FieldItem>
          );
        })}
        {GLYPHS.map((g, gi) => (
          <FieldItem
            key={g.ch}
            slot={{ x: g.x, y: g.y, s: g.size, d: g.d, r: g.r, dur: g.dur }}
            i={stack.length + gi}
            p={p}
            reduce={reduce}
            hover={false}
          >
            <span
              className="block font-hand text-ink"
              style={{
                fontSize: g.size,
                opacity: 0.16,
                transform: `rotate(${g.rot}deg)`,
              }}
            >
              {g.ch}
            </span>
          </FieldItem>
        ))}
      </div>

      {/* the portrait — taped to the sheet, deliberately not floating */}
      <motion.div
        className="absolute left-[64%] top-[12%] z-10 sm:left-[68%]"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      >
        <StickerPortrait className="w-28 rotate-3 sm:w-36 md:w-44" />
      </motion.div>

      {/* faint margin noise — not meant to be noticed */}
      <Scribble className="right-[7%] top-[68%] hidden -rotate-6 text-[19px] opacity-[0.11] md:block">
        b. 2004
      </Scribble>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[26%] top-[40%] hidden -rotate-3 opacity-[0.07] lg:block"
      >
        <AxesDoodle className="h-24 w-32 text-ink" />
      </div>

      {/* name */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <motion.div
          style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
          className="mx-auto w-full max-w-6xl px-5 pb-12 md:px-10 md:pb-14"
        >
          <p className="mb-3 ml-1 -rotate-2 font-hand text-2xl text-ink/60 md:text-3xl">
            hi, i'm
          </p>
          <h1 className="font-display text-[clamp(4rem,15vw,11.5rem)] uppercase leading-[0.84] tracking-[0.01em]">
            {profile.name}
          </h1>
          <p className="mt-4 text-[13px] leading-relaxed text-ink/60 md:text-sm">
            {profile.tagline} — portfolio no.01
            <span className="mx-3 hidden h-px w-8 bg-ink/25 align-middle sm:inline-block" />
            <span className="mt-1 flex items-center gap-2 text-ink/80 sm:mt-0 sm:inline-flex">
              <span className="inline-block h-[7px] w-[7px] rounded-full bg-ink" />
              {profile.status}
            </span>
          </p>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={reduce ? undefined : { opacity: cueOpacity }}
        className="absolute bottom-6 right-5 z-10 hidden flex-col items-center gap-0.5 text-ink/50 sm:flex md:right-10"
      >
        <span className="-rotate-6 font-hand text-lg">scroll</span>
        <ArrowDownDoodle className="h-9 w-5" />
      </motion.div>
    </section>
  );
}
