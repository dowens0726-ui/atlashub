import type {
  Mission,
  PlayerProfile,
} from "@/app/types";

import type {
  AtlasLearningProfile,
} from "./learning.engine";


export type AtlasMissionLearning = {
  title: string;

  preferredMissionTypes: string[];

  successfulPatterns: string[];

  avoidedPatterns: string[];

  difficultyPreference: string;

  efficiencyProfile: string;

  recommendationAdjustment: string;

  confidence: number;
};


export function buildMissionLearning(
  mission: Mission,
  profile: PlayerProfile,
  learning: AtlasLearningProfile
): AtlasMissionLearning {

  const preferredMissionTypes: string[] = [];
  const successfulPatterns: string[] = [];
  const avoidedPatterns: string[] = [];


  preferredMissionTypes.push(
    mission.category
  );


  if (
    mission.featured
  ) {
    successfulPatterns.push(
      "Featured missions appear to align with current progression goals."
    );
  }


  if (
    mission.difficulty === "Easy" ||
    mission.difficulty === "Medium"
  ) {
    successfulPatterns.push(
      "Efficient progression favors manageable mission difficulty."
    );
  }


  if (
    mission.difficulty === "Hard" ||
    mission.difficulty === "Extreme"
  ) {
    avoidedPatterns.push(
      "Higher difficulty missions should be attempted with stronger preparation."
    );
  }


  if (
    profile.playstyle === "solo"
  ) {
    successfulPatterns.push(
      "Solo-friendly missions provide efficient independent progression."
    );
  }


  const efficiencyProfile =
    learning.successfulActions > 0
      ? "Atlas has validated previous strategic choices and is increasing recommendation confidence."
      : "Atlas is observing mission behavior and building an initial preference profile.";


  const recommendationAdjustment =
    learning.patterns.length > 0
      ? "Prioritize missions matching learned player behavior patterns."
      : "Continue collecting mission outcomes before adjusting recommendations.";


  return {
    title:
      "Atlas Mission Learning",


    preferredMissionTypes,


    successfulPatterns,


    avoidedPatterns,


    difficultyPreference:
      mission.difficulty,


    efficiencyProfile,


    recommendationAdjustment,


    confidence:
      Math.min(
        100,
        50 +
          learning.confidence / 2
      ),
  };
}