import type { ReactNode } from "react";

export type AtlasWorkspaceMetric = {
  id: string;
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  icon?: ReactNode;
  trend?: ReactNode;
  emphasis?: "default" | "primary" | "positive" | "warning";
};

export type AtlasWorkspaceMetricsProps = {
  items?: AtlasWorkspaceMetric[];
  children?: ReactNode;
  columns?: 2 | 3 | 4 | 5;
  className?: string;
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 xl:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5",
};

const emphasisClasses = {
  default: "border-white/10",
  primary: "border-cyan-400/20",
  positive: "border-emerald-400/20",
  warning: "border-amber-400/20",
};

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export default function AtlasWorkspaceMetrics({
  items,
  children,
  columns = 4,
  className,
}: AtlasWorkspaceMetricsProps) {
  if (!items?.length && !children) {
    return null;
  }

  return (
    <section
      aria-label="Workspace metrics"
      className={joinClasses(
        "grid grid-cols-1 gap-3",
        columnClasses[columns],
        className
      )}
    >
      {items?.map((item) => (
        <article
          key={item.id}
          className={joinClasses(
            "relative overflow-hidden rounded-2xl border bg-slate-950/50",
            "p-4 shadow-[0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-xl",
            emphasisClasses[item.emphasis ?? "default"]
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {item.label}
              </div>

              <div className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                {item.value}
              </div>

              {item.detail ? (
                <div className="mt-1 text-xs leading-5 text-slate-400">
                  {item.detail}
                </div>
              ) : null}
            </div>

            {item.icon ? (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-cyan-200">
                {item.icon}
              </div>
            ) : null}
          </div>

          {item.trend ? (
            <div className="mt-3 border-t border-white/[0.07] pt-3 text-xs text-slate-300">
              {item.trend}
            </div>
          ) : null}
        </article>
      ))}

      {children}
    </section>
  );
}
