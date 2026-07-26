export type AtlasStatusTone =
  | "default"
  | "positive"
  | "warning"
  | "critical"
  | "accent";

type AtlasStatusItemProps = {
  label: string;
  value: string;
  detail?: string;
  tone?: AtlasStatusTone;
  progress?: number;
  pulse?: boolean;
};

const toneStyles: Record<
  AtlasStatusTone,
  {
    dot: string;
    value: string;
    bar: string;
    glow: string;
  }
> = {
  default: {
    dot: "bg-white/50",
    value: "text-white/88",
    bar: "bg-white/55",
    glow: "shadow-white/20",
  },
  positive: {
    dot: "bg-emerald-300",
    value: "text-emerald-100",
    bar: "bg-emerald-300",
    glow: "shadow-emerald-300/40",
  },
  warning: {
    dot: "bg-amber-300",
    value: "text-amber-100",
    bar: "bg-amber-300",
    glow: "shadow-amber-300/40",
  },
  critical: {
    dot: "bg-rose-300",
    value: "text-rose-100",
    bar: "bg-rose-300",
    glow: "shadow-rose-300/40",
  },
  accent: {
    dot: "bg-cyan-300",
    value: "text-cyan-100",
    bar: "bg-cyan-300",
    glow: "shadow-cyan-300/40",
  },
};

function clampProgress(progress: number) {
  return Math.min(100, Math.max(0, progress));
}

export default function AtlasStatusItem({
  label,
  value,
  detail,
  tone = "default",
  progress,
  pulse = false,
}: AtlasStatusItemProps) {
  const styles = toneStyles[tone];
  const normalizedProgress =
    typeof progress === "number" ? clampProgress(progress) : null;

  return (
    <div className="group relative rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-3 transition duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]">
      <div className="flex items-start gap-2.5">
        <span className="relative mt-1.5 flex h-2 w-2 shrink-0">
          {pulse ? (
            <span
              className={[
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-45",
                styles.dot,
              ].join(" ")}
            />
          ) : null}

          <span
            className={[
              "relative inline-flex h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]",
              styles.dot,
              styles.glow,
            ].join(" ")}
          />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-white/38">
            {label}
          </p>

          <p
            className={[
              "mt-1 truncate text-sm font-semibold tracking-[-0.01em]",
              styles.value,
            ].join(" ")}
          >
            {value}
          </p>

          {detail ? (
            <p className="mt-1 text-[0.68rem] leading-4 text-white/38">
              {detail}
            </p>
          ) : null}

          {normalizedProgress !== null ? (
            <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className={[
                  "h-full rounded-full transition-[width] duration-700 ease-out",
                  styles.bar,
                ].join(" ")}
                style={{ width: `${normalizedProgress}%` }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
