import type {
  AtlasBehaviorTrait,
  AtlasBehaviorTraitId,
  AtlasBehaviorTraitTrend,
  AtlasPersistentBehaviorProfile,
} from "./atlas-behavior-profile.engine";


export const ATLAS_STRATEGY_EVOLUTION_VERSION = 1;


export type AtlasStrategyEvolutionDirection =
  | "emerging"
  | "strengthening"
  | "stable"
  | "weakening"
  | "fading"
  | "shifted";


export type AtlasStrategyEvolutionSignificance =
  | "low"
  | "moderate"
  | "high"
  | "critical";


export type AtlasStrategyEvolutionChangeType =
  | "archetype-shift"
  | "trait-emerged"
  | "trait-strengthened"
  | "trait-stabilized"
  | "trait-weakened"
  | "trait-faded"
  | "confidence-increased"
  | "confidence-decreased";


export type AtlasStrategyEvolutionStatus =
  | "baseline"
  | "stable"
  | "evolving"
  | "major-shift";


export type AtlasStrategyEvolutionChange = {
  id: string;

  type:
    AtlasStrategyEvolutionChangeType;

  traitId:
    AtlasBehaviorTraitId | null;

  traitName:
    string | null;

  direction:
    AtlasStrategyEvolutionDirection;

  significance:
    AtlasStrategyEvolutionSignificance;

  confidence:
    number;

  previousValue:
    string | number | null;

  currentValue:
    string | number | null;

  delta:
    number | null;

  headline:
    string;

  summary:
    string;

  strategicImplication:
    string;

  recommendedResponse:
    string;

  supportingMemoryIds:
    string[];
};


export type AtlasStrategyEvolution = {
  version: number;

  generatedAt: string;

  previousProfileGeneratedAt:
    string | null;

  currentProfileGeneratedAt:
    string;

  status:
    AtlasStrategyEvolutionStatus;

  hasPreviousProfile:
    boolean;

  hasMeaningfulEvolution:
    boolean;

  evolutionConfidence:
    number;

  previousArchetype:
    AtlasPersistentBehaviorProfile["primaryArchetype"] | null;

  currentArchetype:
    AtlasPersistentBehaviorProfile["primaryArchetype"];

  archetypeChanged:
    boolean;

  profileConfidenceDelta:
    number;

  growingTraits:
    AtlasBehaviorTraitId[];

  stableTraits:
    AtlasBehaviorTraitId[];

  decliningTraits:
    AtlasBehaviorTraitId[];

  emergingTraits:
    AtlasBehaviorTraitId[];

  fadingTraits:
    AtlasBehaviorTraitId[];

  totalChanges:
    number;

  highSignificanceChangeCount:
    number;

  criticalChangeCount:
    number;

  primaryChange:
    AtlasStrategyEvolutionChange | null;

  changes:
    AtlasStrategyEvolutionChange[];

  headline:
    string;

  summary:
    string;

  strategicImplication:
    string;

  recommendedCoachingResponse:
    string;
};


export type BuildAtlasStrategyEvolutionInput = {
  previousProfile:
    AtlasPersistentBehaviorProfile | null;

  currentProfile:
    AtlasPersistentBehaviorProfile;

  generatedAt?: string;

  minimumConfidenceDelta?: number;

  minimumTraitConfidence?: number;

  maximumChanges?: number;
};


type TraitComparison = {
  traitId:
    AtlasBehaviorTraitId;

  previousTrait:
    AtlasBehaviorTrait | null;

  currentTrait:
    AtlasBehaviorTrait | null;

  confidenceDelta:
    number;

  scoreDelta:
    number;

  occurrenceDelta:
    number;

  evidenceDelta:
    number;
};


const significanceRank:
  Record<
    AtlasStrategyEvolutionSignificance,
    number
  > = {
    low: 1,
    moderate: 2,
    high: 3,
    critical: 4,
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


function normalizeDelta(
  value?: number,
  fallback = 8
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return fallback;
  }

  return Math.min(
    50,
    Math.max(
      1,
      Math.round(value)
    )
  );
}


function normalizeTraitConfidence(
  value?: number
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return 35;
  }

  return Math.min(
    100,
    Math.max(
      1,
      Math.round(value)
    )
  );
}


function normalizeMaximumChanges(
  value?: number
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return 10;
  }

  return Math.min(
    25,
    Math.max(
      1,
      Math.round(value)
    )
  );
}


function createChangeId(
  type:
    AtlasStrategyEvolutionChangeType,
  traitId:
    AtlasBehaviorTraitId | null
): string {
  return [
    "strategy-evolution",
    type,
    traitId ?? "profile",
  ].join("-");
}


