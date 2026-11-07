import { stack } from "@/data/stack";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import StackIcon from "@/components/StackIcon";

export default function Toolbox() {
  const extra = Array.from(new Set(projects.flatMap(p => p.tech))).filter(t => !stack.some(s => s.id === t));
  return <section className="mt-20" aria-labelledby="toolbox-heading">
    <h2 id="toolbox-heading" className="font-display text-2xl uppercase">toolbox</h2>
    <p className="mt-3 text-[12px] leading-6 text-ink/50">Tools used across these projects, including the original C# games and their browser recreations.</p>
    <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-ink/65">{profile.experiments}</p>
    <div className="mt-6 flex flex-wrap gap-2">
      {[...stack.map(s => ({ id: s.id, name: s.name })), ...extra.map(t => ({ id: t, name: t }))].map(t => <span key={t.id} className="inline-flex items-center gap-2 rounded-[5px] border border-ink/20 px-3 py-2 text-[12px] lowercase text-ink/75"><StackIcon id={t.id} className="h-4 w-4" />{t.name.toLowerCase()}</span>)}
    </div>
  </section>;
}
