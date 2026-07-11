import type {
  AtlasMissionFeedback,
} from "./mission-feedback.engine";


export type AtlasMissionOutcome = {
  missionId: string;

  missionTitle: string;

  success: boolean;

  efficiencyScore: number;

  rewardEfficiency: number;

  equipmentEffectiveness: number;

  difficultyAccuracy: number;

  summary: string;
};


export function buildMissionOutcome(
  feedback: AtlasMissionFeedback
): AtlasMissionOutcome {

  const success =
    feedback.status === "completed";


  const efficiencyScore =
    feedback.efficiencyScore ??
    (
      success
        ? 80
        : 40
    );


  const rewardEfficiency =
    feedback.rewardEarned
      ? Math.min(
          100,
          Math.round(
            feedback.rewardEarned / 5000
          )
        )
      : 50;


  const equipmentEffectiveness =
    feedback.selectedVehicle ||
    feedback.selectedWeapon
      ? 85
      : 60;


  const difficultyAccuracy =
    success
      ? 90
      : 50;


  return {
    missionId:
      feedback.missionId,

    missionTitle:
      feedback.missionTitle,

    success,

    efficiencyScore,

    rewardEfficiency,

    equipmentEffectiveness,

    difficultyAccuracy,

    summary:
      success
        ? "Atlas confirmed this mission strategy was effective."
        : "Atlas identified this mission attempt as requiring adjustment.",
  };
}