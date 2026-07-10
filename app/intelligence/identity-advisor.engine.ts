import type {
  AtlasPlayerIdentity,
} from "./player-identity.engine";

import type {
  AtlasRecommendation,
} from "./recommendation.engine";


export type IdentityAdvisorResult = {
  identityMatch: number;

  reasons: string[];

  summary: string;
};


export function buildIdentityAdvisor(
  identity: AtlasPlayerIdentity,
  recommendation: AtlasRecommendation
): IdentityAdvisorResult {

  const reasons: string[] = [];

  let identityMatch = 60;


  if (
    identity.archetype === "Empire Builder" &&
    recommendation.category === "business"
  ) {
    identityMatch += 25;

    reasons.push(
      "This recommendation supports long-term empire growth."
    );
  }


  if (
    identity.archetype === "Solo Operator" &&
    recommendation.category === "mission"
  ) {
    identityMatch += 20;

    reasons.push(
      "This recommendation matches efficient solo progression."
    );
  }


  if (
    identity.archetype === "Competitive Driver" &&
    recommendation.category === "vehicle"
  ) {
    identityMatch += 25;

    reasons.push(
      "This recommendation aligns with performance-focused play."
    );
  }


  if (
    identity.archetype === "Crew Specialist" &&
    recommendation.category === "progression"
  ) {
    identityMatch += 15;

    reasons.push(
      "This recommendation supports coordinated progression."
    );
  }


  if (
    identity.strategy === "Long-Term Growth"
  ) {
    reasons.push(
      "Atlas identified a preference for sustainable progression."
    );
  }


  if (
    reasons.length === 0
  ) {
    reasons.push(
      "Atlas found this recommendation generally aligned with your current strategy."
    );
  }


  return {
    identityMatch:
      Math.min(
        100,
        identityMatch
      ),

    reasons,

    summary:
      `This recommendation matches your ${identity.archetype} profile and ${identity.strategy} approach.`,
  };
}