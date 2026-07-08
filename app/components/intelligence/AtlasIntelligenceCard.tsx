type AtlasIntelligenceCardProps = {
  score: number;
  title: string;
  summary: string;
  metrics: {
    label: string;
    value: string;
  }[];
};

export default function AtlasIntelligenceCard({
  score,
  title,
  summary,
  metrics,
}: AtlasIntelligenceCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

      <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">
        Atlas Intelligence
      </p>

      <div className="mt-5 flex items-end gap-4">
        <p className="text-6xl font-black text-white">
          {score}
        </p>

        <p className="pb-2 text-lg font-bold text-emerald-400">
          Atlas Score
        </p>
      </div>

      <h2 className="mt-6 text-2xl font-black text-white">
        {title}
      </h2>

      <p className="mt-3 leading-7 text-zinc-400">
        {summary}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              {metric.label}
            </p>

            <p className="mt-2 text-xl font-black text-white">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}