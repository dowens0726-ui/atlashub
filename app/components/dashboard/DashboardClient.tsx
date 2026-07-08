"use client";

import { ActivityFeed } from "@/app/components/activity";
import { AchievementList } from "@/app/components/achievements";

import {
  CommandCenterHero,
  CommandCenterLayout,
  DashboardSummary,
  DashboardObjectives,
  EmpireInsights,
  EmpireScoreCard,
  LiveEmpireCard,
} from "@/app/components/dashboard";

import {
  AtlasAIPanel,
  AtlasSessionPlanCard,
} from "@/app/components/intelligence";

import {
  buildAtlasImpact,
  buildAtlasMemory,
  buildAtlasReasoning,
  buildDailyObjectives,
  buildEmpireForecast,
  buildEmpireSimulation,
  buildEmpireTimeline,
  buildIntelligenceFeed,
  buildMemoryHistory,
  buildNextAction,
  buildSessionPlan,
  buildSessionReasoning,
  getAtlasAdvisorRecommendations,
  getPrimaryAtlasRecommendation,
} from "@/app/intelligence";

import { useDashboard } from "@/app/hooks/useDashboard";

export default function DashboardClient() {
  const dashboard = useDashboard();

  const atlasRecommendations = getAtlasAdvisorRecommendations(
    dashboard.profile
  );

  const atlasRecommendation = getPrimaryAtlasRecommendation(
    dashboard.profile
  );

  const atlasReasoning = buildAtlasReasoning(
    dashboard.profile,
    atlasRecommendation
  );

  const sessionPlan = buildSessionPlan(
    dashboard.profile,
    atlasRecommendations
  );

  const sessionReasoning = buildSessionReasoning(sessionPlan);

  const nextAction = buildNextAction(
    dashboard.profile,
    atlasRecommendation,
    sessionReasoning
  );

  const atlasImpact = buildAtlasImpact(nextAction.confidence);

  const empireForecast = buildEmpireForecast(
    dashboard.profile,
    dashboard.empire,
    atlasImpact
  );

  const empireSimulation = buildEmpireSimulation(
    dashboard.profile,
    atlasRecommendation
  );

  const empireTimeline = buildEmpireTimeline(empireForecast);

  const dailyObjectives = buildDailyObjectives(
    dashboard.profile,
    nextAction,
    empireForecast
  );

  const atlasMemory = buildAtlasMemory(
    dashboard.profile,
    nextAction,
    empireForecast
  );

  const memoryHistory = buildMemoryHistory(atlasMemory);

  const intelligenceFeed = buildIntelligenceFeed(dashboard.profile);

  return (
    <CommandCenterLayout
      hero={<CommandCenterHero dashboard={dashboard} />}
      overview={
        <div className="space-y-8">
          <LiveEmpireCard profile={dashboard.profile} />

          <EmpireScoreCard empire={dashboard.empire} />

          <DashboardSummary dashboard={dashboard} />
        </div>
      }
      atlas={
        <AtlasAIPanel
          recommendation={atlasRecommendation}
          reasoning={atlasReasoning}
          nextAction={nextAction}
          impact={atlasImpact}
          forecast={empireForecast}
          simulation={empireSimulation}
          timeline={empireTimeline}
          memory={atlasMemory}
          memoryHistory={memoryHistory}
          dailyObjectives={dailyObjectives}
          insights={intelligenceFeed}
        />
      }
      session={
        <AtlasSessionPlanCard
          plan={sessionPlan}
          reasoning={sessionReasoning}
        />
      }
      insights={<EmpireInsights insights={dashboard.empire.insights} />}
      objectives={<DashboardObjectives objectives={dashboard.objectives} />}
      activity={<ActivityFeed />}
      achievements={<AchievementList />}
    />
  );
}