function buildTraitMap(
  traits:
    AtlasBehaviorTrait[]
): Map<
  AtlasBehaviorTraitId,
  AtlasBehaviorTrait
> {
  return new Map(
    traits.map(
      (trait) => [
        trait.id,
        trait,
      ]
    )
  );
}


function compareTraits(
  previousProfile:
    AtlasPersistentBehaviorProfile,
  currentProfile:
    AtlasPersistentBehaviorProfile
): TraitComparison[] {
  const previousTraits =
    buildTraitMap(
      previousProfile.dominantTraits
    );

  const currentTraits =
    buildTraitMap(
      currentProfile.dominantTraits
    );

  const traitIds =
    new Set<
      AtlasBehaviorTraitId
    >([
      ...previousTraits.keys(),
      ...currentTraits.keys(),
    ]);

  return Array.from(
    traitIds
  ).map(
    (
      traitId
    ): TraitComparison => {
      const previousTrait =
        previousTraits.get(
          traitId
        ) ?? null;

      const currentTrait =
        currentTraits.get(
          traitId
        ) ?? null;

      return {
        traitId,

        previousTrait,

        currentTrait,

        confidenceDelta:
          (
            currentTrait
              ?.confidence ?? 0
          ) -
          (
            previousTrait
              ?.confidence ?? 0
          ),

        scoreDelta:
          (
            currentTrait
              ?.score ?? 0
          ) -
          (
            previousTrait
              ?.score ?? 0
          ),

        occurrenceDelta:
          (
            currentTrait
              ?.totalOccurrences ?? 0
          ) -
          (
            previousTrait
              ?.totalOccurrences ?? 0
          ),

        evidenceDelta:
          (
            currentTrait
              ?.evidenceCount ?? 0
          ) -
          (
            previousTrait
              ?.evidenceCount ?? 0
          ),
      };
    }
  );
}


function resolveChangeSignificance(
  confidenceDelta: number,
  scoreDelta: number,
  evidenceDelta: number,
  occurrenceDelta: number
): AtlasStrategyEvolutionSignificance {
  const confidenceMagnitude =
    Math.abs(
      confidenceDelta
    );

  const scoreMagnitude =
    Math.abs(
      scoreDelta
    );

  const evidenceMagnitude =
    Math.abs(
      evidenceDelta
    );

  const occurrenceMagnitude =
    Math.abs(
      occurrenceDelta
    );

  if (
    confidenceMagnitude >= 30 ||
    scoreMagnitude >= 900 ||
    evidenceMagnitude >= 8 ||
    occurrenceMagnitude >= 15
  ) {
    return "critical";
  }

  if (
    confidenceMagnitude >= 20 ||
    scoreMagnitude >= 500 ||
    evidenceMagnitude >= 5 ||
    occurrenceMagnitude >= 9
  ) {
    return "high";
  }

  if (
    confidenceMagnitude >= 10 ||
    scoreMagnitude >= 200 ||
    evidenceMagnitude >= 2 ||
    occurrenceMagnitude >= 4
  ) {
    return "moderate";
  }

  return "low";
}


function resolveChangeConfidence(
  previousTrait:
    AtlasBehaviorTrait | null,
  currentTrait:
    AtlasBehaviorTrait | null,
  confidenceDelta: number,
  evidenceDelta: number
): number {
  const baseConfidence =
    Math.max(
      previousTrait
        ?.confidence ?? 0,
      currentTrait
        ?.confidence ?? 0
    );

  const deltaStrength =
    Math.min(
      20,
      Math.abs(
        confidenceDelta
      )
    );

  const evidenceStrength =
    Math.min(
      15,
      Math.abs(
        evidenceDelta
      ) * 3
    );

  return normalizePercentage(
    baseConfidence *
      0.7 +
    deltaStrength +
    evidenceStrength
  );
}


function resolveGrowingDirection(
  currentTrend:
    AtlasBehaviorTraitTrend
): AtlasStrategyEvolutionDirection {
  if (
    currentTrend ===
    "growing"
  ) {
    return "strengthening";
  }

  if (
    currentTrend ===
    "declining"
  ) {
    return "weakening";
  }

  return "stable";
}


