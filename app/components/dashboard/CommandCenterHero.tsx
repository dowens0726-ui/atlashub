import AtlasButton from "@/app/components/design-system/AtlasButton";
import AtlasGrid from "@/app/components/design-system/AtlasGrid";
import AtlasHero from "@/app/components/design-system/AtlasHero";
import AtlasMetric from "@/app/components/design-system/AtlasMetric";
import AtlasSurface from "@/app/components/design-system/AtlasSurface";

import {
  buildAtlasBriefing,
  buildAtlasGreeting,
  buildAtlasImpact,
} from "@/app/intelligence";

import type { UseAtlasBrainPipelineResult } from "@/app/hooks/useAtlasBrainPipeline";
import type { DashboardModel } from "@/app/services";

import type { AtlasMetricTone } from "@/app/components/design-system/AtlasMetric";


type CommandCenterHeroProps = {
  dashboard:
    DashboardModel;

  brainPipeline:
    UseAtlasBrainPipelineResult;
};


function getEmpireHealthTone(
  score:
    number
): AtlasMetricTone {
  if (
    score >= 80
  ) {
    return "positive";
  }

  if (
    score >= 60
  ) {
    return "accent";
  }

  if (
    score >= 40
  ) {
    return "warning";
  }

  return "critical";
}


function getConfidenceTone(
  confidence:
    number
): AtlasMetricTone {
  if (
    confidence >= 85
  ) {
    return "positive";
  }

  if (
    confidence >= 65
  ) {
    return "accent";
  }

  if (
    confidence >= 45
  ) {
    return "warning";
  }

  return "critical";
}


