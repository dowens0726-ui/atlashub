import Link from "next/link";

import AtlasDecisionControls from "./AtlasDecisionControls";

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

type StatTone = "violet" | "cyan" | "emerald" | "amber";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getConfidenceTone(confidence: number): StatTone {
  if (confidence >= 85) {
    return "emerald";
  }

  if (confidence >= 70) {
    return "cyan";
  }

  if (confidence >= 50) {
    return "amber";
  }

  return "violet";
}

function getRiskTone(risk: string): StatTone {
  const normalizedRisk = risk.toLowerCase();

  if (
    normalizedRisk.includes("low") ||
    normalizedRisk.includes("safe") ||
    normalizedRisk.includes("minimal")
  ) {
    return "emerald";
  }

  if (
    normalizedRisk.includes("high") ||
    normalizedRisk.includes("aggressive")
  ) {
    return "amber";
  }

  return "cyan";
}

export default function AtlasCoreCard({
  action,
  impact,
  recommendation,
  reasoning,
}: AtlasCoreCardProps) {
  const confidenceTone = getConfidenceTone(action.confidence);
  const riskTone = getRiskTone(impact.risk);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-violet-400/25 bg-zinc-950 shadow-2xl shadow-violet-950/20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.16),transparent_38%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_32%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/80 to-transparent" />

      <div className="relative p-5 sm:p-6 lg:p-8">
        <header className="flex flex-col gap-5 border-b border-zinc-800/80 pb-7 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-300">
                Atlas Core
              </p>

              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
                Decision Ready
              </span>
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-zinc-500">
              Recommended Move
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              {action.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              {action.reason}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] px-5 py-4 sm:text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">
              Atlas Match
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {recommendation.confidence}%
            </p>

            <p className="mt-1 text-xs font-bold text-violet-300">
              Strategic alignment
            </p>
          </div>
        </header>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            label="Confidence"
            value={`${action.confidence}%`}
            detail="Decision strength"
            tone={confidenceTone}
          />

          <Stat
            label="Risk"
            value={impact.risk}
            detail="Exposure profile"
            tone={riskTone}
          />

          <Stat
            label="Empire Gain"
            value={`+${impact.empireScoreGain}`}
            detail="Projected score"
            tone="violet"
          />

          <Stat
            label="Income Gain"
            value={formatCurrency(impact.estimatedIncomeGain)}
            detail="Estimated return"
            tone="emerald"
          />
        </div>

        <div className="mt-7 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <Panel
              eyebrow="Recommendation Intelligence"
              title="Why this move fits your empire"
              tone="cyan"
            >
              {recommendation.summary ? (
                <p className="text-sm leading-7 text-zinc-300">
                  {recommendation.summary}
                </p>
              ) : (
                <p className="text-sm leading-7 text-zinc-500">
                  Atlas identified this move as the strongest available match
                  for your current progression, resources, and strategy.
                </p>
              )}
            </Panel>

            {reasoning ? (
              <Panel
                eyebrow="Decision Logic"
                title="Why Atlas chose this"
                tone="violet"
              >
                <ul className="space-y-3">
                  {reasoning.reasons.map((reason) => (
                    <li
                      key={reason}
                      className="flex gap-3 text-sm leading-6 text-zinc-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.8)]" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            ) : null}
          </div>

          <div className="space-y-5">
            {recommendation.prediction ? (
              <Panel
                eyebrow="Predictive Insight"
                title={`+${recommendation.prediction.confidenceBoost}% confidence`}
                tone="emerald"
              >
                <p className="text-sm leading-7 text-zinc-300">
                  {recommendation.prediction.reason}
                </p>

                {recommendation.prediction.matchesLearning ? (
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-3">
                    <span className="mt-0.5 text-sm font-black text-emerald-300">
                      ✓
                    </span>

                    <p className="text-sm font-bold leading-6 text-emerald-200">
                      Matches your validated strategy patterns
                    </p>
                  </div>
                ) : null}
              </Panel>
            ) : null}

            {reasoning ? (
              <Panel
                eyebrow="Expected Outcome"
                title="Projected result"
                tone="emerald"
              >
                <p className="text-sm leading-7 text-zinc-300">
                  {reasoning.expectedOutcome}
                </p>
              </Panel>
            ) : null}
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
              Decision Feedback
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Record your response so Atlas can continue adapting future
              recommendations.
            </p>
          </div>

          <AtlasDecisionControls recommendation={recommendation} />
        </div>

        {recommendation.href ? (
          <div className="mt-7 flex flex-col gap-3 border-t border-zinc-800/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-500">
              Atlas has prepared the next step for this recommendation.
            </p>

            <Link
              href={recommendation.href}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-400/10 px-5 py-3 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:border-violet-300/60 hover:bg-violet-400/15 hover:text-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70"
            >
              {action.actionLabel}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Panel({
  eyebrow,
  title,
  tone,
  children,
}: {
  eyebrow: string;
  title: string;
  tone: StatTone;
  children: React.ReactNode;
}) {
  const toneClasses: Record<StatTone, string> = {
    violet:
      "border-violet-400/20 bg-violet-400/[0.04] text-violet-300",
    cyan: "border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-300",
    emerald:
      "border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-300",
    amber: "border-amber-400/20 bg-amber-400/[0.04] text-amber-300",
  };

  return (
    <div className={`rounded-2xl border p-5 ${toneClasses[tone]}`}>
      <p className="text-[10px] font-black uppercase tracking-[0.25em]">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-xl font-black text-white">
        {title}
      </h3>

      <div className="mt-4">{children}</div>
    </div>
  );
}

function Stat({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: StatTone;
}) {
  const toneClasses: Record<StatTone, string> = {
    violet:
      "border-violet-400/20 bg-violet-400/[0.04] text-violet-300",
    cyan: "border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-300",
    emerald:
      "border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-300",
    amber: "border-amber-400/20 bg-amber-400/[0.04] text-amber-300",
  };

  return (
    <div
      className={`rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 hover:border-opacity-60 ${toneClasses[tone]}`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 break-words text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold">
        {detail}
      </p>
    </div>
  );
}