function buildArchetypeChange(
  previousProfile:
    AtlasPersistentBehaviorProfile,
  currentProfile:
    AtlasPersistentBehaviorProfile
): AtlasStrategyEvolutionChange | null {
  if (
    previousProfile.primaryArchetype ===
    currentProfile.primaryArchetype
  ) {
    return null;
  }

  const confidence =
    normalizePercentage(
      (
        previousProfile
          .profileConfidence +
        currentProfile
          .profileConfidence
      ) /
        2
    );

  const confidenceDelta =
    currentProfile.profileConfidence -
    previousProfile.profileConfidence;

  const significance:
    AtlasStrategyEvolutionSignificance =
      currentProfile
        .dataSufficiency ===
        "strong" &&
      previousProfile
        .dataSufficiency ===
        "strong"
        ? "critical"
        : currentProfile
              .dataSufficiency ===
              "sufficient" &&
            previousProfile
              .dataSufficiency !==
              "insufficient"
          ? "high"
          : "moderate";

  return {
    id:
      createChangeId(
        "archetype-shift",
        null
      ),

    type:
      "archetype-shift",

    traitId:
      null,

    traitName:
      null,

    direction:
      "shifted",

    significance,

    confidence,

    previousValue:
      previousProfile
        .primaryArchetype,

    currentValue:
      currentProfile
        .primaryArchetype,

    delta:
      confidenceDelta,

    headline:
      `Player archetype shifted from ${previousProfile.primaryArchetype} to ${currentProfile.primaryArchetype}.`,

    summary:
      `Atlas detected a meaningful change in the player's dominant behavioral identity. The previous profile emphasized ${previousProfile.primaryArchetype}, while the current profile is led by ${currentProfile.primaryArchetype}.`,

    strategicImplication:
      "Recommendations should now prioritize the motivations and decision patterns associated with the current archetype rather than relying on the player's previous strategic identity.",

    recommendedResponse:
      `Adapt coaching and recommendations to support the player's current ${currentProfile.primaryArchetype} behavior while monitoring whether the shift remains consistent across future sessions.`,

    supportingMemoryIds:
      currentProfile
        .supportingMemoryIds
        .slice(
          0,
          12
        ),
  };
}


function buildEmergingTraitChange(
  comparison:
    TraitComparison
): AtlasStrategyEvolutionChange | null {
  const currentTrait =
    comparison.currentTrait;

  if (!currentTrait) {
    return null;
  }

  const significance =
    resolveChangeSignificance(
      currentTrait.confidence,
      currentTrait.score,
      currentTrait.evidenceCount,
      currentTrait.totalOccurrences
    );

  return {
    id:
      createChangeId(
        "trait-emerged",
        currentTrait.id
      ),

    type:
      "trait-emerged",

    traitId:
      currentTrait.id,

    traitName:
      currentTrait.name,

    direction:
      "emerging",

    significance,

    confidence:
      currentTrait.confidence,

    previousValue:
      null,

    currentValue:
      currentTrait.confidence,

    delta:
      currentTrait.confidence,

    headline:
      `${currentTrait.name} has emerged as a meaningful player trait.`,

    summary:
      `Atlas now identifies ${currentTrait.name.toLowerCase()} behavior with ${currentTrait.confidence}% confidence across ${currentTrait.evidenceCount} supporting memory records.`,

    strategicImplication:
      `The player's future recommendations should account for the newly established ${currentTrait.name.toLowerCase()} pattern.`,

    recommendedResponse:
      `Introduce recommendations that reinforce or responsibly test the player's emerging ${currentTrait.name.toLowerCase()} behavior.`,

    supportingMemoryIds:
      currentTrait
        .supportingMemoryIds,
  };
}


function buildFadingTraitChange(
  comparison:
    TraitComparison
): AtlasStrategyEvolutionChange | null {
  const previousTrait =
    comparison.previousTrait;

  if (!previousTrait) {
    return null;
  }

  const significance =
    resolveChangeSignificance(
      -previousTrait.confidence,
      -previousTrait.score,
      -previousTrait.evidenceCount,
      -previousTrait.totalOccurrences
    );

  return {
    id:
      createChangeId(
        "trait-faded",
        previousTrait.id
      ),

    type:
      "trait-faded",

    traitId:
      previousTrait.id,

    traitName:
      previousTrait.name,

    direction:
      "fading",

    significance,

    confidence:
      previousTrait.confidence,

    previousValue:
      previousTrait.confidence,

    currentValue:
      null,

    delta:
      -previousTrait.confidence,

    headline:
      `${previousTrait.name} is no longer a dominant player trait.`,

    summary:
      `The previous profile identified ${previousTrait.name.toLowerCase()} behavior with ${previousTrait.confidence}% confidence, but it is no longer present among the current dominant traits.`,

    strategicImplication:
      `Atlas should reduce its reliance on assumptions associated with ${previousTrait.name.toLowerCase()} behavior until the trait is confirmed again.`,

    recommendedResponse:
      `Avoid over-personalizing recommendations around ${previousTrait.name.toLowerCase()} behavior and gather additional evidence before restoring it as a leading strategic signal.`,

    supportingMemoryIds:
      previousTrait
        .supportingMemoryIds,
  };
}


