import type { PlayerProfile } from "@/app/types";
import { evaluateBusinesses } from "./roi.engine";
import type { AtlasRecommendation } from "./recommendation.engine";

export function getAtlasAdvisorRecommendations(
  profile: PlayerProfile
): AtlasRecommendation[] {
  const recommendations: AtlasRecommendation[] = [];
  const businessOpportunities = evaluateBusinesses(profile);
  const bestBusiness = businessOpportunities[0];

  if (bestBusiness?.recommended) {
    recommendations.push({
      id: `business:${bestBusiness.id}`,
      title: `Buy the ${bestBusiness.name}`,
      summary: bestBusiness.reason,
      category: "business",
      priority: "critical",
      confidence: bestBusiness.roiScore,
      estimatedProfit: bestBusiness.estimatedProfit,
      estimatedTimeMinutes: 60,
      href: `/data/businesses/${bestBusiness.id}`,
    });
  }

  if (profile.cash < 1_000_000) {
    recommendations.push({
      id: "build-cash-reserve",
      title: "Build your cash reserve",
      summary:
        "Your current cash is low. Focus on missions and short-term income before making another major purchase.",
      category: "wealth",
      priority: "high",
      confidence: 88,
      estimatedProfit: 500_000,
      estimatedTimeMinutes: 45,
      href: "/missions",
    });
  }

  if (
    profile.ownedBusinesses.length > 0 &&
    profile.cash >= 1_000_000 &&
    profile.cash < 2_000_000
  ) {
    recommendations.push({
      id: "optimize-existing-empire",
      title: "Optimize your current empire",
      summary:
        "You already own income-producing assets. Focus on improving returns before buying another expensive business.",
      category: "progression",
      priority: "medium",
      confidence: 82,
      estimatedProfit: 400_000,
      estimatedTimeMinutes: 35,
      href: "/dashboard",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "review-empire",
      title: "Review your empire",
      summary:
        "Atlas does not see a critical move yet. Review your profile, owned businesses, and available cash to improve recommendations.",
      category: "progression",
      priority: "low",
      confidence: 70,
      href: "/profile",
    });
  }

  return recommendations.sort((a, b) => b.confidence - a.confidence);
}

export function getPrimaryAtlasRecommendation(
  profile: PlayerProfile
): AtlasRecommendation {
  return getAtlasAdvisorRecommendations(profile)[0];
}