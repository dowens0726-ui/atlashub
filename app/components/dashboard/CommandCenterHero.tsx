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
  dashboard: DashboardModel;
  brainPipeline: UseAtlasBrainPipelineResult;
};

function getEmpireHealthTone(
  score: number
): AtlasMetricTone {
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

function getConfidenceTone(
  confidence: number
): AtlasMetricTone {
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

function getPipelineStatusLabel(
  brainPipeline: UseAtlasBrainPipelineResult
): string {
  switch (brainPipeline.status) {
    case "waiting":
      return "Awaiting Data";

    case "loading":
      return "Analyzing";

    case "success":
      return "AI Online";

    case "warning":
      return "Review Required";

    case "failed":
      return "AI Limited";

    case "idle":
    default:
      return "AI Standby";
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
      return "bg-emerald-300";

    case "warning":
      return "bg-amber-300";

    case "failed":
      return "bg-red-300";

    case "loading":
      return "bg-cyan-300 animate-pulse";

    case "waiting":
    case "idle":
    default:
      return "bg-zinc-300";
  }
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
    dashboard.recommendation?.confidence ?? 90;

  const recommendationConfidence =
    decision?.confidence ??
    primaryRecommendation?.confidence ??
    fallbackConfidence;

  const greeting =
    buildAtlasGreeting(
      dashboard.profile
    );

  const impact =
    buildAtlasImpact(
      recommendationConfidence
    );

  const briefing =
    buildAtlasBriefing(
      dashboard.profile,
      impact
    );

  const briefingTitle =
    decision?.headline ??
    primaryRecommendation?.title ??
    briefing.title;

  const briefingSummary =
    decision?.summary ??
    primaryRecommendation?.explanation ??
    briefing.summary;

  const primaryObjective =
    decision?.immediateNextStep ??
    primaryRecommendation?.explanation ??
    briefing.objective;

  const empireHealthTone =
    getEmpireHealthTone(
      dashboard.empire.overallScore
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

  return (
    <div className="space-y-6">
      <AtlasHero
        eyebrow={`Atlas AI · ${greeting.greeting}, Commander`}
        title="Empire Command Center"
        description={greeting.subtitle}
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
        <AtlasSurface
          tone="subtle"
          className="p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Active Briefing
            </p>

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

              {pipelineStatusLabel}
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-black tracking-tight text-white">
            {briefingTitle}
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            {briefingSummary}
          </p>

          {brainPipeline.error ? (
            <div className="mt-4 rounded-2xl border border-red-400/15 bg-red-400/[0.05] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                Pipeline Notice
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {brainPipeline.error}
              </p>
            </div>
          ) : null}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Recommended Session
              </p>

              <p className="mt-2 text-xl font-black text-cyan-200">
                {briefing.recommendedSessionMinutes} min
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Decision Confidence
              </p>

              <p className="mt-2 text-xl font-black text-emerald-300">
                {recommendationConfidence}%
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Immediate Next Step
            </p>

            <p className="mt-2 text-sm font-semibold leading-6 text-white">
              {primaryObjective}
            </p>
          </div>
        </AtlasSurface>
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
          label="Empire Grade"
          value={dashboard.empire.overallGrade}
          description="Current progression rating"
          tone="accent"
        />

        <AtlasMetric
          label="Current Stage"
          value={dashboard.summary.stage}
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