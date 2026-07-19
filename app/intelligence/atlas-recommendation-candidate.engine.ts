import type {
  AtlasAdaptiveRecommendationCandidate,
  AtlasAdaptiveRecommendationCategory,
  AtlasAdaptiveRecommendationEffort,
  AtlasAdaptiveRecommendationHorizon,
  AtlasAdaptiveRecommendationRisk,
} from "./atlas-adaptive-recommendation.engine";

import type {
  AtlasBrainModel,
} from "./dashboard-intelligence.engine";


export const ATLAS_RECOMMENDATION_CANDIDATE_VERSION =
  1;


export type AtlasRecommendationCandidateSource =
  | "atlas-recommendation"
  | "next-action"
  | "daily-objective"
  | "personal-pick"
  | "strategic-plan"
  | "mission-strategy"
  | "adaptive-strategy"
  | "strategy-report"
  | "identity-advisor";


export type BuildAtlasRecommendationCandidatesInput = {
  brain:
    AtlasBrainModel;

  generatedAt?: string;

  maximumCandidates?: number;

  minimumBaseScore?: number;

  includeCompleted?: boolean;
};


type CandidateSourceConfiguration = {
  source:
    AtlasRecommendationCandidateSource;

  value:
    unknown;

  category:
    AtlasAdaptiveRecommendationCategory;

  baseScore:
    number;

  risk:
    AtlasAdaptiveRecommendationRisk;

  effort:
    AtlasAdaptiveRecommendationEffort;

  horizon:
    AtlasAdaptiveRecommendationHorizon;
};


type UnknownRecord =
  Record<string, unknown>;


const DEFAULT_MAXIMUM_CANDIDATES =
  24;

const DEFAULT_MINIMUM_BASE_SCORE =
  0;


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


function resolveTimestamp(
  value?: string
): string {
  if (!value) {
    return new Date().toISOString();
  }

  const timestamp =
    new Date(
      value
    );

  if (
    Number.isNaN(
      timestamp.getTime()
    )
  ) {
    return new Date().toISOString();
  }

  return timestamp.toISOString();
}


function normalizeMaximumCandidates(
  value?: number
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(
      value
    )
  ) {
    return DEFAULT_MAXIMUM_CANDIDATES;
  }

  return Math.min(
    100,
    Math.max(
      1,
      Math.round(
        value
      )
    )
  );
}


function normalizeMinimumBaseScore(
  value?: number
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(
      value
    )
  ) {
    return DEFAULT_MINIMUM_BASE_SCORE;
  }

  return Math.min(
    100,
    Math.max(
      0,
      value
    )
  );
}


function normalizeScore(
  value: unknown,
  fallback: number
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(
      value
    )
  ) {
    return Math.min(
      100,
      Math.max(
        0,
        fallback
      )
    );
  }

  const normalizedValue =
    value >= 0 &&
    value <= 1
      ? value * 100
      : value;

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        normalizedValue * 100
      ) / 100
    )
  );
}


function getString(
  record: UnknownRecord,
  keys: string[]
): string | null {
  for (
    const key of keys
  ) {
    const value =
      record[key];

    if (
      typeof value !== "string"
    ) {
      continue;
    }

    const normalized =
      value.trim();

    if (
      normalized.length > 0
    ) {
      return normalized;
    }
  }

  return null;
}


function getNumber(
  record: UnknownRecord,
  keys: string[]
): number | null {
  for (
    const key of keys
  ) {
    const value =
      record[key];

    if (
      typeof value === "number" &&
      Number.isFinite(
        value
      )
    ) {
      return value;
    }
  }

  return null;
}


function getBoolean(
  record: UnknownRecord,
  keys: string[]
): boolean | null {
  for (
    const key of keys
  ) {
    const value =
      record[key];

    if (
      typeof value === "boolean"
    ) {
      return value;
    }
  }

  return null;
}


function hashString(
  value: string
): string {
  let hash =
    2166136261;

  for (
    let index = 0;
    index < value.length;
    index += 1
  ) {
    hash ^=
      value.charCodeAt(
        index
      );

    hash =
      Math.imul(
        hash,
        16777619
      );
  }

  return (
    hash >>> 0
  ).toString(
    36
  );
}


function normalizeIdentifierPart(
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
    )
    .slice(
      0,
      64
    );
}


