import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ProjectRow from "@/components/ProjectRow";
import { SquiggleUnderline } from "@/components/doodles";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      <Hero />

      <section className="relative z-10 mx-auto mt-6 w-full max-w-6xl px-5 md:px-10">
        <Reveal>
          <SectionHeader title="featured work" note="the good stuff" />
        </Reveal>
        <Reveal delay={0.05}>
          <div>
            {featured.map((p, i) => (
              <ProjectRow key={p.slug} project={p} index={i} />
            ))}
            <div className="border-t border-ink/10" />
          </div>
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
