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
  buildAtlasReasoning,
  buildDailyObjectives,
  buildEmpireForecast,
  buildEmpireTimeline,
  buildIntelligenceFeed,
  buildNextAction,
  buildSessionPlan,
  buildSessionReasoning,
  getAtlasAdvisorRecommendations,
  getPrimaryAtlasRecommendation,
} from "@/app/intelligence";

import { useDashboard } from "@/app/hooks/useDashboard";

export default function DashboardClient() {
  const dashboard = useDashboard();

  // Recommendation
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

  // Session
  const sessionPlan = buildSessionPlan(
    dashboard.profile,
    atlasRecommendations
  );

  const sessionReasoning =
    buildSessionReasoning(sessionPlan);

  // Next Action
  const nextAction = buildNextAction(
    dashboard.profile,
    atlasRecommendation,
    sessionReasoning
  );

  // Impact
  const atlasImpact =
    buildAtlasImpact(nextAction.confidence);

  // Forecast
  const empireForecast =
    buildEmpireForecast(
      dashboard.profile,
      dashboard.empire,
      atlasImpact
    );

  // Timeline
  const empireTimeline =
    buildEmpireTimeline(empireForecast);

  // Objectives
  const dailyObjectives =
    buildDailyObjectives(
      dashboard.profile,
      nextAction,
      empireForecast
    );

  // Intelligence
  const intelligenceFeed =
    buildIntelligenceFeed(
      dashboard.profile
    );

  return (
    <CommandCenterLayout
      hero={
        <CommandCenterHero
          dashboard={dashboard}
        />
      }

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
          timeline={empireTimeline}
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

      insights={
        <EmpireInsights
          insights={dashboard.empire.insights}
        />
      }

      objectives={
        <DashboardObjectives
          objectives={dashboard.objectives}
        />
      }

      activity={<ActivityFeed />}

      achievements={<AchievementList />}
    />
  );
}