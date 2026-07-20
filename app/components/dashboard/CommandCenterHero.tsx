import AtlasButton from "@/app/components/design-system/AtlasButton";
import AtlasGrid from "@/app/components/design-system/AtlasGrid";
import AtlasHero from "@/app/components/design-system/AtlasHero";
import AtlasMetric from "@/app/components/design-system/AtlasMetric";
import AtlasSurface from "@/app/components/design-system/AtlasSurface";

import {
  AtlasCountUp,
  AtlasProgress,
  AtlasPulse,
  AtlasReveal,
} from "@/app/components/motion";

import {
  buildAtlasBriefing,
  buildAtlasGreeting,
  buildAtlasImpact,
} from "@/app/intelligence";

import type { AtlasMetricTone } from "@/app/components/design-system/AtlasMetric";
import type { UseAtlasBrainPipelineResult } from "@/app/hooks/useAtlasBrainPipeline";
import type { DashboardModel } from "@/app/services";

type CommandCenterHeroProps = {
  dashboard: DashboardModel;
  brainPipeline: UseAtlasBrainPipelineResult;
};

function clampPercentage(value: number): number {
  return Math.min(100, Math.max(0, value));
}

function getEmpireHealthTone(score: number): AtlasMetricTone {
  if (score >= 80) {
    return "positive";
  }

  if (score >= 60) {
    return "accent";
  }

  if (score >= 40) {
    return "warning";
  }

  return "critical";
}

function getConfidenceTone(confidence: number): AtlasMetricTone {
  if (confidence >= 85) {
    return "positive";
  }

  if (confidence >= 65) {
    return "accent";
  }

  if (confidence >= 45) {
    return "warning";
  }

  return "critical";
}

function getEmpireStatus(score: number): {
  label: string;
  summary: string;
} {
  if (score >= 85) {
    return {
      label: "Thriving",
      summary:
        "Your empire is operating from a position of strength with healthy momentum and room to expand.",
    };
  }

  if (score >= 70) {
    return {
      label: "Growing",
      summary:
        "Your empire is progressing well. Atlas has identified the next move most likely to preserve momentum.",
    };
  }

  if (score >= 50) {
    return {
      label: "Developing",
      summary:
        "Your foundation is taking shape, but the next decision should prioritize stability and efficient progression.",
    };
  }

  return {
    label: "At Risk",
    summary:
      "Your empire needs a focused recovery move before committing resources to broader expansion.",
  };
}

function getPipelineStatusLabel(
  brainPipeline: UseAtlasBrainPipelineResult
): string {
  switch (brainPipeline.status) {
    case "waiting":
      return "Awaiting Data";

    case "loading":
      return "Analyzing Empire";

    case "success":
      return "Atlas Online";

    case "warning":
      return "Review Required";

    case "failed":
      return "Atlas Limited";

    case "idle":
    default:
      return "Atlas Standby";
  }
}

function getPipelineStatusClasses(
  brainPipeline: UseAtlasBrainPipelineResult
): string {
  switch (brainPipeline.status) {
    case "success":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";

    case "warning":
      return "border-amber-400/20 bg-amber-400/10 text-amber-300";

    case "failed":
      return "border-red-400/20 bg-red-400/10 text-red-300";

    case "loading":
      return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";

    case "waiting":
    case "idle":
    default:
      return "border-zinc-400/20 bg-zinc-400/10 text-zinc-300";
  }
}

function getPipelineIndicatorClasses(
  brainPipeline: UseAtlasBrainPipelineResult
): string {
  switch (brainPipeline.status) {
    case "success":
      return "bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]";

    case "warning":
      return "bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.8)]";

    case "failed":
      return "bg-red-300 shadow-[0_0_12px_rgba(252,165,165,0.8)]";

    case "loading":
      return "animate-pulse bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]";

    case "waiting":
    case "idle":
    default:
      return "bg-zinc-300";
  }
}

function getUrgencyLabel(
  urgency: unknown,
  shouldActNow: boolean
): string {
  if (shouldActNow) {
    return "Act Now";
  }

  if (
    typeof urgency === "string" &&
    urgency.trim().length > 0
  ) {
    return urgency;
  }

  return "Strategic";
}

function getUrgencyClasses(shouldActNow: boolean): string {
  if (shouldActNow) {
    return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  }

  return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
}

