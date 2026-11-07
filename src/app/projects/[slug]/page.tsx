import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import TechChip from "@/components/TechChip";
import { projects } from "@/data/projects";
import { projectDetails } from "@/data/projectDetails";
import ProjectGallery, { type ShowcaseMedia } from "@/components/ProjectGallery";
import showcaseMedia from "@/data/showcaseMedia.json";
import PlayableGame from "@/components/PlayableGame";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.title} — Quert Alfonso M. Villafuerte` : "project not found", description: project?.description };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const detail = projectDetails[slug];
  if (!project || !detail) notFound();
  const source = detail.source ?? project.href;
  const media = (showcaseMedia as Record<string, ShowcaseMedia[]>)[slug] ?? [];
  const next = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 md:px-10 md:pt-36">
      <Link href="/projects" className="text-[12px] text-ink/60 hover:text-ink">← all projects</Link>
      <Reveal className="mt-10">
        <p className="text-[11px] uppercase tracking-widest text-ink/45">{detail.category} · {project.year}</p>
        <h1 className="mt-4 break-words font-display text-5xl uppercase leading-tight sm:text-7xl">{project.title}</h1>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-ink/70">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">{project.tech.map((t) => <TechChip key={t} id={t} />)}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.playable && <a href="#play" className="rounded border border-ink/25 px-4 py-3 text-[12px] hover:bg-ink/5">▶ play in browser</a>}
          {source && <a href={source} target="_blank" rel="noopener noreferrer" className="rounded border border-ink/25 px-4 py-3 text-[12px] hover:bg-ink/5">source on GitHub ↗</a>}
          <a href={`/showcase/index.html#/p/${slug}`} className="rounded border border-ink/25 px-4 py-3 text-[12px] hover:bg-ink/5">full media showcase →</a>
        </div>
      </Reveal>

      {project.playable && <PlayableGame slug={slug} title={project.title} />}
      {media.length > 0 && <ProjectGallery media={media} title={project.title} />}

      <Reveal className="mt-16 grid gap-6 border-t border-ink/15 pt-8 md:grid-cols-[220px_1fr]">
        <h2 className="font-display text-2xl uppercase">why I built it</h2>
        <p className="max-w-3xl text-[14px] leading-7 text-ink/70">{detail.purpose}</p>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-display text-2xl uppercase">what it does</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{detail.features.map((feature, i) => <section key={feature.title} className="rounded-lg border border-ink/15 p-6">
          <span className="font-hand text-2xl text-ink/35">0{i + 1}</span>
          <h3 className="mt-3 font-display text-xl uppercase">{feature.title}</h3>
          <p className="mt-3 text-[12px] leading-6 text-ink/65">{feature.body}</p>
        </section>)}</div>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-display text-2xl uppercase">the workflow</h2>
        <ol className="mt-6 grid gap-0 border-y border-ink/15 sm:grid-cols-2 lg:grid-cols-4">{detail.workflow.map((step, i) => <li key={step} className="flex gap-4 p-5">
          <span className="font-hand text-2xl text-ink/40">{i + 1}.</span><p className="text-[12px] leading-6 text-ink/70">{step}</p>
        </li>)}</ol>
      </Reveal>

      <Reveal className="mt-16 grid gap-10 md:grid-cols-2">
        <section><h2 className="font-display text-2xl uppercase">under the hood</h2><p className="mt-5 text-[13px] leading-7 text-ink/65">{detail.implementation}</p></section>
        <section><h2 className="font-display text-2xl uppercase">scope & current state</h2><p className="mt-5 text-[13px] leading-7 text-ink/65">{detail.scope}</p></section>
      </Reveal>

      <div className="mt-20 flex flex-wrap items-center justify-between gap-5 border-t border-ink/20 pt-7 text-[12px]">
        <Link href="/projects" className="text-ink/60 hover:text-ink">← all projects</Link>
        <Link href={`/projects/${next.slug}`} className="underline decoration-ink/30 underline-offset-4">next: {next.title} →</Link>
      </div>
    </div>
  );
}