function buildStableCandidateId(
  source:
    AtlasRecommendationCandidateSource,
  record:
    UnknownRecord,
  title:
    string
): string {
  const existingId =
    getString(
      record,
      [
        "id",
        "recommendationId",
        "actionId",
        "objectiveId",
        "missionId",
        "slug",
      ]
    );

  if (
    existingId
  ) {
    return [
      "atlas",
      source,
      normalizeIdentifierPart(
        existingId
      ),
    ].join(
      ":"
    );
  }

  const normalizedTitle =
    normalizeIdentifierPart(
      title
    );

  return [
    "atlas",
    source,
    normalizedTitle ||
      hashString(
        title
      ),
  ].join(
    ":"
  );
}


function inferCategory(
  source:
    AtlasRecommendationCandidateSource,
  record:
    UnknownRecord,
  fallback:
    AtlasAdaptiveRecommendationCategory
): AtlasAdaptiveRecommendationCategory {
  const explicitCategory =
    getString(
      record,
      [
        "category",
        "type",
        "kind",
      ]
    )
      ?.toLowerCase();

  const title =
    getString(
      record,
      [
        "title",
        "name",
        "label",
        "objective",
        "action",
        "recommendation",
        "summary",
      ]
    )
      ?.toLowerCase() ??
    "";

  const searchableValue =
    [
      explicitCategory ?? "",
      title,
      source,
    ].join(
      " "
    );

  if (
    searchableValue.includes(
      "mission"
    )
  ) {
    return "mission" as
      AtlasAdaptiveRecommendationCategory;
  }

  if (
    searchableValue.includes(
      "business"
    ) ||
    searchableValue.includes(
      "income"
    ) ||
    searchableValue.includes(
      "revenue"
    )
  ) {
    return "business" as
      AtlasAdaptiveRecommendationCategory;
  }

  if (
    searchableValue.includes(
      "vehicle"
    ) ||
    searchableValue.includes(
      "garage"
    )
  ) {
    return "vehicle" as
      AtlasAdaptiveRecommendationCategory;
  }

  if (
    searchableValue.includes(
      "weapon"
    ) ||
    searchableValue.includes(
      "loadout"
    )
  ) {
    return "weapon" as
      AtlasAdaptiveRecommendationCategory;
  }

  if (
    searchableValue.includes(
      "property"
    )
  ) {
    return "property" as
      AtlasAdaptiveRecommendationCategory;
  }

  if (
    searchableValue.includes(
      "progress"
    ) ||
    searchableValue.includes(
      "level"
    ) ||
    searchableValue.includes(
      "growth"
    )
  ) {
    return "progression" as
      AtlasAdaptiveRecommendationCategory;
  }

  return fallback;
}


function inferRisk(
  record: UnknownRecord,
  fallback:
    AtlasAdaptiveRecommendationRisk
): AtlasAdaptiveRecommendationRisk {
  const risk =
    getString(
      record,
      [
        "risk",
        "riskLevel",
        "riskProfile",
      ]
    )
      ?.toLowerCase();

  if (
    risk === "low" ||
    risk === "moderate" ||
    risk === "high" ||
    risk === "extreme"
  ) {
    return risk as
      AtlasAdaptiveRecommendationRisk;
  }

  return fallback;
}


function inferEffort(
  record: UnknownRecord,
  fallback:
    AtlasAdaptiveRecommendationEffort
): AtlasAdaptiveRecommendationEffort {
  const effort =
    getString(
      record,
      [
        "effort",
        "effortLevel",
        "difficulty",
      ]
    )
      ?.toLowerCase();

  if (
    effort
  ) {
    return effort as
      AtlasAdaptiveRecommendationEffort;
  }

  return fallback;
}


function inferHorizon(
  record: UnknownRecord,
  fallback:
    AtlasAdaptiveRecommendationHorizon
): AtlasAdaptiveRecommendationHorizon {
  const horizon =
    getString(
      record,
      [
        "horizon",
        "timeHorizon",
        "timeframe",
        "timeline",
      ]
    )
      ?.toLowerCase();

  if (
    horizon
  ) {
    return horizon as
      AtlasAdaptiveRecommendationHorizon;
  }

  return fallback;
}


