import type {
  Mission,
  PlayerProfile,
} from "@/app/types";

import {
  getProgressionPlan,
} from "@/app/services";


export type AtlasMissionImpact = {
  title: string;

  rewardValue: string;

  empireEffect: string;

  financialImpact: string;

  recommendedAction: string;

  nextMilestone: string;

  completionPriority:
    | "High"
    | "Medium"
    | "Low";

  confidence: number;
};


function getPriority(
  mission: Mission
): AtlasMissionImpact["completionPriority"] {

  if (
    mission.difficulty === "Extreme" ||
    mission.difficulty === "Hard"
  ) {
    return "High";
  }


  if (
    mission.featured
  ) {
    return "High";
  }


  return "Medium";
}


function calculateFinancialImpact(
  mission: Mission
): string {

  const reward =
    Number(
      mission.reward
        .replace(/[^0-9]/g, "")
    );


  if (reward >= 1000000) {
    return "Major financial growth opportunity.";
  }


  if (reward >= 500000) {
    return "Strong early empire growth impact.";
  }


  return "Small financial boost with progression value.";
}


export function buildMissionImpact(
  mission: Mission,
  profile: PlayerProfile
): AtlasMissionImpact {

  const progression =
    getProgressionPlan(
      profile
    );


  const nextStep =
    progression.nextStep;


  return {
    title:
      "Atlas Mission Impact",


    rewardValue:
      mission.reward,


    empireEffect:
      `${mission.title} improves your progression momentum by increasing resources and unlocking future opportunities.`,


    financialImpact:
      calculateFinancialImpact(
        mission
      ),


    recommendedAction:
      nextStep
        ? `Use mission rewards toward ${nextStep.title}.`
        : "Continue building resources before expanding.",


    nextMilestone:
      nextStep
        ? nextStep.title
        : "Build additional empire resources.",


    completionPriority:
      getPriority(
        mission
      ),


    confidence:
      Math.min(
        95,
        70 +
          (
            mission.featured
              ? 15
              : 0
          )
      ),
  };
}