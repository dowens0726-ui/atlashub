import type {
  AtlasPersistentMemoryLedger,
  AtlasPersistentMemoryRecord,
} from "./atlas-persistent-memory.engine";


export const ATLAS_BEHAVIOR_PROFILE_VERSION = 1;

export const MINIMUM_BEHAVIOR_PROFILE_SESSIONS = 3;

export const MINIMUM_BEHAVIOR_PROFILE_MEMORIES = 3;


export type AtlasBehaviorArchetype =
  | "Empire Builder"
  | "Strategic Operator"
  | "Opportunity Hunter"
  | "Risk Manager"
  | "Adaptive Player"
  | "Developing Player";


export type AtlasBehaviorTraitId =
  | "growth-focused"
  | "financially-disciplined"
  | "opportunity-driven"
  | "risk-aware"
  | "strategy-responsive"
  | "momentum-driven"
  | "efficiency-focused"
  | "resilient"
  | "expansion-oriented"
  | "copilot-engaged";


export type AtlasBehaviorTraitTrend =
  | "growing"
  | "stable"
  | "declining";


export type AtlasBehaviorDataSufficiency =
  | "insufficient"
  | "developing"
  | "sufficient"
  | "strong";


export type AtlasBehaviorTrait = {
  id:
    AtlasBehaviorTraitId;

  name:
    string;

  description:
    string;

  confidence:
    number;

  score:
    number;

  trend:
    AtlasBehaviorTraitTrend;

  firstObserved:
    string;

  lastObserved:
    string;

  evidenceCount:
    number;

  totalOccurrences:
    number;

  supportingMemoryIds:
    string[];

  affectedSystems:
    string[];
};


export type AtlasPersistentBehaviorProfile = {
  version:
    number;

  generatedAt:
    string;

  ledgerUpdatedAt:
    string | null;

  primaryArchetype:
    AtlasBehaviorArchetype;

  profileConfidence:
    number;

  dataSufficiency:
    AtlasBehaviorDataSufficiency;

  sessionsObserved:
    number;

  memoriesAnalyzed:
    number;

  totalEventsObserved:
    number;

  dominantTraits:
    AtlasBehaviorTrait[];

  supportingMemoryIds:
    string[];

  headline:
    string;

  summary:
    string;
};


export type BuildAtlasPersistentBehaviorProfileInput = {
  ledger:
    AtlasPersistentMemoryLedger | null;

  generatedAt?: string;

  maximumTraits?: number;
};


type TraitDefinition = {
  id:
    AtlasBehaviorTraitId;

  name:
    string;

  description:
    string;

  categoryWeights:
    Record<string, number>;

  typeWeights:
    Record<string, number>;

  keywordWeights:
    Record<string, number>;

  systemWeights:
    Record<string, number>;
};


type TraitEvidence = {
  record:
    AtlasPersistentMemoryRecord;

  score:
    number;
};


