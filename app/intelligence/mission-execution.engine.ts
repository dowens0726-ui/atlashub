import type {
  Mission,
  PlayerProfile,
} from "@/app/types";


export type AtlasMissionExecution = {
  preparationSteps: string[];

  objectives: string[];

  riskFactors: string[];

  efficiencyTips: string[];

  rewardOptimization: string;

  completionStrategy: string;
};


function buildPreparationSteps(
  mission: Mission,
  profile: PlayerProfile
): string[] {

  const steps: string[] = [];


  if (mission.recommendedVehicle) {
    steps.push(
      `Bring the recommended vehicle: ${mission.recommendedVehicle}.`
    );
  }


  if (mission.recommendedWeapon) {
    steps.push(
      `Equip the recommended weapon: ${mission.recommendedWeapon}.`
    );
  }


  if (
    profile.cash < 100000
  ) {
    steps.push(
      "Preserve cash before attempting additional purchases."
    );
  }


  if (
    steps.length === 0
  ) {
    steps.push(
      "Review mission requirements before starting."
    );
  }


  return steps;
}


function buildObjectives(
  mission: Mission
): string[] {

  const objectives: string[] = [];


  objectives.push(
    `Complete ${mission.title}.`
  );


  if (
    mission.unlocks &&
    mission.unlocks.length > 0
  ) {
    objectives.push(
      `Unlock progression rewards: ${mission.unlocks.join(", ")}.`
    );
  }


  return objectives;
}


function buildRiskFactors(
  mission: Mission
): string[] {

  const risks: string[] = [];


  if (
    mission.difficulty === "Hard" ||
    mission.difficulty === "Extreme"
  ) {
    risks.push(
      "High difficulty mission. Prepare additional resources."
    );
  }


  if (
    mission.estimatedTime.includes("hour")
  ) {
    risks.push(
      "Long completion window may reduce efficiency."
    );
  }


  if (
    risks.length === 0
  ) {
    risks.push(
      "Low risk mission. Focus on efficient completion."
    );
  }


  return risks;
}


function buildEfficiencyTips(
  mission: Mission
): string[] {

  if (
    mission.atlasTips &&
    mission.atlasTips.length > 0
  ) {
    return mission.atlasTips;
  }


  return [
    "Complete objectives efficiently.",
    "Avoid unnecessary resource loss.",
  ];
}


export function buildMissionExecution(
  mission: Mission,
  profile: PlayerProfile
): AtlasMissionExecution {

  return {
    preparationSteps:
      buildPreparationSteps(
        mission,
        profile
      ),


    objectives:
      buildObjectives(
        mission
      ),


    riskFactors:
      buildRiskFactors(
        mission
      ),


    efficiencyTips:
      buildEfficiencyTips(
        mission
      ),


    rewardOptimization:
      `Maximize the ${mission.reward} reward by completing objectives efficiently and preserving resources.`,


    completionStrategy:
      `${mission.title} should be approached as a ${mission.difficulty.toLowerCase()} difficulty mission with focus on preparation, efficiency, and progression.`,
  };
}