function buildStrengthenedTraitChange(
  comparison:
    TraitComparison
): AtlasStrategyEvolutionChange | null {
  const {
    previousTrait,
    currentTrait,
  } = comparison;

  if (
    !previousTrait ||
    !currentTrait
  ) {
    return null;
  }

  const significance =
    resolveChangeSignificance(
      comparison.confidenceDelta,
      comparison.scoreDelta,
      comparison.evidenceDelta,
      comparison.occurrenceDelta
    );

  const confidence =
    resolveChangeConfidence(
      previousTrait,
      currentTrait,
      comparison.confidenceDelta,
      comparison.evidenceDelta
    );

  return {
    id:
      createChangeId(
        "trait-strengthened",
        currentTrait.id
      ),

    type:
      "trait-strengthened",

    traitId:
      currentTrait.id,

    traitName:
      currentTrait.name,

    direction:
      "strengthening",

    significance,

    confidence,

    previousValue:
      previousTrait.confidence,

    currentValue:
      currentTrait.confidence,

    delta:
      comparison.confidenceDelta,

    headline:
      `${currentTrait.name} behavior is strengthening.`,

    summary:
      `Confidence in ${currentTrait.name.toLowerCase()} behavior increased from ${previousTrait.confidence}% to ${currentTrait.confidence}%, supported by ${Math.max(
        0,
        comparison.evidenceDelta
      )} additional evidence records and ${Math.max(
        0,
        comparison.occurrenceDelta
      )} additional occurrences.`,

    strategicImplication:
      `Atlas can place greater weight on ${currentTrait.name.toLowerCase()} behavior when ranking future objectives and opportunities.`,

    recommendedResponse:
      `Offer recommendations that align with the player's strengthening ${currentTrait.name.toLowerCase()} pattern while preserving safeguards appropriate to the current risk profile.`,

    supportingMemoryIds:
      currentTrait
        .supportingMemoryIds,
  };
}


function buildWeakenedTraitChange(
  comparison:
    TraitComparison
): AtlasStrategyEvolutionChange | null {
  const {
    previousTrait,
    currentTrait,
  } = comparison;

  if (
    !previousTrait ||
    !currentTrait
  ) {
    return null;
  }

  const significance =
    resolveChangeSignificance(
      comparison.confidenceDelta,
      comparison.scoreDelta,
      comparison.evidenceDelta,
      comparison.occurrenceDelta
    );

  const confidence =
    resolveChangeConfidence(
      previousTrait,
      currentTrait,
      comparison.confidenceDelta,
      comparison.evidenceDelta
    );

  return {
    id:
      createChangeId(
        "trait-weakened",
        currentTrait.id
      ),

    type:
      "trait-weakened",

    traitId:
      currentTrait.id,

    traitName:
      currentTrait.name,

    direction:
      "weakening",

    significance,

    confidence,

    previousValue:
      previousTrait.confidence,

    currentValue:
      currentTrait.confidence,

    delta:
      comparison.confidenceDelta,

    headline:
      `${currentTrait.name} behavior is weakening.`,

    summary:
      `Confidence in ${currentTrait.name.toLowerCase()} behavior declined from ${previousTrait.confidence}% to ${currentTrait.confidence}%.`,

    strategicImplication:
      `Atlas should reduce the influence of ${currentTrait.name.toLowerCase()} behavior when ranking recommendations until new evidence confirms whether the decline is temporary or persistent.`,

    recommendedResponse:
      `Use lower-commitment recommendations to test the player's current interest in ${currentTrait.name.toLowerCase()} objectives before making it a central coaching theme.`,

    supportingMemoryIds:
      Array.from(
        new Set([
          ...currentTrait
            .supportingMemoryIds,
          ...previousTrait
            .supportingMemoryIds,
        ])
      ).slice(
        0,
        12
      ),
  };
}


