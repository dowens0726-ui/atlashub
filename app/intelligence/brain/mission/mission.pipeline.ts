import {
  buildMissionFeedback,
} from "../../mission-feedback.engine";

import {
  buildMissionLearning,
} from "../../mission-learning.engine";

import {
  buildMissionLearningUpdate,
} from "../../mission-learning-update.engine";

import {
  buildMissionOutcome,
} from "../../mission-outcome.engine";

import {
  buildMissionStrategy,
} from "../../mission-strategy.engine";


type MissionStrategyArguments =
  Parameters<
    typeof buildMissionStrategy
  >;

type MissionLearningArguments =
  Parameters<
    typeof buildMissionLearning
  >;


export type AtlasMissionPipelineInput = {
  missions:
    MissionStrategyArguments[0];

  recommendation:
    MissionStrategyArguments[1];

  identity:
    MissionStrategyArguments[2];

  profile:
    MissionStrategyArguments[3];

  learning:
    MissionLearningArguments[2];
};


export function buildAtlasMissionPipeline({
  missions,
  recommendation,
  identity,
  profile,
  learning,
}: AtlasMissionPipelineInput) {
  const missionStrategy =
    buildMissionStrategy(
      missions,
      recommendation,
      identity,
      profile
    );

  const missionLearning =
    missionStrategy.mission
      ? buildMissionLearning(
          missionStrategy.mission,
          profile,
          learning
        )
      : null;

  const missionFeedback =
    missionStrategy.mission
      ? buildMissionFeedback(
          missionStrategy.mission.id,
          missionStrategy.mission.title,
          "recommended",
          {
            selectedVehicle:
              missionStrategy
                .loadout
                .vehicle
                ?.name,

            selectedWeapon:
              missionStrategy
                .loadout
                .weapon
                ?.name,
          }
        )
      : null;

  const missionOutcome =
    missionFeedback
      ? buildMissionOutcome(
          missionFeedback
        )
      : null;

  const missionLearningUpdate =
    missionLearning &&
    missionOutcome
      ? buildMissionLearningUpdate(
          missionOutcome,
          missionLearning
        )
      : null;

  return {
    missionStrategy,

    missionLearning,

    missionFeedback,

    missionOutcome,

    missionLearningUpdate,
  };
}


export type AtlasMissionPipelineModel =
  ReturnType<
    typeof buildAtlasMissionPipeline
  >;
