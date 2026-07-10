import type {
  AtlasAdaptiveStrategy,
} from "@/app/intelligence";

type AtlasStrategyInsightCardProps = {
  strategy: AtlasAdaptiveStrategy;
};

export default function AtlasStrategyInsightCard({
  strategy,
}: AtlasStrategyInsightCardProps) {
  return (
    <section className="rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-violet-400/10 via-zinc-950 to-zinc-950 p-6">

      <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-400">
        Atlas Adaptive Strategy
      </p>


      <h2 className="mt-4 text-3xl font-black text-white">
        {strategy.title}
      </h2>


      <p className="mt-3 leading-7 text-zinc-400">
        {strategy.reasoning}
      </p>


      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
            Strategy Score
          </p>

          <p className="mt-2 text-3xl font-black text-white">
            {strategy.strategyScore}%
          </p>
        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
            Confidence
          </p>

          <p className="mt-2 text-3xl font-black text-white">
            {strategy.confidence}%
          </p>
        </div>

      </div>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

        <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-400">
          Strategy Adjustments
        </p>


        <div className="mt-4 space-y-2">
          {strategy.adjustments.map((adjustment) => (
            <p
              key={adjustment}
              className="text-sm text-zinc-300"
            >
              ✓ {adjustment}
            </p>
          ))}
        </div>

      </div>

    </section>
  );
}