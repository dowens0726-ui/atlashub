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

import type { DashboardModel } from "@/app/services";

import type { AtlasMetricTone } from "@/app/components/design-system/AtlasMetric";

type CommandCenterHeroProps = {
  dashboard: DashboardModel;
};

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

export default function CommandCenterHero({
  dashboard,
}: CommandCenterHeroProps) {
  const recommendationConfidence =
    dashboard.recommendation?.confidence ?? 90;

  const greeting = buildAtlasGreeting(dashboard.profile);
  const impact = buildAtlasImpact(recommendationConfidence);
  const briefing = buildAtlasBriefing(
    dashboard.profile,
    impact
  );

  const empireHealthTone = getEmpireHealthTone(
    dashboard.empire.overallScore
  );

  const confidenceTone = getConfidenceTone(
    recommendationConfidence
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

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-emerald-300"
              />
              AI Online
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-black tracking-tight text-white">
            {briefing.title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            {briefing.summary}
          </p>

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
                Confidence
              </p>

              <p className="mt-2 text-xl font-black text-emerald-300">
                {recommendationConfidence}%
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Primary Objective
            </p>

            <p className="mt-2 text-sm font-semibold leading-6 text-white">
              {briefing.objective}
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