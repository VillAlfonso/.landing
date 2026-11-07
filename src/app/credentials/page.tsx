import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import Scribble from "@/components/Scribble";
import StackIcon from "@/components/StackIcon";
import { ShieldDoodle } from "@/components/doodles";
import { education, badges, achievements } from "@/data/credentials";
import { profile } from "@/data/profile";
import { stack } from "@/data/stack";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "credentials — Quert Alfonso M. Villafuerte",
};

function SubHeader({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3">
      <h3 className="font-display text-xl uppercase tracking-wide md:text-2xl">
        {title}
      </h3>
      {note && (
        <span className="-rotate-1 font-hand text-base text-ink/40">{note}</span>
      )}
    </div>
  );
}

export default function CredentialsPage() {
  // toolbox = the declared stack + anything a project used that isn't in it yet
  const extraTech = Array.from(new Set(projects.flatMap((p) => p.tech))).filter(
    (t) => !stack.some((s) => s.id === t)
  );

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-24 md:px-10 md:pt-28">
      <Scribble className="right-[8%] top-[120px] hidden -rotate-3 text-lg opacity-[0.09] lg:block">
        b. 2004 — everything after that is on this page
      </Scribble>

      <Link href="/" className="mb-7 inline-block text-[12px] text-ink/60 hover:text-ink">← back to home</Link>
      <Reveal>
        <SectionHeader title="credentials" note="receipts, in order" />
      </Reveal>

      <Reveal delay={0.05} className="mt-14">
        <SubHeader title="certification & competition" note="recent milestones" />
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <article key={item.title} className="rounded-lg border border-ink/15 p-6">
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.title} redacted PDF (new tab)`}
                className="group mb-5 block rounded-md border border-ink/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.preview}
                  alt={`${item.title} certificate preview, sensitive details redacted`}
                  loading="lazy"
                  className="h-64 w-full rounded-t-md bg-white object-contain p-3"
                />
                <span className="flex items-center justify-between gap-2 border-t border-ink/15 px-3 py-3 text-[11px] group-hover:underline">
                  <span>open certificate PDF ↗</span>
                  <span className="text-ink/50">redacted copy</span>
                </span>
              </a>
              <p className="text-[11px] text-ink/45">{item.date} · {item.issuer}</p>
              <h3 className="mt-3 font-display text-xl uppercase tracking-wide">{item.title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-ink/70">{item.summary}</p>
              <p className="mt-4 text-[11px] text-ink/50">{item.note}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <SubHeader title="education" />
        <div className="mt-5">
          {education.map((e) => (
            <div
              key={e.school + e.years}
              className="grid grid-cols-1 gap-1 border-t border-ink/10 py-6 sm:grid-cols-[140px_1fr] sm:gap-6"
            >
              <div className="pt-1 text-[12px] text-ink/40">{e.years}</div>
              <div>
                <div className="font-display text-lg uppercase tracking-wide md:text-xl">
                  {e.school}
                </div>
                <div className="mt-1 text-[13px] text-ink/70">{e.program}</div>
                {e.note && (
                  <div className="mt-1.5 text-[12px] text-ink/45">{e.note}</div>
                )}
              </div>
            </div>
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <SubHeader title="badges" note="credly, mostly" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {badges.map((b) => {
            const card = (
              <div className="flex h-full flex-col items-center gap-3 rounded-lg border border-ink/15 p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_6px_0_rgba(23,21,15,0.08)]">
                {b.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={b.image}
                    alt=""
                    className="h-20 w-20 object-contain"
                  />
                ) : (
                  <ShieldDoodle className="h-16 w-16 text-ink/30" />
                )}
                <div>
                  <div className="text-[12px] font-medium leading-snug">
                    {b.name}
                  </div>
                  <div className="mt-1 text-[10.5px] text-ink/45">
                    {b.issuer}
                  </div>
                </div>
                {!b.image && (
                  <span className="font-hand text-[13px] leading-tight text-ink/30">
                    placeholder — paste your credly badge
                  </span>
                )}
              </div>
            );
            return b.href ? (
              <a
                key={b.name}
                href={b.href}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                {card}
              </a>
            ) : (
              <div key={b.name}>{card}</div>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <SubHeader title="toolbox" note="auto-updates as projects land" />
        <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-ink/65">{profile.experiments}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-2 rounded-[5px] border border-ink/20 px-3 py-2 text-[12px] lowercase text-ink/75"
            >
              <StackIcon id={s.id} className="h-4 w-4" />
              {s.name.toLowerCase()}
            </span>
          ))}
          {extraTech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 rounded-[5px] border border-ink/20 px-3 py-2 text-[12px] lowercase text-ink/75"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
