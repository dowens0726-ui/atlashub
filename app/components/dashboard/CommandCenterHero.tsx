import AtlasButton from "@/app/components/design-system/AtlasButton";
import AtlasGrid from "@/app/components/design-system/AtlasGrid";
import AtlasHero from "@/app/components/design-system/AtlasHero";
import AtlasMetric from "@/app/components/design-system/AtlasMetric";
import AtlasSurface from "@/app/components/design-system/AtlasSurface";
import {
  AtlasIntelligenceStrip,
  AtlasMissionDisplay,
  AtlasOSRibbon,
} from "./mission-control";

import {
  buildAtlasBriefing,
  buildAtlasGreeting,
  buildAtlasImpact,
} from "@/app/intelligence";

import type {
  AtlasMetricTone,
} from "@/app/components/design-system/AtlasMetric";

import type {
  UseAtlasBrainPipelineResult,
} from "@/app/hooks/useAtlasBrainPipeline";

import type {
  DashboardModel,
} from "@/app/services";


type CommandCenterHeroProps = {
  dashboard:
    DashboardModel;

  brainPipeline:
    UseAtlasBrainPipelineResult;
};


function normalizePercentage(
  value:
    number
): number {
  const percentage =
    value <= 1
      ? value * 100
      : value;

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        percentage
      )
    )
  );
}


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


function getEmpireStatus(
  score:
    number
): {
  label:
    string;

  summary:
    string;
} {
  if (
    score >= 85
  ) {
    return {
      label:
        "Thriving",

      summary:
        "Your empire is operating from a position of strength with healthy momentum and room to expand.",
    };
  }

  if (
    score >= 70
  ) {
    return {
      label:
        "Growing",

      summary:
        "Your empire is progressing well. Atlas has identified the move most likely to preserve momentum.",
    };
  }

  if (
    score >= 50
  ) {
    return {
      label:
        "Developing",

      summary:
        "Your foundation is taking shape, but your next decision should prioritize stability and efficient progression.",
    };
  }

  return {
    label:
      "At Risk",

    summary:
      "Your empire needs a focused recovery move before committing resources to broader expansion.",
  };
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
      return "Brain Online";

    case "warning":
      return "Online with Warnings";

    case "failed":
      return "Limited Intelligence";

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
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";

    case "warning":
      return "border-amber-400/20 bg-amber-400/10 text-amber-200";

    case "failed":
      return "border-rose-400/20 bg-rose-400/10 text-rose-200";

    case "loading":
      return "border-cyan-400/20 bg-cyan-400/10 text-cyan-200";

    case "waiting":
    case "idle":
    default:
      return "border-white/10 bg-white/[0.04] text-zinc-300";
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
      return "bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]";

    case "warning":
      return "bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.85)]";

    case "failed":
      return "bg-rose-300 shadow-[0_0_14px_rgba(253,164,175,0.85)]";

    case "loading":
      return "animate-pulse bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]";

    case "waiting":
    case "idle":
    default:
      return "bg-zinc-400";
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
    return "Priority Action";
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
    return "border-amber-400/20 bg-amber-400/10 text-amber-200";
  }

  return "border-cyan-400/20 bg-cyan-400/10 text-cyan-200";
}


