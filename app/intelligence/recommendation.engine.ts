export type RecommendationPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type RecommendationCategory =
  | "business"
  | "vehicle"
  | "mission"
  | "progression"
  | "wealth";

export type AtlasRecommendation = {
  id: string;
  title: string;
  summary: string;

  category: RecommendationCategory;
  priority: RecommendationPriority;

  confidence: number;

  match?: {
    overall: number;

    factors: {
      performance: number;
      budget: number;
      playstyle: number;
      progression: number;
    };

    reasons: string[];
  };

    estimatedProfit?: number;
  estimatedTimeMinutes?: number;

  prediction?: {
    confidenceBoost: number;
    reason: string;
    matchesLearning: boolean;
  };

  href?: string;
};