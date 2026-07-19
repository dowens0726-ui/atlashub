import type {
  AtlasPersistentBehaviorProfile,
} from "./atlas-behavior-profile.engine";

import type {
  AtlasStrategyEvolution,
} from "./atlas-strategy-evolution.engine";


export const ATLAS_ADAPTIVE_RECOMMENDATION_VERSION = 1;


export type AtlasAdaptiveRecommendationCategory =
  | "business"
  | "property"
  | "vehicle"
  | "weapon"
  | "mission"
  | "collection"
  | "exploration"
  | "financial"
  | "progression"
  | "social"
  | "custom";


export type AtlasAdaptiveRecommendationRisk =
  | "low"
  | "moderate"
  | "high"
  | "extreme";


export type AtlasAdaptiveRecommendationEffort =
  | "low"
  | "moderate"
  | "high";


export type AtlasAdaptiveRecommendationHorizon =
  | "immediate"
  | "short-term"
  | "medium-term"
  | "long-term";


export type AtlasAdaptiveRecommendationPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";


export type AtlasAdaptiveRecommendationConfidence =
  | "limited"
  | "developing"
  | "strong"
  | "very-strong";


export type AtlasAdaptiveRecommendationAction =
  | "prioritize"
  | "consider"
  | "monitor"
  | "deprioritize"
  | "avoid";


export type AtlasAdaptiveRecommendationTrait =
  | "expansion"
  | "investment"
  | "efficiency"
  | "risk-taking"
  | "risk-control"
  | "competition"
  | "completion"
  | "exploration"
  | "collection"
  | "combat"
  | "social"
  | "planning"
  | "momentum"
  | "resilience"
  | "discipline"
  | "opportunity"
  | "progression"
  | "custom";


export type AtlasAdaptiveRecommendationCandidate = {
  id: string;

  title: string;

  description?: string;

  category:
    AtlasAdaptiveRecommendationCategory;

  baseScore: number;

  risk:
    AtlasAdaptiveRecommendationRisk;

  effort:
    AtlasAdaptiveRecommendationEffort;

  horizon:
    AtlasAdaptiveRecommendationHorizon;

  traits?: AtlasAdaptiveRecommendationTrait[];

  requiredTraits?: AtlasAdaptiveRecommendationTrait[];

  excludedTraits?: AtlasAdaptiveRecommendationTrait[];

  estimatedCost?: number | null;

  estimatedReward?: number | null;

  estimatedDurationMinutes?: number | null;

  isAvailable?: boolean;

  isCompleted?: boolean;

  isRepeatable?: boolean;

  metadata?: Record<
    string,
    unknown
  >;
};


export type AtlasAdaptiveRecommendationFactorType =
  | "base-score"
  | "archetype-alignment"
  | "trait-alignment"
  | "trait-conflict"
  | "strategy-evolution"
  | "risk-alignment"
  | "effort-alignment"
  | "horizon-alignment"
  | "profile-confidence"
  | "data-sufficiency"
  | "availability"
  | "completion"
  | "reward-efficiency";


export type AtlasAdaptiveRecommendationFactor = {
  type:
    AtlasAdaptiveRecommendationFactorType;

  label: string;

  value: number;

  explanation: string;
};


export type AtlasAdaptiveRecommendation = {
  id: string;

  candidate:
    AtlasAdaptiveRecommendationCandidate;

  rank: number;

  score: number;

  normalizedScore: number;

  priority:
    AtlasAdaptiveRecommendationPriority;

  confidence:
    number;

  confidenceLevel:
    AtlasAdaptiveRecommendationConfidence;

  action:
    AtlasAdaptiveRecommendationAction;

  archetypeAlignment:
    number;

  behaviorAlignment:
    number;

  evolutionAlignment:
    number;

  riskAlignment:
    number;

  effortAlignment:
    number;

  horizonAlignment:
    number;

  rewardEfficiency:
    number;

  positiveFactors:
    AtlasAdaptiveRecommendationFactor[];

  negativeFactors:
    AtlasAdaptiveRecommendationFactor[];

  headline: string;

  explanation: string;

  coachingResponse: string;

  strategicRationale: string;
};


export type AtlasAdaptiveRecommendationResult = {
  version: number;

  generatedAt: string;

  profileGeneratedAt:
    string;

  evolutionGeneratedAt:
    string | null;

  profileConfidence:
    number;

  evolutionConfidence:
    number | null;

  candidatesEvaluated:
    number;

  recommendationsReturned:
    number;

  topRecommendation:
    AtlasAdaptiveRecommendation | null;

  recommendations:
    AtlasAdaptiveRecommendation[];

  summary: string;
};


export type BuildAtlasAdaptiveRecommendationsInput = {
  candidates:
    AtlasAdaptiveRecommendationCandidate[];

  behaviorProfile:
    AtlasPersistentBehaviorProfile;

  strategyEvolution?:
    AtlasStrategyEvolution | null;

  generatedAt?: string;

  maximumRecommendations?: number;

  minimumScore?: number;

  includeUnavailable?: boolean;

  includeCompleted?: boolean;
};


