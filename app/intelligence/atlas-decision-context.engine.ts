import type {
  EmpireModel,
  PlayerPlaystyle,
  PlayerProfile,
} from "@/app/types";

import type {
  AtlasAdaptiveRecommendationCandidate,
  AtlasAdaptiveRecommendationCategory,
} from "./atlas-adaptive-recommendation.engine";

import type {
  AtlasDecisionContext,
} from "./atlas-decision.engine";

import type {
  AtlasBrainModel,
} from "./dashboard-intelligence.engine";


export const ATLAS_DECISION_CONTEXT_VERSION =
  1;


export type AtlasDecisionContextRisk =
  NonNullable<
    AtlasDecisionContext["maximumRisk"]
  >;


export type BuildAtlasDecisionContextInput = {
  profile:
    PlayerProfile;

  empire:
    EmpireModel;

  candidates:
    AtlasAdaptiveRecommendationCandidate[];

  brain?:
    AtlasBrainModel | null;

  availableMinutes?:
    number | null;

  maximumRisk?:
    AtlasDecisionContextRisk;

  preferredCategories?:
    AtlasAdaptiveRecommendationCategory[];

  excludedCategories?:
    AtlasAdaptiveRecommendationCategory[];

  activeObjectiveIds?:
    string[];

  completedRecommendationIds?:
    string[];

  blockedRecommendationIds?:
    string[];

  urgentRecommendationIds?:
    string[];

  requiredRecommendationIds?:
    string[];

  maximumSupportingActions?:
    number;

  maximumDeferredActions?:
    number;

  minimumDecisionConfidence?:
    number;

  generatedAt?:
    string;

  metadata?:
    Record<string, unknown>;
};


type UnknownRecord =
  Record<string, unknown>;


const DEFAULT_AVAILABLE_MINUTES =
  60;

const MINIMUM_AVAILABLE_MINUTES =
  5;

const MAXIMUM_AVAILABLE_MINUTES =
  24 * 60;

const DEFAULT_MINIMUM_DECISION_CONFIDENCE =
  0.55;

const MAXIMUM_PREFERRED_CATEGORIES =
  5;

const MAXIMUM_URGENT_RECOMMENDATIONS =
  5;

const MAXIMUM_REQUIRED_RECOMMENDATIONS =
  3;


function isRecord(
  value: unknown
): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(
      value
    )
  );
}


function resolveGeneratedAt(
  value?: string
): string {
  if (
    !value
  ) {
    return new Date().toISOString();
  }

  const parsedDate =
    new Date(
      value
    );

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return new Date().toISOString();
  }

  return parsedDate.toISOString();
}


function normalizeCash(
  value: number
): number {
  if (
    !Number.isFinite(
      value
    )
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.round(
      value * 100
    ) / 100
  );
}


function normalizeAvailableMinutes(
  value?: number | null
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(
      value
    )
  ) {
    return DEFAULT_AVAILABLE_MINUTES;
  }

  return Math.min(
    MAXIMUM_AVAILABLE_MINUTES,
    Math.max(
      MINIMUM_AVAILABLE_MINUTES,
      Math.round(
        value
      )
    )
  );
}


function normalizeActionLimit(
  value: number | undefined,
  fallback: number,
  maximum: number
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(
      value
    )
  ) {
    return fallback;
  }

  return Math.min(
    maximum,
    Math.max(
      0,
      Math.round(
        value
      )
    )
  );
}


function normalizeConfidence(
  value: number | undefined,
  fallback:
    number = DEFAULT_MINIMUM_DECISION_CONFIDENCE
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(
      value
    )
  ) {
    return fallback;
  }

  const normalizedValue =
    value > 1
      ? value / 100
      : value;

  return Math.min(
    1,
    Math.max(
      0,
      Math.round(
        normalizedValue * 1000
      ) / 1000
    )
  );
}


function deduplicateStrings(
  values:
    Array<string | null | undefined>
): string[] {
  return Array.from(
    new Set(
      values
        .filter(
          (
            value
          ): value is string =>
            typeof value ===
              "string" &&
            value.trim().length >
              0
        )
        .map(
          (
            value
          ) =>
            value.trim()
        )
    )
  );
}


