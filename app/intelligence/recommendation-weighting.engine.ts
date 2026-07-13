import type {
  AtlasBehaviorProfile,
} from "./behavioral-intelligence.engine";

import type {
  AtlasLearningProfile,
} from "./learning.engine";

import type {
  AtlasMemoryInsight,
} from "./memory-insight.engine";

import type {
  AtlasPlayerIdentity,
} from "./player-identity.engine";

import type {
  AtlasRecommendation,
  RecommendationCategory,
} from "./recommendation.engine";

import type {
  EmpireModel,
  PlayerProfile,
} from "@/app/types";


export type AtlasRecommendationWeightingFactor =
  | "identity"
  | "behavior"
  | "learning"
  | "memory"
  | "empire"
  | "cash";


export type AtlasRecommendationWeightingBreakdown = {
  identityScore: number;

  behaviorScore: number;

  learningScore: number;

  memoryScore: number;

  empireScore: number;

  cashScore: number;
};


export type AtlasRecommendationWeight = {
  title: string;

  baseConfidence: number;

  totalScore: number;

  confidenceDelta: number;

  breakdown:
    AtlasRecommendationWeightingBreakdown;

  strongestFactor:
    AtlasRecommendationWeightingFactor;

  weakestFactor:
    AtlasRecommendationWeightingFactor;

  explanations: string[];

  confidence: number;

  summary: string;
};


export type AtlasRecommendationWeightingInput = {
  recommendation:
    AtlasRecommendation;

  profile:
    PlayerProfile;

  empire:
    EmpireModel;

  identity:
    AtlasPlayerIdentity;

  behavior:
    AtlasBehaviorProfile;

  learning:
    AtlasLearningProfile;

  memoryInsight:
    AtlasMemoryInsight;
};


const MAX_IDENTITY_SCORE = 20;

const MAX_BEHAVIOR_SCORE = 25;

const MAX_LEARNING_SCORE = 25;

const MAX_MEMORY_SCORE = 15;

const MAX_EMPIRE_SCORE = 10;

const MAX_CASH_SCORE = 5;


function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(
    maximum,
    Math.max(
      minimum,
      Math.round(value)
    )
  );
}


function calculateProportionalScore(
  value: number,
  maximumScore: number
): number {
  return clamp(
    (
      clamp(
        value,
        0,
        100
      ) /
      100
    ) *
      maximumScore,
    0,
    maximumScore
  );
}


function getIdentityCategoryMatch(
  category: RecommendationCategory,
  identity: AtlasPlayerIdentity
): number {
  if (
    category === "business" &&
    (
      identity.archetype ===
        "Empire Builder" ||
      identity.strategy ===
        "Long-Term Growth" ||
      identity.strategy ===
        "Team Expansion"
    )
  ) {
    return 100;
  }

  if (
    category === "vehicle" &&
    (
      identity.archetype ===
        "Competitive Driver" ||
      identity.strategy ===
        "Performance Focus"
    )
  ) {
    return 100;
  }

  if (
    category === "mission" &&
    (
      identity.archetype ===
        "Solo Operator" ||
      identity.archetype ===
        "Crew Specialist" ||
      identity.strategy ===
        "Fast Progression"
    )
  ) {
    return 100;
  }

  if (
    category === "progression"
  ) {
    return 85;
  }

  if (
    category === "wealth" &&
    identity.strategy ===
      "Long-Term Growth"
  ) {
    return 95;
  }

  return 60;
}


function buildIdentityScore(
  recommendation: AtlasRecommendation,
  identity: AtlasPlayerIdentity,
  explanations: string[]
): number {
  const categoryMatch =
    getIdentityCategoryMatch(
      recommendation.category,
      identity
    );

  const confidenceContribution =
    clamp(
      identity.confidence,
      0,
      100
    );

  const combinedScore =
    categoryMatch * 0.7 +
    confidenceContribution * 0.3;

  const score =
    calculateProportionalScore(
      combinedScore,
      MAX_IDENTITY_SCORE
    );

  if (
    categoryMatch >= 90
  ) {
    explanations.push(
      `Identity +${score}: This recommendation strongly matches your ${identity.archetype} profile.`
    );
  } else if (
    categoryMatch >= 70
  ) {
    explanations.push(
      `Identity +${score}: This recommendation supports your ${identity.strategy.toLowerCase()} strategy.`
    );
  } else {
    explanations.push(
      `Identity +${score}: This recommendation has moderate alignment with your current player identity.`
    );
  }

  return score;
}


