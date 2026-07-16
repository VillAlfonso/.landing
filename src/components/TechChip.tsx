import { stack } from "@/data/stack";
import StackIcon from "./StackIcon";

export default function TechChip({ id }: { id: string }) {
  const item = stack.find((s) => s.id === id);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-ink/20 px-2 py-[4px] text-[10.5px] lowercase leading-none text-ink/70">
      <StackIcon id={id} className="h-3 w-3" />
      {item ? item.name.toLowerCase() : id}
    </span>
  );
}