function getPipelineStatusLabel(
  brainPipeline:
    UseAtlasBrainPipelineResult
): string {
  switch (
    brainPipeline.status
  ) {
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
  brainPipeline:
    UseAtlasBrainPipelineResult
): string {
  switch (
    brainPipeline.status
  ) {
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
  brainPipeline:
    UseAtlasBrainPipelineResult
): string {
  switch (
    brainPipeline.status
  ) {
    case "success":
      return "bg-emerald-300";

    case "warning":
      return "bg-amber-300";

    case "failed":
      return "bg-red-300";

    case "loading":
      return "animate-pulse bg-cyan-300";

    case "waiting":
    case "idle":
    default:
      return "bg-zinc-300";
  }
}


function getUrgencyLabel(
  urgency:
    unknown,
  shouldActNow:
    boolean
): string {
  if (
    shouldActNow
  ) {
    return "Act Now";
  }

  if (
    typeof urgency ===
      "string" &&
    urgency.trim().length >
      0
  ) {
    return urgency;
  }

  return "Strategic";
}


function getUrgencyClasses(
  shouldActNow:
    boolean
): string {
  if (
    shouldActNow
  ) {
    return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  }

  return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
}


export default function CommandCenterHero({
  dashboard,
  brainPipeline,
}: CommandCenterHeroProps) {
  const decision =
    brainPipeline.decision;

  const primaryRecommendation =
    brainPipeline.primaryRecommendation;

  const fallbackConfidence =
    dashboard.recommendation
      ?.confidence ??
    90;

  const recommendationConfidence =
    decision?.confidence ??
    primaryRecommendation
      ?.confidence ??
    fallbackConfidence;

  const greeting =
    buildAtlasGreeting(
      dashboard.profile
    );

  const impact =
    buildAtlasImpact(
      recommendationConfidence
    );

  const fallbackBriefing =
    buildAtlasBriefing(
      dashboard.profile,
      impact
    );

  const briefingTitle =
    decision?.headline ??
    primaryRecommendation
      ?.title ??
    fallbackBriefing.title;

  const briefingSummary =
    decision?.summary ??
    primaryRecommendation
      ?.explanation ??
    fallbackBriefing.summary;

  const immediateNextStep =
    decision
      ?.immediateNextStep ??
    primaryRecommendation
      ?.explanation ??
    fallbackBriefing.objective;

  const longTermDirection =
    decision
      ?.longTermDirection ??
    "Continue building momentum while preserving enough capital for the next high-impact opportunity.";

  const decisionRationale =
    decision?.rationale ??
    primaryRecommendation
      ?.explanation ??
    "Atlas is balancing your current resources, empire progression, and highest-value available action.";

  const coachingResponse =
    decision
      ?.coachingResponse ??
    "Stay focused on the next measurable gain. Complete the priority action before redirecting resources.";

  const shouldActNow =
    decision
      ?.shouldActNow ??
    false;

  const urgencyLabel =
    getUrgencyLabel(
      decision?.urgency,
      shouldActNow
    );

  const empireHealthTone =
    getEmpireHealthTone(
      dashboard.empire
        .overallScore
    );

  const confidenceTone =
    getConfidenceTone(
      recommendationConfidence
    );

  const pipelineStatusLabel =
    getPipelineStatusLabel(
      brainPipeline
    );

  const pipelineStatusClasses =
    getPipelineStatusClasses(
      brainPipeline
    );

  const pipelineIndicatorClasses =
    getPipelineIndicatorClasses(
      brainPipeline
    );

  const urgencyClasses =
    getUrgencyClasses(
      shouldActNow
    );


  return (
    <div className="space-y-6">
      <AtlasHero
        layout="stacked"
        eyebrow={`Atlas AI · ${greeting.greeting}, Commander`}
        title="Empire Command Center"
          description={
            greeting.subtitle
        }
        actions={
          <>
            <AtlasButton href="/planner">
              Open Session Planner
            </AtlasButton>

            <AtlasButton
              href="/advisor"
              variant="secondary"
            >
              View Atlas Advisor
            </AtlasButton>
          </>
        }
      >
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
          <AtlasSurface
            tone="subtle"
            className="overflow-hidden p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Atlas Executive
                Briefing
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <div
                  className={[
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
                    pipelineStatusClasses,
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      pipelineIndicatorClasses,
                    ].join(" ")}
                  />

                  {
                    pipelineStatusLabel
                  }
                </div>

                <div
                  className={[
                    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize",
                    urgencyClasses,
                  ].join(" ")}
                >
                  {urgencyLabel}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Strategic Decision
              </p>

              <h2 className="mt-3 max-w-3xl text-2xl font-black tracking-tight text-white sm:text-3xl">
                {briefingTitle}
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                {briefingSummary}
              </p>
            </div>

            {brainPipeline.error ? (
              <div className="mt-5 rounded-2xl border border-red-400/15 bg-red-400/[0.05] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                  Pipeline Notice
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {
                    brainPipeline.error
                  }
                </p>
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Immediate Next Step
                </p>

                <p className="mt-3 text-sm font-semibold leading-7 text-white">
                  {
                    immediateNextStep
                  }
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
                  <span className="text-xs font-medium text-zinc-500">
                    Recommended
                    session
                  </span>

                  <span className="text-sm font-black text-cyan-200">
                    {
                      fallbackBriefing
                        .recommendedSessionMinutes
                    }{" "}
                    min
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-violet-400/10 bg-violet-400/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                  Strategic Outlook
                </p>

                <p className="mt-3 text-sm font-semibold leading-7 text-white">
                  {
                    longTermDirection
                  }
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
                  <span className="text-xs font-medium text-zinc-500">
                    Decision
                    confidence
                  </span>

                  <span className="text-sm font-black text-emerald-300">
                    {
                      recommendationConfidence
                    }
                    %
                  </span>
                </div>
              </div>
            </div>
          </AtlasSurface>

          <div className="grid gap-4">
            <AtlasSurface
              tone="elevated"
              className="p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Primary Recommendation
              </p>

              <p className="mt-3 text-lg font-black leading-7 text-white">
                {primaryRecommendation
                  ?.title ??
                  briefingTitle}
              </p>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {primaryRecommendation
                  ?.explanation ??
                  decisionRationale}
              </p>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-cyan-300 transition-[width] duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        recommendationConfidence
                      )
                    )}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  Confidence
                </span>

                <span className="font-bold text-cyan-200">
                  {
                    recommendationConfidence
                  }
                  %
                </span>
              </div>
            </AtlasSurface>

            <AtlasSurface
              tone="subtle"
              className="p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Atlas Coaching
              </p>

              <p className="mt-3 text-sm font-semibold leading-7 text-zinc-200">
                {coachingResponse}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/5 bg-black/20 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Pipeline
                  </p>

                  <p className="mt-2 text-sm font-bold text-white">
                    {brainPipeline
                      .successful
                      ? "Operational"
                      : brainPipeline
                            .loading
                        ? "Processing"
                        : "Standby"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
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
                    {shouldActNow
                      ? "Priority"
                      : "Planned"}
                  </p>
                </div>
              </div>
            </AtlasSurface>
          </div>
        </div>

        <AtlasSurface
          tone="subtle"
          className="mt-4 p-5"
        >
          <div className="grid gap-5 lg:grid-cols-[160px_minmax(0,1fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Why Atlas Chose
                This
              </p>

              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Decision rationale
                generated from your
                current empire state.
              </p>
            </div>

            <p className="text-sm font-medium leading-7 text-zinc-300">
              {
                decisionRationale
              }
            </p>
          </div>
        </AtlasSurface>
      </AtlasHero>

      <AtlasGrid columns={4}>
        <AtlasMetric
          label="Empire Health"
          value={
            dashboard.empire
              .overallScore
          }
          description="Overall strategic strength"
          tone={empireHealthTone}
          trend={`${dashboard.empire.overallGrade} grade`}
        />

        <AtlasMetric
          label="Empire Grade"
          value={
            dashboard.empire
              .overallGrade
          }
          description="Current progression rating"
          tone="accent"
        />

        <AtlasMetric
          label="Current Stage"
          value={
            dashboard.summary
              .stage
          }
          description="Active empire phase"
          tone="default"
        />

        <AtlasMetric
          label="Available Cash"
          value={`$${dashboard.summary.cash.toLocaleString()}`}
          description="Capital ready for deployment"
          tone={confidenceTone}
        />
      </AtlasGrid>
    </div>
  );
}