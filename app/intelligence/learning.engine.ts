import type { AtlasDecisionHistoryItem } from "./decision-history.engine";

export type AtlasLearningProfile = {
  title: string;

  patterns: string[];

  confidence: number;

  summary: string;
};


export function buildAtlasLearning(
  history: AtlasDecisionHistoryItem[]
): AtlasLearningProfile {
  const patterns: string[] = [];

  if (history.length === 0) {
    return {
      title: "Atlas Learning",
      patterns: [
        "Atlas is still learning your decision patterns.",
      ],
      confidence: 0,
      summary:
        "Complete more strategic actions to help Atlas understand your playstyle.",
    };
  }


  const latestDecision =
    history[0];


  if (
    latestDecision.category === "business"
  ) {
    patterns.push(
      "You prioritize building long-term income assets."
    );
  }


  if (
    latestDecision.confidence >= 85
  ) {
    patterns.push(
      "You tend to make high-confidence strategic decisions."
    );
  }


  if (
    latestDecision.reasons.some(
      (reason) =>
        reason
          .toLowerCase()
          .includes("solo")
    )
  ) {
    patterns.push(
      "You prefer efficient solo progression strategies."
    );
  }


  if (patterns.length === 0) {
    patterns.push(
      "Atlas is still refining your strategic profile."
    );
  }


  return {
    title: "Atlas Learning",

    patterns,

    confidence:
      Math.min(
        100,
        60 + history.length * 10
      ),

    summary:
      "Atlas is adapting future recommendations based on your previous strategic choices.",
  };
}