const traitDefinitions:
  TraitDefinition[] = [
    {
      id:
        "growth-focused",

      name:
        "Growth Focused",

      description:
        "Consistently prioritizes empire growth, progression, and long-term improvement.",

      categoryWeights: {
        empire: 5,
        financial: 2,
        priority: 2,
      },

      typeWeights: {
        progress: 4,
        milestone: 6,
        "strategy-shift": 2,
      },

      keywordWeights: {
        growth: 5,
        empire: 4,
        progress: 4,
        improve: 3,
        expansion: 3,
        milestone: 4,
      },

      systemWeights: {
        "empire intelligence": 4,
        strategy: 3,
        "atlas brain": 1,
      },
    },

    {
      id:
        "financially-disciplined",

      name:
        "Financially Disciplined",

      description:
        "Shows recurring attention to liquidity, cash preservation, and investment readiness.",

      categoryWeights: {
        financial: 6,
        empire: 1,
      },

      typeWeights: {
        progress: 2,
        warning: 2,
        setback: 1,
        opportunity: 2,
      },

      keywordWeights: {
        cash: 5,
        liquidity: 6,
        reserve: 5,
        investment: 4,
        spending: 4,
        capital: 4,
        affordable: 3,
      },

      systemWeights: {
        "player profile": 3,
        "investment intelligence": 6,
      },
    },

    {
      id:
        "opportunity-driven",

      name:
        "Opportunity Driven",

      description:
        "Frequently responds to new opportunities and favorable strategic openings.",

      categoryWeights: {
        recommendation: 2,
        priority: 2,
        copilot: 1,
      },

      typeWeights: {
        opportunity: 8,
        "strategy-shift": 2,
        milestone: 2,
      },

      keywordWeights: {
        opportunity: 7,
        available: 2,
        compare: 2,
        expansion: 3,
        acquire: 3,
        purchase: 2,
      },

      systemWeights: {
        copilot: 2,
        "recommendation engine": 3,
        "investment intelligence": 3,
      },
    },

    {
      id:
        "risk-aware",

      name:
        "Risk Aware",

      description:
        "Regularly evaluates threats, warnings, urgency, and downside before acting.",

      categoryWeights: {
        situation: 4,
        financial: 2,
        copilot: 2,
      },

      typeWeights: {
        warning: 7,
        setback: 4,
        "status-update": 1,
      },

      keywordWeights: {
        risk: 7,
        warning: 5,
        urgency: 5,
        stabilize: 4,
        protect: 4,
        delay: 3,
        constraint: 3,
      },

      systemWeights: {
        "situation analysis": 5,
        coach: 3,
        copilot: 2,
      },
    },

    {
      id:
        "strategy-responsive",

      name:
        "Strategy Responsive",

      description:
        "Frequently adjusts priorities or direction when Atlas detects a strategic change.",

      categoryWeights: {
        recommendation: 5,
        priority: 5,
        empire: 1,
      },

      typeWeights: {
        "strategy-shift": 8,
        "status-update": 2,
      },

      keywordWeights: {
        strategy: 6,
        recommendation: 5,
        priority: 5,
        focus: 4,
        objective: 3,
        align: 3,
      },

      systemWeights: {
        strategy: 5,
        "recommendation engine": 5,
        "dashboard priority": 4,
        copilot: 2,
      },
    },

    {
      id:
        "momentum-driven",

      name:
        "Momentum Driven",

      description:
        "Builds on progress and responds strongly to changes in forward momentum.",

      categoryWeights: {
        situation: 4,
        empire: 2,
      },

      typeWeights: {
        progress: 5,
        milestone: 4,
        setback: 2,
      },

      keywordWeights: {
        momentum: 8,
        progress: 4,
        forward: 3,
        restore: 4,
        continue: 2,
        complete: 2,
      },

      systemWeights: {
        coach: 4,
        "situation analysis": 4,
      },
    },

    {
      id:
        "efficiency-focused",

      name:
        "Efficiency Focused",

      description:
        "Shows repeated attention to high-value actions, optimization, and efficient progression.",

      categoryWeights: {
        situation: 3,
        empire: 3,
        recommendation: 2,
      },

      typeWeights: {
        progress: 3,
        "strategy-shift": 3,
        opportunity: 2,
      },

      keywordWeights: {
        efficiency: 8,
        optimize: 6,
        impact: 4,
        value: 3,
        objective: 2,
        activity: 2,
      },

      systemWeights: {
        strategy: 3,
        "recommendation engine": 3,
        coach: 2,
      },
    },

    {
      id:
        "resilient",

      name:
        "Resilient",

      description:
        "Recovers from setbacks and continues progressing after periods of decline or risk.",

      categoryWeights: {
        empire: 3,
        situation: 3,
        financial: 1,
      },

      typeWeights: {
        setback: 5,
        warning: 3,
        progress: 3,
        milestone: 2,
      },

      keywordWeights: {
        recover: 7,
        restore: 6,
        stabilize: 5,
        rebuild: 5,
        resolved: 4,
        improvement: 3,
      },

      systemWeights: {
        coach: 3,
        "empire intelligence": 3,
        strategy: 2,
      },
    },

    {
      id:
        "expansion-oriented",

      name:
        "Expansion Oriented",

      description:
        "Demonstrates recurring interest in expansion readiness and empire acquisition opportunities.",

      categoryWeights: {
        empire: 6,
        financial: 2,
        recommendation: 2,
      },

      typeWeights: {
        opportunity: 4,
        milestone: 4,
        "strategy-shift": 3,
      },

      keywordWeights: {
        expansion: 8,
        readiness: 5,
        acquire: 5,
        investment: 3,
        growth: 3,
        opportunity: 3,
      },

      systemWeights: {
        "empire intelligence": 5,
        strategy: 4,
        "investment intelligence": 3,
      },
    },

    {
      id:
        "copilot-engaged",

      name:
        "Copilot Engaged",

      description:
        "Generates recurring Copilot-related signals, priorities, and recommendation updates.",

      categoryWeights: {
        copilot: 6,
        recommendation: 4,
        priority: 3,
      },

      typeWeights: {
        "strategy-shift": 3,
        warning: 2,
        opportunity: 2,
        "status-update": 2,
      },

      keywordWeights: {
        copilot: 8,
        recommendation: 5,
        confidence: 5,
        priority: 3,
        atlas: 2,
      },

      systemWeights: {
        copilot: 8,
        dashboard: 3,
        "recommendation engine": 3,
      },
    },
  ];


