"use client";

import { useEffect, useRef, useState } from "react";

export type ShowcaseMedia = {
  type: string;
  src: string;
  poster?: string;
  caption: string;
  role?: string;
};

export default function ProjectGallery({ media, title }: { media: ShowcaseMedia[]; title: string }) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<ShowcaseMedia | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const ordered = [...media].sort((a, b) => Number(b.role === "hero") - Number(a.role === "hero"));
  const visible = expanded ? ordered : ordered.slice(0, 4);

  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { modal?.close(); document.body.style.overflow = previous; };
  }, [selected]);

  return (
    <section className="mt-12" aria-label={`${title} screenshots and demos`}>
      <div className="mb-5 flex flex-wrap items-baseline gap-3">
        <h2 className="font-display text-2xl uppercase">inside the project</h2>
        <p className="text-[11px] text-ink/45">{media.length} captures · click an image to enlarge</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((item, i) => (
          <figure key={item.src} className={`overflow-hidden rounded-lg border border-ink/20 ${i === 0 ? "md:col-span-2" : ""}`}>
            {item.type === "video" ? (
              <video controls playsInline preload="none" poster={item.poster} aria-label={item.caption} className="aspect-[8/5] w-full bg-black object-contain">
                <source src={item.src} type="video/mp4" />
                <a href={item.src}>Open demo video</a>
              </video>
            ) : (
              <button type="button" onClick={() => setSelected(item)} aria-label={`Enlarge: ${item.caption}`} className="block w-full cursor-zoom-in bg-ink/5 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.caption} loading="lazy" className="aspect-[8/5] w-full object-contain" />
              </button>
            )}
            <figcaption className="border-t border-ink/15 px-4 py-4 text-[11px] leading-5 text-ink/65">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
      {media.length > 4 && <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} className="mt-5 rounded border border-ink/25 px-4 py-3 text-[12px] hover:bg-ink/5">{expanded ? "show fewer captures ↑" : `show all ${media.length} captures ↓`}</button>}
      <dialog ref={dialog} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-label="Enlarged project screenshot" className="fixed inset-0 m-auto max-h-[94svh] w-[96vw] max-w-6xl overflow-auto rounded-lg border border-ink/25 bg-paper p-0 text-ink backdrop:bg-black/80">
        {selected && <div>
          <div className="flex items-center justify-between gap-4 border-b border-ink/15 p-4 text-[12px]">
            <a href={selected.src} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">open full image ↗</a>
            <button type="button" autoFocus onClick={() => dialog.current?.close()} className="rounded border border-ink/25 px-3 py-2">close ×</button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={selected.src} alt={selected.caption} className="max-h-[72svh] w-full object-contain" />
          <p className="border-t border-ink/15 p-4 text-[12px] leading-6 text-ink/70">{selected.caption}</p>
        </div>}
      </dialog>
    </section>
  );
}