function deduplicateCategories(
  categories:
    AtlasAdaptiveRecommendationCategory[]
): AtlasAdaptiveRecommendationCategory[] {
  return Array.from(
    new Set(
      categories
    )
  );
}


function getString(
  record:
    UnknownRecord,
  keys:
    string[]
): string | null {
  for (
    const key of keys
  ) {
    const value =
      record[key];

    if (
      typeof value !==
      "string"
    ) {
      continue;
    }

    const normalizedValue =
      value.trim();

    if (
      normalizedValue.length >
      0
    ) {
      return normalizedValue;
    }
  }

  return null;
}


function buildStableObjectiveId(
  value:
    UnknownRecord,
  index:
    number
): string {
  const existingId =
    getString(
      value,
      [
        "id",
        "objectiveId",
        "recommendationId",
        "slug",
      ]
    );

  if (
    existingId
  ) {
    return existingId;
  }

  const title =
    getString(
      value,
      [
        "title",
        "name",
        "label",
        "objective",
        "description",
      ]
    );

  if (
    !title
  ) {
    return `atlas-objective-${index + 1}`;
  }

  const normalizedTitle =
    title
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      )
      .slice(
        0,
        72
      );

  return normalizedTitle
    ? `atlas-objective-${normalizedTitle}`
    : `atlas-objective-${index + 1}`;
}


function extractObjectiveIds(
  brain:
    AtlasBrainModel | null | undefined
): string[] {
  if (
    !brain
  ) {
    return [];
  }

  const objectives =
    brain.dailyObjectives;

  if (
    !Array.isArray(
      objectives
    )
  ) {
    return [];
  }

  return deduplicateStrings(
    objectives.map(
      (
        objective,
        index
      ) => {
        if (
          typeof objective ===
          "string"
        ) {
          return objective;
        }

        if (
          !isRecord(
            objective
          )
        ) {
          return null;
        }

        return buildStableObjectiveId(
          objective,
          index
        );
      }
    )
  );
}


function resolveMaximumRisk(
  playstyle:
    PlayerPlaystyle
): AtlasDecisionContextRisk {
  switch (
    playstyle
  ) {
    case "racing":
      return "high";

    case "business":
      return "moderate";

    case "crew":
      return "moderate";

    case "solo":
    default:
      return "low";
  }
}


function getEmpireWeaknessCategories(
  empire:
    EmpireModel
): AtlasAdaptiveRecommendationCategory[] {
  const categories:
    AtlasAdaptiveRecommendationCategory[] =
      [];

  if (
    empire.financialStrength.score <
    65
  ) {
    categories.push(
      "business"
    );
  }

  if (
    empire.businessPortfolio.score <
    65
  ) {
    categories.push(
      "business"
    );
  }

  if (
    empire.growthPotential.score <
    65
  ) {
    categories.push(
      "progression"
    );
  }

  if (
    empire.efficiency.score <
    65
  ) {
    categories.push(
      "mission"
    );
  }

  return categories;
}


function getOwnershipGapCategories(
  profile:
    PlayerProfile
): AtlasAdaptiveRecommendationCategory[] {
  const categories:
    AtlasAdaptiveRecommendationCategory[] =
      [];

  if (
    profile.ownedBusinesses.length ===
    0
  ) {
    categories.push(
      "business"
    );
  }

  if (
    profile.ownedVehicles.length ===
    0
  ) {
    categories.push(
      "vehicle"
    );
  }

  if (
    (
      profile.ownedProperties ??
      []
    ).length === 0
  ) {
    categories.push(
      "property"
    );
  }

  return categories;
}


function getPlaystyleCategories(
  playstyle:
    PlayerPlaystyle
): AtlasAdaptiveRecommendationCategory[] {
  switch (
    playstyle
  ) {
    case "business":
      return [
        "business",
        "property",
        "progression",
      ];

    case "racing":
      return [
        "vehicle",
        "mission",
        "progression",
      ];

    case "crew":
      return [
        "mission",
        "weapon",
        "progression",
      ];

    case "solo":
    default:
      return [
        "progression",
        "mission",
        "business",
      ];
  }
}