const severityWeights:
  Record<
    AtlasPersistentMemoryRecord["severity"],
    number
  > = {
    low: 1,
    medium: 2,
    high: 4,
    critical: 6,
  };


function resolveTimestamp(
  value?: string
): string {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed =
    new Date(
      value
    );

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}


function normalizeMaximumTraits(
  value?: number
): number {
  if (
    value === undefined ||
    !Number.isFinite(
      value
    )
  ) {
    return 5;
  }

  return Math.min(
    10,
    Math.max(
      1,
      Math.round(
        value
      )
    )
  );
}


function normalizeConfidence(
  value: number
): number {
  if (
    !Number.isFinite(
      value
    )
  ) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        value
      )
    )
  );
}


function normalizeText(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /\s+/g,
      " "
    );
}


function getRecordText(
  record:
    AtlasPersistentMemoryRecord
): string {
  return normalizeText([
    record.headline,
    record.summary,
    record.suggestedAction,
  ].join(
    " "
  ));
}


function getSystemText(
  record:
    AtlasPersistentMemoryRecord
): string[] {
  return record
    .affectedSystems
    .map(
      normalizeText
    );
}


function getRecordBaseWeight(
  record:
    AtlasPersistentMemoryRecord
): number {
  const severityWeight =
    severityWeights[
      record.severity
    ];

  const confidenceWeight =
    record.confidence /
    25;

  const priorityWeight =
    Math.min(
      5,
      record.priority /
        20
    );

  const occurrenceWeight =
    Math.min(
      8,
      Math.max(
        1,
        record.occurrenceCount
      )
    );

  return (
    severityWeight +
    confidenceWeight +
    priorityWeight +
    occurrenceWeight
  );
}


function scoreRecordAgainstTrait(
  record:
    AtlasPersistentMemoryRecord,
  definition:
    TraitDefinition
): number {
  let score =
    0;

  score +=
    definition
      .categoryWeights[
        record.category
      ] ?? 0;

  score +=
    definition
      .typeWeights[
        record.type
      ] ?? 0;

  const recordText =
    getRecordText(
      record
    );

  for (
    const [
      keyword,
      weight,
    ] of Object.entries(
      definition.keywordWeights
    )
  ) {
    if (
      recordText.includes(
        keyword
      )
    ) {
      score +=
        weight;
    }
  }

  const systems =
    getSystemText(
      record
    );

  for (
    const system
    of systems
  ) {
    score +=
      definition
        .systemWeights[
          system
        ] ?? 0;
  }

  if (
    score <= 0
  ) {
    return 0;
  }

  return score *
    getRecordBaseWeight(
      record
    );
}


function compareDates(
  first: string,
  second: string
): number {
  return (
    new Date(
      first
    ).getTime() -
    new Date(
      second
    ).getTime()
  );
}


