import type { ReactNode } from "react";

import type {
  AtlasRecommendation,
  AtlasReasoning,
  IdentityAdvisorResult,
} from "@/app/intelligence";

type AtlasAdvisorCardProps = {
  recommendation: AtlasRecommendation;
  reasoning?: AtlasReasoning;
  identityAdvisor: IdentityAdvisorResult;
};

type AdvisorTone = "amber" | "cyan" | "emerald" | "violet";

export default function AtlasAdvisorCard({
  recommendation,
  reasoning,
  identityAdvisor,
}: AtlasAdvisorCardProps) {
  const overallMatch =
    recommendation.match?.overall ?? recommendation.confidence;

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-zinc-950 shadow-2xl shadow-amber-950/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.13),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.07),transparent_32%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

      <div className="relative p-5 sm:p-6 lg:p-8">
        <header className="flex flex-col gap-5 border-b border-zinc-800/80 pb-7 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-300">
                Atlas Strategic Analysis
              </p>

              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                Advisor Active
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Why Atlas Recommended This Path
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              Atlas evaluated your identity, resources, strategy, and
              progression path to explain why this decision is the strongest
              current fit.
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-3 lg:min-w-72">
            <SummaryMetric
              label="Identity Match"
              value={`${identityAdvisor.identityMatch}%`}
              tone="emerald"
            />

            <SummaryMetric
              label="Overall Match"
              value={`${overallMatch}%`}
              tone="cyan"
            />
          </div>
        </header>

        <div className="mt-7 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <AdvisorPanel
              eyebrow="Identity Alignment"
              title={`${identityAdvisor.identityMatch}% strategic fit`}
              tone="emerald"
            >
              <p className="text-sm leading-7 text-zinc-300">
                {identityAdvisor.summary}
              </p>

              {identityAdvisor.reasons.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {identityAdvisor.reasons.map((reason) => (
                    <ReasonItem
                      key={reason}
                      reason={reason}
                      tone="emerald"
                    />
                  ))}
                </ul>
              ) : null}
            </AdvisorPanel>

            {reasoning ? (
              <AdvisorPanel
                eyebrow="Strategic Reasoning"
                title="Decision factors"
                tone="amber"
              >
                <ul className="space-y-3">
                  {reasoning.reasons.map((reason) => (
                    <ReasonItem
                      key={reason}
                      reason={reason}
                      tone="amber"
                    />
                  ))}
                </ul>
              </AdvisorPanel>
            ) : null}
          </div>

          <div className="space-y-5">
            {recommendation.match ? (
              <AdvisorPanel
                eyebrow="Match Analysis"
                title={`${recommendation.match.overall}% overall alignment`}
                tone="cyan"
              >
                <div className="grid gap-3 sm:grid-cols-2">
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
              </AdvisorPanel>
            ) : null}

            {reasoning ? (
              <AdvisorPanel
                eyebrow="Expected Outcome"
                title="Projected result"
                tone="emerald"
              >
                <p className="text-sm leading-7 text-zinc-300">
                  {reasoning.expectedOutcome}
                </p>
              </AdvisorPanel>
            ) : null}
          </div>
        </div>

        {reasoning && reasoning.alternatives.length > 0 ? (
          <div className="mt-5">
            <AdvisorPanel
              eyebrow="Alternative Paths"
              title="Other viable strategies"
              tone="violet"
            >
              <div className="grid gap-3 md:grid-cols-2">
                {reasoning.alternatives.map((alternative, index) => (
                  <div
                    key={alternative}
                    className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-400/[0.06] text-xs font-black text-violet-300">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-zinc-400">
                      {alternative}
                    </p>
                  </div>
                ))}
              </div>
            </AdvisorPanel>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function AdvisorPanel({
  eyebrow,
  title,
  tone,
  children,
}: {
  eyebrow: string;
  title: string;
  tone: AdvisorTone;
  children: ReactNode;
}) {
  const toneClasses: Record<AdvisorTone, string> = {
    amber: "border-amber-400/20 bg-amber-400/[0.04] text-amber-300",
    cyan: "border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-300",
    emerald:
      "border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-300",
    violet:
      "border-violet-400/20 bg-violet-400/[0.04] text-violet-300",
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

function SummaryMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: AdvisorTone;
}) {
  const toneClasses: Record<AdvisorTone, string> = {
    amber: "border-amber-400/20 bg-amber-400/[0.05] text-amber-300",
    cyan: "border-cyan-400/20 bg-cyan-400/[0.05] text-cyan-300",
    emerald:
      "border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-300",
    violet:
      "border-violet-400/20 bg-violet-400/[0.05] text-violet-300",
  };

  return (
    <div className={`rounded-2xl border p-4 ${toneClasses[tone]}`}>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold">
        Strategic alignment
      </p>
    </div>
  );
}

function ReasonItem({
  reason,
  tone,
}: {
  reason: string;
  tone: "amber" | "emerald";
}) {
  const indicatorClass =
    tone === "emerald"
      ? "bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]"
      : "bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.8)]";

  return (
    <li className="flex gap-3 text-sm leading-6 text-zinc-300">
      <span
        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${indicatorClass}`}
      />

      <span>{reason}</span>
    </li>
  );
}

function Factor({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
          {label}
        </span>

        <span className="text-xs font-black text-cyan-300">
          {normalizedValue}/100
        </span>
      </div>

      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800"
        role="progressbar"
        aria-label={`${label} match`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={normalizedValue}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-[width] duration-500"
          style={{
            width: `${normalizedValue}%`,
          }}
        />
      </div>
    </div>
  );
}