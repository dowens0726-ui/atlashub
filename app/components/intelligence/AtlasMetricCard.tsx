export type AtlasMetricCardTone =
  | "cyan"
  | "emerald"
  | "violet"
  | "amber"
  | "red"
  | "zinc";

type AtlasMetricCardProps = {
  label: string;
  value: string;
  detail?: string;
  tone?: AtlasMetricCardTone;
  className?: string;
};

const toneClasses: Record<
  AtlasMetricCardTone,
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

export default function AtlasMetricCard({
  label,
  value,
  detail,
  tone = "cyan",
  className = "",
}: AtlasMetricCardProps) {
  return (
    <div
      className={`min-w-0 rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 ${toneClasses[tone]} ${className}`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 break-words text-xl font-black text-white">
        {value}
      </p>

      {detail ? (
        <p className="mt-1 text-xs font-bold">
          {detail}
        </p>
      ) : null}
    </div>
  );
}