function extractCandidateRecords(
  value: unknown
): UnknownRecord[] {
  if (
    Array.isArray(
      value
    )
  ) {
    return value.flatMap(
      (
        item
      ) =>
        extractCandidateRecords(
          item
        )
    );
  }

  if (
    !isRecord(
      value
    )
  ) {
    return [];
  }

  const nestedCollectionKeys = [
    "recommendations",
    "objectives",
    "actions",
    "steps",
    "items",
    "picks",
    "priorities",
  ];

  const nestedRecords =
    nestedCollectionKeys.flatMap(
      (
        key
      ) => {
        const nestedValue =
          value[key];

        return Array.isArray(
          nestedValue
        )
          ? extractCandidateRecords(
              nestedValue
            )
          : [];
      }
    );

  const hasCandidateIdentity =
    Boolean(
      getString(
        value,
        [
          "title",
          "name",
          "label",
          "objective",
          "action",
          "recommendation",
          "missionTitle",
        ]
      )
    );

  if (
    hasCandidateIdentity
  ) {
    return [
      value,
      ...nestedRecords,
    ];
  }

  return nestedRecords;
}


function buildCandidate(
  configuration:
    CandidateSourceConfiguration,
  record:
    UnknownRecord,
  generatedAt:
    string
): AtlasAdaptiveRecommendationCandidate | null {
  const title =
    getString(
      record,
      [
        "title",
        "name",
        "label",
        "objective",
        "action",
        "recommendation",
        "missionTitle",
      ]
    );

  if (
    !title
  ) {
    return null;
  }

  const description =
    getString(
      record,
      [
        "description",
        "explanation",
        "reasoning",
        "summary",
        "details",
        "rationale",
      ]
    );

  const score =
    normalizeScore(
      getNumber(
        record,
        [
          "score",
          "baseScore",
          "priorityScore",
          "confidence",
          "weight",
          "value",
        ]
      ),
      configuration.baseScore
    );

  const estimatedCost =
    getNumber(
      record,
      [
        "estimatedCost",
        "cost",
        "price",
        "investment",
      ]
    );

  const estimatedReward =
    getNumber(
      record,
      [
        "estimatedReward",
        "reward",
        "projectedReturn",
        "expectedReturn",
        "profit",
      ]
    );

  const estimatedDurationMinutes =
    getNumber(
      record,
      [
        "estimatedDurationMinutes",
        "durationMinutes",
        "minutes",
        "timeMinutes",
      ]
    );

  const isAvailable =
    getBoolean(
      record,
      [
        "isAvailable",
        "available",
        "unlocked",
      ]
    ) ??
    true;

  const isCompleted =
    getBoolean(
      record,
      [
        "isCompleted",
        "completed",
        "done",
      ]
    ) ??
    false;

  const isRepeatable =
    getBoolean(
      record,
      [
        "isRepeatable",
        "repeatable",
      ]
    ) ??
    false;

  return {
    id:
      buildStableCandidateId(
        configuration.source,
        record,
        title
      ),

    title,

    ...(description
      ? {
          description,
        }
      : {}),

    category:
      inferCategory(
        configuration.source,
        record,
        configuration.category
      ),

    baseScore:
      score,

    risk:
      inferRisk(
        record,
        configuration.risk
      ),

    effort:
      inferEffort(
        record,
        configuration.effort
      ),

    horizon:
      inferHorizon(
        record,
        configuration.horizon
      ),

    estimatedCost,

    estimatedReward,

    estimatedDurationMinutes,

    isAvailable,

    isCompleted,

    isRepeatable,

    metadata: {
      candidateVersion:
        ATLAS_RECOMMENDATION_CANDIDATE_VERSION,

      source:
        configuration.source,

      generatedAt,

      sourceId:
        getString(
          record,
          [
            "id",
            "recommendationId",
            "actionId",
            "objectiveId",
            "missionId",
            "slug",
          ]
        ),

      originalCategory:
        getString(
          record,
          [
            "category",
            "type",
            "kind",
          ]
        ),

      originalScore:
        getNumber(
          record,
          [
            "score",
            "baseScore",
            "priorityScore",
            "confidence",
            "weight",
            "value",
          ]
        ),
    },
  };
}


