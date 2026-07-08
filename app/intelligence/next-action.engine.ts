import type { PlayerProfile } from "@/app/types";
import type { AtlasRecommendation } from "./recommendation.engine";
import type { SessionReasoning } from "./session-reasoning.engine";

export type NextAction = {
  title: string;
  category: "Purchase" | "Mission" | "Upgrade" | "Strategy";
  confidence: number;
  reason: string;
  expectedImpact: string;
  actionLabel: string;
  href?: string;
};

export function buildNextAction(
  profile: PlayerProfile,
  recommendation: AtlasRecommendation,
  sessionReasoning: SessionReasoning
): NextAction {
  return {
    title: recommendation.title,

    category: "Strategy",

    confidence: recommendation.confidence,

    reason:
      sessionReasoning.explanation,

    expectedImpact:
      sessionReasoning.expectedOutcome,

    actionLabel:
      "View Strategy",

    href:
      recommendation.href,
  };
}