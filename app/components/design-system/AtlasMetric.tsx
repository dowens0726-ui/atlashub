import type { ReactNode } from "react";
import AtlasSurface from "./AtlasSurface";

export type AtlasMetricTone =
  | "default"
  | "positive"
  | "warning"
  | "critical"
  | "accent";

type AtlasMetricProps = {
  label: string;
  value: ReactNode;
  description?: string;
  icon?: ReactNode;
  trend?: ReactNode;
  tone?: AtlasMetricTone;
  className?: string;
};

const toneClassNames: Record<AtlasMetricTone, string> = {
  default: "text-white",
  positive: "text-emerald-300",
  warning: "text-amber-300",
  critical: "text-rose-300",
  accent: "text-cyan-300",
};

const accentClassNames: Record<AtlasMetricTone, string> = {
  default: "from-white/10",
  positive: "from-emerald-400/15",
  warning: "from-amber-400/15",
  critical: "from-rose-400/15",
  accent: "from-cyan-400/15",
};

export default function AtlasMetric({
  label,
  value,
  description,
  icon,
  trend,
  tone = "default",
  className = "",
}: AtlasMetricProps) {
  return (
    <AtlasSurface
      tone="subtle"
      className={[
        "group min-h-40 p-5 transition duration-300",
        "hover:-translate-y-0.5 hover:border-white/10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 bg-gradient-to-br",
          accentClassNames[tone],
          "via-transparent to-transparent opacity-70",
        ].join(" ")}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {label}
          </p>

          {icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 transition group-hover:border-cyan-400/20 group-hover:text-cyan-300">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-1 flex-col justify-end">
          <div
            className={[
              "text-3xl font-black tracking-tight md:text-4xl",
              toneClassNames[tone],
            ].join(" ")}
          >
            {value}
          </div>

          {(description || trend) && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              {description ? (
                <p className="text-sm leading-6 text-zinc-400">
                  {description}
                </p>
              ) : (
                <span />
              )}

              {trend && (
                <div className="text-sm font-semibold text-zinc-300">
                  {trend}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AtlasSurface>
  );
}