import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Scribble from "@/components/Scribble";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "contact — reblobler" };

export default function ContactPage() {
  const socials = profile.socials.filter((s) => s.href);

  return (
    <div className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-6xl flex-col justify-center px-5 pb-10 pt-24 md:px-10">
      <Scribble className="right-[12%] top-[22%] hidden rotate-3 text-xl opacity-[0.09] md:block">
        no spam pls
      </Scribble>

      <Reveal>
        <p className="-rotate-2 font-hand text-2xl text-ink/50">
          don't be a stranger
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="group mt-3 block w-fit font-display text-[clamp(3rem,10vw,7.5rem)] uppercase leading-[0.9]"
        >
          say hi
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:-translate-y-2 group-hover:translate-x-2"
          >
            ↗
          </span>
        </a>
        <p className="mt-5 text-[13px] text-ink/60 md:text-sm">
          {profile.email}
        </p>
      </Reveal>

      {socials.length > 0 && (
        <Reveal className="mt-14 max-w-md">
          <div>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-t border-ink/10 py-3.5 text-[13px] lowercase last:border-b"
              >
                {s.label}
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal className="mt-14">
        <p className="text-[12px] text-ink/50">
          status: {profile.status} · based: {profile.location}
        </p>
      </Reveal>
    </div>
  );
}
