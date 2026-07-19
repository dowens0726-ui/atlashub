import type { PlayerProfile } from "@/app/types";
import type { Property } from "@/app/data/properties";

export type AtlasPropertyIntelligence = {
  atlasScore: number;
  roiScore: number;
  soloScore: number;
  crewScore: number;
  passiveIncomeScore: number;
  progressionScore: number;
  recommendationConfidence: number;

  strengths: string[];
  weaknesses: string[];

  summary: string;
};

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function buildPropertyIntelligence(
  property: Property,
  _profile?: PlayerProfile
): AtlasPropertyIntelligence {
  let roiScore = 40;
  let soloScore = property.soloFriendly ? 85 : 55;
  let crewScore = property.crewFriendly ? 85 : 55;
  let passiveIncomeScore =
    property.income.passiveIncome ? 90 : 30;

  let progressionScore = 50;

  switch (property.income.potential) {
    case "Very High":
      roiScore = 95;
      break;
    case "High":
      roiScore = 85;
      break;
    case "Medium":
      roiScore = 70;
      break;
    case "Low":
      roiScore = 55;
      break;
    default:
      roiScore = 35;
  }

  if (
    property.useCases.includes("Mission Access")
  ) {
    progressionScore += 20;
  }

  if (
    property.useCases.includes(
      "Business Operations"
    )
  ) {
    progressionScore += 20;
  }

  const atlasScore = clamp(
    roiScore * 0.30 +
      soloScore * 0.20 +
      crewScore * 0.10 +
      passiveIncomeScore * 0.20 +
      progressionScore * 0.20
  );

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (roiScore >= 80)
    strengths.push("Excellent return on investment");

  if (passiveIncomeScore >= 80)
    strengths.push("Strong passive income");

  if (soloScore >= 80)
    strengths.push("Great for solo players");

  if (crewScore >= 80)
    strengths.push("Excellent for crews");

  if (roiScore < 50)
    weaknesses.push("Lower financial return");

  if (passiveIncomeScore < 50)
    weaknesses.push("Limited passive income");

  if (progressionScore < 60)
    weaknesses.push("Few progression benefits");

  return {
    atlasScore,

    roiScore,

    soloScore,

    crewScore,

    passiveIncomeScore,

    progressionScore,

    recommendationConfidence: clamp(
      atlasScore * 0.95
    ),

    strengths,

    weaknesses,

    summary:
      `${property.name} currently has an Atlas Score of ` +
      `${atlasScore}/100 based on ROI, progression, ` +
      `income potential and playstyle support.`,
  };
}