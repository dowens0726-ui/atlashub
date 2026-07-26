import {
  AtlasIntelligenceStrip,
  AtlasMissionDisplay,
  AtlasOSRibbon,
} from "./mission-control";

import {
  ExecutiveCommandDeck,
  type ExecutiveMetric,
} from "./command-center/executive";

import {
  AtlasHeroScene,
  type AtlasHeroHudSignal,
} from "./command-center/hero";

import {
  buildAtlasBriefing,
  buildAtlasGreeting,
  buildAtlasImpact,
} from "@/app/intelligence";

import {
  buildAtlasWorldState,
} from "@/app/world";

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


function getConfidenceLabel(
  confidence:
    number
): string {
  if (
    confidence >= 85
  ) {
    return "High";
  }

  if (
    confidence >= 65
  ) {
    return "Moderate";
  }

  return "Review";
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

  const worldState =
    buildAtlasWorldState({
      empireScore,
      confidence,

      availableCash:
        dashboard.summary.cash,

      progressionStage:
        dashboard.summary.stage,

      shouldActNow,
    });

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

  const confidenceLabel =
    getConfidenceLabel(
      confidence
    );

  const executiveMetrics: ExecutiveMetric[] = [
    {
      label:
        "Mission Status",

      value:
        shouldActNow
          ? "Ready to Execute"
          : "Strategic Window",

      tone:
        shouldActNow
          ? "amber"
          : "cyan",
    },
    {
      label:
        "Session",

      value:
        `${fallbackBriefing.recommendedSessionMinutes} Minutes`,

      tone:
        "violet",
    },
    {
      label:
        "AI Confidence",

      value:
        `${confidence}%`,

      tone:
        confidence >= 75
          ? "cyan"
          : "amber",
    },
    {
      label:
        "Empire Posture",

      value:
        empireStatus.label,

      tone:
        empireScore >= 70
          ? "emerald"
          : empireScore >= 50
            ? "amber"
            : "rose",
    },
  ];

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
        "●",
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
        "●",
    },
    {
      label:
        "Progression",

      value:
        dashboard.summary.stage,

      tone:
        "violet",

      icon:
        "●",
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
        "●",
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
        "●",
    },
    {
      label:
        "Decision Core",

      value:
        pipelineStatusLabel,

      tone:
        brainPipeline.status ===
          "success"
          ? "emerald"
          : brainPipeline.status ===
              "warning"
            ? "amber"
            : brainPipeline.status ===
                "failed"
              ? "rose"
              : "cyan",

      icon:
        "●",
    },
    {
      label:
        "Session",

      value:
        `${fallbackBriefing.recommendedSessionMinutes} min`,

      tone:
        "violet",

      icon:
        "●",
    },
  ] satisfies Parameters<
    typeof AtlasIntelligenceStrip
  >[0]["signals"];

  const heroHudSignals: AtlasHeroHudSignal[] = [
    {
      label:
        "Empire Health",

      value:
        `${empireScore}/100`,

      detail:
        empireStatus.label,

      code:
        "EMP",

      tone:
        empireScore >= 70
          ? "emerald"
          : empireScore >= 50
            ? "amber"
            : "rose",

      position:
        "top-left",

      active:
        empireScore >= 70,
    },
    {
      label:
        "Atlas Confidence",

      value:
        `${confidence}%`,

      detail:
        pipelineStatusLabel,

      code:
        "AI",

      tone:
        confidence >= 75
          ? "cyan"
          : "amber",

      position:
        "top-right",

      active:
        brainPipeline.status ===
          "success",
    },
    {
      label:
        "Available Capital",

      value:
        `$${dashboard.summary.cash.toLocaleString()}`,

      detail:
        "Deployment ready",

      code:
        "CAP",

      tone:
        "emerald",

      position:
        "bottom-left",

      active:
        dashboard.summary.cash >
          0,
    },
    {
      label:
        "Mission Priority",

      value:
        urgencyLabel,

      detail:
        shouldActNow
          ? "Immediate execution"
          : "Strategic window",

      code:
        "MSN",

      tone:
        shouldActNow
          ? "amber"
          : "violet",

      position:
        "bottom-right",

      active:
        shouldActNow,
    },
  ];

  return (
    <div className="atlas-command-center-shell">
      <AtlasHeroScene
        hudSignals={heroHudSignals}
        worldState={worldState}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(139,92,246,0.12),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.04)_0%,rgba(2,6,23,0.14)_32%,rgba(2,6,23,0.86)_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
        />

        <ExecutiveCommandDeck
          greeting={greeting.greeting}
          pipelineStatusLabel={pipelineStatusLabel}
          pipelineIndicatorClasses={pipelineIndicatorClasses}
          pipelineStatusClasses={pipelineStatusClasses}
          urgencyLabel={urgencyLabel}
          urgencyClasses={urgencyClasses}
          title={recommendationTitle}
          summary={recommendationSummary}
          immediateNextStep={immediateNextStep}
          rationale={rationale}
          longTermDirection={longTermDirection}
          coachingResponse={coachingResponse}
          shouldActNow={shouldActNow}
          confidence={confidence}
          metrics={executiveMetrics}
          pipelineError={brainPipeline.error}
          missionDisplay={
            <AtlasMissionDisplay
              empireScore={empireScore}
              empireGrade={dashboard.empire.overallGrade}
              empireStatus={empireStatus.label}
              confidence={confidence}
              confidenceLabel={confidenceLabel}
              pipelineStatus={brainPipeline.status}
              pipelineStatusLabel={pipelineStatusLabel}
              pipelineIndicatorClasses={pipelineIndicatorClasses}
              urgencyLabel={urgencyLabel}
              shouldActNow={shouldActNow}
              stage={dashboard.summary.stage}
              cash={dashboard.summary.cash}
              coachingResponse={coachingResponse}
              operatingSummary={empireStatus.summary}
            />
          }
        />

        <footer className="relative z-20 border-t border-white/[0.07] bg-[linear-gradient(180deg,rgba(3,7,18,0.42),rgba(3,7,18,0.78))] p-3 backdrop-blur-xl sm:p-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent"
          />

          <div className="grid min-w-0 gap-3 2xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="min-w-0 overflow-hidden rounded-[1.35rem] border border-white/[0.06] bg-black/20">
              <div className="border-b border-white/[0.05] px-4 py-2.5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.75)]"
                    />

                    <p className="truncate text-[0.56rem] font-black uppercase tracking-[0.28em] text-cyan-200">
                      Live Intelligence
                    </p>
                  </div>

                  <p className="shrink-0 text-[0.52rem] font-bold uppercase tracking-[0.2em] text-zinc-600">
                    Tactical feed
                  </p>
                </div>
              </div>

              <div className="p-2.5">
                <AtlasIntelligenceStrip
                  signals={intelligenceSignals}
                />
              </div>
            </div>

            <div className="min-w-0">
              <AtlasOSRibbon
                pipelineStatusLabel={pipelineStatusLabel}
                pipelineIndicatorClasses={pipelineIndicatorClasses}
                cash={dashboard.summary.cash}
                stage={dashboard.summary.stage}
                empireScore={empireScore}
                confidence={confidence}
              />
            </div>
          </div>
        </footer>
      </AtlasHeroScene>
    </div>
  );
}