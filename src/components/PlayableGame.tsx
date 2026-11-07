"use client";

import { useState } from "react";

export default function PlayableGame({ slug, title }: { slug: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const url = `/games/${slug}/index.html`;
  return <section id="play" className="mt-12 scroll-mt-24 rounded-lg border border-ink/20 p-4 md:p-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h2 className="font-display text-2xl uppercase">play in your browser</h2>
      <a href={url} className="text-[12px] underline underline-offset-4">open full page ↗</a>
    </div>
    <p className="mt-3 text-[12px] leading-6 text-ink/65">A browser recreation of the original C# game. Keyboard and touch controls included. Click inside the game to use its keyboard controls.</p>
    {playing ? <>
      <iframe src={url} title={`Play ${title}`} className="mt-5 h-[850px] w-full rounded border border-ink/20 bg-[#171717]" />
      <button onClick={() => setPlaying(false)} className="mt-4 text-[12px] underline underline-offset-4">close game / reset</button>
    </> : <button onClick={() => setPlaying(true)} className="mt-5 rounded border border-ink/30 px-6 py-4 text-sm hover:bg-ink/5">▶ launch {title}</button>}
  </section>;
}
