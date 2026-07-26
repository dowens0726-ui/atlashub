export type ExecutiveMetric = {
  label: string;
  value: string;
  tone?: "default" | "cyan" | "emerald" | "amber" | "violet" | "rose";
};

type ExecutiveMetricsProps = {
  metrics: ExecutiveMetric[];
};

function getValueClasses(
  tone: ExecutiveMetric["tone"]
): string {
  switch (tone) {
    case "cyan":
      return "text-cyan-200";

    case "emerald":
      return "text-emerald-200";

    case "amber":
      return "text-amber-200";

    case "violet":
      return "text-violet-200";

    case "rose":
      return "text-rose-200";

    case "default":
    default:
      return "text-white";
  }
}

export default function ExecutiveMetrics({
  metrics,
}: ExecutiveMetricsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-3 backdrop-blur-md transition duration-300 hover:border-cyan-300/15 hover:bg-black/35"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <p className="text-[0.52rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
            {metric.label}
          </p>

          <p
            className={[
              "mt-2 truncate text-sm font-black",
              getValueClasses(metric.tone),
            ].join(" ")}
          >
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}