export default function CommandCenterHero({
  dashboard,
  brainPipeline,
}: CommandCenterHeroProps) {
  const decision =
    brainPipeline.decision;

  const primaryRecommendation =
    brainPipeline.primaryRecommendation;

  const rawConfidence =
    decision?.confidence ??
    primaryRecommendation?.confidence ??
    dashboard.recommendation?.confidence ??
    90;

  const confidence =
    normalizePercentage(
      rawConfidence
    );

  const greeting =
    buildAtlasGreeting(
      dashboard.profile
    );

  const impact =
    buildAtlasImpact(
      rawConfidence
    );

  const fallbackBriefing =
    buildAtlasBriefing(
      dashboard.profile,
      impact
    );

  const recommendationTitle =
    decision?.headline ??
    primaryRecommendation?.title ??
    fallbackBriefing.title;

  const recommendationSummary =
    decision?.summary ??
    primaryRecommendation?.explanation ??
    fallbackBriefing.summary;

  const immediateNextStep =
    decision?.immediateNextStep ??
    primaryRecommendation?.explanation ??
    fallbackBriefing.objective;

  const rationale =
    decision?.rationale ??
    primaryRecommendation?.explanation ??
    "Atlas is balancing your available resources, current progression, strategic identity, and the highest-value action currently available.";

  const longTermDirection =
    decision?.longTermDirection ??
    "Continue building momentum while preserving enough capital and flexibility for the next high-impact opportunity.";

  const coachingResponse =
    decision?.coachingResponse ??
    "Complete the priority action before redirecting resources. The next measurable gain matters more than adding another competing objective.";

  const shouldActNow =
    decision?.shouldActNow ??
    false;

  const empireScore =
    dashboard.empire.overallScore;

  const empireStatus =
    getEmpireStatus(
      empireScore
    );

  const empireHealthTone =
    getEmpireHealthTone(
      empireScore
    );

  const confidenceTone =
    getConfidenceTone(
      confidence
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

  const urgencyLabel =
    getUrgencyLabel(
      decision?.urgency,
      shouldActNow
    );

  const urgencyClasses =
    getUrgencyClasses(
      shouldActNow
    );

  const intelligenceSignals = [
    {
      label:
        "Empire Health",

      value:
        `${empireScore}/100`,

      tone:
        empireScore >= 70
          ? "emerald"
          : empireScore >= 50
            ? "amber"
            : "rose",

      icon:
        empireScore >= 70
          ? "▲"
          : "◆",
    },
    {
      label:
        "Atlas Confidence",

      value:
        `${confidence}%`,

      tone:
        confidence >= 75
          ? "cyan"
          : "amber",

      icon:
        "●",
    },
    {
      label:
        "Capital",

      value:
        `$${dashboard.summary.cash.toLocaleString()}`,

      tone:
        "emerald",

      icon:
        "▲",
    },
    {
      label:
        "Progression",

      value:
        dashboard.summary.stage,

      tone:
        "violet",

      icon:
        "◆",
    },
    {
      label:
        "Mission State",

      value:
        urgencyLabel,

      tone:
        shouldActNow
          ? "amber"
          : "cyan",

      icon:
        shouldActNow
          ? "⚡"
          : "●",
    },
    {
      label:
        "Empire Grade",

      value:
        dashboard.empire.overallGrade,

      tone:
        empireScore >= 70
          ? "emerald"
          : "neutral",

      icon:
        "▲",
    },
    {
      label:
        "Decision Core",

      value:
        pipelineStatusLabel,

      tone:
        brainPipeline.status === "success"
          ? "emerald"
          : brainPipeline.status === "warning"
            ? "amber"
            : brainPipeline.status === "failed"
              ? "rose"
              : "cyan",

      icon:
        brainPipeline.status === "loading"
          ? "◌"
          : "●",
    },
    {
      label:
        "Session",

      value:
        `${fallbackBriefing.recommendedSessionMinutes} min`,

      tone:
        "violet",

      icon:
        "◆",
    },
  ] satisfies Parameters<
    typeof AtlasIntelligenceStrip
  >[0]["signals"];

  return (
    <div className="atlas-command-center-shell space-y-6">
      <AtlasOSRibbon
        pipelineStatusLabel={pipelineStatusLabel}
        pipelineIndicatorClasses={pipelineIndicatorClasses}
        cash={dashboard.summary.cash}
        stage={dashboard.summary.stage}
        empireScore={empireScore}
        confidence={confidence}
      />

      <AtlasIntelligenceStrip
        signals={intelligenceSignals}
      />

      <AtlasHero
        layout="stacked"
        eyebrow={`Atlas AI · ${greeting.greeting}, Commander`}
        title="Strategic Mission Control"
        description="One connected view of your empire, Atlas intelligence, and the highest-impact move available right now."
        actions={
          <>
            <AtlasButton href="/planner">
              Execute Session Plan
            </AtlasButton>

            <AtlasButton
              href="/copilot"
              variant="secondary"
            >
              Open Atlas Copilot
            </AtlasButton>
          </>
        }
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-black/35 shadow-[0_30px_100px_-55px_rgba(34,211,238,0.35)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(34,211,238,0.15),transparent_34%),radial-gradient(circle_at_92%_12%,rgba(139,92,246,0.13),transparent_30%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent"
          />

          <div className="relative border-b border-white/[0.07] px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={[
                    "h-2 w-2 rounded-full",
                    pipelineIndicatorClasses,
                  ].join(" ")}
                />

                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-cyan-300">
                    Atlas Decision Core
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Live strategic interpretation
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={[
                    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold",
                    pipelineStatusClasses,
                  ].join(" ")}
                >
                  {pipelineStatusLabel}
                </span>

                <span
                  className={[
                    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold capitalize",
                    urgencyClasses,
                  ].join(" ")}
                >
                  {urgencyLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="relative grid xl:grid-cols-[minmax(0,1.35fr)_minmax(310px,0.65fr)]">
            <section className="p-5 sm:p-7 lg:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Atlas Recommends
              </p>

              <h2 className="mt-4 max-w-5xl text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                {recommendationTitle}
              </h2>

              <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-400 sm:text-base">
                {recommendationSummary}
              </p>

              {brainPipeline.error ? (
                <div className="mt-6 rounded-2xl border border-rose-400/15 bg-rose-400/[0.05] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">
                    Pipeline Notice
                  </p>

                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {brainPipeline.error}
                  </p>
                </div>
              ) : null}

              <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.55fr)]">
                <AtlasSurface
                  tone="subtle"
                  className="p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                      Immediate Next Action
                    </p>

                    <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.07] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-cyan-200">
                      Execute
                    </span>
                  </div>

                  <p className="mt-4 text-lg font-bold leading-8 text-white">
                    {immediateNextStep}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                    <span className="text-xs text-zinc-500">
                      Recommended session
                    </span>

                    <span className="text-sm font-black text-cyan-200">
                      {fallbackBriefing.recommendedSessionMinutes} minutes
                    </span>
                  </div>
                </AtlasSurface>

                <AtlasSurface
                  tone="subtle"
                  className="p-5 sm:p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
                    Current Posture
                  </p>

                  <p className="mt-4 text-2xl font-black text-white">
                    {shouldActNow
                      ? "Act Now"
                      : "Planned"}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    Atlas has classified this recommendation as a{" "}
                    <span className="font-semibold text-zinc-300">
                      {urgencyLabel.toLowerCase()}
                    </span>{" "}
                    decision.
                  </p>
                </AtlasSurface>
              </div>

              <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
                <div className="grid gap-5 lg:grid-cols-[190px_minmax(0,1fr)]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                      Why Atlas Chose This
                    </p>

                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                      Reasoning derived from your live empire state.
                    </p>
                  </div>

                  <p className="text-sm font-medium leading-7 text-zinc-300">
                    {rationale}
                  </p>
                </div>
              </div>
            </section>


            <AtlasMissionDisplay
              empireScore={empireScore}
              empireGrade={dashboard.empire.overallGrade}
              empireStatus={empireStatus.label}
              confidence={confidence}
              confidenceLabel={
                confidence >= 85
                  ? "High"
                  : confidence >= 65
                    ? "Moderate"
                    : "Review"
              }
              pipelineStatusLabel={pipelineStatusLabel}
              pipelineIndicatorClasses={pipelineIndicatorClasses}
              urgencyLabel={urgencyLabel}
              shouldActNow={shouldActNow}
              stage={dashboard.summary.stage}
              coachingResponse={coachingResponse}
              operatingSummary={empireStatus.summary}
            />
          </div>

          <div className="relative grid border-t border-white/[0.07] md:grid-cols-3">
            <div className="p-5 sm:p-6 md:border-r md:border-white/[0.07]">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Long-Term Direction
              </p>

              <p className="mt-3 text-sm font-semibold leading-6 text-zinc-200">
                {longTermDirection}
              </p>
            </div>

            <div className="border-t border-white/[0.07] p-5 sm:p-6 md:border-r md:border-t-0 md:border-white/[0.07]">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Available Capital
              </p>

              <p className="mt-3 text-2xl font-black tracking-tight text-white">
                ${dashboard.summary.cash.toLocaleString()}
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                Ready for strategic deployment
              </p>
            </div>

            <div className="border-t border-white/[0.07] p-5 sm:p-6 md:border-t-0">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Empire Stage
              </p>

              <p className="mt-3 text-2xl font-black tracking-tight text-white">
                {dashboard.summary.stage}
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                Current progression phase
              </p>
            </div>
          </div>
        </div>
      </AtlasHero>

      <AtlasGrid
        columns={4}
        className="gap-4"
      >
        <AtlasMetric
          label="Empire Health"
          value={empireScore}
          description="Overall strategic strength"
          tone={empireHealthTone}
          trend={`${dashboard.empire.overallGrade} grade`}
        />

        <AtlasMetric
          label="Atlas Confidence"
          value={`${confidence}%`}
          description="Decision reliability"
          tone={confidenceTone}
          trend={
            confidence >= 85
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



