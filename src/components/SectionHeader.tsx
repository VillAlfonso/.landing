import { SquiggleUnderline } from "./doodles";

export default function SectionHeader({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end gap-x-4 gap-y-1">
      <h2 className="relative font-display text-3xl uppercase tracking-wide md:text-4xl">
        {title}
        <SquiggleUnderline className="absolute -bottom-2 left-0 h-[7px] w-full text-ink/60" />
      </h2>
      {note && (
        <span className="-rotate-2 pb-1 font-hand text-lg text-ink/40">
          {note}
        </span>
      )}
    </div>
  );
}
