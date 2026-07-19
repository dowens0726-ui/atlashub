import {
  buildAtlasAdaptiveRecommendations,
  buildAtlasPersistentBehaviorProfile,
  buildAtlasStrategyEvolution,
  type AtlasAdaptiveRecommendationCandidate,
  type AtlasAdaptiveRecommendationResult,
  type AtlasDecision,
  type AtlasDecisionContext,
  type AtlasPersistentBehaviorProfile,
  type AtlasPersistentMemoryLedger,
  type AtlasStrategyEvolution,
} from "@/app/intelligence";

import {
  runAtlasDecisionOrchestration,
  type AtlasDecisionOrchestrationResult,
  type AtlasDecisionOrchestrationWarning,
} from "./atlas-decision-orchestrator.service";


export const ATLAS_DECISION_PIPELINE_VERSION = 1;


export type AtlasDecisionPipelineSource =
  | "dashboard"
  | "copilot"
  | "advisor"
  | "planner"
  | "profile"
  | "background"
  | "manual"
  | "unknown";


export type AtlasDecisionPipelineConfiguration = {
  maximumBehaviorTraits?: number;

  minimumEvolutionConfidenceDelta?: number;

  minimumEvolutionTraitConfidence?: number;

  maximumEvolutionChanges?: number;

  maximumRecommendations?: number;

  minimumRecommendationScore?: number;

  includeUnavailableRecommendations?: boolean;

  includeCompletedRecommendations?: boolean;
};


export type AtlasDecisionPipelineInput = {
  ledger:
    AtlasPersistentMemoryLedger | null;

  previousBehaviorProfile?:
    AtlasPersistentBehaviorProfile | null;

  candidates:
    AtlasAdaptiveRecommendationCandidate[];

  decisionContext?:
    AtlasDecisionContext;

  configuration?:
    AtlasDecisionPipelineConfiguration;

  generatedAt?: string;

  source?:
    AtlasDecisionPipelineSource | string;

  metadata?:
    Record<string, unknown>;
};


export type AtlasDecisionPipelineSuccess = {
  status:
    | "completed"
    | "completed-with-warnings";

  version: number;

  behaviorProfile:
    AtlasPersistentBehaviorProfile;

  strategyEvolution:
    AtlasStrategyEvolution;

  adaptiveRecommendations:
    AtlasAdaptiveRecommendationResult;

  decision:
    AtlasDecision;

  warnings:
    AtlasDecisionOrchestrationWarning[];

  executionId:
    string;

  generatedAt:
    string;

  durationMilliseconds:
    number;

  source:
    string | null;

  metadata:
    Record<string, unknown>;
};


export type AtlasDecisionPipelineFailure = {
  status:
    "failed";

  version: number;

  behaviorProfile:
    null;

  strategyEvolution:
    null;

  adaptiveRecommendations:
    null;

  decision:
    null;

  warnings:
    AtlasDecisionOrchestrationWarning[];

  executionId:
    string;

  generatedAt:
    string;

  durationMilliseconds:
    number;

  source:
    string | null;

  metadata:
    Record<string, unknown>;

  error: {
    stage: string;

    name: string;

    message: string;
  };
};


export type AtlasDecisionPipelineResult =
  | AtlasDecisionPipelineSuccess
  | AtlasDecisionPipelineFailure;


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


function resolveSource(
  source:
    AtlasDecisionPipelineInput["source"]
): string {
  if (
    typeof source !== "string"
  ) {
    return "unknown";
  }

  const normalized =
    source.trim();

  return normalized.length > 0
    ? normalized
    : "unknown";
}


function resolveConfiguration(
  configuration:
    AtlasDecisionPipelineConfiguration | undefined
): Required<
  AtlasDecisionPipelineConfiguration
