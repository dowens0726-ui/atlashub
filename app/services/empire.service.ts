import type {
  EmpireGrade,
  EmpireInsight,
  EmpireMetric,
  EmpireModel,
  PlayerProfile,
} from "@/app/types";
import { evaluateEmpire } from "@/app/intelligence";
import { getAdvisorRecommendation } from "./advisor.service";
import { getPlayerIntelligence } from "./player-intelligence.service";
import { getProgressionPlan } from "./progression.service";

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getGrade(score: number): EmpireGrade {
  if (score >= 90) return "S";
  if (score >= 80) return "A";
  if (score >= 65) return "B";
  if (score >= 50) return "C";
  return "D";
}

function createMetric(label: string, score: number): EmpireMetric {
  const normalizedScore = clampScore(score);

  return {
    label,
    score: normalizedScore,
    grade: getGrade(normalizedScore),
  };
}

function getEmpireInsights(profile: PlayerProfile): EmpireInsight[] {
  const intelligence = getPlayerIntelligence(profile);
  const progression = getProgressionPlan(profile);
  const recommendation = getAdvisorRecommendation(profile);

  const insights: EmpireInsight[] = [];

  if (recommendation) {
    insights.push({
      id: "next-recommendation",
      title: recommendation.title,
      description: recommendation.reason,
      priority: "High",
    });
  }

  if (progression.nextStep && profile.cash < progression.nextStep.estimatedCost) {
    insights.push({
      id: "cash-gap",
      title: "Build your cash reserve",
      description: `You need $${(
        progression.nextStep.estimatedCost - profile.cash
      ).toLocaleString()} more for your next recommended step.`,
      priority: "Medium",
    });
  }

  if (intelligence.ownedBusinessCount <= 1) {
    insights.push({
      id: "portfolio-growth",
      title: "Expand your business portfolio",
      description:
        "Your empire is still concentrated. Adding another business can improve income stability.",
      priority: "Medium",
    });
  }

  return insights.slice(0, 3);
}

export function getEmpireModel(profile: PlayerProfile): EmpireModel {
  const empireHealth = evaluateEmpire(profile);

  const financialStrength = createMetric(
    "Financial Strength",
    empireHealth.cashScore
  );

  const businessPortfolio = createMetric(
    "Business Portfolio",
    empireHealth.diversityScore
  );

  const growthPotential = createMetric(
    "Growth Potential",
    empireHealth.expansionScore
  );

  const efficiency = createMetric("Efficiency", empireHealth.playstyleScore);

  const overallScore = clampScore(empireHealth.overall);

  return {
    overallScore,
    overallGrade: getGrade(overallScore),
    financialStrength,
    businessPortfolio,
    growthPotential,
    efficiency,
    insights: getEmpireInsights(profile),
  };
}