type RecommendationScoreContext = {
  candidate:
    AtlasAdaptiveRecommendationCandidate;

  behaviorProfile:
    AtlasPersistentBehaviorProfile;

  strategyEvolution:
    AtlasStrategyEvolution | null;

  factors:
    AtlasAdaptiveRecommendationFactor[];

  score: number;

  archetypeAlignment: number;

  behaviorAlignment: number;

  evolutionAlignment: number;

  riskAlignment: number;

  effortAlignment: number;

  horizonAlignment: number;

  rewardEfficiency: number;
};


const riskRank:
  Record<
    AtlasAdaptiveRecommendationRisk,
    number
  > = {
    low: 1,
    moderate: 2,
    high: 3,
    extreme: 4,
  };


const effortRank:
  Record<
    AtlasAdaptiveRecommendationEffort,
    number
  > = {
    low: 1,
    moderate: 2,
    high: 3,
  };


const horizonRank:
  Record<
    AtlasAdaptiveRecommendationHorizon,
    number
  > = {
    immediate: 1,
    "short-term": 2,
    "medium-term": 3,
    "long-term": 4,
  };


function resolveTimestamp(
  value?: string
): string {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed =
    new Date(value);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}


function normalizeScore(
  value: number
): number {
  if (
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.round(
    value * 100
  ) / 100;
}


function normalizePercentage(
  value: number
): number {
  if (
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(value)
    )
  );
}


function normalizeMaximumRecommendations(
  value?: number
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return 10;
  }

  return Math.min(
    50,
    Math.max(
      1,
      Math.round(value)
    )
  );
}


function normalizeMinimumScore(
  value?: number
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.max(
    0,
    value
  );
}


function normalizeBaseScore(
  value: number
): number {
  if (
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      value
    )
  );
}


function addFactor(
  context:
    RecommendationScoreContext,
  factor:
    AtlasAdaptiveRecommendationFactor
): void {
  context.factors.push(
    factor
  );

  context.score +=
    factor.value;
}


function normalizeText(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}


function includesAny(
  source: string,
  values: string[]
): boolean {
  const normalized =
    normalizeText(source);

  return values.some(
    (value) =>
      normalized.includes(
        normalizeText(value)
      )
  );
}


function getProfileTraitNames(
  profile:
    AtlasPersistentBehaviorProfile
): string[] {
  return profile
    .dominantTraits
    .map(
      (trait) =>
        normalizeText(
          trait.name
        )
    );
}


function inferRecommendationTraits(
  candidate:
    AtlasAdaptiveRecommendationCandidate
): AtlasAdaptiveRecommendationTrait[] {
  const explicitTraits =
    candidate.traits ?? [];

  const inferred =
    new Set<
      AtlasAdaptiveRecommendationTrait
    >(
      explicitTraits
    );

  switch (
    candidate.category
  ) {
    case "business":
      inferred.add(
        "expansion"
      );
      inferred.add(
        "investment"
      );
      inferred.add(
        "planning"
      );
      break;

    case "property":
      inferred.add(
        "expansion"
      );
      inferred.add(
        "investment"
      );
      inferred.add(
        "planning"
      );
      inferred.add(
        "discipline"
      );
      break;

    case "vehicle":
      inferred.add(
        "collection"
      );
      inferred.add(
        "progression"
      );
      break;

    case "weapon":
      inferred.add(
        "combat"
      );
      inferred.add(
        "progression"
      );
      break;

    case "mission":
      inferred.add(
        "progression"
      );
      inferred.add(
        "momentum"
      );
      inferred.add(
        "efficiency"
      );
      break;

    case "collection":
      inferred.add(
        "collection"
      );
      inferred.add(
        "completion"
      );
      inferred.add(
        "exploration"
      );
      break;

    case "exploration":
      inferred.add(
        "exploration"
      );
      inferred.add(
        "opportunity"
      );
      break;

    case "financial":
      inferred.add(
        "investment"
      );
      inferred.add(
        "discipline"
      );
      inferred.add(
        "planning"
      );
      break;

    case "progression":
      inferred.add(
        "progression"
      );
      inferred.add(
        "momentum"
      );
      break;

    case "social":
      inferred.add(
        "social"
      );
      break;

    case "custom":
      break;
  }

  if (
    candidate.risk ===
      "high" ||
    candidate.risk ===
      "extreme"
  ) {
    inferred.add(
      "risk-taking"
    );
  }

  if (
    candidate.risk ===
    "low"
  ) {
    inferred.add(
      "risk-control"
    );
  }

  if (
    candidate.horizon ===
    "long-term"
  ) {
    inferred.add(
      "planning"
    );
    inferred.add(
      "discipline"
    );
  }

  if (
    candidate.effort ===
    "low"
  ) {
    inferred.add(
      "efficiency"
    );
  }

  return Array.from(
    inferred
  );
}


