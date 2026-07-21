"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
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
  CommandCenterOverview,
  DashboardObjectives,
  EmpireInsights,
} from "@/app/components/dashboard";

import {
  MissionControlEnvironment,
} from "@/app/components/dashboard/mission-control";

import {
  AtlasAIPanel,
  AtlasLiveEventToast,
  AtlasRoadmapCard,
  AtlasSessionChangesCard,
  AtlasSessionPlanCard,
} from "@/app/components/intelligence";

import {
  useAtlasBrainPipeline,
} from "@/app/hooks/useAtlasBrainPipeline";

import {
  useAtlasIntelligence,
} from "@/app/hooks/useAtlasIntelligence";

import {
  useDashboard,
} from "@/app/hooks/useDashboard";

import {
  buildAtlasBrainCopilot,
  buildAtlasBrainSnapshot,
  buildDashboardComposer,
  runAtlasSessionPersistence,
} from "@/app/intelligence";

import type {
  AtlasEventBus,
} from "@/app/intelligence";


export default function DashboardClient() {
  const dashboard =
    useDashboard();

  const {
    decisions,
    actions,
    outcomes,
    validations,
    hydrated,
  } =
    useAtlasIntelligence();

  const [
    eventBus,
    setEventBus,
  ] =
    useState<
      AtlasEventBus | null
    >(null);

  const processedSnapshotRef =
    useRef<
      string | null
    >(null);


  const dashboardIntelligence =
    useMemo(
      () =>
        buildDashboardComposer({
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


  const intelligence =
    dashboardIntelligence.brain;


  const brainPipeline =
    useAtlasBrainPipeline({
      brain:
        intelligence,

      profile:
        dashboard.profile,

      empire:
        dashboard.empire,

      hydrated,

      source:
        "dashboard",
    });


  const copilot =
    useMemo(
      () =>
        buildAtlasBrainCopilot(
          intelligence
        ),
      [
        intelligence,
      ]
    );


  const currentSnapshot =
    useMemo(
      () =>
        buildAtlasBrainSnapshot({
          brain:
            intelligence,

          copilot,

          profile:
            dashboard.profile,

          empire:
            dashboard.empire,
        }),
      [
        intelligence,
        copilot,
        dashboard.profile,
        dashboard.empire,
      ]
    );


  useEffect(
    () => {
      const snapshotSignature =
        JSON.stringify(
          currentSnapshot
        );

      if (
        processedSnapshotRef.current ===
        snapshotSignature
      ) {
        return;
      }

      processedSnapshotRef.current =
        snapshotSignature;

      const session =
        runAtlasSessionPersistence({
          currentSnapshot,
        });

      setEventBus(
        session.eventBus
      );
    },
    [
      currentSnapshot,
    ]
  );


  return (
    <MissionControlEnvironment>
      <AtlasLiveEventToast />

      <CommandCenterLayout
        hero={
          <CommandCenterHero
            dashboard={
              dashboard
            }
            brainPipeline={
              brainPipeline
            }
          />
        }

        changes={
          eventBus ? (
            <AtlasSessionChangesCard
              eventBus={
                eventBus
              }
              maxEvents={5}
            />
          ) : null
        }

        copilot={
          <AtlasRoadmapCard
            roadmap={
              dashboardIntelligence
                .roadmap
            }

            actionLabel={
              dashboardIntelligence
                .command
                .actionLabel
            }

            href={
              dashboardIntelligence
                .command
                .href
            }
          />
        }

        overview={
          <CommandCenterOverview
            dashboard={
              dashboard
            }
          />
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
    </MissionControlEnvironment>
  );
}