function buildStableTraitChange(
  comparison:
    TraitComparison
): AtlasStrategyEvolutionChange | null {
  const {
    previousTrait,
    currentTrait,
  } = comparison;

  if (
    !previousTrait ||
    !currentTrait
  ) {
    return null;
  }

  const confidence =
    resolveChangeConfidence(
      previousTrait,
      currentTrait,
      comparison.confidenceDelta,
      comparison.evidenceDelta
    );

  return {
    id:
      createChangeId(
        "trait-stabilized",
        currentTrait.id
      ),

    type:
      "trait-stabilized",

    traitId:
      currentTrait.id,

    traitName:
      currentTrait.name,

    direction:
      resolveGrowingDirection(
        currentTrait.trend
      ),

    significance:
      "low",

    confidence,

    previousValue:
      previousTrait.confidence,

    currentValue:
      currentTrait.confidence,

    delta:
      comparison.confidenceDelta,

    headline:
      `${currentTrait.name} remains a stable behavioral trait.`,

    summary:
      `Confidence in ${currentTrait.name.toLowerCase()} behavior remains relatively consistent at ${currentTrait.confidence}%.`,

    strategicImplication:
      `Atlas can continue treating ${currentTrait.name.toLowerCase()} behavior as a dependable personalization signal.`,

    recommendedResponse:
      `Maintain recommendations aligned with ${currentTrait.name.toLowerCase()} behavior while continuing to monitor for stronger directional changes.`,

    supportingMemoryIds:
      currentTrait
        .supportingMemoryIds,
  };
}


function buildTraitChange(
  comparison:
    TraitComparison,
  minimumConfidenceDelta:
    number,
  minimumTraitConfidence:
    number
): AtlasStrategyEvolutionChange | null {
  const {
    previousTrait,
    currentTrait,
  } = comparison;

  if (
    !previousTrait &&
    currentTrait
  ) {
    if (
      currentTrait.confidence <
      minimumTraitConfidence
    ) {
      return null;
    }

    return buildEmergingTraitChange(
      comparison
    );
  }

  if (
    previousTrait &&
    !currentTrait
  ) {
    if (
      previousTrait.confidence <
      minimumTraitConfidence
    ) {
      return null;
    }

    return buildFadingTraitChange(
      comparison
    );
  }

  if (
    !previousTrait ||
    !currentTrait
  ) {
    return null;
  }

  const materiallyStrengthened =
    comparison.confidenceDelta >=
      minimumConfidenceDelta ||
    comparison.scoreDelta >= 200 ||
    comparison.evidenceDelta >= 2 ||
    comparison.occurrenceDelta >= 4 ||
    currentTrait.trend ===
      "growing";

  if (
    materiallyStrengthened
  ) {
    return buildStrengthenedTraitChange(
      comparison
    );
  }

  const materiallyWeakened =
    comparison.confidenceDelta <=
      -minimumConfidenceDelta ||
    comparison.scoreDelta <= -200 ||
    comparison.evidenceDelta <= -2 ||
    comparison.occurrenceDelta <= -4 ||
    currentTrait.trend ===
      "declining";

  if (
    materiallyWeakened
  ) {
    return buildWeakenedTraitChange(
      comparison
    );
  }

  return buildStableTraitChange(
    comparison
  );
}


function buildProfileConfidenceChange(
  previousProfile:
    AtlasPersistentBehaviorProfile,
  currentProfile:
    AtlasPersistentBehaviorProfile,
  minimumConfidenceDelta:
    number
): AtlasStrategyEvolutionChange | null {
  const delta =
    currentProfile.profileConfidence -
    previousProfile.profileConfidence;

  if (
    Math.abs(delta) <
    minimumConfidenceDelta
  ) {
    return null;
  }

  const increased =
    delta > 0;

  return {
    id:
      createChangeId(
        increased
          ? "confidence-increased"
          : "confidence-decreased",
        null
      ),

    type:
      increased
        ? "confidence-increased"
        : "confidence-decreased",

    traitId:
      null,

    traitName:
      null,

    direction:
      increased
        ? "strengthening"
        : "weakening",

    significance:
      resolveChangeSignificance(
        delta,
        0,
        currentProfile
          .memoriesAnalyzed -
          previousProfile
            .memoriesAnalyzed,
        currentProfile
          .totalEventsObserved -
          previousProfile
            .totalEventsObserved
      ),

    confidence:
      normalizePercentage(
        Math.max(
          previousProfile
            .profileConfidence,
          currentProfile
            .profileConfidence
        )
      ),

    previousValue:
      previousProfile
        .profileConfidence,

    currentValue:
      currentProfile
        .profileConfidence,

    delta,

    headline:
      increased
        ? "Atlas has greater confidence in the player's behavioral profile."
        : "Atlas has less confidence in the player's current behavioral profile.",

    summary:
      `Overall profile confidence ${
        increased
          ? "increased"
          : "declined"
      } from ${previousProfile.profileConfidence}% to ${currentProfile.profileConfidence}%.`,

    strategicImplication:
      increased
        ? "Atlas can rely more heavily on behavioral personalization when generating recommendations."
        : "Atlas should use more conservative personalization until additional behavior evidence strengthens the profile.",

    recommendedResponse:
      increased
        ? "Use the stronger profile to provide more targeted recommendations and explanations."
        : "Gather additional behavioral evidence and avoid making high-impact recommendations based solely on the current profile.",

    supportingMemoryIds:
      currentProfile
        .supportingMemoryIds
        .slice(
          0,
          12
        ),
  };
}


