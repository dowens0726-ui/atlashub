import Link from "next/link";

import type {
  AtlasRecommendation,
  AtlasReasoning,
} from "@/app/intelligence";

type AtlasAdvisorCardProps = {
  recommendation: AtlasRecommendation;
  reasoning?: AtlasReasoning;
};

function formatCurrency(value?: number) {
  if (!value) return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function AtlasAdvisorCard({
  recommendation,
  reasoning,
}: AtlasAdvisorCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

      <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-400">
        Atlas Advisor
      </p>

      <h2 className="mt-5 text-3xl font-black text-white">
        Strategic Guidance
      </h2>

      <p className="mt-3 leading-7 text-zinc-400">
        Atlas has analyzed your empire position and identified the best path
        forward.
      </p>

      <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
          Primary Recommendation
        </p>

        <h3 className="mt-3 text-2xl font-black text-white">
          {recommendation.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {recommendation.summary}
        </p>
      </div>

      {recommendation.match ? (
        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
            Atlas Match
          </p>

          <h3 className="mt-3 text-3xl font-black text-white">
            {recommendation.match.overall}% Match
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            Based on your current empire, budget, playstyle, and progression.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Factor
              label="Performance"
              value={recommendation.match.factors.performance}
            />

            <Factor
              label="Budget Fit"
              value={recommendation.match.factors.budget}
            />

            <Factor
              label="Playstyle"
              value={recommendation.match.factors.playstyle}
            />

            <Factor
              label="Progression"
              value={recommendation.match.factors.progression}
            />
          </div>

          {recommendation.match.reasons.length > 0 && (
            <div className="mt-5 space-y-2">
              {recommendation.match.reasons.map((reason) => (
                <p
                  key={reason}
                  className="text-sm text-zinc-300"
                >
                  ✓ {reason}
                </p>
              ))}
            </div>
          )}
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Stat
          label="Confidence"
          value={`${recommendation.confidence}%`}
        />

        <Stat
          label="Priority"
          value={recommendation.priority}
        />

        <Stat
          label="Profit Potential"
          value={formatCurrency(recommendation.estimatedProfit)}
          accent
        />

        <Stat
          label="Estimated Time"
          value={
            recommendation.estimatedTimeMinutes
              ? `${recommendation.estimatedTimeMinutes} min`
              : "Review"
          }
        />
      </div>

      {reasoning ? (
        <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
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

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Expected Outcome
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {reasoning.expectedOutcome}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Strategic Alternatives
            </p>

            <div className="mt-2 space-y-1">
              {reasoning.alternatives.map((alternative) => (
                <p
                  key={alternative}
                  className="text-sm text-zinc-400"
                >
                  • {alternative}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {recommendation.href ? (
        <Link
          href={recommendation.href}
          className="mt-6 inline-flex rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-amber-300"
        >
          Review Strategy →
        </Link>
      ) : null}
    </section>
  );
}

function Factor({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-cyan-400"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex min-h-28 flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-3 break-words text-2xl font-black leading-tight ${
          accent ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}