function resolveTraitTrend(
  evidence:
    TraitEvidence[],
  generatedAt:
    string
): AtlasBehaviorTraitTrend {
  if (
    evidence.length < 2
  ) {
    return "stable";
  }

  const generatedTime =
    new Date(
      generatedAt
    ).getTime();

  const recentBoundary =
    generatedTime -
    1000 *
      60 *
      60 *
      24 *
      30;

  const olderBoundary =
    generatedTime -
    1000 *
      60 *
      60 *
      24 *
      90;

  const recentScore =
    evidence.reduce(
      (
        total,
        item
      ) => {
        const timestamp =
          new Date(
            item.record.lastSeenAt
          ).getTime();

        return timestamp >=
          recentBoundary
          ? total +
              item.score
          : total;
      },
      0
    );

  const olderScore =
    evidence.reduce(
      (
        total,
        item
      ) => {
        const timestamp =
          new Date(
            item.record.lastSeenAt
          ).getTime();

        return (
          timestamp <
            recentBoundary &&
          timestamp >=
            olderBoundary
        )
          ? total +
              item.score
          : total;
      },
      0
    );

  if (
    recentScore >
    olderScore * 1.2
  ) {
    return "growing";
  }

  if (
    olderScore >
    recentScore * 1.2
  ) {
    return "declining";
  }

  return "stable";
}


function buildTrait(
  definition:
    TraitDefinition,
  records:
    AtlasPersistentMemoryRecord[],
  generatedAt:
    string
): AtlasBehaviorTrait | null {
  const evidence =
    records
      .map(
        (
          record
        ): TraitEvidence => ({
          record,

          score:
            scoreRecordAgainstTrait(
              record,
              definition
            ),
        })
      )
      .filter(
        (
          item
        ) =>
          item.score > 0
      )
      .sort(
        (
          first,
          second
        ) =>
          second.score -
          first.score
      );

  if (
    evidence.length === 0
  ) {
    return null;
  }

  const totalScore =
    evidence.reduce(
      (
        total,
        item
      ) =>
        total +
        item.score,
      0
    );

  const totalOccurrences =
    evidence.reduce(
      (
        total,
        item
      ) =>
        total +
        item.record
          .occurrenceCount,
      0
    );

  const averageMemoryConfidence =
    evidence.reduce(
      (
        total,
        item
      ) =>
        total +
        item.record
          .confidence,
      0
    ) /
    evidence.length;

  const evidenceStrength =
    Math.min(
      35,
      evidence.length * 5
    );

  const occurrenceStrength =
    Math.min(
      25,
      totalOccurrences * 2
    );

  const scoreStrength =
    Math.min(
      20,
      totalScore / 20
    );

  const confidenceStrength =
    averageMemoryConfidence *
    0.2;

  const confidence =
    normalizeConfidence(
      evidenceStrength +
      occurrenceStrength +
      scoreStrength +
      confidenceStrength
    );

  const orderedByFirstSeen =
    [...evidence].sort(
      (
        first,
        second
      ) =>
        compareDates(
          first.record
            .occurredAt,
          second.record
            .occurredAt
        )
    );

  const orderedByLastSeen =
    [...evidence].sort(
      (
        first,
        second
      ) =>
        compareDates(
          second.record
            .lastSeenAt,
          first.record
            .lastSeenAt
        )
    );

  const supportingMemoryIds =
    evidence
      .slice(
        0,
        12
      )
      .map(
        (
          item
        ) =>
          item.record.id
      );

  const affectedSystems =
    Array.from(
      new Set(
        evidence.flatMap(
          (
            item
          ) =>
            item.record
              .affectedSystems
        )
      )
    );

  return {
    id:
      definition.id,

    name:
      definition.name,

    description:
      definition.description,

    confidence,

    score:
      Math.round(
        totalScore
      ),

    trend:
      resolveTraitTrend(
        evidence,
        generatedAt
      ),

    firstObserved:
      orderedByFirstSeen[0]
        .record.occurredAt,

    lastObserved:
      orderedByLastSeen[0]
        .record.lastSeenAt,

    evidenceCount:
      evidence.length,

    totalOccurrences,

    supportingMemoryIds,

    affectedSystems,
  };
}


