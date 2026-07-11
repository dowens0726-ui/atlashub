export type MissionFeedbackStatus =
  | "recommended"
  | "accepted"
  | "completed"
  | "failed"
  | "abandoned";


export type AtlasMissionFeedback = {
  id: string;

  missionId: string;

  missionTitle: string;

  status: MissionFeedbackStatus;

  selectedVehicle?: string;

  selectedWeapon?: string;

  completionTime?: number;

  rewardEarned?: number;

  efficiencyScore?: number;

  notes: string[];
};


export function buildMissionFeedback(
  missionId: string,
  missionTitle: string,
  status: MissionFeedbackStatus,
  options?: {
    selectedVehicle?: string;
    selectedWeapon?: string;
    completionTime?: number;
    rewardEarned?: number;
    efficiencyScore?: number;
    notes?: string[];
  }
): AtlasMissionFeedback {

  return {
    id:
      `mission-feedback-${missionId}`,

    missionId,

    missionTitle,

    status,

    selectedVehicle:
      options?.selectedVehicle,

    selectedWeapon:
      options?.selectedWeapon,

    completionTime:
      options?.completionTime,

    rewardEarned:
      options?.rewardEarned,

    efficiencyScore:
      options?.efficiencyScore,

    notes:
      options?.notes ?? [],
  };
}