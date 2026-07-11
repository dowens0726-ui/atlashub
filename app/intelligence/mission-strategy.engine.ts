import type {
  Mission,
  PlayerProfile,
} from "@/app/types";

import type {
  AtlasRecommendation,
  AtlasPlayerIdentity,
} from "@/app/intelligence";

import {
  rankMissions,
} from "./mission-ranking.engine";


export type AtlasMissionStrategy = {
  title: string;

  mission: Mission | null;

  reason: string;

  vehicleRecommendation: string;

  weaponRecommendation: string;

  difficultyAssessment: string;

  strategicValue: string;

  confidence: number;

  rankingScore: number;

  rankingReasons: string[];

  rankingBreakdown: {
    rewardFit: number;
    progressionFit: number;
    difficultyFit: number;
    equipmentFit: number;
    playstyleFit: number;
  };
};


export function buildMissionStrategy(
  missions: Mission[],
  recommendation: AtlasRecommendation,
  identity: AtlasPlayerIdentity,
  profile: PlayerProfile
): AtlasMissionStrategy {

  const rankedMissions =
    rankMissions(
      missions,
      profile
    );


  const topMission =
    rankedMissions[0];


  const mission =
    topMission?.mission ?? null;


  if (!mission || !topMission) {
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

      rankingScore:
        0,

      rankingReasons:
        [],

      rankingBreakdown: {
        rewardFit: 0,
        progressionFit: 0,
        difficultyFit: 0,
        equipmentFit: 0,
        playstyleFit: 0,
      },
    };
  }


  const confidence =
    Math.min(
      100,
      (identity.confidence ?? 75) +
        Math.round(
          (topMission.score - 50) / 2
        )
    );


  return {
    title:
      "Atlas Recommended Mission",


    mission,


    reason:
      `${mission.title} ranked highest based on progression fit, reward efficiency, difficulty match, equipment alignment, and your current playstyle.`,


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


    rankingScore:
      topMission.score,


    rankingReasons:
      topMission.reasons,


    rankingBreakdown: {
      rewardFit:
        topMission.rewardFit,

      progressionFit:
        topMission.progressionFit,

      difficultyFit:
        topMission.difficultyFit,

      equipmentFit:
        topMission.equipmentFit,

      playstyleFit:
        topMission.playstyleFit,
    },
  };
}