function resolveDataSufficiency(
  sessionsObserved:
    number,
  memoriesAnalyzed:
    number
): AtlasBehaviorDataSufficiency {
  if (
    sessionsObserved <
      MINIMUM_BEHAVIOR_PROFILE_SESSIONS ||
    memoriesAnalyzed <
      MINIMUM_BEHAVIOR_PROFILE_MEMORIES
  ) {
    return "insufficient";
  }

  if (
    sessionsObserved < 8 ||
    memoriesAnalyzed < 10
  ) {
    return "developing";
  }

  if (
    sessionsObserved < 20 ||
    memoriesAnalyzed < 25
  ) {
    return "sufficient";
  }

  return "strong";
}


function resolveArchetype(
  traits:
    AtlasBehaviorTrait[],
  dataSufficiency:
    AtlasBehaviorDataSufficiency
): AtlasBehaviorArchetype {
  if (
    dataSufficiency ===
      "insufficient" ||
    traits.length === 0
  ) {
    return "Developing Player";
  }

  const scores =
    new Map<
      AtlasBehaviorArchetype,
      number
    >();

  function addScore(
    archetype:
      AtlasBehaviorArchetype,
    value:
      number
  ): void {
    scores.set(
      archetype,
      (
        scores.get(
          archetype
        ) ?? 0
      ) + value
    );
  }

  for (
    const trait
    of traits
  ) {
    const value =
      trait.score *
      (
        trait.confidence /
        100
      );

    switch (
      trait.id
    ) {
      case "growth-focused":
      case "expansion-oriented":
        addScore(
          "Empire Builder",
          value
        );
        break;

      case "strategy-responsive":
      case "efficiency-focused":
        addScore(
          "Strategic Operator",
          value
        );
        break;

      case "opportunity-driven":
      case "momentum-driven":
        addScore(
          "Opportunity Hunter",
          value
        );
        break;

      case "risk-aware":
      case "financially-disciplined":
        addScore(
          "Risk Manager",
          value
        );
        break;

      case "resilient":
      case "copilot-engaged":
        addScore(
          "Adaptive Player",
          value
        );
        break;
    }
  }

  const ranked =
    Array.from(
      scores.entries()
    ).sort(
      (
        first,
        second
      ) =>
        second[1] -
        first[1]
    );

  return (
    ranked[0]?.[0] ??
    "Developing Player"
  );
}


function resolveProfileConfidence(
  traits:
    AtlasBehaviorTrait[],
  sessionsObserved:
    number,
  memoriesAnalyzed:
    number,
  dataSufficiency:
    AtlasBehaviorDataSufficiency
): number {
  if (
    traits.length === 0
  ) {
    return 0;
  }

  const averageTraitConfidence =
    traits.reduce(
      (
        total,
        trait
      ) =>
        total +
        trait.confidence,
      0
    ) /
    traits.length;

  const sessionStrength =
    Math.min(
      15,
      sessionsObserved
    );

  const memoryStrength =
    Math.min(
      15,
      memoriesAnalyzed /
        2
    );

  const sufficiencyModifier:
    Record<
      AtlasBehaviorDataSufficiency,
      number
    > = {
      insufficient: 0.55,
      developing: 0.75,
      sufficient: 0.9,
      strong: 1,
    };

  return normalizeConfidence(
    (
      averageTraitConfidence *
        0.7 +
      sessionStrength +
      memoryStrength
    ) *
      sufficiencyModifier[
        dataSufficiency
      ]
  );
}


function buildHeadline(
  archetype:
    AtlasBehaviorArchetype,
  dataSufficiency:
    AtlasBehaviorDataSufficiency
): string {
  if (
    dataSufficiency ===
    "insufficient"
  ) {
    return "Atlas is still learning this player's behavior.";
  }

  return `Atlas identifies this player as a ${archetype}.`;
}