function getArchetypePreferredTraits(
  archetype: string
): AtlasAdaptiveRecommendationTrait[] {
  if (
    includesAny(
      archetype,
      [
        "empire",
        "builder",
        "executive",
        "mogul",
      ]
    )
  ) {
    return [
      "expansion",
      "investment",
      "planning",
      "discipline",
      "progression",
    ];
  }

  if (
    includesAny(
      archetype,
      [
        "operator",
        "strategist",
        "planner",
      ]
    )
  ) {
    return [
      "efficiency",
      "planning",
      "discipline",
      "risk-control",
      "opportunity",
    ];
  }

  if (
    includesAny(
      archetype,
      [
        "competitor",
        "competitive",
        "driver",
      ]
    )
  ) {
    return [
      "competition",
      "combat",
      "risk-taking",
      "momentum",
      "progression",
    ];
  }

  if (
    includesAny(
      archetype,
      [
        "collector",
        "completionist",
      ]
    )
  ) {
    return [
      "collection",
      "completion",
      "exploration",
      "discipline",
    ];
  }

  if (
    includesAny(
      archetype,
      [
        "explorer",
        "adventurer",
      ]
    )
  ) {
    return [
      "exploration",
      "opportunity",
      "collection",
      "progression",
    ];
  }

  if (
    includesAny(
      archetype,
      [
        "social",
        "crew",
        "specialist",
      ]
    )
  ) {
    return [
      "social",
      "resilience",
      "planning",
      "progression",
    ];
  }

  return [
    "progression",
    "planning",
    "efficiency",
  ];
}


function scoreArchetypeAlignment(
  context:
    RecommendationScoreContext
): void {
  const candidateTraits =
    inferRecommendationTraits(
      context.candidate
    );

  const preferredTraits =
    getArchetypePreferredTraits(
      context.behaviorProfile
        .primaryArchetype
    );

  const matches =
    candidateTraits.filter(
      (trait) =>
        preferredTraits.includes(
          trait
        )
    );

  const alignment =
    preferredTraits.length === 0
      ? 0
      : matches.length /
        preferredTraits.length;

  const score =
    Math.min(
      20,
      alignment * 28
    );

  context.archetypeAlignment =
    normalizePercentage(
      alignment * 100
    );

  if (
    score > 0
  ) {
    addFactor(
      context,
      {
        type:
          "archetype-alignment",

        label:
          "Archetype alignment",

        value:
          score,

        explanation:
          `${context.candidate.title} aligns with ${matches.join(
            ", "
          )} behavior associated with the player's ${context.behaviorProfile.primaryArchetype} archetype.`,
      }
    );
  }
}


function scoreBehaviorAlignment(
  context:
    RecommendationScoreContext
): void {
  const candidateTraits =
    inferRecommendationTraits(
      context.candidate
    );

  const profileTraits =
    getProfileTraitNames(
      context.behaviorProfile
    );

  const matchingProfileTraits =
    context.behaviorProfile
      .dominantTraits
      .filter(
        (trait) =>
          candidateTraits.some(
            (candidateTrait) =>
              normalizeText(
                trait.name
              ).includes(
                normalizeText(
                  candidateTrait
                )
              ) ||
              normalizeText(
                candidateTrait
              ).includes(
                normalizeText(
                  trait.name
                )
              )
          )
      );

  const directMatches =
    candidateTraits.filter(
      (candidateTrait) =>
        profileTraits.some(
          (profileTrait) =>
            profileTrait.includes(
              normalizeText(
                candidateTrait
              )
            ) ||
            normalizeText(
              candidateTrait
            ).includes(
              profileTrait
            )
        )
    );

  const weightedConfidence =
    matchingProfileTraits.reduce(
      (
        total,
        trait
      ) =>
        total +
        trait.confidence,
      0
    );

  const alignment =
    matchingProfileTraits.length >
    0
      ? weightedConfidence /
        matchingProfileTraits.length
      : 0;

  const score =
    matchingProfileTraits.length >
    0
      ? Math.min(
          25,
          alignment *
            0.18 +
            directMatches.length *
              2
        )
      : 0;

  context.behaviorAlignment =
    normalizePercentage(
      alignment
    );

  if (
    score > 0
  ) {
    addFactor(
      context,
      {
        type:
          "trait-alignment",

        label:
          "Behavior alignment",

        value:
          score,

        explanation:
          `This recommendation matches ${matchingProfileTraits
            .map(
              (trait) =>
                trait.name
            )
            .join(
              ", "
            )}, which Atlas has identified as dominant player behavior.`,
      }
    );
  }

  const excludedTraits =
    context.candidate
      .excludedTraits ?? [];

  const conflicts =
    excludedTraits.filter(
      (excludedTrait) =>
        profileTraits.some(
          (profileTrait) =>
            profileTrait.includes(
              normalizeText(
                excludedTrait
              )
            ) ||
            normalizeText(
              excludedTrait
            ).includes(
              profileTrait
            )
        )
    );

  if (
    conflicts.length > 0
  ) {
    const penalty =
      Math.min(
        30,
        conflicts.length * 10
      );

    addFactor(
      context,
      {
        type:
          "trait-conflict",

        label:
          "Behavior conflict",

        value:
          -penalty,

        explanation:
          `This recommendation conflicts with observed ${conflicts.join(
            ", "
          )} behavior.`,
      }
    );
  }

  const requiredTraits =
    context.candidate
      .requiredTraits ?? [];

  const missingRequiredTraits =
    requiredTraits.filter(
      (requiredTrait) =>
        !candidateTraits.includes(
          requiredTrait
        ) &&
        !profileTraits.some(
          (profileTrait) =>
            profileTrait.includes(
              normalizeText(
                requiredTrait
              )
            )
        )
    );

  if (
    missingRequiredTraits.length >
    0
  ) {
    const penalty =
      Math.min(
        25,
        missingRequiredTraits.length *
          8
      );

    addFactor(
      context,
      {
        type:
          "trait-conflict",

        label:
          "Missing behavior support",

        value:
          -penalty,

        explanation:
          `Atlas has not yet confirmed the ${missingRequiredTraits.join(
            ", "
          )} behavior this recommendation depends on.`,
      }
    );
  }
}