function getCandidateCategoryStrength(
  candidates:
    AtlasAdaptiveRecommendationCandidate[]
): Map<
  AtlasAdaptiveRecommendationCategory,
  number
> {
  const categoryScores =
    new Map<
      AtlasAdaptiveRecommendationCategory,
      number
    >();

  for (
    const candidate of candidates
  ) {
    if (
      candidate.isCompleted ||
      candidate.isAvailable ===
        false
    ) {
      continue;
    }

    const currentScore =
      categoryScores.get(
        candidate.category
      ) ??
      0;

    categoryScores.set(
      candidate.category,
      Math.max(
        currentScore,
        candidate.baseScore
      )
    );
  }

  return categoryScores;
}


function sortCategoriesByCandidateStrength(
  categories:
    AtlasAdaptiveRecommendationCategory[],
  candidates:
    AtlasAdaptiveRecommendationCandidate[]
): AtlasAdaptiveRecommendationCategory[] {
  const categoryScores =
    getCandidateCategoryStrength(
      candidates
    );

  return [
    ...categories,
  ].sort(
    (
      left,
      right
    ) =>
      (
        categoryScores.get(
          right
        ) ??
        0
      ) -
      (
        categoryScores.get(
          left
        ) ??
        0
      )
  );
}


function derivePreferredCategories(
  profile:
    PlayerProfile,
  empire:
    EmpireModel,
  candidates:
    AtlasAdaptiveRecommendationCandidate[],
  explicitCategories?:
    AtlasAdaptiveRecommendationCategory[]
): AtlasAdaptiveRecommendationCategory[] {
  if (
    explicitCategories &&
    explicitCategories.length >
      0
  ) {
    return deduplicateCategories(
      explicitCategories
    ).slice(
      0,
      MAXIMUM_PREFERRED_CATEGORIES
    );
  }

  const categories =
    deduplicateCategories(
      [
        ...getEmpireWeaknessCategories(
          empire
        ),

        ...getOwnershipGapCategories(
          profile
        ),

        ...getPlaystyleCategories(
          profile.playstyle
        ),
      ]
    );

  return sortCategoriesByCandidateStrength(
    categories,
    candidates
  ).slice(
    0,
    MAXIMUM_PREFERRED_CATEGORIES
  );
}


function deriveCompletedRecommendationIds(
  candidates:
    AtlasAdaptiveRecommendationCandidate[]
): string[] {
  return candidates
    .filter(
      (
        candidate
      ) =>
        candidate.isCompleted ===
        true
    )
    .map(
      (
        candidate
      ) =>
        candidate.id
    );
}


function deriveBlockedRecommendationIds(
  candidates:
    AtlasAdaptiveRecommendationCandidate[],
  availableCash:
    number,
  availableMinutes:
    number
): string[] {
  return candidates
    .filter(
      (
        candidate
      ) => {
        if (
          candidate.isAvailable ===
          false
        ) {
          return true;
        }

        if (
          typeof candidate.estimatedCost ===
            "number" &&
          candidate.estimatedCost >
            availableCash
        ) {
          return true;
        }

        if (
          typeof candidate.estimatedDurationMinutes ===
            "number" &&
          candidate.estimatedDurationMinutes >
            availableMinutes
        ) {
          return true;
        }

        return false;
      }
    )
    .map(
      (
        candidate
      ) =>
        candidate.id
    );
}


function deriveUrgentRecommendationIds(
  candidates:
    AtlasAdaptiveRecommendationCandidate[],
  blockedRecommendationIds:
    string[],
  completedRecommendationIds:
    string[]
): string[] {
  const blockedIds =
    new Set(
      blockedRecommendationIds
    );

  const completedIds =
    new Set(
      completedRecommendationIds
    );

  return candidates
    .filter(
      (
        candidate
      ) =>
        candidate.baseScore >=
          90 &&
        !blockedIds.has(
          candidate.id
        ) &&
        !completedIds.has(
          candidate.id
        )
    )
    .sort(
      (
        left,
        right
      ) =>
        right.baseScore -
        left.baseScore
    )
    .slice(
      0,
      MAXIMUM_URGENT_RECOMMENDATIONS
    )
    .map(
      (
        candidate
      ) =>
        candidate.id
    );
}


