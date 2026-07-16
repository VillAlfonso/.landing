import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ProjectRow from "@/components/ProjectRow";
import Scribble from "@/components/Scribble";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "projects — reblobler" };

export default function ProjectsPage() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-24 md:px-10 md:pt-28">
      <Scribble className="right-[10%] top-[70px] hidden rotate-3 text-lg opacity-[0.09] md:block">
        ship early, doodle often
      </Scribble>

      <Reveal>
        <SectionHeader
          title="projects"
          note={`${projects.length} and counting`}
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </Reveal>
    </div>
  );
}
