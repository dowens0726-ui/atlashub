import {
  buildAtlasBrain,
} from "./dashboard-intelligence.engine";

import type {
  AtlasBrainInput,
  AtlasBrainModel,
} from "./dashboard-intelligence.engine";

import {
  buildStrategicCommand,
} from "./strategic-command.engine";

import type {
  StrategicCommand,
} from "./strategic-command.engine";

import {
  buildStrategicRoadmap,
} from "./strategic-roadmap.engine";

import type {
  StrategicRoadmap,
} from "./strategic-roadmap.engine";

import {
  buildEconomyAnalysis,
} from "./economy.engine";

import type {
  EconomyAnalysis,
} from "./economy.engine";

import {
  buildROIAnalysis,
} from "./roi.engine";

import type {
  ROIAnalysis,
} from "./roi.engine";

import {
  buildOpportunity,
} from "./opportunity.engine";

import type {
  Opportunity,
} from "./opportunity.engine";

export type AtlasDashboardDerivedState = {
  completedRoadmapSteps: number;

  totalRoadmapSteps: number;

  roadmapProgress: number;

  activeRoadmapStep:
    | StrategicRoadmap["steps"][number]
    | undefined;

  roadmapConfidence: number;
};

export type AtlasDashboardIntelligence = {
  brain: AtlasBrainModel;

  command: StrategicCommand;

  roadmap: StrategicRoadmap;

  economy: EconomyAnalysis;

  roi: ROIAnalysis;

  opportunity: Opportunity;

  derived: AtlasDashboardDerivedState;
};

function buildDashboardDerivedState(
  roadmap: StrategicRoadmap
): AtlasDashboardDerivedState {
  const completedRoadmapSteps =
    roadmap.steps.filter(
      (step) => step.completed
    ).length;

  const totalRoadmapSteps =
    roadmap.steps.length;

  const roadmapProgress =
    totalRoadmapSteps > 0
      ? Math.round(
          (
            completedRoadmapSteps /
            totalRoadmapSteps
          ) * 100
        )
      : 0;

  const activeRoadmapStep =
    roadmap.steps.find(
      (step) => !step.completed
    ) ??
    roadmap.steps[
      roadmap.steps.length - 1
    ];

  return {
    completedRoadmapSteps,

    totalRoadmapSteps,

    roadmapProgress,

    activeRoadmapStep,

    roadmapConfidence:
      roadmap.confidence,
  };
}

export function buildDashboardComposer(
  input: AtlasBrainInput
): AtlasDashboardIntelligence {
  const brain =
    buildAtlasBrain(
      input
    );

  const command =
    buildStrategicCommand(
      brain
    );

  const roadmap =
    buildStrategicRoadmap(
      command
    );

  const economy =
    buildEconomyAnalysis({
      empire:
        input.empire,
    });

  const roi =
    buildROIAnalysis({
      investment:
        command.objective,

      economy,

      identity:
        brain.playerIdentity,
    });

  const opportunity =
    buildOpportunity({
      nextAction:
        brain.nextAction,

      recommendation:
        brain.atlasRecommendation,

      economy,

      roi,
    });

  const derived =
    buildDashboardDerivedState(
      roadmap
    );

  return {
    brain,

    command,

    roadmap,

    economy,

    roi,

    opportunity,

    derived,
  };
}