> {
  return {
    maximumBehaviorTraits:
      configuration
        ?.maximumBehaviorTraits ??
      8,

    minimumEvolutionConfidenceDelta:
      configuration
        ?.minimumEvolutionConfidenceDelta ??
      8,

    minimumEvolutionTraitConfidence:
      configuration
        ?.minimumEvolutionTraitConfidence ??
      35,

    maximumEvolutionChanges:
      configuration
        ?.maximumEvolutionChanges ??
      8,

    maximumRecommendations:
      configuration
        ?.maximumRecommendations ??
      10,

    minimumRecommendationScore:
      configuration
        ?.minimumRecommendationScore ??
      0,

    includeUnavailableRecommendations:
      configuration
        ?.includeUnavailableRecommendations ??
      false,

    includeCompletedRecommendations:
      configuration
        ?.includeCompletedRecommendations ??
      false,
  };
}


function buildPipelineMetadata(
  input: AtlasDecisionPipelineInput,
  generatedAt: string,
  configuration: Required<
    AtlasDecisionPipelineConfiguration
  >
): Record<string, unknown> {
  return {
    ...input.metadata,

    pipelineVersion:
      ATLAS_DECISION_PIPELINE_VERSION,

    generatedAt,

    candidateCount:
      input.candidates.length,

    hasLedger:
      input.ledger !== null,

    hasPreviousBehaviorProfile:
      input.previousBehaviorProfile !==
      null &&
      input.previousBehaviorProfile !==
      undefined,

    configuration,
  };
}


function mapSuccessResult(
  result: Extract<
    AtlasDecisionOrchestrationResult<
      AtlasPersistentBehaviorProfile,
      AtlasStrategyEvolution
    >,
    {
      status:
        | "completed"
        | "completed-with-warnings";
    }
  >
): AtlasDecisionPipelineSuccess {
  return {
    status:
      result.status,

    version:
      ATLAS_DECISION_PIPELINE_VERSION,

    behaviorProfile:
      result.behaviorProfile,

    strategyEvolution:
      result.strategyEvolution,

    adaptiveRecommendations:
      result.adaptiveRecommendations,

    decision:
      result.decision,

    warnings:
      result.warnings,

    executionId:
      result.metadata.executionId,

    generatedAt:
      result.metadata.completedAt,

    durationMilliseconds:
      result.metadata
        .durationMilliseconds,

    source:
      result.metadata.source,

    metadata:
      result.metadata
        .requestMetadata,
  };
}


function mapFailureResult(
  result: Extract<
    AtlasDecisionOrchestrationResult<
      AtlasPersistentBehaviorProfile,
      AtlasStrategyEvolution
    >,
    {
      status: "failed";
    }
  >
): AtlasDecisionPipelineFailure {
  return {
    status:
      "failed",

    version:
      ATLAS_DECISION_PIPELINE_VERSION,

    behaviorProfile:
      null,

    strategyEvolution:
      null,

    adaptiveRecommendations:
      null,

    decision:
      null,

    warnings:
      result.warnings,

    executionId:
      result.metadata.executionId,

    generatedAt:
      result.metadata.completedAt,

    durationMilliseconds:
      result.metadata
        .durationMilliseconds,

    source:
      result.metadata.source,

    metadata:
      result.metadata
        .requestMetadata,

    error: {
      stage:
        result.error.stage,

      name:
        result.error.name,

      message:
        result.error.message,
    },
  };
}


export async function runAtlasDecisionPipeline(
  input: AtlasDecisionPipelineInput
): Promise<
  AtlasDecisionPipelineResult
