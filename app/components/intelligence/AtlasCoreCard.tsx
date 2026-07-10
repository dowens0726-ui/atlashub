import Link from "next/link";

import type {
  AtlasImpact,
  AtlasReasoning,
  AtlasRecommendation,
  NextAction,
} from "@/app/intelligence";

type AtlasCoreCardProps = {
  action: NextAction;
  impact: AtlasImpact;
  recommendation: AtlasRecommendation;
  reasoning?: AtlasReasoning;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function AtlasCoreCard({
  action,
  impact,
  recommendation,
  reasoning,
}: AtlasCoreCardProps) {
  return (
    <section className="rounded-[2rem] border border-violet-400/30 bg-gradient-to-br from-violet-500/10 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-400">
        Atlas Core
      </p>

      <p className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
        Recommended Move
      </p>

      <h2 className="mt-2 text-4xl font-black text-white">
        {action.title}
      </h2>

      <p className="mt-3 leading-7 text-zinc-400">
        {action.reason}
      </p>

      <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
          Atlas Match
        </p>

        <h3 className="mt-3 text-3xl font-black text-white">
          {recommendation.confidence}% Match
        </h3>

        {recommendation.summary ? (
          <p className="mt-4 text-sm leading-6 text-zinc-300">
            {recommendation.summary}
          </p>
        ) : null}
      </div>


      {recommendation.prediction ? (
        <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
            Predictive Insight
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Learning Impact
              </p>

              <p className="mt-1 text-2xl font-black text-white">
                +
                {recommendation.prediction.confidenceBoost}
                %
                Confidence
              </p>
            </div>

            <p className="text-sm leading-6 text-zinc-300">
              {recommendation.prediction.reason}
            </p>

            {recommendation.prediction.matchesLearning ? (
              <p className="text-sm font-bold text-emerald-400">
                ✓ Matches your validated strategy patterns
              </p>
            ) : null}
          </div>
        </div>
      ) : null}


      {reasoning ? (
        <>
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-400">
              Why Atlas Chose This
            </p>

            <div className="mt-4 space-y-2">
              {reasoning.reasons.map((reason) => (
                <p
                  key={reason}
                  className="text-sm text-zinc-300"
                >
                  ✓ {reason}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
              Expected Outcome
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              {reasoning.expectedOutcome}
            </p>
          </div>
        </>
      ) : null}


      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Stat
          label="Confidence"
          value={`${action.confidence}%`}
        />

        <Stat
          label="Risk"
          value={impact.risk}
        />

        <Stat
          label="Empire Gain"
          value={`+${impact.empireScoreGain}`}
        />

        <Stat
          label="Income Gain"
          value={formatCurrency(
            impact.estimatedIncomeGain
          )}
        />
      </div>


      {recommendation.href ? (
        <Link
          href={recommendation.href}
          className="mt-6 inline-flex rounded-xl bg-violet-400 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-violet-300"
        >
          {action.actionLabel} →
        </Link>
      ) : null}
    </section>
  );
}


function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        {value}
      </p>
    </div>
  );
}