function compareEvolutionChanges(
  first:
    AtlasStrategyEvolutionChange,
  second:
    AtlasStrategyEvolutionChange
): number {
  const significanceDifference =
    significanceRank[
      second.significance
    ] -
    significanceRank[
      first.significance
    ];

  if (
    significanceDifference !== 0
  ) {
    return significanceDifference;
  }

  const confidenceDifference =
    second.confidence -
    first.confidence;

  if (
    confidenceDifference !== 0
  ) {
    return confidenceDifference;
  }

  return (
    Math.abs(
      second.delta ?? 0
    ) -
    Math.abs(
      first.delta ?? 0
    )
  );
}


function resolveEvolutionStatus(
  meaningfulChanges:
    AtlasStrategyEvolutionChange[]
): AtlasStrategyEvolutionStatus {
  if (
    meaningfulChanges.length === 0
  ) {
    return "stable";
  }

  if (
    meaningfulChanges.some(
      (change) =>
        change.significance ===
        "critical"
    )
  ) {
    return "major-shift";
  }

  if (
    meaningfulChanges.some(
      (change) =>
        change.significance ===
          "high" ||
        change.type ===
          "archetype-shift"
    )
  ) {
    return "major-shift";
  }

  return "evolving";
}


function resolveEvolutionConfidence(
  previousProfile:
    AtlasPersistentBehaviorProfile,
  currentProfile:
    AtlasPersistentBehaviorProfile,
  changes:
    AtlasStrategyEvolutionChange[]
): number {
  if (
    changes.length === 0
  ) {
    return normalizePercentage(
      (
        previousProfile
          .profileConfidence +
        currentProfile
          .profileConfidence
      ) /
        2
    );
  }

  const averageChangeConfidence =
    changes.reduce(
      (
        total,
        change
      ) =>
        total +
        change.confidence,
      0
    ) /
    changes.length;

  const profileConfidence =
    (
      previousProfile
        .profileConfidence +
      currentProfile
        .profileConfidence
    ) /
    2;

  const sufficiencyBonus =
    currentProfile
      .dataSufficiency ===
      "strong"
      ? 8
      : currentProfile
            .dataSufficiency ===
            "sufficient"
        ? 5
        : currentProfile
              .dataSufficiency ===
              "developing"
          ? 2
          : 0;

  return normalizePercentage(
    averageChangeConfidence *
      0.65 +
    profileConfidence *
      0.35 +
    sufficiencyBonus
  );
}


function getTraitIdsByDirection(
  changes:
    AtlasStrategyEvolutionChange[],
  directions:
    AtlasStrategyEvolutionDirection[]
): AtlasBehaviorTraitId[] {
  return Array.from(
    new Set(
      changes
        .filter(
          (change) =>
            change.traitId !==
              null &&
            directions.includes(
              change.direction
            )
        )
        .map(
          (change) =>
            change.traitId
        )
        .filter(
          (
            traitId
          ): traitId is AtlasBehaviorTraitId =>
            traitId !== null
        )
    )
  );
}


