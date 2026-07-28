"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";


import {
  AchievementList,
} from "@/app/components/achievements";

import {
  AtlasWorldStatus,
  CommandCenterHero,
  CommandCenterLayout,
  CommandCenterOverview,
  DashboardObjectives,
  EmpireInsights,
} from "@/app/components/dashboard";

import AtlasLiveOperationsFeed from "@/app/components/dashboard/operations/AtlasLiveOperationsFeed";
import AtlasOperationsSidebar from "@/app/components/dashboard/operations/AtlasOperationsSidebar";

import type {
  AtlasOperationStatus,
} from "@/app/components/dashboard/operations/AtlasOperationsSidebar";

import type {
  AtlasRecentEvent,
} from "@/app/components/dashboard/operations/AtlasRecentEvents";

import {
  buildAtlasWorldConfiguration,
  MissionControlEnvironment,
  type AtlasWorldConfiguration,
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
  useAtlasWorldContext,
} from "@/app/hooks/useAtlasWorldContext";

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


const atlasCurrencyFormatter =
  new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }
  );


function formatAtlasCurrency(
  value: number
) {
  return atlasCurrencyFormatter.format(
    value
  );
}


function formatAtlasStatus(
  value: string
) {
  return value
    .replace(
      /[-_]/g,
      " "
    )
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}


export default function DashboardClient() {
  const dashboard =
    useDashboard();

  const {
    worldContext,
  } =
    useAtlasWorldContext();

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


  const worldConfiguration =
    useMemo<
      AtlasWorldConfiguration
    >(
      () =>
        buildAtlasWorldConfiguration({
          context:
            worldContext,

          state:
            brainPipeline.status === "success"
              ? "ready"
              : brainPipeline.status === "waiting"
                ? "loading"
                : brainPipeline.status,

          active:
            true,
        }),
      [
        brainPipeline.status,
        worldContext,
      ]
    );


  const operationsStatuses =
    useMemo<
      AtlasOperationStatus[]
    >(
      () => {
        const status =
          brainPipeline.status;

        const statusTone:
          AtlasOperationStatus["tone"] =
            status ===
              "success"
              ? "positive"
              : status ===
                    "loading"
                ? "accent"
                : status ===
                      "warning" ||
                    status ===
                      "failed"
                  ? "warning"
                  : "default";

        const activeObjective =
          dashboard.objectives[0];

        return [
          {
            id:
              "atlas-core",

            label:
              "Atlas Core",

            value:
              formatAtlasStatus(
                status
              ),

            detail:
              "Decision systems and intelligence pipeline",

            tone:
              statusTone,

            pulse:
              status !==
              "failed",
          },
          {
            id:
              "empire-stage",

            label:
              "Empire Stage",

            value:
              String(
                dashboard.summary
                  .stage
              ),

            detail:
              "Current strategic progression position",

            tone:
              "accent",
          },
          {
            id:
              "empire-completion",

            label:
              "Empire Completion",

            value:
              `${Math.round(
                dashboard.summary
                  .completion
              )}%`,

            detail:
              "Overall progression toward the active strategy",

            tone:
              dashboard.summary
                  .completion >= 70
                ? "positive"
                : dashboard.summary
                      .completion >= 35
                  ? "accent"
                  : "warning",

            progress:
              dashboard.summary
                .completion,
          },
          {
            id:
              "available-cash",

            label:
              "Available Cash",

            value:
              formatAtlasCurrency(
                dashboard.summary
                  .cash
              ),

            detail:
              "Current deployable capital",

            tone:
              dashboard.summary
                  .cash > 0
                ? "positive"
                : "warning",
          },
          {
            id:
              "remaining-investment",

            label:
              "Investment Remaining",

            value:
              formatAtlasCurrency(
                dashboard.summary
                  .remainingInvestment
              ),

            detail:
              "Capital required by the active roadmap",

            tone:
              dashboard.summary
                  .remainingInvestment <=
                dashboard.summary
                  .cash
                ? "positive"
                : "warning",
          },
          {
            id:
              "active-objective",

            label:
              "Active Objective",

            value:
              activeObjective
                ?.title ??
              "Review Planner",

            detail:
              activeObjective
                ?.description ??
              "Atlas is ready to generate the next operating objective.",

            tone:
              activeObjective
                ? "accent"
                : "default",
          },
        ];
      },
      [
        brainPipeline.status,
        dashboard.objectives,
        dashboard.summary.cash,
        dashboard.summary.completion,
        dashboard.summary.remainingInvestment,
        dashboard.summary.stage,
      ]
    );


  const operationsEvents =
    useMemo<
      AtlasRecentEvent[]
    >(
      () =>
        dashboard.objectives
          .slice(
            0,
            3
          )
          .map(
            (
              objective,
              index
            ) => ({
              id:
                `objective-${index}`,

              title:
                objective.title,

              detail:
                objective.description,

              timestamp:
                index === 0
                  ? "Active"
                  : "Queued",

              tone:
                index === 0
                  ? "accent"
                  : index === 1
                    ? "warning"
                    : "default",
            })
          ),
      [
        dashboard.objectives,
      ]
    );


  return (
    <MissionControlEnvironment
      worldConfiguration={
        worldConfiguration
      }
    >
      <AtlasLiveEventToast />

      <CommandCenterLayout
        operations={
          <AtlasOperationsSidebar
            statuses={
              operationsStatuses
            }

            recentEvents={
              operationsEvents
            }

            subtitle="Live intelligence, progression telemetry, and command access for the active operating session."
          />
        }

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

        worldStatus={

          <AtlasWorldStatus />

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
          <AtlasLiveOperationsFeed
            eventBus={eventBus}
            maxEvents={6}
          />
        }

        achievements={
          <AchievementList />
        }
      />
    </MissionControlEnvironment>
  );
}







