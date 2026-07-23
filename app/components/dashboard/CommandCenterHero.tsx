import AtlasButton from "@/app/components/design-system/AtlasButton";
import AtlasHero from "@/app/components/design-system/AtlasHero";
import AtlasSurface from "@/app/components/design-system/AtlasSurface";
import {
  AtlasIntelligenceStrip,
  AtlasMissionDisplay,
  AtlasOSRibbon,
} from "./mission-control";

import {
  AtlasHeroScene,
  type AtlasHeroHudSignal,
} from "./command-center/hero";

import {
  buildAtlasBriefing,
  buildAtlasGreeting,
  buildAtlasImpact,
} from "@/app/intelligence";

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
          ? "â—"
          : "â—",
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
        "â—",
    },
    {
      label:
        "Capital",

      value:
        `$${dashboard.summary.cash.toLocaleString()}`,

      tone:
        "emerald",

      icon:
        "â—",
    },
    {
      label:
        "Progression",

      value:
        dashboard.summary.stage,

      tone:
        "violet",

      icon:
        "â—",
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
          ? "â—"
          : "â—",
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
        "â—",
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
          ? "â—"
          : "â—",
    },
    {
      label:
        "Session",

      value:
        `${fallbackBriefing.recommendedSessionMinutes} min`,

      tone:
        "violet",

      icon:
        "â—",
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
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(139,92,246,0.12),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.04)_0%,rgba(2,6,23,0.14)_32%,rgba(2,6,23,0.86)_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
        />

        <div className="relative min-h-[760px]">
          <header className="relative z-20 flex flex-col gap-5 px-5 pb-3 pt-5 sm:px-7 lg:px-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  aria-hidden="true"
                  className={[
                    "h-2.5 w-2.5 rounded-full",
                    pipelineIndicatorClasses,
                  ].join(" ")}
                />

                <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-cyan-300">
                  Atlas
                </p>

                <span className="hidden h-3 w-px bg-white/10 sm:block" />

                <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-zinc-400">
                  AI Operating System
                </p>
              </div>

              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {greeting.greeting}, Commander
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em]",
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
              </span>

              <span
                className={[
                  "inline-flex items-center rounded-full border px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em]",
                  urgencyClasses,
                ].join(" ")}
              >
                {urgencyLabel}
              </span>
            </div>
          </header>

          <div className="relative z-10 grid min-w-0 2xl:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)]">
            <main className="flex min-w-0 flex-col justify-between px-5 pb-6 pt-8 sm:px-7 lg:px-8 lg:pb-8 lg:pt-12">
              <div className="max-w-5xl">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.3em] text-cyan-300">
                    Today&apos;s Strategic Directive
                  </p>

                  <span className="h-px w-12 bg-gradient-to-r from-cyan-300/70 to-transparent" />

                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    {fallbackBriefing.recommendedSessionMinutes} minute operation
                  </p>
                </div>

                <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[0.96] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl 2xl:text-7xl">
                  {recommendationTitle}
                </h1>

                <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-zinc-300 sm:text-base">
                  {recommendationSummary}
                </p>

                <div className="mt-7 max-w-4xl rounded-[1.65rem] border border-cyan-300/15 bg-black/35 p-5 shadow-[0_24px_80px_-52px_rgba(34,211,238,0.95)] backdrop-blur-xl sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[0.6rem] font-black uppercase tracking-[0.26em] text-cyan-300">
                        Atlas Recommendation
                      </p>

                      <p className="mt-2 text-xs text-zinc-500">
                        Highest-value action detected for your current empire state
                      </p>
                    </div>

                    <span
                      className={[
                        "rounded-full border px-3 py-1.5 text-[0.58rem] font-black uppercase tracking-[0.18em]",
                        urgencyClasses,
                      ].join(" ")}
                    >
                      {shouldActNow
                        ? "Execute Now"
                        : "Strategic Window"}
                    </span>
                  </div>

                  <p className="mt-5 text-xl font-black leading-8 text-white sm:text-2xl">
                    {immediateNextStep}
                  </p>

                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                      <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-cyan-300">
                        Why This Matters
                      </p>

                      <p className="mt-3 text-sm leading-6 text-zinc-300">
                        {rationale}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                      <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-violet-300">
                        Strategic Direction
                      </p>

                      <p className="mt-3 text-sm leading-6 text-zinc-300">
                        {longTermDirection}
                      </p>
                    </div>
                  </div>

                  {brainPipeline.error ? (
                    <div className="mt-4 rounded-2xl border border-rose-400/15 bg-rose-400/[0.06] p-4">
                      <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-rose-300">
                        Pipeline Notice
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        {brainPipeline.error}
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <AtlasButton href="/planner">
                      Execute Atlas Plan
                    </AtlasButton>

                    <AtlasButton
                      href="/copilot"
                      variant="secondary"
                    >
                      Review with Copilot
                    </AtlasButton>

                    <div className="ml-0 flex items-center gap-3 rounded-full border border-white/[0.07] bg-black/25 px-4 py-2 sm:ml-auto">
                      <div>
                        <p className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
                          Confidence
                        </p>

                        <p className="text-sm font-black text-cyan-100">
                          {confidence}%
                        </p>
                      </div>

                      <div className="h-7 w-px bg-white/[0.08]" />

                      <div>
                        <p className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
                          Posture
                        </p>

                        <p
                          className={[
                            "text-sm font-black",
                            shouldActNow
                              ? "text-amber-200"
                              : "text-violet-200",
                          ].join(" ")}
                        >
                          {shouldActNow
                            ? "Act Now"
                            : "Planned"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/[0.06] bg-black/25 px-4 py-3 backdrop-blur-md sm:px-5">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.8)]"
                  />

                  <div>
                    <p className="text-[0.56rem] font-black uppercase tracking-[0.22em] text-violet-300">
                      Atlas Coaching
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-6 text-zinc-200">
                      {coachingResponse}
                    </p>
                  </div>
                </div>
              </div>
            </main>

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
          </div>

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
        </div>
      </AtlasHeroScene>
    </div>
  );
}

