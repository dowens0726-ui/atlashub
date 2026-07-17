import type {
  AtlasBrainModel,
} from "./dashboard-intelligence.engine";

export type AtlasBrainHealth =
  | "Excellent"
  | "Strong"
  | "Stable"
  | "Developing";

export type AtlasBrainPriority = {
  title: string;
  description: string;
  confidence: number;
};

export type AtlasBrainOpportunity = {
  title: string;
  description: string;
};

export type AtlasBrainWarning = {
  title: string;
  description: string;
};

export type AtlasBrainCopilotReport = {
  executiveBriefing: string;

  empireHealth: AtlasBrainHealth;

  recommendedFocus: string;

  confidence: number;

  topPriority: AtlasBrainPriority;

  secondaryPriority: AtlasBrainPriority;

  opportunities: AtlasBrainOpportunity[];

  warnings: AtlasBrainWarning[];

  highlights: string[];
};

function determineEmpireHealth(
  confidence: number
): AtlasBrainHealth {
  if (confidence >= 92) {
    return "Excellent";
  }

  if (confidence >= 82) {
    return "Strong";
  }

  if (confidence >= 70) {
    return "Stable";
  }

  return "Developing";
}

function buildHighlights(
  brain: AtlasBrainModel
): string[] {
  return [
   brain.playerIdentity.summary,
   brain.coachBriefing.summary,
   brain.nextAction.reason,
 ];
}

function buildWarnings(
  brain: AtlasBrainModel
): AtlasBrainWarning[] {
  return [
    {
      title: "Maintain Momentum",
      description:
        "Continue completing Atlas recommendations to maximize long-term empire growth.",
    },
    {
      title: "Review Strategy",
      description:
        brain.strategyFeedback.futureAdjustment,
    },
  ];
}

function buildOpportunities(
  brain: AtlasBrainModel
): AtlasBrainOpportunity[] {
  return [
    {
  title: "Highest ROI",
  description:
    brain.nextAction.expectedImpact,
},
    {
      title: "Empire Growth",
      description:
        brain.coachBriefing.summary,
    },
  ];
}
function normalizeConfidence(
  value: number
): number {
  if (!Number.isFinite(value)) {
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

function calculateCopilotConfidence(
  brain: AtlasBrainModel
): number {
  const recommendationConfidence =
    normalizeConfidence(
      brain
        .atlasRecommendation
        .confidence
    );

  const actionConfidence =
    normalizeConfidence(
      brain
        .nextAction
        .confidence
    );

  return normalizeConfidence(
    (
      recommendationConfidence +
      actionConfidence
    ) / 2
  );
}

function buildTopPriority(
  brain: AtlasBrainModel
): AtlasBrainPriority {
  return {
    title:
      "Complete Your Recommended Next Action",

    description:
      brain.nextAction.reason,

    confidence:
      normalizeConfidence(
        brain.nextAction.confidence
      ),
  };
}

function buildSecondaryPriority(
  brain: AtlasBrainModel
): AtlasBrainPriority {
  return {
    title:
      "Continue Strategic Empire Growth",

    description:
      brain.coachBriefing.summary,

    confidence:
      normalizeConfidence(
        brain
          .atlasRecommendation
          .confidence
      ),
  };
}

function buildExecutiveBriefing(
  brain: AtlasBrainModel,
  health: AtlasBrainHealth
): string {
  return [
    `Your empire is currently rated ${health.toLowerCase()}.`,
    brain.playerIdentity.summary,
    brain.nextAction.reason,
  ].join(" ");
}

function getRecommendedFocus(
  brain: AtlasBrainModel
): string {
  return brain.nextAction.title;
}

function removeDuplicateStrings(
  values: string[]
): string[] {
  return Array.from(
    new Set(
      values
        .map(
          (value) =>
            value.trim()
        )
        .filter(Boolean)
    )
  );
}

function removeDuplicateOpportunities(
  opportunities:
    AtlasBrainOpportunity[]
): AtlasBrainOpportunity[] {
  const seen =
    new Set<string>();

  return opportunities.filter(
    (opportunity) => {
      const key =
        `${opportunity.title}:${opportunity.description}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    }
  );
}

function removeDuplicateWarnings(
  warnings:
    AtlasBrainWarning[]
): AtlasBrainWarning[] {
  const seen =
    new Set<string>();

  return warnings.filter(
    (warning) => {
      const key =
        `${warning.title}:${warning.description}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    }
  );
}
export function buildAtlasBrainCopilot(
  brain: AtlasBrainModel
): AtlasBrainCopilotReport {
  const confidence =
    calculateCopilotConfidence(
      brain
    );

  const empireHealth =
    determineEmpireHealth(
      confidence
    );

  const highlights =
    removeDuplicateStrings(
      buildHighlights(
        brain
      )
    );

  const opportunities =
    removeDuplicateOpportunities(
      buildOpportunities(
        brain
      )
    );

  const warnings =
    removeDuplicateWarnings(
      buildWarnings(
        brain
      )
    );

  return {
    executiveBriefing:
      buildExecutiveBriefing(
        brain,
        empireHealth
      ),

    empireHealth,

    recommendedFocus:
      getRecommendedFocus(
        brain
      ),

    confidence,

    topPriority:
      buildTopPriority(
        brain
      ),

    secondaryPriority:
      buildSecondaryPriority(
        brain
      ),

    opportunities,

    warnings,

    highlights,
  };
}


