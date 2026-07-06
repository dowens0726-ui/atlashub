import { businesses } from "@/app/data";
import type { Business, PlayerProfile } from "@/app/types";
import { getBusinessScore } from "./scoring.service";

export type AdvisorRecommendation = {
  title: string;
  entityType: "business";
  slug: string;
  confidence: number;
  reason: string;
  business: Business;
};

export function getAdvisorRecommendation(
  profile: PlayerProfile
): AdvisorRecommendation | null {
  const owned = new Set(profile.ownedBusinesses);

  const affordableBusinesses = businesses.filter(
    (business) => business.price <= profile.cash && !owned.has(business.slug)
  );

  const bestBusiness = affordableBusinesses
    .sort(
      (a, b) => getBusinessScore(b).overall - getBusinessScore(a).overall
    )[0];

  if (!bestBusiness) {
    return null;
  }

  const score = getBusinessScore(bestBusiness);

  return {
    title: `Buy ${bestBusiness.name}`,
    entityType: "business",
    slug: bestBusiness.slug,
    confidence: score.overall,
    reason:
      profile.playstyle === "solo" && bestBusiness.soloFriendly
        ? "Fits your solo playstyle and current budget."
        : "Best available opportunity based on your current profile.",
    business: bestBusiness,
  };
}