function deriveRequiredRecommendationIds(
  candidates:
    AtlasAdaptiveRecommendationCandidate[],
  preferredCategories:
    AtlasAdaptiveRecommendationCategory[],
  blockedRecommendationIds:
    string[],
  completedRecommendationIds:
    string[]
): string[] {
  const preferredCategorySet =
    new Set(
      preferredCategories
    );

  const blockedIds =
    new Set(
      blockedRecommendationIds
    );

  const completedIds =
    new Set(
      completedRecommendationIds
    );

  const eligibleCandidates =
    candidates
      .filter(
        (
          candidate
        ) =>
          candidate.isAvailable !==
            false &&
          !candidate.isCompleted &&
          !blockedIds.has(
            candidate.id
          ) &&
          !completedIds.has(
            candidate.id
          )
      )
      .sort(
        (
          left,
          right
        ) => {
          const leftPreferred =
            preferredCategorySet.has(
              left.category
            )
              ? 1
              : 0;

          const rightPreferred =
            preferredCategorySet.has(
              right.category
            )
              ? 1
              : 0;

          if (
            leftPreferred !==
            rightPreferred
          ) {
            return (
              rightPreferred -
              leftPreferred
            );
          }

          return (
            right.baseScore -
            left.baseScore
          );
        }
      );

  return eligibleCandidates
    .slice(
      0,
      MAXIMUM_REQUIRED_RECOMMENDATIONS
    )
    .map(
      (
        candidate
      ) =>
        candidate.id
    );
}


function deriveMaximumSupportingActions(
  empire:
    EmpireModel
): number {
  if (
    empire.overallScore >=
    85
  ) {
    return 4;
  }

  if (
    empire.overallScore >=
    65
  ) {
    return 3;
  }

  return 2;
}


function deriveMaximumDeferredActions(
  empire:
    EmpireModel,
  candidates:
    AtlasAdaptiveRecommendationCandidate[]
): number {
  const unresolvedCandidates =
    candidates.filter(
      (
        candidate
      ) =>
        !candidate.isCompleted
    ).length;

  if (
    unresolvedCandidates <=
    4
  ) {
    return 1;
  }

  if (
    empire.overallScore <
    50
  ) {
    return 4;
  }

  return 3;
}


function deriveMinimumDecisionConfidence(
  empire:
    EmpireModel,
  candidates:
    AtlasAdaptiveRecommendationCandidate[]
): number {
  if (
    candidates.length ===
    0
  ) {
    return 0.75;
  }

  if (
    candidates.length <
    3
  ) {
    return 0.65;
  }

  if (
    empire.overallScore <
    40
  ) {
    return 0.6;
  }

  return DEFAULT_MINIMUM_DECISION_CONFIDENCE;
}


function getCandidateSummary(
  candidates:
    AtlasAdaptiveRecommendationCandidate[]
): {
  total: number;
  available: number;
  completed: number;
  unavailable: number;
  repeatable: number;
} {
  return {
    total:
      candidates.length,

    available:
      candidates.filter(
        (
          candidate
        ) =>
          candidate.isAvailable !==
          false
      ).length,

    completed:
      candidates.filter(
        (
          candidate
        ) =>
          candidate.isCompleted ===
          true
      ).length,

    unavailable:
      candidates.filter(
        (
          candidate
        ) =>
          candidate.isAvailable ===
          false
      ).length,

    repeatable:
      candidates.filter(
        (
          candidate
        ) =>
          candidate.isRepeatable ===
          true
      ).length,
  };
}