function getBehaviorPreference(
  category: RecommendationCategory,
  behavior: AtlasBehaviorProfile
): number {
  if (
    category === "business"
  ) {
    return behavior.businessPreference;
  }

  if (
    category === "mission"
  ) {
    return behavior.missionPreference;
  }

  if (
    category === "vehicle"
  ) {
    return behavior.vehiclePreference;
  }

  if (
    category === "progression"
  ) {
    return Math.max(
      behavior.completionRate,
      60
    );
  }

  if (
    category === "wealth"
  ) {
    return Math.max(
      behavior.businessPreference,
      behavior.completionRate
    );
  }

  return 50;
}


function buildBehaviorScore(
  recommendation: AtlasRecommendation,
  behavior: AtlasBehaviorProfile,
  explanations: string[]
): number {
  const categoryPreference =
    getBehaviorPreference(
      recommendation.category,
      behavior
    );

  const followThroughScore =
    clamp(
      behavior.completionRate -
        behavior.abandonmentRate,
      0,
      100
    );

  const combinedScore =
    categoryPreference * 0.65 +
    followThroughScore * 0.35;

  const score =
    calculateProportionalScore(
      combinedScore,
      MAX_BEHAVIOR_SCORE
    );

  if (
    categoryPreference >= 70
  ) {
    explanations.push(
      `Behavior +${score}: Your observed history shows a strong preference for ${recommendation.category} strategies.`
    );
  } else if (
    behavior.abandonmentRate >= 40
  ) {
    explanations.push(
      `Behavior +${score}: Frequent strategy switching reduces confidence in this recommendation.`
    );
  } else {
    explanations.push(
      `Behavior +${score}: This recommendation has moderate support from your recorded play patterns.`
    );
  }

  return score;
}


function buildLearningScore(
  learning: AtlasLearningProfile,
  explanations: string[]
): number {
  const outcomeReliability =
    learning.completedStrategies > 0
      ? (
          learning.successRate *
            0.55 +
          learning.predictionAccuracy *
            0.25 +
          learning.confidence *
            0.2
        )
      : learning.confidence * 0.5;

  const score =
    calculateProportionalScore(
      outcomeReliability,
      MAX_LEARNING_SCORE
    );

  if (
    learning.completedStrategies === 0
  ) {
    explanations.push(
      `Learning +${score}: Atlas has limited confirmed outcome history for this player.`
    );
  } else if (
    learning.successRate >= 75
  ) {
    explanations.push(
      `Learning +${score}: Your ${learning.successRate}% success rate strengthens this recommendation.`
    );
  } else if (
    learning.failureRate >= 50
  ) {
    explanations.push(
      `Learning +${score}: Recent unsuccessful outcomes reduce Atlas confidence.`
    );
  } else {
    explanations.push(
      `Learning +${score}: Atlas is applying ${learning.completedStrategies} reported outcomes to this score.`
    );
  }

  return score;
}


function buildMemoryScore(
  memoryInsight: AtlasMemoryInsight,
  explanations: string[]
): number {
  const evidenceBonus =
    Math.min(
      20,
      memoryInsight.evidence.length *
        5
    );

  const combinedScore =
    memoryInsight.confidence *
      0.8 +
    evidenceBonus;

  const score =
    calculateProportionalScore(
      combinedScore,
      MAX_MEMORY_SCORE
    );

  if (
    memoryInsight.evidence.length >
    0
  ) {
    explanations.push(
      `Memory +${score}: Atlas found ${memoryInsight.evidence.length} historical ${
        memoryInsight.evidence.length === 1
          ? "signal"
          : "signals"
      } supporting personalized guidance.`
    );
  } else {
    explanations.push(
      `Memory +${score}: Atlas has limited historical evidence for this recommendation.`
    );
  }

  return score;
}


function buildEmpireScore(
  recommendation: AtlasRecommendation,
  empire: EmpireModel,
  explanations: string[]
): number {
  const empireConfidence =
  recommendation.match
    ?.factors.progression ??
  empire.overallScore;

  const score =
    calculateProportionalScore(
      empireConfidence,
      MAX_EMPIRE_SCORE
    );

  if (
    empireConfidence >= 80
  ) {
    explanations.push(
      `Empire +${score}: This recommendation strongly supports your current progression stage.`
    );
  } else if (
    empireConfidence >= 50
  ) {
    explanations.push(
      `Empire +${score}: This recommendation provides a reasonable progression fit.`
    );
  } else {
    explanations.push(
      `Empire +${score}: Current empire readiness limits the recommendation score.`
    );
  }

  return score;
}