function buildBaselineEvolution(
  currentProfile:
    AtlasPersistentBehaviorProfile,
  generatedAt:
    string
): AtlasStrategyEvolution {
  return {
    version:
      ATLAS_STRATEGY_EVOLUTION_VERSION,

    generatedAt,

    previousProfileGeneratedAt:
      null,

    currentProfileGeneratedAt:
      currentProfile.generatedAt,

    status:
      "baseline",

    hasPreviousProfile:
      false,

    hasMeaningfulEvolution:
      false,

    evolutionConfidence:
      currentProfile
        .profileConfidence,

    previousArchetype:
      null,

    currentArchetype:
      currentProfile
        .primaryArchetype,

    archetypeChanged:
      false,

    profileConfidenceDelta:
      0,

    growingTraits:
      currentProfile
        .dominantTraits
        .filter(
          (trait) =>
            trait.trend ===
            "growing"
        )
        .map(
          (trait) =>
            trait.id
        ),

    stableTraits:
      currentProfile
        .dominantTraits
        .filter(
          (trait) =>
            trait.trend ===
            "stable"
        )
        .map(
          (trait) =>
            trait.id
        ),

    decliningTraits:
      currentProfile
        .dominantTraits
        .filter(
          (trait) =>
            trait.trend ===
            "declining"
        )
        .map(
          (trait) =>
            trait.id
        ),

    emergingTraits:
      currentProfile
        .dominantTraits
        .map(
          (trait) =>
            trait.id
        ),

    fadingTraits: [],

    totalChanges:
      0,

    highSignificanceChangeCount:
      0,

    criticalChangeCount:
      0,

    primaryChange:
      null,

    changes: [],

    headline:
      "Atlas established the player's strategy-evolution baseline.",

    summary:
      `Atlas recorded the first persistent behavior profile for this player. Future profiles will be compared against this ${currentProfile.primaryArchetype} baseline.`,

    strategicImplication:
      "The current profile should be treated as the starting point for long-term behavioral comparison rather than evidence of strategic change.",

    recommendedCoachingResponse:
      "Continue collecting meaningful player behavior across future sessions before adapting coaching based on long-term evolution.",
  };
}


function buildHeadline(
  status:
    AtlasStrategyEvolutionStatus,
  primaryChange:
    AtlasStrategyEvolutionChange | null
): string {
  if (
    status ===
    "stable"
  ) {
    return "The player's long-term strategy remains stable.";
  }

  if (
    primaryChange
  ) {
    return primaryChange
      .headline;
  }

  return "Atlas detected an evolution in the player's strategy.";
}


function buildSummary(
  status:
    AtlasStrategyEvolutionStatus,
  previousProfile:
    AtlasPersistentBehaviorProfile,
  currentProfile:
    AtlasPersistentBehaviorProfile,
  meaningfulChanges:
    AtlasStrategyEvolutionChange[]
): string {
  if (
    status ===
    "stable"
  ) {
    return `The player's ${currentProfile.primaryArchetype} profile remains materially consistent with the previous observation. Atlas found no high-confidence strategic shifts requiring a change in personalization.`;
  }

  const growingCount =
    meaningfulChanges.filter(
      (change) =>
        change.direction ===
          "strengthening" ||
        change.direction ===
          "emerging"
    ).length;

  const decliningCount =
    meaningfulChanges.filter(
      (change) =>
        change.direction ===
          "weakening" ||
        change.direction ===
          "fading"
    ).length;

  const archetypeText =
    previousProfile
      .primaryArchetype !==
    currentProfile
      .primaryArchetype
      ? ` The dominant archetype changed from ${previousProfile.primaryArchetype} to ${currentProfile.primaryArchetype}.`
      : "";

  return `Atlas detected ${meaningfulChanges.length} meaningful ${
    meaningfulChanges.length === 1
      ? "behavioral change"
      : "behavioral changes"
  }, including ${growingCount} strengthening or emerging ${
    growingCount === 1
      ? "signal"
      : "signals"
  } and ${decliningCount} weakening or fading ${
    decliningCount === 1
      ? "signal"
      : "signals"
  }.${archetypeText}`;
}


function buildStrategicImplication(
  status:
    AtlasStrategyEvolutionStatus,
  primaryChange:
    AtlasStrategyEvolutionChange | null
): string {
  if (
    status ===
    "stable"
  ) {
    return "Atlas can continue using the current behavior profile without materially changing recommendation weighting or coaching strategy.";
  }

  if (
    primaryChange
  ) {
    return primaryChange
      .strategicImplication;
  }

  return "Atlas should adjust personalization weights to reflect the player's changing behavioral signals.";
}


function buildRecommendedCoachingResponse(
  status:
    AtlasStrategyEvolutionStatus,
  primaryChange:
    AtlasStrategyEvolutionChange | null
): string {
  if (
    status ===
    "stable"
  ) {
    return "Maintain the current coaching style and recommendation strategy while continuing to watch for stronger behavioral changes.";
  }

  if (
    primaryChange
  ) {
    return primaryChange
      .recommendedResponse;
  }

  return "Use the latest behavior profile to gradually adapt coaching and recommendations while monitoring whether the shift persists.";
}


