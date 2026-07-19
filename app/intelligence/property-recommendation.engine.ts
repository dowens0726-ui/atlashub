import type { Property } from "@/app/data/properties";
import type { PlayerProfile } from "@/app/types";

import { buildPropertyIntelligence } from "./property-intelligence.engine";
import type { AtlasRecommendation } from "./recommendation.engine";

export function buildPropertyRecommendation(
  property: Property,
  profile: PlayerProfile
): AtlasRecommendation {
  const intelligence = buildPropertyIntelligence(
    property,
    profile
  );

  const affordable =
    profile.cash >= property.basePrice;

  const alreadyOwned =
    profile.ownedProperties?.includes(
      property.slug
    ) ?? false;

  const reasons: string[] = [
    ...intelligence.strengths,
  ];

  if (affordable) {
    reasons.push("Currently affordable");
  } else {
    reasons.push("Requires additional funds");
  }

  if (alreadyOwned) {
    reasons.push("Already owned");
  }

  return {
    id: `property-${property.slug}`,

    title: property.name,

    summary: intelligence.summary,

    category: "property",

    priority:
      intelligence.atlasScore >= 90
        ? "critical"
        : intelligence.atlasScore >= 75
        ? "high"
        : intelligence.atlasScore >= 60
        ? "medium"
        : "low",

    confidence:
      intelligence.recommendationConfidence,

    match: {
      overall: intelligence.atlasScore,

      factors: {
        performance:
          intelligence.roiScore,

        budget: affordable
          ? 100
          : Math.max(
              0,
              Math.round(
                (profile.cash /
                  Math.max(
                    property.basePrice,
                    1
                  )) *
                  100
              )
            ),

        playstyle:
          profile.playstyle === "solo"
            ? intelligence.soloScore
            : profile.playstyle === "crew"
            ? intelligence.crewScore
            : intelligence.progressionScore,

        progression:
          intelligence.progressionScore,
      },

      reasons,
    },

    estimatedProfit:
      property.income
        .estimatedHourlyIncome,

    href: `/properties/${property.slug}`,
  };
}