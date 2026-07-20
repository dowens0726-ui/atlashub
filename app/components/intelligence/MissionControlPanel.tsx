import type {
  AtlasSessionPlan,
  SessionReasoning,
  StrategicRoadmap,
} from "@/app/intelligence";

import {
  AtlasCountUp,
  AtlasProgress,
  AtlasPulse,
  AtlasReveal,
} from "@/app/components/motion";

import {
  AtlasMetric,
  AtlasSurface,
} from "@/app/components/design-system";

import AtlasSessionPlanCard from "./AtlasSessionPlanCard";

type MissionControlPanelProps = {
  plan: AtlasSessionPlan;
  reasoning?: SessionReasoning;
  roadmap: StrategicRoadmap;
};

function formatCurrency(
  value: number
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }
  ).format(value);
}

function getDifficulty(
  time: number
) {
  if (time <= 45) {
    return "Easy";
  }

  if (time <= 90) {
    return "Medium";
  }

  return "Advanced";
}

function getConfidenceTone(
  confidence: number
): "positive" | "warning" | "critical" {
  if (confidence >= 80) {
    return "positive";
  }

  if (confidence >= 60) {
    return "warning";
  }

  return "critical";
}

export default function MissionControlPanel({
  plan,
  reasoning,
  roadmap,
}: MissionControlPanelProps) {
  const difficulty =
    getDifficulty(
      plan.estimatedTimeMinutes
    );

  const activeRoadmapStep =
    roadmap.steps.find(
      (step) => !step.completed
    ) ??
    roadmap.steps[
      roadmap.steps.length - 1
    ];

  const completedSteps =
    roadmap.steps.filter(
      (step) => step.completed
    ).length;

  const roadmapProgress =
    roadmap.steps.length > 0
      ? Math.round(
          (
            completedSteps /
            roadmap.steps.length
          ) * 100
        )
      : 0;

  const confidence =
    reasoning?.confidence ??
    roadmap.confidence;

  const confidenceTone =
    getConfidenceTone(
      confidence
    );

  return (
    <AtlasSurface
      tone="elevated"
      glow
      className="p-5 sm:p-6 lg:p-8"
    >
      <AtlasPulse tone="emerald" active />

      <header className="relative border-b border-white/[0.07] pb-7">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-emerald-300">
                Mission Control
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.18em] text-emerald-200">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]"
                />

                Ready to Execute
              </div>
            </div>

            <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
              {plan.title}
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
              Atlas has converted your strategic roadmap into a focused
              execution sequence for this play session.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[340px]">
            <div className="rounded-2xl border border-white/[0.07] bg-black/25 p-4">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-zinc-500">
                Roadmap Priority
              </p>

              <p className="mt-2 text-lg font-black text-white">
                {roadmap.priority}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-black/25 p-4">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-zinc-500">
                Atlas Confidence
              </p>

              <p className="mt-2 text-lg font-black text-emerald-300">
                <AtlasCountUp
                    value={confidence}
                    suffix="%"
                />
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative mt-7 grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <aside className="space-y-6">
          <section className="rounded-[1.5rem] border border-emerald-400/15 bg-emerald-400/[0.035] p-5 sm:p-6">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-emerald-300">
              Active Roadmap Stage
            </p>

            <h4 className="mt-3 text-2xl font-black text-white">
              {activeRoadmapStep?.title ??
                roadmap.objective}
            </h4>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              {activeRoadmapStep?.description ??
                "Atlas is aligning the current session with your long-term strategic objective."}
            </p>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold text-zinc-500">
                  Roadmap Progress
                </p>

                <p className="text-xs font-black text-emerald-300">
                  {completedSteps}/{roadmap.steps.length}
                </p>
              </div>

                <AtlasProgress
                    value={roadmapProgress}
                    tone="emerald"
                    animated
                    pulse
                    className="mt-3"
                />
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <AtlasMetric
              label="Estimated Profit"
              value={formatCurrency(
                plan.estimatedProfit
              )}
              description="Projected session return"
              tone="positive"
            />

            <AtlasMetric
              label="Session Duration"
              value={`${plan.estimatedTimeMinutes} min`}
              description="Estimated execution time"
              tone="accent"
            />

            <AtlasMetric
              label="Difficulty"
              value={difficulty}
              description="Operational complexity"
              tone={
                difficulty === "Advanced"
                  ? "warning"
                  : "default"
              }
            />

            <AtlasMetric
              label="Confidence"
              value={
            <AtlasCountUp
              value={confidence}
              suffix="%"
            />
          }
              description="Atlas execution certainty"
              tone={confidenceTone}
            />
          </div>

          {reasoning ? (
            <section className="rounded-[1.5rem] border border-violet-400/15 bg-violet-400/[0.035] p-5 sm:p-6">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-violet-300">
                Mission Rationale
              </p>

              <h4 className="mt-3 text-lg font-black text-white">
                {reasoning.objective}
              </h4>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                {reasoning.explanation}
              </p>

              <div className="mt-5 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-zinc-500">
                  Expected Outcome
                </p>

                <p className="mt-2 text-sm font-semibold leading-6 text-zinc-300">
                  {reasoning.expectedOutcome}
                </p>
              </div>
            </section>
          ) : null}
        </aside>

        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-cyan-300">
                Execution Sequence
              </p>

              <h4 className="mt-2 text-xl font-black text-white">
                Today&apos;s Operational Plan
              </h4>
            </div>

            <p className="text-xs font-bold text-zinc-500">
              {plan.steps.length}{" "}
              {plan.steps.length === 1
                ? "step"
                : "steps"}{" "}
              queued
            </p>
          </div>

          <AtlasSessionPlanCard
            plan={plan}
            reasoning={reasoning}
          />
        </section>
      </div>
    </AtlasSurface>
  );
}