function scoreEvolutionAlignment(
  context:
    RecommendationScoreContext
): void {
  const evolution =
    context.strategyEvolution;

  if (
    !evolution ||
    !evolution.hasPreviousProfile
  ) {
    context.evolutionAlignment =
      50;

    return;
  }

  const candidateTraits =
    inferRecommendationTraits(
      context.candidate
    ).map(
      normalizeText
    );

  let positiveMatches = 0;

  let negativeMatches = 0;

  const positiveTraitIds = [
    ...evolution.growingTraits,
    ...evolution.emergingTraits,
  ].map(
    (trait) =>
      normalizeText(
        String(trait)
      )
  );

  const negativeTraitIds = [
    ...evolution.decliningTraits,
    ...evolution.fadingTraits,
  ].map(
    (trait) =>
      normalizeText(
        String(trait)
      )
  );

  for (
    const candidateTrait
    of candidateTraits
  ) {
    if (
      positiveTraitIds.some(
        (trait) =>
          trait.includes(
            candidateTrait
          ) ||
          candidateTrait.includes(
            trait
          )
      )
    ) {
      positiveMatches += 1;
    }

    if (
      negativeTraitIds.some(
        (trait) =>
          trait.includes(
            candidateTrait
          ) ||
          candidateTrait.includes(
            trait
          )
      )
    ) {
      negativeMatches += 1;
    }
  }

  const changeConfidence =
    evolution
      .evolutionConfidence /
    100;

  const positiveScore =
    Math.min(
      18,
      positiveMatches *
        7 *
        changeConfidence
    );

  const negativeScore =
    Math.min(
      18,
      negativeMatches *
        7 *
        changeConfidence
    );

  context.evolutionAlignment =
    normalizePercentage(
      50 +
        positiveMatches * 20 -
        negativeMatches * 20
    );

  if (
    positiveScore > 0
  ) {
    addFactor(
      context,
      {
        type:
          "strategy-evolution",

        label:
          "Growing strategy alignment",

        value:
          positiveScore,

        explanation:
          `This recommendation aligns with behavioral traits that are currently strengthening or emerging.`,
      }
    );
  }

  if (
    negativeScore > 0
  ) {
    addFactor(
      context,
      {
        type:
          "strategy-evolution",

        label:
          "Declining strategy alignment",

        value:
          -negativeScore,

        explanation:
          `This recommendation depends on behavioral traits that are currently weakening or fading.`,
      }
    );
  }

  if (
    evolution.archetypeChanged
  ) {
    const preferredTraits =
      getArchetypePreferredTraits(
        evolution.currentArchetype
      );

    const currentArchetypeMatches =
      candidateTraits.filter(
        (trait) =>
          preferredTraits.some(
            (preferredTrait) =>
              normalizeText(
                preferredTrait
              ) === trait
          )
      );

    if (
      currentArchetypeMatches.length >
      0
    ) {
      const score =
        Math.min(
          12,
          currentArchetypeMatches.length *
            4
        );

      addFactor(
        context,
        {
          type:
            "strategy-evolution",

          label:
            "Current archetype alignment",

          value:
            score,

          explanation:
            `The recommendation supports the player's newly detected ${evolution.currentArchetype} archetype.`,
        }
      );
    }
  }
}


function inferPreferredRisk(
  profile:
    AtlasPersistentBehaviorProfile
): AtlasAdaptiveRecommendationRisk {
  const archetype =
    profile.primaryArchetype;

  const traitNames =
    getProfileTraitNames(
      profile
    );

  if (
    includesAny(
      archetype,
      [
        "aggressive",
        "competitive",
        "driver",
      ]
    ) ||
    traitNames.some(
      (trait) =>
        trait.includes(
          "risk"
        ) &&
        !trait.includes(
          "control"
        )
    )
  ) {
    return "high";
  }

  if (
    includesAny(
      archetype,
      [
        "operator",
        "planner",
        "disciplined",
        "conservative",
      ]
    ) ||
    traitNames.some(
      (trait) =>
        trait.includes(
          "discipline"
        ) ||
        trait.includes(
          "control"
        )
    )
  ) {
    return "low";
  }

  return "moderate";
}


function scoreRiskAlignment(
  context:
    RecommendationScoreContext
): void {
  const preferredRisk =
    inferPreferredRisk(
      context.behaviorProfile
    );

  const distance =
    Math.abs(
      riskRank[
        context.candidate.risk
      ] -
      riskRank[
        preferredRisk
      ]
    );

  const alignment =
    Math.max(
      0,
      100 -
        distance * 35
    );

  const score =
    distance === 0
      ? 10
      : distance === 1
        ? 3
        : -8;

  context.riskAlignment =
    alignment;

  addFactor(
    context,
    {
      type:
        "risk-alignment",

      label:
        "Risk alignment",

      value:
        score,

      explanation:
        distance === 0
          ? `The ${context.candidate.risk} risk level matches the player's observed risk behavior.`
          : `The recommendation's ${context.candidate.risk} risk level differs from the player's inferred ${preferredRisk} risk preference.`,
    }
  );
}


