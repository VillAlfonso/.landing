"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
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
 * Zero-gravity banner around a centered identity block. Each stack logo gets
 * a slot: position (% of hero), size (px), depth (0–1: closer = bigger,
 * more opaque, faster parallax), spin factor and idle-drift duration.
 * Slots ring the center — keep x 32–68 / y 20–80 clear for the name & portrait.
 * Slots beyond the stack length are spares; new stack entries pick up the
 * next free slot automatically.
 */
type Slot = {
  x: number;
  y: number;
  s: number;
  d: number;
  r: number;
  dur: number;
  /** optional y override on small screens, to clear the centered text band */
  sy?: number;
};

const LOGO_SLOTS: Slot[] = [
  { x: 74, y: 12, s: 78, d: 0.95, r: 1.2, dur: 7.5 },
  { x: 12, y: 16, s: 64, d: 0.6, r: -0.9, dur: 8.5 },
  { x: 84, y: 56, s: 92, d: 1.0, r: 0.7, dur: 6.5, sy: 72 },
  { x: 20, y: 68, s: 56, d: 0.45, r: -1.4, dur: 9.1 },
  { x: 6, y: 40, s: 52, d: 0.4, r: 1.6, dur: 8.2 },
  { x: 88, y: 32, s: 76, d: 0.8, r: -0.6, dur: 7.1 },
  { x: 15, y: 85, s: 72, d: 0.7, r: 1.0, dur: 9.4 },
  { x: 77, y: 79, s: 60, d: 0.55, r: 1.3, dur: 7.8, sy: 88 },
  { x: 4, y: 60, s: 48, d: 0.5, r: -0.8, dur: 8.8, sy: 74 },
  { x: 90, y: 7, s: 44, d: 0.35, r: -1.1, dur: 8.4 },
  // spares — used automatically as the stack grows
  { x: 66, y: 90, s: 46, d: 0.55, r: 0.9, dur: 7.3 },
  { x: 30, y: 6, s: 48, d: 0.4, r: -1.2, dur: 9.6 },
];

const GLYPHS = [
  { ch: "∑", x: 26, y: 30, size: 26, d: 0.3, r: 0.5, rot: -10, dur: 9 },
  { ch: "π", x: 94, y: 72, size: 30, d: 0.35, r: -0.4, rot: 8, dur: 8 },
  { ch: "∫", x: 3, y: 20, size: 34, d: 0.25, r: 0.4, rot: -6, dur: 10 },
  { ch: "√2", x: 69, y: 66, size: 20, d: 0.2, r: -0.5, rot: 12, dur: 9.5 },
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
  const [small, setSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = () => setSmall(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // the spring is what makes the exit poppy — it overshoots a little
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 22, mass: 0.8 });

  const titleY = useTransform(p, [0, 1], [0, 120]);
  const titleOpacity = useTransform(p, [0, 0.55, 0.9], [1, 1, 0]);
  const cueOpacity = useTransform(p, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px]">
      {/* floating brand-colored logo field — the only color on the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {stack.map((item, i) => {
          const base = LOGO_SLOTS[i % LOGO_SLOTS.length];
          const slot =
            small && base.sy !== undefined ? { ...base, y: base.sy } : base;
          return (
            <FieldItem key={item.id} slot={slot} i={i} p={p} reduce={reduce}>
              <div
                className="pointer-events-auto aspect-square"
                style={{
                  width: `min(${slot.s}px, ${Math.round(slot.s * 0.62)}px + 2.6vw)`,
                  opacity: 0.45 + slot.d * 0.55,
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

      {/* faint margin noise — not meant to be noticed */}
      <Scribble className="right-[5%] top-[76%] hidden -rotate-6 text-[19px] opacity-[0.11] md:block">
        b. 2004
      </Scribble>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[11%] top-[27%] hidden -rotate-3 opacity-[0.07] lg:block"
      >
        <AxesDoodle className="h-24 w-32 text-ink" />
      </div>

      {/* centered identity block: the profile pic is just the profile pic */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
          className="flex flex-col items-center px-5 text-center"
        >
          <StickerPortrait className="w-32 -rotate-2 sm:w-40 md:w-44" />
          <p className="mt-7 -rotate-2 font-hand text-2xl text-ink/60 md:text-3xl">
            hi, i'm
          </p>
          <h1 className="mt-1 font-display text-[clamp(3.4rem,12.5vw,10rem)] uppercase leading-[0.9] tracking-[0.01em]">
            {profile.name}
          </h1>
          <p className="mt-4 text-[13px] leading-relaxed text-ink/60 md:text-sm">
            {profile.tagline} — portfolio no.01
          </p>
          <p className="mt-2 flex items-center gap-2 text-[13px] text-ink/80 md:text-sm">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-ink" />
            {profile.status}
          </p>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={reduce ? undefined : { opacity: cueOpacity }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-0.5 text-ink/50 sm:flex"
      >
        <span className="-rotate-6 font-hand text-lg">scroll</span>
        <ArrowDownDoodle className="h-9 w-5" />
      </motion.div>
    </section>
  );
}
