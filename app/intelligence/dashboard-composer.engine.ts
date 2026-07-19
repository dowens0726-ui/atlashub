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

export type AtlasDashboardIntelligence = {
  brain: AtlasBrainModel;

  command: StrategicCommand;

  roadmap: StrategicRoadmap;

  economy: EconomyAnalysis;

  roi: ROIAnalysis;

  opportunity: Opportunity;
};

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

  return {
    brain,

    command,

    roadmap,

    economy,

    roi,

    opportunity,
  };
}