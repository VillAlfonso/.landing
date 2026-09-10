import Image from "next/image";

/**
 * The profile doodle as a die-cut sticker taped onto the sheet.
 * Deliberately stays paper-white in dark mode — it's a sticker, not a div.
 */
export default function StickerPortrait({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-3 rounded-[2px] bg-[var(--tape)]"
      />
      <div className="rounded-[24px] border-[3px] border-[#17150f] bg-white p-2 shadow-[7px_9px_0_rgba(23,21,15,0.13)] dark:shadow-[7px_9px_0_rgba(0,0,0,0.5)]">
        <Image
          src="/reblobler.png"
          alt="Quert Alfonso M. Villafuerte — a hand-drawn blob person with a lot of hair"
          width={636}
          height={506}
          priority
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