function buildSummary(
  archetype:
    AtlasBehaviorArchetype,
  traits:
    AtlasBehaviorTrait[],
  profileConfidence:
    number,
  sessionsObserved:
    number,
  dataSufficiency:
    AtlasBehaviorDataSufficiency
): string {
  if (
    dataSufficiency ===
      "insufficient" ||
    traits.length === 0
  ) {
    return "Atlas needs additional sessions and meaningful memory records before it can establish a reliable behavioral profile.";
  }

  const leadingTraits =
    traits
      .slice(
        0,
        3
      )
      .map(
        (
          trait
        ) =>
          trait.name.toLowerCase()
      );

  const traitDescription =
    leadingTraits.length === 1
      ? leadingTraits[0]
      : leadingTraits.length === 2
        ? `${leadingTraits[0]} and ${leadingTraits[1]}`
        : `${leadingTraits[0]}, ${leadingTraits[1]}, and ${leadingTraits[2]}`;

  return `Across ${sessionsObserved} observed sessions, Atlas classifies the player as a ${archetype} with ${profileConfidence}% confidence. The strongest recurring behavior is ${traitDescription}.`;
}


function createEmptyProfile(
  generatedAt:
    string
): AtlasPersistentBehaviorProfile {
  return {
    version:
      ATLAS_BEHAVIOR_PROFILE_VERSION,

    generatedAt,

    ledgerUpdatedAt:
      null,

    primaryArchetype:
      "Developing Player",

    profileConfidence:
      0,

    dataSufficiency:
      "insufficient",

    sessionsObserved:
      0,

    memoriesAnalyzed:
      0,

    totalEventsObserved:
      0,

    dominantTraits: [],

    supportingMemoryIds: [],

    headline:
      "Atlas is still learning this player's behavior.",

    summary:
      "Atlas needs additional sessions and meaningful memory records before it can establish a reliable behavioral profile.",
  };
}


export function buildAtlasPersistentBehaviorProfile({
  ledger,
  generatedAt,
  maximumTraits,
}: BuildAtlasPersistentBehaviorProfileInput): AtlasPersistentBehaviorProfile {
  const resolvedGeneratedAt =
    resolveTimestamp(
      generatedAt
    );

  if (!ledger) {
    return createEmptyProfile(
      resolvedGeneratedAt
    );
  }

  const traitLimit =
    normalizeMaximumTraits(
      maximumTraits
    );

  const traits =
    traitDefinitions
      .map(
        (
          definition
        ) =>
          buildTrait(
            definition,
            ledger.records,
            resolvedGeneratedAt
          )
      )
      .filter(
        (
          trait
        ): trait is AtlasBehaviorTrait =>
          trait !== null
      )
      .sort(
        (
          first,
          second
        ) => {
          if (
            second.confidence !==
            first.confidence
          ) {
            return (
              second.confidence -
              first.confidence
            );
          }

          return (
            second.score -
            first.score
          );
        }
      )
      .slice(
        0,
        traitLimit
      );

  const dataSufficiency =
    resolveDataSufficiency(
      ledger.sessionCount,
      ledger.records.length
    );

  const primaryArchetype =
    resolveArchetype(
      traits,
      dataSufficiency
    );

  const profileConfidence =
    resolveProfileConfidence(
      traits,
      ledger.sessionCount,
      ledger.records.length,
      dataSufficiency
    );

  const supportingMemoryIds =
    Array.from(
      new Set(
        traits.flatMap(
          (
            trait
          ) =>
            trait.supportingMemoryIds
        )
      )
    );

  return {
    version:
      ATLAS_BEHAVIOR_PROFILE_VERSION,

    generatedAt:
      resolvedGeneratedAt,

    ledgerUpdatedAt:
      ledger.updatedAt,

    primaryArchetype,

    profileConfidence,

    dataSufficiency,

    sessionsObserved:
      ledger.sessionCount,

    memoriesAnalyzed:
      ledger.records.length,

    totalEventsObserved:
      ledger.totalEventsObserved,

    dominantTraits:
      traits,

    supportingMemoryIds,

    headline:
      buildHeadline(
        primaryArchetype,
        dataSufficiency
      ),

    summary:
      buildSummary(
        primaryArchetype,
        traits,
        profileConfidence,
        ledger.sessionCount,
        dataSufficiency
      ),
  };
}