function mergeCandidates(
  existing:
    AtlasAdaptiveRecommendationCandidate,
  incoming:
    AtlasAdaptiveRecommendationCandidate
): AtlasAdaptiveRecommendationCandidate {
  const preferred =
    incoming.baseScore >
    existing.baseScore
      ? incoming
      : existing;

  const alternate =
    preferred === existing
      ? incoming
      : existing;

  return {
    ...alternate,

    ...preferred,

    description:
      preferred.description ??
      alternate.description,

    estimatedCost:
      preferred.estimatedCost ??
      alternate.estimatedCost ??
      null,

    estimatedReward:
      preferred.estimatedReward ??
      alternate.estimatedReward ??
      null,

    estimatedDurationMinutes:
      preferred.estimatedDurationMinutes ??
      alternate.estimatedDurationMinutes ??
      null,

    isAvailable:
      Boolean(
        preferred.isAvailable &&
        alternate.isAvailable
      ),

    isCompleted:
      Boolean(
        preferred.isCompleted ||
        alternate.isCompleted
      ),

    isRepeatable:
      Boolean(
        preferred.isRepeatable ||
        alternate.isRepeatable
      ),

    metadata: {
      ...alternate.metadata,
      ...preferred.metadata,

      mergedSources: Array.from(
        new Set(
          [
            alternate.metadata
              ?.source,
            preferred.metadata
              ?.source,
          ].filter(
            (
              value
            ): value is string =>
              typeof value ===
              "string"
          )
        )
      ),
    },
  };
}


function getDeduplicationKey(
  candidate:
    AtlasAdaptiveRecommendationCandidate
): string {
  return [
    candidate.category,
    candidate.title
      .trim()
      .toLowerCase()
      .replace(
        /\s+/g,
        " "
      ),
  ].join(
    ":"
  );
}


function deduplicateCandidates(
  candidates:
    AtlasAdaptiveRecommendationCandidate[]
): AtlasAdaptiveRecommendationCandidate[] {
  const candidatesByKey =
    new Map<
      string,
      AtlasAdaptiveRecommendationCandidate
    >();

  for (
    const candidate of candidates
  ) {
    const key =
      getDeduplicationKey(
        candidate
      );

    const existingCandidate =
      candidatesByKey.get(
        key
      );

    candidatesByKey.set(
      key,
      existingCandidate
        ? mergeCandidates(
            existingCandidate,
            candidate
          )
        : candidate
    );
  }

  return Array.from(
    candidatesByKey.values()
  );
}