export function buildAtlasStrategyEvolution({
  previousProfile,
  currentProfile,
  generatedAt,
  minimumConfidenceDelta,
  minimumTraitConfidence,
  maximumChanges,
}: BuildAtlasStrategyEvolutionInput): AtlasStrategyEvolution {
  const resolvedGeneratedAt =
    resolveTimestamp(
      generatedAt
    );

  if (!previousProfile) {
    return buildBaselineEvolution(
      currentProfile,
      resolvedGeneratedAt
    );
  }

  const resolvedMinimumConfidenceDelta =
    normalizeDelta(
      minimumConfidenceDelta
    );

  const resolvedMinimumTraitConfidence =
    normalizeTraitConfidence(
      minimumTraitConfidence
    );

  const changeLimit =
    normalizeMaximumChanges(
      maximumChanges
    );

  const comparisons =
    compareTraits(
      previousProfile,
      currentProfile
    );

  const traitChanges =
    comparisons
      .map(
        (comparison) =>
          buildTraitChange(
            comparison,
            resolvedMinimumConfidenceDelta,
            resolvedMinimumTraitConfidence
          )
      )
      .filter(
        (
          change
        ): change is AtlasStrategyEvolutionChange =>
          change !== null
      );

  const archetypeChange =
    buildArchetypeChange(
      previousProfile,
      currentProfile
    );

  const confidenceChange =
    buildProfileConfidenceChange(
      previousProfile,
      currentProfile,
      resolvedMinimumConfidenceDelta
    );

  const allChanges = [
    ...(archetypeChange
      ? [archetypeChange]
      : []),

    ...(confidenceChange
      ? [confidenceChange]
      : []),

    ...traitChanges,
  ].sort(
    compareEvolutionChanges
  );

  const meaningfulChanges =
    allChanges.filter(
      (change) =>
        change.direction !==
          "stable" &&
        (
          change.significance !==
            "low" ||
          change.type ===
            "archetype-shift" ||
          change.type ===
            "trait-emerged" ||
          change.type ===
            "trait-faded"
        )
    );

  const status =
    resolveEvolutionStatus(
      meaningfulChanges
    );

  const changes =
    allChanges.slice(
      0,
      changeLimit
    );

  const primaryChange =
    meaningfulChanges[0] ??
    null;

  const evolutionConfidence =
    resolveEvolutionConfidence(
      previousProfile,
      currentProfile,
      meaningfulChanges
    );

  const growingTraits =
    getTraitIdsByDirection(
      changes,
      [
        "strengthening",
      ]
    );

  const stableTraits =
    getTraitIdsByDirection(
      changes,
      [
        "stable",
      ]
    );

  const decliningTraits =
    getTraitIdsByDirection(
      changes,
      [
        "weakening",
      ]
    );

  const emergingTraits =
    getTraitIdsByDirection(
      changes,
      [
        "emerging",
      ]
    );

  const fadingTraits =
    getTraitIdsByDirection(
      changes,
      [
        "fading",
      ]
    );

  const highSignificanceChangeCount =
    meaningfulChanges.filter(
      (change) =>
        change.significance ===
          "high" ||
        change.significance ===
          "critical"
    ).length;

  const criticalChangeCount =
    meaningfulChanges.filter(
      (change) =>
        change.significance ===
        "critical"
    ).length;

  return {
    version:
      ATLAS_STRATEGY_EVOLUTION_VERSION,

    generatedAt:
      resolvedGeneratedAt,

    previousProfileGeneratedAt:
      previousProfile
        .generatedAt,

    currentProfileGeneratedAt:
      currentProfile
        .generatedAt,

    status,

    hasPreviousProfile:
      true,

    hasMeaningfulEvolution:
      meaningfulChanges.length >
      0,

    evolutionConfidence,

    previousArchetype:
      previousProfile
        .primaryArchetype,

    currentArchetype:
      currentProfile
        .primaryArchetype,

    archetypeChanged:
      previousProfile
        .primaryArchetype !==
      currentProfile
        .primaryArchetype,

    profileConfidenceDelta:
      currentProfile
        .profileConfidence -
      previousProfile
        .profileConfidence,

    growingTraits,

    stableTraits,

    decliningTraits,

    emergingTraits,

    fadingTraits,

    totalChanges:
      meaningfulChanges.length,

    highSignificanceChangeCount,

    criticalChangeCount,

    primaryChange,

    changes,

    headline:
      buildHeadline(
        status,
        primaryChange
      ),

    summary:
      buildSummary(
        status,
        previousProfile,
        currentProfile,
        meaningfulChanges
      ),

    strategicImplication:
      buildStrategicImplication(
        status,
        primaryChange
      ),

    recommendedCoachingResponse:
      buildRecommendedCoachingResponse(
        status,
        primaryChange
      ),
  };
}