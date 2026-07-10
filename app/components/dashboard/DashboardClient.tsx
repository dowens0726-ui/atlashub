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

import { buildDashboardIntelligence } from "@/app/intelligence";
import { useDashboard } from "@/app/hooks/useDashboard";

export default function DashboardClient() {
  const dashboard = useDashboard();

  const intelligence = buildDashboardIntelligence(
    dashboard.profile,
    dashboard.empire
  );

  return (
    <CommandCenterLayout
      hero={
        <CommandCenterHero dashboard={dashboard} />
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
          recommendation={
            intelligence.atlasRecommendation
          }

          personalPicks={
            intelligence.personalPicks
          }

          reasoning={
            intelligence.atlasReasoning
          }

          nextAction={
            intelligence.nextAction
          }

          impact={
            intelligence.atlasImpact
          }

          forecast={
            intelligence.empireForecast
          }

          simulation={
            intelligence.empireSimulation
          }

          strategyReport={
            intelligence.strategyReport
          }

          learningProfile={
            intelligence.learningProfile
          }

          playerAction={
            intelligence.playerAction
          }

          outcome={
            intelligence.outcome
          }

          outcomeValidation={
            intelligence.outcomeValidation
          }

          playerIdentity={
            intelligence.playerIdentity
          }

          identityAdvisor={
            intelligence.identityAdvisor
          }

          memoryInsight={
            intelligence.memoryInsight
          }

          adaptiveStrategy={
            intelligence.adaptiveStrategy
          }

          timeline={
            intelligence.empireTimeline
          }

          memory={
            intelligence.atlasMemory
          }

          memoryHistory={
            intelligence.memoryHistory
          }

          dailyObjectives={
            intelligence.dailyObjectives
          }

          insights={
            intelligence.intelligenceFeed
          }
        />
      }

      session={
        <AtlasSessionPlanCard
          plan={intelligence.sessionPlan}
          reasoning={intelligence.sessionReasoning}
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

      activity={
        <ActivityFeed />
      }

      achievements={
        <AchievementList />
      }
    />
  );
}