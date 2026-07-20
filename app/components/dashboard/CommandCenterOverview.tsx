import type { DashboardModel } from "@/app/services";

import {
  AtlasGrid,
  AtlasMetric,
  AtlasSurface,
} from "@/app/components/design-system";

import {
  AnimatedNumber,
  ProgressBar,
} from "@/app/components/ui";

type CommandCenterOverviewProps = {
  dashboard: DashboardModel;
};

function getScoreTone(
  score: number
): "positive" | "warning" | "critical" {
  if (score >= 80) {
    return "positive";
  }

  if (score >= 60) {
    return "warning";
  }

  return "critical";
}

function getCompletionTone(
  completion: number
): "positive" | "warning" | "accent" {
  if (completion >= 75) {
    return "positive";
  }

  if (completion >= 40) {
    return "warning";
  }

  return "accent";
}

export default function CommandCenterOverview({
  dashboard,
}: CommandCenterOverviewProps) {
  const {
    profile,
    empire,
    summary,
    progression,
  } = dashboard;

  const scoreTone =
    getScoreTone(
      empire.overallScore
    );

  const completionTone =
    getCompletionTone(
      summary.completion
    );

  const scoreMetrics = [
    empire.financialStrength,
    empire.businessPortfolio,
    empire.growthPotential,
    empire.efficiency,
  ];

  return (
    <AtlasSurface
      tone="elevated"
      glow
      className="p-5 sm:p-6 lg:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"
      />

      <header className="relative border-b border-white/[0.07] pb-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
                Instrument Cluster
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.18em] text-emerald-200">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]"
                />
                Empire Active
              </div>
            </div>

            <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">
              Live Empire Operations
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A unified operational view of your resources, progression,
              portfolio strength, and overall empire health.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-black/25 px-5 py-4 lg:min-w-[190px]">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-zinc-500">
              Current Stage
            </p>

            <p className="mt-2 text-xl font-black text-white">
              {summary.stage}
            </p>

            <p className="mt-1 text-xs font-semibold text-cyan-300">
              {profile.playstyle}
            </p>
          </div>
        </div>
      </header>

      <div className="relative mt-7 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <section className="rounded-[1.5rem] border border-amber-400/15 bg-amber-400/[0.035] p-5 sm:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-zinc-500">
                  Empire Score
                </p>

                <div className="mt-3 flex items-end gap-4">
                  <p className="text-6xl font-black tracking-[-0.06em] text-white sm:text-7xl">
                    <AnimatedNumber
                      value={empire.overallScore}
                    />
                  </p>

                  <div className="pb-2">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-zinc-600">
                      Grade
                    </p>

                    <p className="mt-1 text-2xl font-black text-amber-300">
                      {empire.overallGrade}
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] text-xs font-black uppercase tracking-[0.14em] text-amber-200 sm:flex">
                Live
              </div>
            </div>

            <ProgressBar
              value={empire.overallScore}
              label="Overall Empire Health"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {scoreMetrics.map(
                (metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/[0.06] bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-bold leading-5 text-zinc-400">
                        {metric.label}
                      </p>

                      <span className="text-sm font-black text-white">
                        {metric.score}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-amber-300"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                0,
                                metric.score
                              )
                            )}%`,
                          }}
                        />
                      </div>

                      <span className="text-xs font-black text-amber-300">
                        {metric.grade}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <AtlasGrid
            columns={2}
            className="gap-4"
          >
            <AtlasMetric
              label="Available Cash"
              value={`$${summary.cash.toLocaleString()}`}
              description="Liquid capital available"
              tone="positive"
            />

            <AtlasMetric
              label="Owned Businesses"
              value={profile.ownedBusinesses.length}
              description="Active portfolio assets"
              tone="accent"
            />

            <AtlasMetric
              label="Completion"
              value={`${summary.completion}%`}
              description="Current progression"
              tone={completionTone}
            />

            <AtlasMetric
              label="Investment Remaining"
              value={`$${summary.remainingInvestment.toLocaleString()}`}
              description="Capital required on current path"
              tone="warning"
            />
          </AtlasGrid>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-zinc-500">
                Next Steps
              </p>

              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-3xl font-black text-white">
                  {progression.steps.length}
                </p>

                <p className="pb-1 text-xs font-bold text-cyan-300">
                  Actions queued
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-zinc-500">
                Health Signal
              </p>

              <div className="mt-3 flex items-end justify-between gap-4">
                <p
                  className={[
                    "text-xl font-black",
                    scoreTone === "positive"
                      ? "text-emerald-300"
                      : scoreTone === "warning"
                        ? "text-amber-300"
                        : "text-rose-300",
                  ].join(" ")}
                >
                  {scoreTone === "positive"
                    ? "Strong"
                    : scoreTone === "warning"
                      ? "Stable"
                      : "Needs Attention"}
                </p>

                <p className="pb-1 text-xs font-bold text-zinc-500">
                  Atlas evaluation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {empire.insights.length > 0 ? (
        <section className="relative mt-7 border-t border-white/[0.07] pt-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-cyan-300">
                Atlas Signals
              </p>

              <h4 className="mt-2 text-lg font-black text-white">
                Operational Intelligence
              </h4>
            </div>

            <p className="text-xs font-bold text-zinc-500">
              {empire.insights.length} active{" "}
              {empire.insights.length === 1
                ? "signal"
                : "signals"}
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {empire.insights.map(
              (insight) => (
                <article
                  key={insight.id}
                  className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h5 className="font-black leading-6 text-white">
                      {insight.title}
                    </h5>

                    <span className="shrink-0 rounded-full border border-amber-400/15 bg-amber-400/[0.06] px-2.5 py-1 text-[0.6rem] font-black uppercase tracking-[0.16em] text-amber-300">
                      {insight.priority}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {insight.description}
                  </p>
                </article>
              )
            )}
          </div>
        </section>
      ) : null}
    </AtlasSurface>
  );
}