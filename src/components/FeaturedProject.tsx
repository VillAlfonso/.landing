import Link from "next/link";
import { projects } from "@/data/projects";
import TechChip from "./TechChip";

export default function FeaturedProject() {
  const project = projects.find((p) => p.featured)!;
  return (
    <Link href="/projects/aaaflow" className="group block overflow-hidden rounded-lg border border-ink/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
      <div className="relative border-b border-ink/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/showcase/media/aaaflow/06-preview-play.png" alt="AAAFlow Studio's video preview workspace, with storyboard, voiceover, editing, and publishing steps" className="aspect-[16/9] w-full object-cover object-top" loading="lazy" />
        <span className="absolute bottom-3 left-3 rounded border border-ink/20 bg-paper px-3 py-2 text-[10px] uppercase tracking-wider">inside the studio · app preview</span>
      </div>
      <div className="p-5 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-[11px] uppercase tracking-widest text-ink/45">featured project · {project.year}</p><h3 className="mt-2 font-display text-3xl uppercase md:text-5xl">{project.title}</h3></div>
          <span aria-hidden="true" className="text-3xl">↗</span>
        </div>
        <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-ink/65">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{project.tech.slice(0, 6).map((t) => <TechChip key={t} id={t} />)}</div>
        <p className="mt-6 text-[12px] underline decoration-ink/30 underline-offset-4 group-hover:decoration-ink">explore the project →</p>
      </div>
    </Link>
  );
}
