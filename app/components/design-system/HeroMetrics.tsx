type HeroMetric = {
  label: string;
  value: string;
};

type HeroMetricsProps = {
  metrics: HeroMetric[];
  columns?: 2 | 3 | 4;
};

export default function HeroMetrics({
  metrics,
  columns = 4,
}: HeroMetricsProps) {
  const gridClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-4";

  return (
    <div className={`grid gap-5 ${gridClass}`}>
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur"
        >
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
            {metric.label}
          </p>

          <p className="mt-3 break-words text-2xl font-black leading-tight text-white">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}