import type {
  AtlasReasoning,
} from "@/app/intelligence";

type AtlasReasoningPanelProps = {
  reasoning: AtlasReasoning;
};

export default function AtlasReasoningPanel({
  reasoning,
}: AtlasReasoningPanelProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Atlas Intelligence
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Why Atlas Recommends This
          </h2>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-right">
          <p className="text-xs uppercase tracking-wide text-emerald-300">
            Confidence
          </p>

          <p className="text-2xl font-black text-emerald-400">
            {reasoning.confidence}%
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Atlas Analysis
        </h3>

        <ul className="mt-4 space-y-3">
          {reasoning.reasons.map((reason) => (
            <li
              key={reason}
              className="flex items-start gap-3"
            >
              <span className="mt-1 text-emerald-400">
                ✓
              </span>

              <span className="text-zinc-300">
                {reason}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Expected Outcome
        </h3>

        <p className="mt-3 leading-7 text-zinc-300">
          {reasoning.expectedOutcome}
        </p>
      </div>

      {reasoning.alternatives.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Alternative Options
          </h3>

          <ul className="mt-3 space-y-2">
            {reasoning.alternatives.map((option) => (
              <li
                key={option}
                className="text-zinc-400"
              >
                • {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}