function inferPreferredEffort(
  profile:
    AtlasPersistentBehaviorProfile
): AtlasAdaptiveRecommendationEffort {
  const traitNames =
    getProfileTraitNames(
      profile
    );

  if (
    traitNames.some(
      (trait) =>
        trait.includes(
          "efficiency"
        ) ||
        trait.includes(
          "momentum"
        )
    )
  ) {
    return "low";
  }

  if (
    traitNames.some(
      (trait) =>
        trait.includes(
          "completion"
        ) ||
        trait.includes(
          "resilience"
        ) ||
        trait.includes(
          "discipline"
        )
    )
  ) {
    return "high";
  }

  return "moderate";
}


function scoreEffortAlignment(
  context:
    RecommendationScoreContext
): void {
  const preferredEffort =
    inferPreferredEffort(
      context.behaviorProfile
    );

  const distance =
    Math.abs(
      effortRank[
        context.candidate.effort
      ] -
      effortRank[
        preferredEffort
      ]
    );

  const alignment =
    Math.max(
      0,
      100 -
        distance * 45
    );

  const score =
    distance === 0
      ? 7
      : distance === 1
        ? 2
        : -6;

  context.effortAlignment =
    alignment;

  addFactor(
    context,
    {
      type:
        "effort-alignment",

      label:
        "Effort alignment",

      value:
        score,

      explanation:
        distance === 0
          ? `The required ${context.candidate.effort} effort matches the player's observed engagement style.`
          : `The required ${context.candidate.effort} effort differs from the player's inferred ${preferredEffort} effort preference.`,
    }
  );
}


function inferPreferredHorizon(
  profile:
    AtlasPersistentBehaviorProfile
): AtlasAdaptiveRecommendationHorizon {
  const archetype =
    profile.primaryArchetype;

  const traits =
    getProfileTraitNames(
      profile
    );

  if (
    includesAny(
      archetype,
      [
        "empire",
        "builder",
        "planner",
        "strategist",
      ]
    ) ||
    traits.some(
      (trait) =>
        trait.includes(
          "investment"
        ) ||
        trait.includes(
          "planning"
        ) ||
        trait.includes(
          "discipline"
        )
    )
  ) {
    return "long-term";
  }

  if (
    traits.some(
      (trait) =>
        trait.includes(
          "momentum"
        ) ||
        trait.includes(
          "opportunity"
        )
    )
  ) {
    return "short-term";
  }

  return "medium-term";
}


function scoreHorizonAlignment(
  context:
    RecommendationScoreContext
): void {
  const preferredHorizon =
    inferPreferredHorizon(
      context.behaviorProfile
    );

  const distance =
    Math.abs(
      horizonRank[
        context.candidate.horizon
      ] -
      horizonRank[
        preferredHorizon
      ]
    );

  const alignment =
    Math.max(
      0,
      100 -
        distance * 30
    );

  const score =
    distance === 0
      ? 8
      : distance === 1
        ? 3
        : distance === 2
          ? -3
          : -7;

  context.horizonAlignment =
    alignment;

  addFactor(
    context,
    {
      type:
        "horizon-alignment",

      label:
        "Strategy horizon",

      value:
        score,

      explanation:
        distance === 0
          ? `The ${context.candidate.horizon} payoff horizon matches the player's current strategic pattern.`
          : `The ${context.candidate.horizon} payoff horizon differs from the player's inferred ${preferredHorizon} preference.`,
    }
  );
}


function scoreRewardEfficiency(
  context:
    RecommendationScoreContext
): void {
  const reward =
    context.candidate
      .estimatedReward;

  const cost =
    context.candidate
      .estimatedCost;

  const duration =
    context.candidate
      .estimatedDurationMinutes;

  if (
    reward === null ||
    reward === undefined ||
    !Number.isFinite(reward) ||
    reward <= 0
  ) {
    context.rewardEfficiency =
      50;

    return;
  }

  let efficiency = 50;

  if (
    cost !== null &&
    cost !== undefined &&
    Number.isFinite(cost)
  ) {
    if (
      cost <= 0
    ) {
      efficiency += 30;
    } else {
      const returnRatio =
        reward / cost;

      efficiency +=
        Math.min(
          30,
          returnRatio * 10
        );
    }
  }

  if (
    duration !== null &&
    duration !== undefined &&
    Number.isFinite(duration) &&
    duration > 0
  ) {
    const rewardPerHour =
      reward /
      (
        duration / 60
      );

    efficiency +=
      Math.min(
        20,
        Math.log10(
          Math.max(
            1,
            rewardPerHour
          )
        ) * 4
      );
  }

  context.rewardEfficiency =
    normalizePercentage(
      efficiency
    );

  const score =
    (
      context.rewardEfficiency -
      50
    ) *
    0.12;

  if (
    Math.abs(score) >= 1
  ) {
    addFactor(
      context,
      {
        type:
          "reward-efficiency",

        label:
          "Reward efficiency",

        value:
          score,

        explanation:
          score > 0
            ? "The estimated reward is efficient relative to the expected cost and time commitment."
            : "The estimated reward is weak relative to the expected cost or time commitment.",
      }
    );
  }
}


