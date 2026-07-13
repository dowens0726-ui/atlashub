"use client";

import {
  useMemo,
} from "react";

import {
  ActivityFeed,
} from "@/app/components/activity";

import {
  AchievementList,
} from "@/app/components/achievements";

import {
  CommandCenterHero,
  CommandCenterLayout,
  DashboardObjectives,
  DashboardSummary,
  EmpireInsights,
  EmpireScoreCard,
  LiveEmpireCard,
} from "@/app/components/dashboard";

import {
  AtlasAIPanel,
  AtlasLiveEventToast,
  AtlasSessionPlanCard,
} from "@/app/components/intelligence";

import {
  useAtlasIntelligence,
} from "@/app/hooks/useAtlasIntelligence";

import {
  useDashboard,
} from "@/app/hooks/useDashboard";

import {
  buildAtlasBrain,
} from "@/app/intelligence";


export default function DashboardClient() {
  const dashboard =
    useDashboard();

  const {
    decisions,
    actions,
    outcomes,
    validations,
  } =
    useAtlasIntelligence();


  const intelligence =
    useMemo(
      () =>
        buildAtlasBrain({
          profile:
            dashboard.profile,

          empire:
            dashboard.empire,

          history: {
            decisions,

            actions,

            outcomes,

            validations,
          },
        }),
      [
        dashboard.profile,
        dashboard.empire,
        decisions,
        actions,
        outcomes,
        validations,
      ]
    );


  return (
    <>
      <AtlasLiveEventToast />

      <CommandCenterLayout
        hero={
          <CommandCenterHero
            dashboard={
              dashboard
            }
          />
        }


        overview={
          <div className="space-y-8">
            <LiveEmpireCard
              profile={
                dashboard.profile
              }
            />

            <EmpireScoreCard
              empire={
                dashboard.empire
              }
            />

            <DashboardSummary
              dashboard={
                dashboard
              }
            />
          </div>
        }


        atlas={
          <AtlasAIPanel
            coachBriefing={
              intelligence
                .coachBriefing
            }

            recommendation={
              intelligence
                .atlasRecommendation
            }

            recommendationWeighting={
              intelligence
                .recommendationWeighting
            }

            intelligenceTimeline={
              intelligence
                .intelligenceTimeline
            }

            personalPicks={
              intelligence
                .personalPicks
            }

            reasoning={
              intelligence
                .atlasReasoning
            }

            nextAction={
              intelligence
                .nextAction
            }

            impact={
              intelligence
                .atlasImpact
            }

            forecast={
              intelligence
                .empireForecast
            }

            simulation={
              intelligence
                .empireSimulation
            }

            strategyReport={
              intelligence
                .strategyReport
            }

            adaptiveStrategy={
              intelligence
                .adaptiveStrategy
            }

            strategyFeedback={
              intelligence
                .strategyFeedback
            }

            strategicPlan={
              intelligence
                .strategicPlan
            }

            missionStrategy={
              intelligence
                .missionStrategy
            }

            missionLearning={
              intelligence
                .missionLearning
            }

            missionOutcome={
              intelligence
                .missionOutcome
            }

            missionLearningUpdate={
              intelligence
                .missionLearningUpdate
            }

            learningProfile={
              intelligence
                .learningProfile
            }

            behaviorProfile={
              intelligence
                .behaviorProfile
            }

            playerAction={
              intelligence
                .playerAction
            }

            outcome={
              intelligence
                .outcome
            }

            outcomeValidation={
              intelligence
                .outcomeValidation
            }

            playerIdentity={
              intelligence
                .playerIdentity
            }

            identityAdvisor={
              intelligence
                .identityAdvisor
            }

            memoryInsight={
              intelligence
                .memoryInsight
            }

            timeline={
              intelligence
                .empireTimeline
            }

            memory={
              intelligence
                .atlasMemory
            }

            memoryHistory={
              intelligence
                .memoryHistory
            }

            dailyObjectives={
              intelligence
                .dailyObjectives
            }

            insights={
              intelligence
                .intelligenceFeed
            }
          />
        }


        session={
          <AtlasSessionPlanCard
            plan={
              intelligence
                .sessionPlan
            }

            reasoning={
              intelligence
                .sessionReasoning
            }
          />
        }


        insights={
          <EmpireInsights
            insights={
              dashboard
                .empire
                .insights
            }
          />
        }


        objectives={
          <DashboardObjectives
            objectives={
              dashboard.objectives
            }
          />
        }


        activity={
          <ActivityFeed />
        }


        achievements={
          <AchievementList />
        }
      />
    </>
  );
}