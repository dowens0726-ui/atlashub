import type { Mission } from "@/app/types";

import type {
  AtlasRecommendation,
  AtlasPlayerIdentity,
} from "@/app/intelligence";


export type AtlasMissionStrategy = {
  title: string;

  mission: Mission | null;

  reason: string;

  vehicleRecommendation: string;

  weaponRecommendation: string;

  difficultyAssessment: string;

  strategicValue: string;

  confidence: number;
};


export function buildMissionStrategy(
  missions: Mission[],
  recommendation: AtlasRecommendation,
  identity: AtlasPlayerIdentity
): AtlasMissionStrategy {

  const mission =
    missions[0] ?? null;


  if (!mission) {
    return {
      title:
        "Mission Strategy",

      mission:
        null,

      reason:
        "Atlas is waiting for more mission data before making a recommendation.",

      vehicleRecommendation:
        "None",

      weaponRecommendation:
        "None",

      difficultyAssessment:
        "Unknown",

      strategicValue:
        "Continue building your profile.",

      confidence:
        0,
    };
  }


  const confidence =
    identity.confidence ?? 75;


  return {
    title:
      "Atlas Recommended Mission",

    mission,

    reason:
      `${mission.title} aligns with your current progression strategy and Atlas believes it supports your next objective.`,

    vehicleRecommendation:
      mission.recommendedVehicle ??
      "No vehicle recommendation available.",

    weaponRecommendation:
      mission.recommendedWeapon ??
      "No weapon recommendation available.",

    difficultyAssessment:
      `${mission.difficulty} difficulty mission requiring ${mission.estimatedTime}.`,

    strategicValue:
      recommendation.title,

    confidence,
  };
}