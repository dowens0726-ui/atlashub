import type {
  StrategicCommand,
} from "./strategic-command.engine";

export type StrategicRoadmapStage =
  | "Immediate"
  | "Next"
  | "Then"
  | "Later"
  | "Long Term";

export type StrategicRoadmapStep = {
  stage: StrategicRoadmapStage;

  title: string;

  description: string;

  completed: boolean;
};

export type StrategicRoadmap = {
  objective: string;

  confidence: number;

  priority: StrategicCommand["priority"];

  steps: StrategicRoadmapStep[];
};

function getStepTitle(
  command: StrategicCommand,
  index: number
): string {
  return (
    command.route[index]?.title ??
    "Continue Empire Growth"
  );
}

function getStepDescription(
  command: StrategicCommand,
  index: number
): string {
  return (
    command.route[index]?.description ??
    "Continue following Atlas recommendations."
  );
}

export function buildStrategicRoadmap(
  command: StrategicCommand
): StrategicRoadmap {
  return {
    objective: command.objective,

    confidence: command.confidence,

    priority: command.priority,

    steps: [
      {
        stage: "Immediate",
        title: getStepTitle(command, 0),
        description: getStepDescription(command, 0),
        completed: false,
      },
      {
        stage: "Next",
        title: getStepTitle(command, 1),
        description: getStepDescription(command, 1),
        completed: false,
      },
      {
        stage: "Then",
        title: getStepTitle(command, 2),
        description: getStepDescription(command, 2),
        completed: false,
      },
      {
        stage: "Later",
        title: getStepTitle(command, 3),
        description: getStepDescription(command, 3),
        completed: false,
      },
      {
        stage: "Long Term",
        title: "Build a Self-Sustaining Empire",
        description:
          "Continue improving income, assets, and long-term progression using Atlas guidance.",
        completed: false,
      },
    ],
  };
}