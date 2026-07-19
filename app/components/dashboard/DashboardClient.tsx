"use client";

import {
  useEffect,
  useMemo,
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
  DashboardObjectives,
  DashboardSummary,
  EmpireInsights,
  EmpireScoreCard,
  LiveEmpireCard,
} from "@/app/components/dashboard";

import {
  AtlasAIPanel,
  AtlasLiveEventToast,
  AtlasRoadmapCard,
  AtlasSessionChangesCard,
  AtlasSessionPlanCard,
} from "@/app/components/intelligence";

import {
  useAtlasIntelligence,
} from "@/app/hooks/useAtlasIntelligence";

import {
  useDashboard,
} from "@/app/hooks/useDashboard";

import {
  buildAtlasBrainCopilot,
  buildAtlasBrainSnapshot,
  buildAtlasEventBus,
  buildAtlasReactiveTimeline,
  buildDashboardComposer,
  detectAtlasBrainChanges,
} from "@/app/intelligence";

import type {
  AtlasBrainSnapshot,
  AtlasEventBus,
} from "@/app/intelligence";


const ATLAS_BRAIN_SNAPSHOT_STORAGE_KEY =
  "atlas:brain-snapshot";


function isStoredBrainSnapshot(
  value: unknown
): value is AtlasBrainSnapshot {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const snapshot =
    value as Partial<AtlasBrainSnapshot>;

  return (
    typeof snapshot.capturedAt ===
      "string" &&
    typeof snapshot.cash ===
      "number" &&
    typeof snapshot.empireScore ===
      "number" &&
    typeof snapshot.empireHealth ===
      "string" &&
    typeof snapshot.copilotConfidence ===
      "number" &&
    typeof snapshot.recommendation ===
      "object" &&
    snapshot.recommendation !==
      null &&
    typeof snapshot.situation ===
      "object" &&
    snapshot.situation !==
      null &&
    typeof snapshot.topPriority ===
      "object" &&
    snapshot.topPriority !==
      null &&
    typeof snapshot.secondaryPriority ===
      "object" &&
    snapshot.secondaryPriority !==
      null &&
    typeof snapshot.warningCount ===
      "number" &&
    typeof snapshot.opportunityCount ===
      "number"
  );
}


function readStoredBrainSnapshot():
  AtlasBrainSnapshot | null {
  try {
    const storedValue =
      window.localStorage.getItem(
        ATLAS_BRAIN_SNAPSHOT_STORAGE_KEY
      );

    if (!storedValue) {
      return null;
    }

    const parsedValue:
      unknown =
        JSON.parse(
          storedValue
        );

    if (
      !isStoredBrainSnapshot(
        parsedValue
      )
    ) {
      window.localStorage.removeItem(
        ATLAS_BRAIN_SNAPSHOT_STORAGE_KEY
      );

      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
}


function storeBrainSnapshot(
  snapshot:
    AtlasBrainSnapshot
): void {
  try {
    window.localStorage.setItem(
      ATLAS_BRAIN_SNAPSHOT_STORAGE_KEY,
      JSON.stringify(
        snapshot
      )
    );
  } catch {
    // Atlas remains fully functional when browser storage is unavailable.
  }
}


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

  const [
    previousSnapshot,
    setPreviousSnapshot,
  ] =
    useState<
      AtlasBrainSnapshot | null
    >(null);

  const [
    snapshotInitialized,
    setSnapshotInitialized,
  ] =
    useState(false);


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
      const storedSnapshot =
        readStoredBrainSnapshot();

      setPreviousSnapshot(
        storedSnapshot
      );

      storeBrainSnapshot(
        currentSnapshot
      );

      setSnapshotInitialized(
        true
      );
    },
    [
      currentSnapshot,
    ]
  );


  const eventBus =
    useMemo<
      AtlasEventBus | null
    >(
      () => {
        if (
          !snapshotInitialized ||
          !previousSnapshot
        ) {
          return null;
        }

        const changes =
          detectAtlasBrainChanges({
            previous:
              previousSnapshot,

            current:
              currentSnapshot,
          });

        const timeline =
          buildAtlasReactiveTimeline({
            changes,
          });

        return buildAtlasEventBus({
          timeline,
        });
      },
      [
        snapshotInitialized,
        previousSnapshot,
        currentSnapshot,
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