function buildCashScore(
  recommendation: AtlasRecommendation,
  profile: PlayerProfile,
  explanations: string[]
): number {
  const budgetMatch =
    recommendation.match
      ?.factors.budget;

  const estimatedCost =
    recommendation.estimatedProfit &&
    recommendation.estimatedProfit < 0
      ? Math.abs(
          recommendation.estimatedProfit
        )
      : null;

  let cashFit = 60;

  if (
    budgetMatch !== undefined
  ) {
    cashFit =
      budgetMatch;
  } else if (
    estimatedCost !== null
  ) {
    cashFit =
      estimatedCost <= profile.cash
        ? 100
        : clamp(
            (
              profile.cash /
              estimatedCost
            ) *
              100,
            0,
            100
          );
  } else if (
    profile.cash >= 2_000_000
  ) {
    cashFit = 90;
  } else if (
    profile.cash >= 1_000_000
  ) {
    cashFit = 70;
  } else {
    cashFit = 45;
  }

  const score =
    calculateProportionalScore(
      cashFit,
      MAX_CASH_SCORE
    );

  if (
    cashFit >= 80
  ) {
    explanations.push(
      `Cash +${score}: Your current cash position supports this strategy.`
    );
  } else if (
    cashFit >= 50
  ) {
    explanations.push(
      `Cash +${score}: This strategy is possible, but maintaining reserves is recommended.`
    );
  } else {
    explanations.push(
      `Cash +${score}: Limited available cash reduces the recommendation score.`
    );
  }

  return score;
}


function getFactorEntries(
  breakdown:
    AtlasRecommendationWeightingBreakdown
): Array<{
  factor:
    AtlasRecommendationWeightingFactor;

  score:
    number;
}> {
  return [
    {
      factor:
        "identity",

      score:
        breakdown.identityScore,
    },
    {
      factor:
        "behavior",

      score:
        breakdown.behaviorScore,
    },
    {
      factor:
        "learning",

      score:
        breakdown.learningScore,
    },
    {
      factor:
        "memory",

      score:
        breakdown.memoryScore,
    },
    {
      factor:
        "empire",

      score:
        breakdown.empireScore,
    },
    {
      factor:
        "cash",

      score:
        breakdown.cashScore,
    },
  ];
}


function getStrongestFactor(
  breakdown:
    AtlasRecommendationWeightingBreakdown
): AtlasRecommendationWeightingFactor {
  return getFactorEntries(
    breakdown
  ).sort(
    (first, second) =>
      second.score -
      first.score
  )[0].factor;
}


function getWeakestFactor(
  breakdown:
    AtlasRecommendationWeightingBreakdown
): AtlasRecommendationWeightingFactor {
  return getFactorEntries(
    breakdown
  ).sort(
    (first, second) =>
      first.score -
      second.score
  )[0].factor;
}


export function buildRecommendationWeight({
  recommendation,
  profile,
  empire,
  identity,
  behavior,
  learning,
  memoryInsight,
}: AtlasRecommendationWeightingInput): AtlasRecommendationWeight {
  const explanations:
    string[] = [];

  const identityScore =
    buildIdentityScore(
      recommendation,
      identity,
      explanations
    );

  const behaviorScore =
    buildBehaviorScore(
      recommendation,
      behavior,
      explanations
    );

  const learningScore =
    buildLearningScore(
      learning,
      explanations
    );

  const memoryScore =
    buildMemoryScore(
      memoryInsight,
      explanations
    );

  const empireScore =
    buildEmpireScore(
      recommendation,
      empire,
      explanations
    );

  const cashScore =
    buildCashScore(
      recommendation,
      profile,
      explanations
    );

  const breakdown:
    AtlasRecommendationWeightingBreakdown = {
      identityScore,

      behaviorScore,

      learningScore,

      memoryScore,

      empireScore,

      cashScore,
    };

  const totalScore =
    clamp(
      identityScore +
        behaviorScore +
        learningScore +
        memoryScore +
        empireScore +
        cashScore,
      0,
      100
    );

  const weightedConfidence =
    clamp(
      recommendation.confidence *
        0.55 +
        totalScore *
          0.45,
      0,
      100
    );

  const confidenceDelta =
    weightedConfidence -
    recommendation.confidence;

  const strongestFactor =
    getStrongestFactor(
      breakdown
    );

  const weakestFactor =
    getWeakestFactor(
      breakdown
    );

  return {
    title:
      "Recommendation Weighting",

    baseConfidence:
      recommendation.confidence,

    totalScore,

    confidenceDelta,

    breakdown,

    strongestFactor,

    weakestFactor,

    explanations,

    confidence:
      weightedConfidence,

    summary:
      confidenceDelta > 0
        ? `Atlas increased confidence by ${confidenceDelta} points after applying identity, behavior, learning, memory, empire, and cash signals.`
        : confidenceDelta < 0
          ? `Atlas reduced confidence by ${Math.abs(
              confidenceDelta
            )} points after evaluating current player and empire signals.`
          : "Atlas confirmed the original recommendation confidence after evaluating all weighting signals.",
  };
}
