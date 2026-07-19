import type {
  AtlasBrainCopilotReport,
  AtlasBrainHealth,
} from "./atlas-brain-copilot.engine";

import type {
  AtlasBrainModel,
} from "./dashboard-intelligence.engine";

import type {
  AtlasExpansionReadiness,
  AtlasGrowthPhase,
  AtlasInvestmentReadiness,
  AtlasLiquidityStatus,
  AtlasMomentum,
  AtlasSituationRisk,
  AtlasUrgency,
} from "./situation-analysis.engine";

import type {
  RecommendationCategory,
} from "./recommendation.engine";

import type {
  EmpireModel,
  PlayerProfile,
} from "@/app/types";


export type AtlasBrainSnapshotRecommendation = {
  title: string;

  category: RecommendationCategory;

  confidence: number;
};


export type AtlasBrainSnapshotPriority = {
  title: string;

  description: string;

  confidence: number;
};


export type AtlasBrainSnapshotSituation = {
  liquidityStatus:
    AtlasLiquidityStatus;

  growthPhase:
    AtlasGrowthPhase;

  expansionReadiness:
    AtlasExpansionReadiness;

  riskLevel:
    AtlasSituationRisk;

  urgency:
    AtlasUrgency;

  momentum:
    AtlasMomentum;

  investmentStatus:
    AtlasInvestmentReadiness["status"];

  efficiencyScore: number;

  confidence: number;

  primaryFocus: string;
};


export type AtlasBrainSnapshot = {
  capturedAt: string;

  cash: number;

  empireScore: number;

  empireHealth:
    AtlasBrainHealth;

  copilotConfidence: number;

  recommendation:
    AtlasBrainSnapshotRecommendation;

  recommendationWeight:
    number;

  situation:
    AtlasBrainSnapshotSituation;

  recommendedFocus: string;

  topPriority:
    AtlasBrainSnapshotPriority;

  secondaryPriority:
    AtlasBrainSnapshotPriority;

  warningCount: number;

  opportunityCount: number;
};


export type BuildAtlasBrainSnapshotInput = {
  brain:
    AtlasBrainModel;

  copilot:
    AtlasBrainCopilotReport;

  profile:
    PlayerProfile;

  empire:
    EmpireModel;

  capturedAt?: string;
};


function normalizeScore(
  value: number
): number {
  return Math.min(
    100,
    Math.max(
      0,
      Math.round(value)
    )
  );
}


function normalizeNonNegativeNumber(
  value: number
): number {
  return Math.max(
    0,
    Math.round(value)
  );
}


function resolveCapturedAt(
  capturedAt?: string
): string {
  if (!capturedAt) {
    return new Date().toISOString();
  }

  const parsedDate =
    new Date(capturedAt);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return new Date().toISOString();
  }

  return parsedDate.toISOString();
}


export function buildAtlasBrainSnapshot({
  brain,
  copilot,
  profile,
  empire,
  capturedAt,
}: BuildAtlasBrainSnapshotInput): AtlasBrainSnapshot {
  return {
    capturedAt:
      resolveCapturedAt(
        capturedAt
      ),

    cash:
      normalizeNonNegativeNumber(
        profile.cash
      ),

    empireScore:
      normalizeScore(
        empire.overallScore
      ),

    empireHealth:
      copilot.empireHealth,

    copilotConfidence:
      normalizeScore(
        copilot.confidence
      ),

    recommendation: {
      title:
        brain.atlasRecommendation.title,

      category:
        brain.atlasRecommendation
          .category,

      confidence:
        normalizeScore(
          brain.atlasRecommendation
            .confidence
        ),
    },

    recommendationWeight:
      normalizeScore(
        brain.recommendationWeighting
          .totalScore
      ),

    situation: {
      liquidityStatus:
        brain.situation
          .liquidityStatus,

      growthPhase:
        brain.situation
          .growthPhase,

      expansionReadiness:
        brain.situation
          .expansionReadiness,

      riskLevel:
        brain.situation
          .riskLevel,

      urgency:
        brain.situation
          .urgency,

      momentum:
        brain.situation
          .momentum,

      investmentStatus:
        brain.situation
          .investmentReadiness
          .status,

      efficiencyScore:
        normalizeScore(
          brain.situation
            .efficiencyScore
        ),

      confidence:
        normalizeScore(
          brain.situation
            .confidence
        ),

      primaryFocus:
        brain.situation
          .primaryFocus,
    },

    recommendedFocus:
      copilot.recommendedFocus,

    topPriority: {
      title:
        copilot.topPriority.title,

      description:
        copilot.topPriority
          .description,

      confidence:
        normalizeScore(
          copilot.topPriority
            .confidence
        ),
    },

    secondaryPriority: {
      title:
        copilot.secondaryPriority
          .title,

      description:
        copilot.secondaryPriority
          .description,

      confidence:
        normalizeScore(
          copilot.secondaryPriority
            .confidence
        ),
    },

    warningCount:
      copilot.warnings.length,

    opportunityCount:
      copilot.opportunities
        .length,
  };
}