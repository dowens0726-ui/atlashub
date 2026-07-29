export type SignalBadgeTone =
  | "cyan"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "neutral";

type SignalBadgeProps = {
  label: string;
  value: string;
  detail?: string;
  tone?: SignalBadgeTone;
  active?: boolean;
};

const toneClasses: Record<
  SignalBadgeTone,
  string
> = {
  cyan:
    "border-cyan-300/15 bg-cyan-300/[0.045] text-cyan-200",
  emerald:
    "border-emerald-300/15 bg-emerald-300/[0.045] text-emerald-200",
  amber:
    "border-amber-300/15 bg-amber-300/[0.045] text-amber-200",
  rose:
    "border-rose-300/15 bg-rose-300/[0.045] text-rose-200",
  violet:
    "border-violet-300/15 bg-violet-300/[0.045] text-violet-200",
  neutral:
    "border-white/[0.07] bg-white/[0.025] text-zinc-300",
};

const dotClasses: Record<
  SignalBadgeTone,
  string
> = {
  cyan:
    "bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]",
  emerald:
    "bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]",
  amber:
    "bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.8)]",
  rose:
    "bg-rose-300 shadow-[0_0_10px_rgba(253,164,175,0.8)]",
  violet:
    "bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.8)]",
  neutral:
    "bg-zinc-500",
};

export default function SignalBadge({
  label,
  value,
  detail,
  tone = "neutral",
  active = true,
}: SignalBadgeProps) {
  return (
    <article
      className={[
        "relative min-w-0 overflow-hidden rounded-2xl border p-4",
        toneClasses[tone],
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.58rem] font-black uppercase tracking-[0.2em] text-zinc-500">
            {label}
          </p>

          <p className="mt-2 truncate text-sm font-black text-white">
            {value}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={[
            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
            active
              ? dotClasses[tone]
              : "bg-zinc-700",
          ].join(" ")}
        />
      </div>

      {detail ? (
        <p className="mt-2 text-xs leading-5 text-zinc-500">
          {detail}
        </p>
      ) : null}
    </article>
  );
}