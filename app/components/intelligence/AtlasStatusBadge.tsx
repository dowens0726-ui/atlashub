import type { ReactNode } from "react";

export type AtlasStatusBadgeTone =
  | "cyan"
  | "emerald"
  | "violet"
  | "amber"
  | "red"
  | "zinc";

type AtlasStatusBadgeProps = {
  children: ReactNode;
  tone?: AtlasStatusBadgeTone;
  indicator?: boolean;
};

const toneClasses: Record<AtlasStatusBadgeTone, string> = {
  cyan:
    "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-300",
  emerald:
    "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300",
  violet:
    "border-violet-400/20 bg-violet-400/[0.06] text-violet-300",
  amber:
    "border-amber-400/20 bg-amber-400/[0.06] text-amber-300",
  red:
    "border-red-400/20 bg-red-400/[0.06] text-red-300",
  zinc:
    "border-zinc-700 bg-zinc-900/60 text-zinc-300",
};

const indicatorClasses: Record<AtlasStatusBadgeTone, string> = {
  cyan: "bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]",
  emerald:
    "bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]",
  violet:
    "bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.9)]",
  amber:
    "bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]",
  red:
    "bg-red-300 shadow-[0_0_10px_rgba(252,165,165,0.9)]",
  zinc: "bg-zinc-400",
};

export default function AtlasStatusBadge({
  children,
  tone = "cyan",
  indicator = true,
}: AtlasStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] ${toneClasses[tone]}`}
    >
      {indicator && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${indicatorClasses[tone]}`}
        />
      )}

      {children}
    </span>
  );
}