function buildSourceConfigurations(
  brain:
    AtlasBrainModel
): CandidateSourceConfiguration[] {
  return [
    {
      source:
        "atlas-recommendation",

      value:
        brain.atlasRecommendations,

      category:
        "custom" as
          AtlasAdaptiveRecommendationCategory,

      baseScore:
        92,

      risk:
        "moderate" as
          AtlasAdaptiveRecommendationRisk,

      effort:
        "moderate" as
          AtlasAdaptiveRecommendationEffort,

      horizon:
        "short-term" as
          AtlasAdaptiveRecommendationHorizon,
    },

    {
      source:
        "atlas-recommendation",

      value:
        brain.atlasRecommendation,

      category:
        "custom" as
          AtlasAdaptiveRecommendationCategory,

      baseScore:
        96,

      risk:
        "moderate" as
          AtlasAdaptiveRecommendationRisk,

      effort:
        "moderate" as
          AtlasAdaptiveRecommendationEffort,

      horizon:
        "short-term" as
          AtlasAdaptiveRecommendationHorizon,
    },

    {
      source:
        "next-action",

      value:
        brain.nextAction,

      category:
        "progression" as
          AtlasAdaptiveRecommendationCategory,

      baseScore:
        98,

      risk:
        "low" as
          AtlasAdaptiveRecommendationRisk,

      effort:
        "low" as
          AtlasAdaptiveRecommendationEffort,

      horizon:
        "immediate" as
          AtlasAdaptiveRecommendationHorizon,
    },

    {
      source:
        "daily-objective",

      value:
        brain.dailyObjectives,

      category:
        "progression" as
          AtlasAdaptiveRecommendationCategory,

      baseScore:
        86,

      risk:
        "low" as
          AtlasAdaptiveRecommendationRisk,

      effort:
        "moderate" as
          AtlasAdaptiveRecommendationEffort,

      horizon:
        "immediate" as
          AtlasAdaptiveRecommendationHorizon,
    },

    {
      source:
        "personal-pick",

      value:
        brain.personalPicks,

      category:
        "custom" as
          AtlasAdaptiveRecommendationCategory,

      baseScore:
        80,

      risk:
        "moderate" as
          AtlasAdaptiveRecommendationRisk,

      effort:
        "moderate" as
          AtlasAdaptiveRecommendationEffort,

      horizon:
        "short-term" as
          AtlasAdaptiveRecommendationHorizon,
    },

    {
      source:
        "strategic-plan",

      value:
        brain.strategicPlan,

      category:
        "progression" as
          AtlasAdaptiveRecommendationCategory,

      baseScore:
        84,

      risk:
        "moderate" as
          AtlasAdaptiveRecommendationRisk,

      effort:
        "high" as
          AtlasAdaptiveRecommendationEffort,

      horizon:
        "long-term" as
          AtlasAdaptiveRecommendationHorizon,
    },

    {
      source:
        "mission-strategy",

      value:
        brain.missionStrategy,

      category:
        "mission" as
          AtlasAdaptiveRecommendationCategory,

      baseScore:
        90,

      risk:
        "moderate" as
          AtlasAdaptiveRecommendationRisk,

      effort:
        "moderate" as
          AtlasAdaptiveRecommendationEffort,

      horizon:
        "short-term" as
          AtlasAdaptiveRecommendationHorizon,
    },

    {
      source:
        "adaptive-strategy",

      value:
        brain.adaptiveStrategy,

      category:
        "progression" as
          AtlasAdaptiveRecommendationCategory,

      baseScore:
        82,

      risk:
        "moderate" as
          AtlasAdaptiveRecommendationRisk,

      effort:
        "high" as
          AtlasAdaptiveRecommendationEffort,

      horizon:
        "long-term" as
          AtlasAdaptiveRecommendationHorizon,
    },

    {
      source:
        "strategy-report",

      value:
        brain.strategyReport,

      category:
        "progression" as
          AtlasAdaptiveRecommendationCategory,

      baseScore:
        78,

      risk:
        "moderate" as
          AtlasAdaptiveRecommendationRisk,

      effort:
        "moderate" as
          AtlasAdaptiveRecommendationEffort,

      horizon:
        "long-term" as
          AtlasAdaptiveRecommendationHorizon,
    },

    {
      source:
        "identity-advisor",

      value:
        brain.identityAdvisor,

      category:
        "custom" as
          AtlasAdaptiveRecommendationCategory,

      baseScore:
        76,

      risk:
        "low" as
          AtlasAdaptiveRecommendationRisk,

      effort:
        "low" as
          AtlasAdaptiveRecommendationEffort,

      horizon:
        "short-term" as
          AtlasAdaptiveRecommendationHorizon,
    },
  ];
}


export function buildAtlasRecommendationCandidates({
  brain,
  generatedAt,
  maximumCandidates,
  minimumBaseScore,
  includeCompleted = false,
}: BuildAtlasRecommendationCandidatesInput): AtlasAdaptiveRecommendationCandidate[] {
  const resolvedGeneratedAt =
    resolveTimestamp(
      generatedAt
    );

  const candidateLimit =
    normalizeMaximumCandidates(
      maximumCandidates
    );

  const scoreThreshold =
    normalizeMinimumBaseScore(
      minimumBaseScore
    );

  const candidates =
    buildSourceConfigurations(
      brain
    ).flatMap(
      (
        configuration
      ) =>
        extractCandidateRecords(
          configuration.value
        )
          .map(
            (
              record
            ) =>
              buildCandidate(
                configuration,
                record,
                resolvedGeneratedAt
              )
          )
          .filter(
            (
              candidate
            ): candidate is AtlasAdaptiveRecommendationCandidate =>
              candidate !==
              null
          )
    );

  return deduplicateCandidates(
    candidates
  )
    .filter(
      (
        candidate
      ) =>
        candidate.baseScore >=
          scoreThreshold &&
        (
          includeCompleted ||
          !candidate.isCompleted
        )
    )
    .sort(
      (
        left,
        right
      ) => {
        const scoreDifference =
          right.baseScore -
          left.baseScore;

        if (
          scoreDifference !== 0
        ) {
          return scoreDifference;
        }

        return left.title.localeCompare(
          right.title
        );
      }
    )
    .slice(
      0,
      candidateLimit
    );
}