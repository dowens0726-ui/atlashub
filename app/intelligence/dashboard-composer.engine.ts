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


export type AtlasDashboardIntelligence = {
  brain: AtlasBrainModel;

  command: StrategicCommand;

  roadmap: StrategicRoadmap;
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

  return {
    brain,

    command,

    roadmap,
  };
}