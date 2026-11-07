import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import FeaturedProject from "@/components/FeaturedProject";
import { SquiggleUnderline } from "@/components/doodles";
import { profile } from "@/data/profile";
import { achievements } from "@/data/credentials";

export default function Home() {

  return (
    <div>
      <Hero />

      <section className="relative z-10 mx-auto mb-20 w-full max-w-6xl px-5 md:px-10">
        <Reveal>
          <SectionHeader title="about the work" note="still curious" />
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4 text-[13px] leading-relaxed text-ink/70">
              <h3 className="font-display text-2xl uppercase text-ink">{profile.aboutTitle}</h3>
              <p>{profile.about}</p>
              <p>{profile.experiments}</p>
            </div>
            <div>
              {achievements.map((item) => (
                <Link key={item.title} href="/credentials" className="block border-t border-ink/15 py-4 transition-colors hover:text-ink">
                  <p className="text-[11px] text-ink/45">{item.date} · {item.issuer}</p>
                  <h3 className="mt-2 font-display text-xl uppercase">{item.title} ↗</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink/60">{item.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative z-10 mx-auto mt-6 w-full max-w-6xl px-5 md:px-10">
        <Reveal>
          <SectionHeader title="featured work" note="the good stuff" />
        </Reveal>
        <Reveal delay={0.05}>
          <FeaturedProject />
        </Reveal>
        <Reveal>
          <Link
            href="/projects"
            className="mt-7 inline-block text-[13px] text-ink/60 transition-colors hover:text-ink"
          >
            all projects →
          </Link>
        </Reveal>
      </section>

      <section className="relative z-10 mx-auto mt-24 w-full max-w-6xl px-5 md:px-10">
        <Reveal className="relative">
          <p className="-rotate-1 font-hand text-xl text-ink/50">
            got something weird to build?
          </p>
          <Link
            href="/contact"
            className="group relative mt-2 inline-block font-display text-4xl uppercase md:text-6xl"
          >
            say hi
            <span
              aria-hidden="true"
              className="ml-3 inline-block transition-transform duration-200 group-hover:translate-x-2"
            >
              →
            </span>
            <SquiggleUnderline className="absolute -bottom-2 left-0 h-[8px] w-full text-ink/50" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