function scoreProfileConfidence(
  context:
    RecommendationScoreContext
): void {
  const confidence =
    context.behaviorProfile
      .profileConfidence;

  const confidenceAdjustment =
    (
      confidence -
      50
    ) *
    0.08;

  if (
    Math.abs(
      confidenceAdjustment
    ) >= 1
  ) {
    addFactor(
      context,
      {
        type:
          "profile-confidence",

        label:
          "Profile confidence",

        value:
          confidenceAdjustment,

        explanation:
          confidence >= 50
            ? `Atlas has ${confidence}% confidence in the behavior profile supporting this personalization.`
            : `Atlas has only ${confidence}% confidence in the current behavior profile, so personalization is being applied conservatively.`,
      }
    );
  }

  const sufficiency =
    context.behaviorProfile
      .dataSufficiency;

  const sufficiencyScore =
    sufficiency === "strong"
      ? 5
      : sufficiency ===
          "sufficient"
        ? 3
        : sufficiency ===
            "developing"
          ? 0
          : -5;

  if (
    sufficiencyScore !== 0
  ) {
    addFactor(
      context,
      {
        type:
          "data-sufficiency",

        label:
          "Behavioral evidence",

        value:
          sufficiencyScore,

        explanation:
          sufficiencyScore > 0
            ? `The profile has ${sufficiency} supporting evidence.`
            : "The profile does not yet have enough evidence for aggressive personalization.",
      }
    );
  }
}


function scoreAvailability(
  context:
    RecommendationScoreContext
): void {
  if (
    context.candidate
      .isAvailable === false
  ) {
    addFactor(
      context,
      {
        type:
          "availability",

        label:
          "Unavailable",

        value:
          -100,

        explanation:
          "This recommendation is not currently available to the player.",
      }
    );
  }

  if (
    context.candidate
      .isCompleted === true
  ) {
    addFactor(
      context,
      {
        type:
          "completion",

        label:
          "Already completed",

        value:
          context.candidate
              .isRepeatable ===
            true
            ? -15
            : -100,

        explanation:
          context.candidate
              .isRepeatable ===
            true
            ? "The activity has already been completed but remains repeatable."
            : "The activity has already been completed and is not repeatable.",
      }
    );
  }
}


function buildScoreContext(
  candidate:
    AtlasAdaptiveRecommendationCandidate,
  behaviorProfile:
    AtlasPersistentBehaviorProfile,
  strategyEvolution:
    AtlasStrategyEvolution | null
): RecommendationScoreContext {
  const baseScore =
    normalizeBaseScore(
      candidate.baseScore
    );

  const context:
    RecommendationScoreContext = {
      candidate,

      behaviorProfile,

      strategyEvolution,

      factors: [
        {
          type:
            "base-score",

          label:
            "Base recommendation score",

          value:
            baseScore,

          explanation:
            `The recommendation entered adaptive ranking with a base score of ${baseScore}.`,
        },
      ],

      score:
        baseScore,

      archetypeAlignment:
        0,

      behaviorAlignment:
        0,

      evolutionAlignment:
        strategyEvolution
          ? 50
          : 0,

      riskAlignment:
        0,

      effortAlignment:
        0,

      horizonAlignment:
        0,

      rewardEfficiency:
        50,
    };

  scoreArchetypeAlignment(
    context
  );

  scoreBehaviorAlignment(
    context
  );

  scoreEvolutionAlignment(
    context
  );

  scoreRiskAlignment(
    context
  );

  scoreEffortAlignment(
    context
  );

  scoreHorizonAlignment(
    context
  );

  scoreRewardEfficiency(
    context
  );

  scoreProfileConfidence(
    context
  );

  scoreAvailability(
    context
  );

  return context;
}


function resolvePriority(
  normalizedScore: number
): AtlasAdaptiveRecommendationPriority {
  if (
    normalizedScore >= 85
  ) {
    return "critical";
  }

  if (
    normalizedScore >= 70
  ) {
    return "high";
  }

  if (
    normalizedScore >= 50
  ) {
    return "medium";
  }

  return "low";
}


function resolveAction(
  normalizedScore: number,
  candidate:
    AtlasAdaptiveRecommendationCandidate
): AtlasAdaptiveRecommendationAction {
  if (
    candidate.isAvailable ===
    false
  ) {
    return "monitor";
  }

  if (
    candidate.isCompleted ===
      true &&
    candidate.isRepeatable !==
      true
  ) {
    return "avoid";
  }

  if (
    normalizedScore >= 75
  ) {
    return "prioritize";
  }

  if (
    normalizedScore >= 55
  ) {
    return "consider";
  }

  if (
    normalizedScore >= 35
  ) {
    return "monitor";
  }

  return "deprioritize";
}


