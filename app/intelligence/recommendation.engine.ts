export type RecommendationPriority = "low" | "medium" | "high" | "critical";

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
  estimatedProfit?: number;
  estimatedTimeMinutes?: number;
  href?: string;
};