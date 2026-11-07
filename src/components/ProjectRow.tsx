import type { Project } from "@/data/projects";
import Link from "next/link";
import TechChip from "./TechChip";
import { SquiggleUnderline } from "./doodles";

export default function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const inner = (
    <article className="group grid grid-cols-[40px_1fr] gap-4 border-t border-ink/10 py-7 md:grid-cols-[64px_1fr_auto] md:gap-6">
      <div className="pt-1 font-hand text-xl text-ink/30">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="relative inline-block font-display text-xl uppercase tracking-wide md:text-2xl">
            {project.title}
            <SquiggleUnderline className="absolute -bottom-1.5 left-0 h-[6px] w-full text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-60" />
          </h3>
          <span className="text-[11px] text-ink/40 md:hidden">
            {project.year}
          </span>
          {project.sample && (
            <span className="font-hand text-sm text-ink/35">
              (sample — replace me)
            </span>
          )}
          {project.privateSource && (
            <span className="text-[10px] uppercase tracking-wider text-ink/45">
              private source
            </span>
          )}
        </div>
        <p className="mt-2.5 max-w-[54ch] text-[13px] leading-relaxed text-ink/60">
          {project.description}
        </p>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <TechChip key={t} id={t} />
          ))}
        </div>
      </div>

      <div className="hidden flex-col items-end justify-between md:flex">
        <span className="text-[12px] text-ink/40">{project.year}</span>
        {project.href ? (
          <span
            aria-hidden="true"
            className="text-lg text-ink/70 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            ↗
          </span>
        ) : null}
      </div>
    </article>
  );

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block"
      aria-label={`${project.title} — open project`}
    >
      {inner}
    </Link>
  );
}