function resolveConfidence(
  context:
    RecommendationScoreContext
): number {
  const profileConfidence =
    context.behaviorProfile
      .profileConfidence;

  const evolutionConfidence =
    context.strategyEvolution
      ?.evolutionConfidence ??
    profileConfidence;

  const alignmentConfidence =
    (
      context
        .archetypeAlignment +
      context
        .behaviorAlignment +
      context
        .evolutionAlignment +
      context
        .riskAlignment +
      context
        .effortAlignment +
      context
        .horizonAlignment
    ) /
    6;

  return normalizePercentage(
    profileConfidence *
      0.45 +
    evolutionConfidence *
      0.25 +
    alignmentConfidence *
      0.3
  );
}


function resolveConfidenceLevel(
  confidence: number
): AtlasAdaptiveRecommendationConfidence {
  if (
    confidence >= 85
  ) {
    return "very-strong";
  }

  if (
    confidence >= 70
  ) {
    return "strong";
  }

  if (
    confidence >= 50
  ) {
    return "developing";
  }

  return "limited";
}


function getPositiveFactors(
  factors:
    AtlasAdaptiveRecommendationFactor[]
): AtlasAdaptiveRecommendationFactor[] {
  return factors
    .filter(
      (factor) =>
        factor.value > 0 &&
        factor.type !==
          "base-score"
    )
    .sort(
      (
        first,
        second
      ) =>
        second.value -
        first.value
    );
}


function getNegativeFactors(
  factors:
    AtlasAdaptiveRecommendationFactor[]
): AtlasAdaptiveRecommendationFactor[] {
  return factors
    .filter(
      (factor) =>
        factor.value < 0
    )
    .sort(
      (
        first,
        second
      ) =>
        first.value -
        second.value
    );
}


function buildHeadline(
  candidate:
    AtlasAdaptiveRecommendationCandidate,
  action:
    AtlasAdaptiveRecommendationAction
): string {
  switch (action) {
    case "prioritize":
      return `Prioritize ${candidate.title}.`;

    case "consider":
      return `Consider ${candidate.title}.`;

    case "monitor":
      return `Monitor ${candidate.title} as a future option.`;

    case "deprioritize":
      return `Deprioritize ${candidate.title} for now.`;

    case "avoid":
      return `Avoid recommending ${candidate.title}.`;
  }
}


function buildExplanation(
  candidate:
    AtlasAdaptiveRecommendationCandidate,
  positiveFactors:
    AtlasAdaptiveRecommendationFactor[],
  negativeFactors:
    AtlasAdaptiveRecommendationFactor[]
): string {
  const strongestPositive =
    positiveFactors[0];

  const strongestNegative =
    negativeFactors[0];

  if (
    strongestPositive &&
    strongestNegative
  ) {
    return `${candidate.title} is supported primarily by ${strongestPositive.label.toLowerCase()}, although ${strongestNegative.label.toLowerCase()} reduces its current priority.`;
  }

  if (
    strongestPositive
  ) {
    return `${candidate.title} ranks well because of ${strongestPositive.label.toLowerCase()}.`;
  }

  if (
    strongestNegative
  ) {
    return `${candidate.title} ranks lower because of ${strongestNegative.label.toLowerCase()}.`;
  }

  return `${candidate.title} is ranked primarily from its base recommendation score because Atlas does not yet have strong personalization evidence for it.`;
}


function buildCoachingResponse(
  candidate:
    AtlasAdaptiveRecommendationCandidate,
  action:
    AtlasAdaptiveRecommendationAction,
  profile:
    AtlasPersistentBehaviorProfile
): string {
  switch (action) {
    case "prioritize":
      return `Present ${candidate.title} as the player's strongest next move and explain how it supports their ${profile.primaryArchetype} strategy.`;

    case "consider":
      return `Offer ${candidate.title} as a strong option without framing it as mandatory.`;

    case "monitor":
      return `Keep ${candidate.title} visible as a developing opportunity and reevaluate it as the player's profile changes.`;

    case "deprioritize":
      return `Avoid placing ${candidate.title} near the top of the recommendation list until stronger behavioral alignment appears.`;

    case "avoid":
      return `Do not actively recommend ${candidate.title} under the player's current circumstances.`;
  }
}


function buildStrategicRationale(
  context:
    RecommendationScoreContext
): string {
  const profile =
    context.behaviorProfile;

  const evolution =
    context.strategyEvolution;

  if (
    evolution?.hasMeaningfulEvolution
  ) {
    return `Atlas ranked this recommendation using the player's ${profile.primaryArchetype} profile and the latest strategy evolution signal: ${evolution.headline}`;
  }

  return `Atlas ranked this recommendation using the player's ${profile.primaryArchetype} profile and ${profile.profileConfidence}% profile confidence.`;
}