export default function CommandCenterHero({
  dashboard,
  brainPipeline,
}: CommandCenterHeroProps) {
  const decision = brainPipeline.decision;
  const primaryRecommendation =
    brainPipeline.primaryRecommendation;

  const fallbackConfidence =
    dashboard.recommendation?.confidence ?? 90;

  const recommendationConfidence =
    decision?.confidence ??
    primaryRecommendation?.confidence ??
    fallbackConfidence;

  const normalizedConfidence =
    clampPercentage(recommendationConfidence);

  const greeting = buildAtlasGreeting(dashboard.profile);

  const impact = buildAtlasImpact(recommendationConfidence);

  const fallbackBriefing = buildAtlasBriefing(
    dashboard.profile,
    impact
  );

  const briefingTitle =
    decision?.headline ??
    primaryRecommendation?.title ??
    fallbackBriefing.title;

  const briefingSummary =
    decision?.summary ??
    primaryRecommendation?.explanation ??
    fallbackBriefing.summary;

  const immediateNextStep =
    decision?.immediateNextStep ??
    primaryRecommendation?.explanation ??
    fallbackBriefing.objective;

  const longTermDirection =
    decision?.longTermDirection ??
    "Continue building momentum while preserving enough capital for the next high-impact opportunity.";

  const decisionRationale =
    decision?.rationale ??
    primaryRecommendation?.explanation ??
    "Atlas is balancing your current resources, empire progression, and highest-value available action.";

  const coachingResponse =
    decision?.coachingResponse ??
    "Complete the priority action before redirecting resources. The next measurable gain matters more than adding another competing objective.";

  const shouldActNow =
    decision?.shouldActNow ?? false;

  const urgencyLabel = getUrgencyLabel(
    decision?.urgency,
    shouldActNow
  );

  const empireHealthTone = getEmpireHealthTone(
    dashboard.empire.overallScore
  );

  const confidenceTone = getConfidenceTone(
    recommendationConfidence
  );

  const empireStatus = getEmpireStatus(
    dashboard.empire.overallScore
  );

  const pipelineStatusLabel =
    getPipelineStatusLabel(brainPipeline);

  const pipelineStatusClasses =
    getPipelineStatusClasses(brainPipeline);

  const pipelineIndicatorClasses =
    getPipelineIndicatorClasses(brainPipeline);

  const urgencyClasses =
    getUrgencyClasses(shouldActNow);

  return (
    <div className="space-y-6">
      <AtlasHero
        layout="stacked"
        eyebrow={`Atlas AI · ${greeting.greeting}, Commander`}
        title="Empire Command Center"
        description={greeting.subtitle}
        actions={
          <>
            <AtlasButton href="/planner">
              Execute Session Plan
            </AtlasButton>

            <AtlasButton
              href="/advisor"
              variant="secondary"
            >
              Open Atlas Advisor
            </AtlasButton>
          </>
        }
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-black/30">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_90%_22%,rgba(139,92,246,0.1),transparent_28%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent"
          />

          <div className="relative grid xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)]">
            <section className="p-5 sm:p-7 lg:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cyan-300">
                    Atlas Executive Briefing
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    Live strategic interpretation of your current empire state
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div
                    className={[
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
                      pipelineStatusClasses,
                    ].join(" ")}
                  >
                    <AtlasPulse
                      active={
                        brainPipeline.status === "loading" ||
                        brainPipeline.status === "success"
                      }
                      tone={
                        brainPipeline.status === "success"
                          ? "emerald"
                          : brainPipeline.status === "warning"
                            ? "amber"
                            : brainPipeline.status === "failed"
                              ? "red"
                              : "cyan"
                      }
                    />

                    {pipelineStatusLabel}
                  </div>

                  <div
                    className={[
                      "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold capitalize",
                      urgencyClasses,
                    ].join(" ")}
                  >
                    {urgencyLabel}
                  </div>
                </div>
              </div>

              <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_190px] lg:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Primary Recommendation
                  </p>

                  <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                    {briefingTitle}
                  </h2>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                    {briefingSummary}
                  </p>
                </div>

                <div className="border-t border-white/[0.07] pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                    Empire Status
                  </p>

                  <p className="mt-3 text-3xl font-black tracking-tight text-white">
                    {empireStatus.label}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {dashboard.empire.overallScore}/100 health
                  </p>
                </div>
              </div>

              {brainPipeline.error ? (
                <div className="mt-6 rounded-2xl border border-red-400/15 bg-red-400/[0.05] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                    Pipeline Notice
                  </p>

                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {brainPipeline.error}
                  </p>
                </div>
              ) : null}

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <AtlasSurface
                  tone="subtle"
                  className="p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                      Immediate Action
                    </p>

                    <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cyan-200">
                      Next
                    </span>
                  </div>

                  <p className="mt-4 text-base font-bold leading-7 text-white">
                    {immediateNextStep}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
                    <span className="text-xs font-medium text-zinc-500">
                      Recommended session
                    </span>

                    <span className="text-sm font-black text-cyan-200">
                      {fallbackBriefing.recommendedSessionMinutes} min
                    </span>
                  </div>
                </AtlasSurface>

                <AtlasSurface
                  tone="subtle"
                  className="p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
                      Strategic Outlook
                    </p>

                    <span className="rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-violet-200">
                      Forward
                    </span>
                  </div>

                  <p className="mt-4 text-base font-bold leading-7 text-white">
                    {longTermDirection}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
                    <span className="text-xs font-medium text-zinc-500">
                      Current posture
                    </span>

                    <span className="text-sm font-black text-violet-200">
                      {shouldActNow ? "Priority" : "Planned"}
                    </span>
                  </div>
                </AtlasSurface>
              </div>

              <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
                <div className="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                      Why Atlas Chose This
                    </p>

                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                      Recommendation rationale based on your live empire state.
                    </p>
                  </div>

                  <p className="text-sm font-medium leading-7 text-zinc-300">
                    {decisionRationale}
                  </p>
                </div>
              </div>
            </section>

            <aside className="border-t border-white/[0.07] bg-white/[0.018] p-5 sm:p-7 xl:border-l xl:border-t-0">
              <div className="flex h-full flex-col">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emerald-300">
                    Atlas Confidence
                  </p>

                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-6xl font-black tracking-[-0.06em] text-white">
                      <AtlasCountUp
                        value={normalizedConfidence}
                      />
                    </span>

                    <span className="pb-2 text-xl font-black text-emerald-300">
                      %
                    </span>
                  </div>

                  <AtlasProgress
                    value={normalizedConfidence}
                    tone="emerald"
                    animated
                  />

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">
                      Decision reliability
                    </span>

                    <span className="font-bold text-emerald-200">
                      {normalizedConfidence >= 85
                        ? "High"
                        : normalizedConfidence >= 65
                          ? "Moderate"
                          : "Review"}
                    </span>
                  </div>
                </div>

                <div className="my-7 h-px bg-white/[0.06]" />

                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                    Atlas Coaching
                  </p>

                  <p className="mt-3 text-sm font-semibold leading-7 text-zinc-200">
                    {coachingResponse}
                  </p>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-7">
                  <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      Pipeline
                    </p>

                    <p className="mt-2 text-sm font-bold text-white">
                      {brainPipeline.successful
                        ? "Operational"
                        : brainPipeline.loading
                          ? "Processing"
                          : "Standby"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      Action State
                    </p>

                    <p
                      className={[
                        "mt-2 text-sm font-bold",
                        shouldActNow
                          ? "text-amber-300"
                          : "text-emerald-300",
                      ].join(" ")}
                    >
                      {shouldActNow ? "Priority" : "Planned"}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/[0.06] bg-black/20 px-5 py-4">
          <p className="text-sm leading-6 text-zinc-400">
            <span className="font-semibold text-zinc-200">
              Current operating condition:
            </span>{" "}
            {empireStatus.summary}
          </p>
        </div>
      </AtlasHero>

      <AtlasGrid columns={4}>
        <AtlasMetric
          label="Empire Health"
          value={dashboard.empire.overallScore}
          description="Overall strategic strength"
          tone={empireHealthTone}
          trend={`${dashboard.empire.overallGrade} grade`}
        />

        <AtlasMetric
          label="Atlas Confidence"
          value={`${normalizedConfidence}%`}
          description="Recommendation reliability"
          tone={confidenceTone}
          trend={
            normalizedConfidence >= 85
              ? "High confidence"
              : "Review signals"
          }
        />

        <AtlasMetric
          label="Current Stage"
          value={dashboard.summary.stage}
          description="Active empire phase"
          tone="accent"
        />

        <AtlasMetric
          label="Available Cash"
          value={`$${dashboard.summary.cash.toLocaleString()}`}
          description="Capital ready for deployment"
          tone="default"
        />
      </AtlasGrid>
    </div>
  );
}