import Link from "next/link";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/SectionHeader";
import showcaseMedia from "@/data/showcaseMedia.json";

export default function GameProjects() {
  return <section className="relative z-10 mx-auto mt-20 w-full max-w-6xl px-5 md:px-10">
    <SectionHeader title="play something I made" note="from C# to your browser" />
    <div className="grid gap-6 md:grid-cols-2">
      {projects.filter(p => p.playable).map(p => {
        const media = (showcaseMedia as Record<string, { src: string; caption: string; role: string }[]>)[p.slug]?.find(m => m.role === "hero");
        return <article key={p.slug} className="overflow-hidden rounded-lg border border-ink/20">
          <Link href={`/projects/${p.slug}`} className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {media && <img src={media.src} alt={media.caption} className="aspect-[16/10] w-full border-b border-ink/15 bg-[#171717] object-contain" loading="lazy" />}
            <div className="p-6"><p className="text-[11px] text-ink/45">{p.year} · playable browser recreation</p><h3 className="mt-3 break-words font-display text-2xl uppercase">{p.title}</h3><p className="mt-3 text-[12px] leading-6 text-ink/65">{p.description}</p><p className="mt-5 text-[12px]">project, screenshots & play →</p></div>
          </Link>
        </article>;
      })}
    </div>
  </section>;
}