export function buildAtlasDecisionContext({
  profile,
  empire,
  candidates,
  brain = null,
  availableMinutes,
  maximumRisk,
  preferredCategories,
  excludedCategories = [],
  activeObjectiveIds,
  completedRecommendationIds,
  blockedRecommendationIds,
  urgentRecommendationIds,
  requiredRecommendationIds,
  maximumSupportingActions,
  maximumDeferredActions,
  minimumDecisionConfidence,
  generatedAt,
  metadata,
}: BuildAtlasDecisionContextInput): AtlasDecisionContext {
  const resolvedGeneratedAt =
    resolveGeneratedAt(
      generatedAt
    );

  const resolvedAvailableCash =
    normalizeCash(
      profile.cash
    );

  const resolvedAvailableMinutes =
    normalizeAvailableMinutes(
      availableMinutes
    );

  const resolvedPreferredCategories =
    derivePreferredCategories(
      profile,
      empire,
      candidates,
      preferredCategories
    );

  const resolvedExcludedCategories =
    deduplicateCategories(
      excludedCategories
    ).filter(
      (
        category
      ) =>
        !resolvedPreferredCategories.includes(
          category
        )
    );

  const resolvedActiveObjectiveIds =
    deduplicateStrings(
      activeObjectiveIds ??
        extractObjectiveIds(
          brain
        )
    );

  const resolvedCompletedRecommendationIds =
    deduplicateStrings(
      completedRecommendationIds ??
        deriveCompletedRecommendationIds(
          candidates
        )
    );

  const resolvedBlockedRecommendationIds =
    deduplicateStrings(
      blockedRecommendationIds ??
        deriveBlockedRecommendationIds(
          candidates,
          resolvedAvailableCash,
          resolvedAvailableMinutes
        )
    );

  const resolvedUrgentRecommendationIds =
    deduplicateStrings(
      urgentRecommendationIds ??
        deriveUrgentRecommendationIds(
          candidates,
          resolvedBlockedRecommendationIds,
          resolvedCompletedRecommendationIds
        )
    );

  const resolvedRequiredRecommendationIds =
    deduplicateStrings(
      requiredRecommendationIds ??
        deriveRequiredRecommendationIds(
          candidates,
          resolvedPreferredCategories,
          resolvedBlockedRecommendationIds,
          resolvedCompletedRecommendationIds
        )
    );

  const resolvedMaximumSupportingActions =
    normalizeActionLimit(
      maximumSupportingActions,
      deriveMaximumSupportingActions(
        empire
      ),
      10
    );

  const resolvedMaximumDeferredActions =
    normalizeActionLimit(
      maximumDeferredActions,
      deriveMaximumDeferredActions(
        empire,
        candidates
      ),
      20
    );

  const resolvedMinimumDecisionConfidence =
    normalizeConfidence(
      minimumDecisionConfidence,
      deriveMinimumDecisionConfidence(
        empire,
        candidates
      )
    );

  return {
    availableCash:
      resolvedAvailableCash,

    availableMinutes:
      resolvedAvailableMinutes,

    maximumRisk:
      maximumRisk ??
      resolveMaximumRisk(
        profile.playstyle
      ),

    preferredCategories:
      resolvedPreferredCategories,

    excludedCategories:
      resolvedExcludedCategories,

    activeObjectiveIds:
      resolvedActiveObjectiveIds,

    completedRecommendationIds:
      resolvedCompletedRecommendationIds,

    blockedRecommendationIds:
      resolvedBlockedRecommendationIds,

    urgentRecommendationIds:
      resolvedUrgentRecommendationIds,

    requiredRecommendationIds:
      resolvedRequiredRecommendationIds,

    maximumSupportingActions:
      resolvedMaximumSupportingActions,

    maximumDeferredActions:
      resolvedMaximumDeferredActions,

    minimumDecisionConfidence:
      resolvedMinimumDecisionConfidence,

    metadata: {
      version:
        ATLAS_DECISION_CONTEXT_VERSION,

      generatedAt:
        resolvedGeneratedAt,

      source:
        "atlas-decision-context-engine",

      playstyle:
        profile.playstyle,

      empireScore:
        empire.overallScore,

      empireGrade:
        empire.overallGrade,

      financialStrengthScore:
        empire.financialStrength.score,

      businessPortfolioScore:
        empire.businessPortfolio.score,

      growthPotentialScore:
        empire.growthPotential.score,

      efficiencyScore:
        empire.efficiency.score,

      ownedBusinessCount:
        profile.ownedBusinesses.length,

      ownedVehicleCount:
        profile.ownedVehicles.length,

      ownedPropertyCount:
        (
          profile.ownedProperties ??
          []
        ).length,

      candidateSummary:
        getCandidateSummary(
          candidates
        ),

      ...metadata,
    },
  };
}