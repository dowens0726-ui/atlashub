import type {
  Mission,
  PlayerProfile,
} from "@/app/types";


export type AtlasMissionRanking = {
  mission: Mission;

  score: number;

  reasons: string[];

  rewardFit: number;

  progressionFit: number;

  difficultyFit: number;

  equipmentFit: number;

  playstyleFit: number;
};


function parseReward(
  reward: string
): number {
  const value =
    reward.replace(/[^0-9]/g, "");

  return Number(value) || 0;
}


function getRewardFit(
  mission: Mission
): number {
  const reward =
    parseReward(mission.reward);


  if (reward >= 500000) {
    return 100;
  }


  if (reward >= 250000) {
    return 80;
  }


  if (reward >= 100000) {
    return 60;
  }


  return 40;
}


function getProgressionFit(
  mission: Mission,
  profile: PlayerProfile
): number {

  let score = 50;


  if (
    mission.tags?.includes("progression")
  ) {
    score += 25;
  }


  if (
    profile.cash < 1000000 &&
    mission.tags?.includes("beginner")
  ) {
    score += 20;
  }


  return Math.min(
    100,
    score
  );
}


function getDifficultyFit(
  mission: Mission,
  profile: PlayerProfile
): number {

  if (
    profile.playstyle === "solo" &&
    mission.difficulty === "Easy"
  ) {
    return 100;
  }


  if (
    mission.difficulty === "Medium"
  ) {
    return 80;
  }


  return 60;
}


function getEquipmentFit(
  mission: Mission,
  profile: PlayerProfile
): number {

  let score = 50;


  if (
    mission.recommendedVehicle &&
    profile.ownedVehicles.includes(
      mission.recommendedVehicle
    )
  ) {
    score += 30;
  }


  return Math.min(
    100,
    score
  );
}


function getPlaystyleFit(
  mission: Mission,
  profile: PlayerProfile
): number {

  if (
    profile.playstyle === "solo" &&
    mission.tags?.includes("beginner")
  ) {
    return 100;
  }


  if (
    profile.playstyle === "business" &&
    mission.tags?.includes("progression")
  ) {
    return 90;
  }


  return 70;
}


export function rankMission(
  mission: Mission,
  profile: PlayerProfile
): AtlasMissionRanking {

  const rewardFit =
    getRewardFit(mission);


  const progressionFit =
    getProgressionFit(
      mission,
      profile
    );


  const difficultyFit =
    getDifficultyFit(
      mission,
      profile
    );


  const equipmentFit =
    getEquipmentFit(
      mission,
      profile
    );


  const playstyleFit =
    getPlaystyleFit(
      mission,
      profile
    );


  const score =
    Math.round(
      rewardFit * 0.25 +
      progressionFit * 0.30 +
      difficultyFit * 0.20 +
      equipmentFit * 0.15 +
      playstyleFit * 0.10
    );


  const reasons: string[] = [];


  if (
    rewardFit >= 80
  ) {
    reasons.push(
      "Strong reward efficiency."
    );
  }


  if (
    progressionFit >= 80
  ) {
    reasons.push(
      "Matches current progression goals."
    );
  }


  if (
    equipmentFit >= 80
  ) {
    reasons.push(
      "Recommended equipment aligns with your inventory."
    );
  }


  if (
    playstyleFit >= 80
  ) {
    reasons.push(
      "Fits your preferred playstyle."
    );
  }


  return {
    mission,

    score,

    reasons,

    rewardFit,

    progressionFit,

    difficultyFit,

    equipmentFit,

    playstyleFit,
  };
}


export function rankMissions(
  missions: Mission[],
  profile: PlayerProfile
): AtlasMissionRanking[] {

  return missions
    .map(
      (mission) =>
        rankMission(
          mission,
          profile
        )
    )
    .sort(
      (a, b) =>
        b.score - a.score
    );
}