> {
  const generatedAt =
    resolveTimestamp(
      input.generatedAt
    );

  const source =
    resolveSource(
      input.source
    );

  const configuration =
    resolveConfiguration(
      input.configuration
    );

  const metadata =
    buildPipelineMetadata(
      input,
      generatedAt,
      configuration
    );

  const orchestrationResult =
    await runAtlasDecisionOrchestration<
      AtlasPersistentMemoryLedger | null,
      AtlasAdaptiveRecommendationCandidate,
      AtlasPersistentBehaviorProfile,
      AtlasStrategyEvolution,
      AtlasPersistentBehaviorProfile,
      AtlasStrategyEvolution
    >(
      {
        activity:
          input.ledger,

        candidates:
          input.candidates,

        previousBehaviorProfile:
          input.previousBehaviorProfile ??
          null,

        previousStrategyEvolution:
          null,

        decisionContext:
          input.decisionContext ??
          {},

        generatedAt,

        source,

        metadata,
      },
      {
        buildBehaviorProfile: ({
          activity,
          generatedAt:
            stageGeneratedAt,
        }) => {
          return buildAtlasPersistentBehaviorProfile({
            ledger:
              activity,

            generatedAt:
              stageGeneratedAt,

            maximumTraits:
              configuration
                .maximumBehaviorTraits,
          });
        },

        buildStrategyEvolution: ({
          behaviorProfile,
          generatedAt:
            stageGeneratedAt,
        }) => {
          return buildAtlasStrategyEvolution({
            previousProfile:
              input.previousBehaviorProfile ??
              null,

            currentProfile:
              behaviorProfile,

            generatedAt:
              stageGeneratedAt,

            minimumConfidenceDelta:
              configuration
                .minimumEvolutionConfidenceDelta,

            minimumTraitConfidence:
              configuration
                .minimumEvolutionTraitConfidence,

            maximumChanges:
              configuration
                .maximumEvolutionChanges,
          });
        },

        buildAdaptiveRecommendations: ({
          behaviorProfile,
          strategyEvolution,
          candidates,
          generatedAt:
            stageGeneratedAt,
        }) => {
          return buildAtlasAdaptiveRecommendations({
            candidates,

            behaviorProfile,

            strategyEvolution,

            generatedAt:
              stageGeneratedAt,

            maximumRecommendations:
              configuration
                .maximumRecommendations,

            minimumScore:
              configuration
                .minimumRecommendationScore,

            includeUnavailable:
              configuration
                .includeUnavailableRecommendations,

            includeCompleted:
              configuration
                .includeCompletedRecommendations,
          });
        },
      }
    );

  if (
    orchestrationResult.status ===
    "failed"
  ) {
    return mapFailureResult(
      orchestrationResult
    );
  }

  return mapSuccessResult(
    orchestrationResult
  );
}


export function isAtlasDecisionPipelineSuccess(
  result:
    AtlasDecisionPipelineResult
): result is AtlasDecisionPipelineSuccess {
  return (
    result.status ===
      "completed" ||
    result.status ===
      "completed-with-warnings"
  );
}


export function isAtlasDecisionPipelineFailure(
  result:
    AtlasDecisionPipelineResult
): result is AtlasDecisionPipelineFailure {
  return result.status ===
    "failed";
}


export function getAtlasPipelineDecision(
  result:
    AtlasDecisionPipelineResult
): AtlasDecision | null {
  if (
    !isAtlasDecisionPipelineSuccess(
      result
    )
  ) {
    return null;
  }

  return result.decision;
}


export function getAtlasPipelinePrimaryRecommendation(
  result:
    AtlasDecisionPipelineResult
) {
  const decision =
    getAtlasPipelineDecision(
      result
    );

  return (
    decision
      ?.primaryRecommendation ??
    null
  );
}


export function shouldRefreshAtlasDecisionPipeline(
  result:
    AtlasDecisionPipelineResult | null,
  maximumAgeMilliseconds =
    15 * 60 * 1000
): boolean {
  if (!result) {
    return true;
  }

  if (
    result.status ===
    "failed"
  ) {
    return true;
  }

  if (
    result.decision
      .shouldReassess
  ) {
    return true;
  }

  const generatedAt =
    new Date(
      result.generatedAt
    ).getTime();

  if (
    Number.isNaN(
      generatedAt
    )
  ) {
    return true;
  }

  const normalizedMaximumAge =
    Number.isFinite(
      maximumAgeMilliseconds
    )
      ? Math.max(
          0,
          maximumAgeMilliseconds
        )
      : 15 * 60 * 1000;

  return (
    Date.now() -
      generatedAt >=
    normalizedMaximumAge
  );
}