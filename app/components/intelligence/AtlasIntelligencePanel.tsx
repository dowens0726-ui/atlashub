import type { ReactNode } from "react";

export type AtlasIntelligencePanelTone =
  | "cyan"
  | "emerald"
  | "violet"
  | "amber"
  | "red"
  | "zinc";

type AtlasIntelligencePanelProps = {
  eyebrow: string;
  title?: string;
  children: ReactNode;
  tone?: AtlasIntelligencePanelTone;
  className?: string;
};

const toneClasses: Record<
  AtlasIntelligencePanelTone,
  string
> = {
  cyan:
    "border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-300",
  emerald:
    "border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-300",
  violet:
    "border-violet-400/20 bg-violet-400/[0.04] text-violet-300",
  amber:
    "border-amber-400/20 bg-amber-400/[0.04] text-amber-300",
  red:
    "border-red-400/20 bg-red-400/[0.04] text-red-300",
  zinc:
    "border-zinc-700 bg-zinc-900/50 text-zinc-300",
};

export default function AtlasIntelligencePanel({
  eyebrow,
  title,
  children,
  tone = "cyan",
  className = "",
}: AtlasIntelligencePanelProps) {
  return (
    <div
      className={`rounded-2xl border p-5 ${toneClasses[tone]} ${className}`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.25em]">
        {eyebrow}
      </p>

      {title ? (
        <h3 className="mt-2 text-xl font-black text-white">
          {title}
        </h3>
      ) : null}

      <div className={title ? "mt-4" : "mt-3"}>
        {children}
      </div>
    </div>
  );
}