function buildRecommendation(
  context:
    RecommendationScoreContext
): AtlasAdaptiveRecommendation {
  const score =
    normalizeScore(
      context.score
    );

  const normalizedScore =
    normalizePercentage(
      score
    );

  const confidence =
    resolveConfidence(
      context
    );

  const action =
    resolveAction(
      normalizedScore,
      context.candidate
    );

  const positiveFactors =
    getPositiveFactors(
      context.factors
    );

  const negativeFactors =
    getNegativeFactors(
      context.factors
    );

  return {
    id:
      context.candidate.id,

    candidate:
      context.candidate,

    rank:
      0,

    score,

    normalizedScore,

    priority:
      resolvePriority(
        normalizedScore
      ),

    confidence,

    confidenceLevel:
      resolveConfidenceLevel(
        confidence
      ),

    action,

    archetypeAlignment:
      context
        .archetypeAlignment,

    behaviorAlignment:
      context
        .behaviorAlignment,

    evolutionAlignment:
      context
        .evolutionAlignment,

    riskAlignment:
      context
        .riskAlignment,

    effortAlignment:
      context
        .effortAlignment,

    horizonAlignment:
      context
        .horizonAlignment,

    rewardEfficiency:
      context
        .rewardEfficiency,

    positiveFactors,

    negativeFactors,

    headline:
      buildHeadline(
        context.candidate,
        action
      ),

    explanation:
      buildExplanation(
        context.candidate,
        positiveFactors,
        negativeFactors
      ),

    coachingResponse:
      buildCoachingResponse(
        context.candidate,
        action,
        context.behaviorProfile
      ),

    strategicRationale:
      buildStrategicRationale(
        context
      ),
  };
}


function compareRecommendations(
  first:
    AtlasAdaptiveRecommendation,
  second:
    AtlasAdaptiveRecommendation
): number {
  const scoreDifference =
    second.normalizedScore -
    first.normalizedScore;

  if (
    scoreDifference !== 0
  ) {
    return scoreDifference;
  }

  const confidenceDifference =
    second.confidence -
    first.confidence;

  if (
    confidenceDifference !== 0
  ) {
    return confidenceDifference;
  }

  return first.candidate.title
    .localeCompare(
      second.candidate.title
    );
}


function buildSummary(
  recommendations:
    AtlasAdaptiveRecommendation[],
  behaviorProfile:
    AtlasPersistentBehaviorProfile,
  strategyEvolution:
    AtlasStrategyEvolution | null
): string {
  if (
    recommendations.length === 0
  ) {
    return "Atlas did not find any recommendations that met the current adaptive ranking requirements.";
  }

  const topRecommendation =
    recommendations[0];

  const evolutionText =
    strategyEvolution
      ?.hasMeaningfulEvolution
      ? ` The ranking also reflects the player's latest strategic evolution.`
      : "";

  return `${topRecommendation.candidate.title} is the strongest current recommendation for the player's ${behaviorProfile.primaryArchetype} profile, with a score of ${topRecommendation.normalizedScore} and ${topRecommendation.confidence}% confidence.${evolutionText}`;
}


function validateCandidate(
  candidate:
    AtlasAdaptiveRecommendationCandidate
): boolean {
  return (
    candidate.id.trim()
      .length > 0 &&
    candidate.title.trim()
      .length > 0 &&
    Number.isFinite(
      candidate.baseScore
    )
  );
}


export function buildAtlasAdaptiveRecommendations({
  candidates,
  behaviorProfile,
  strategyEvolution = null,
  generatedAt,
  maximumRecommendations,
  minimumScore,
  includeUnavailable = false,
  includeCompleted = false,
}: BuildAtlasAdaptiveRecommendationsInput): AtlasAdaptiveRecommendationResult {
  const resolvedGeneratedAt =
    resolveTimestamp(
      generatedAt
    );

  const recommendationLimit =
    normalizeMaximumRecommendations(
      maximumRecommendations
    );

  const scoreThreshold =
    normalizeMinimumScore(
      minimumScore
    );

  const eligibleCandidates =
    candidates.filter(
      (candidate) => {
        if (
          !validateCandidate(
            candidate
          )
        ) {
          return false;
        }

        if (
          !includeUnavailable &&
          candidate.isAvailable ===
            false
        ) {
          return false;
        }

        if (
          !includeCompleted &&
          candidate.isCompleted ===
            true &&
          candidate.isRepeatable !==
            true
        ) {
          return false;
        }

        return true;
      }
    );

  const rankedRecommendations =
    eligibleCandidates
      .map(
        (candidate) =>
          buildRecommendation(
            buildScoreContext(
              candidate,
              behaviorProfile,
              strategyEvolution
            )
          )
      )
      .filter(
        (recommendation) =>
          recommendation
            .normalizedScore >=
          scoreThreshold
      )
      .sort(
        compareRecommendations
      )
      .slice(
        0,
        recommendationLimit
      )
      .map(
        (
          recommendation,
          index
        ) => ({
          ...recommendation,

          rank:
            index + 1,
        })
      );

  return {
    version:
      ATLAS_ADAPTIVE_RECOMMENDATION_VERSION,

    generatedAt:
      resolvedGeneratedAt,

    profileGeneratedAt:
      behaviorProfile
        .generatedAt,

    evolutionGeneratedAt:
      strategyEvolution
        ?.generatedAt ??
      null,

    profileConfidence:
      behaviorProfile
        .profileConfidence,

    evolutionConfidence:
      strategyEvolution
        ?.evolutionConfidence ??
      null,

    candidatesEvaluated:
      eligibleCandidates.length,

    recommendationsReturned:
      rankedRecommendations.length,

    topRecommendation:
      rankedRecommendations[0] ??
      null,

    recommendations:
      rankedRecommendations,

    summary:
      buildSummary(
        rankedRecommendations,
        behaviorProfile,
        strategyEvolution
      ),
  };
}