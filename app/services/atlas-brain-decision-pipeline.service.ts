import {
  buildAtlasDecisionContext,
  buildAtlasRecommendationCandidates,
  type AtlasAdaptiveRecommendationCandidate,
  type AtlasBrainModel,
  type AtlasDecisionContext,
  type AtlasPersistentBehaviorProfile,
  type AtlasPersistentMemoryLedger,
} from "@/app/intelligence";

import type {
  EmpireModel,
  PlayerProfile,
} from "@/app/types";

import {
  runAtlasDecisionPipeline,
  type AtlasDecisionPipelineConfiguration,
  type AtlasDecisionPipelineResult,
  type AtlasDecisionPipelineSource,
} from "./atlas-decision-pipeline.service";


export const ATLAS_BRAIN_DECISION_PIPELINE_VERSION =
  1;


export type AtlasBrainCandidateConfiguration = {
  maximumCandidates?: number;

  minimumBaseScore?: number;

  includeCompleted?: boolean;
};


export type AtlasBrainDecisionContextConfiguration = {
  availableMinutes?: number;
};


export type AtlasBrainDecisionPipelineInput = {
  brain:
    AtlasBrainModel;

  profile:
    PlayerProfile;

  empire:
    EmpireModel;

  ledger:
    AtlasPersistentMemoryLedger | null;

  previousBehaviorProfile?:
    AtlasPersistentBehaviorProfile | null;

  candidateConfiguration?:
    AtlasBrainCandidateConfiguration;

  contextConfiguration?:
    AtlasBrainDecisionContextConfiguration;

  pipelineConfiguration?:
    AtlasDecisionPipelineConfiguration;

  generatedAt?: string;

  source?:
    AtlasDecisionPipelineSource | string;

  metadata?:
    Record<string, unknown>;
};


export type AtlasBrainDecisionPipelineResult = {
  version: number;

  generatedAt: string;

  source: string;

  candidates:
    AtlasAdaptiveRecommendationCandidate[];

  decisionContext:
    AtlasDecisionContext;

  pipeline:
    AtlasDecisionPipelineResult;

  metadata:
    Record<string, unknown>;
};


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


function resolveSource(
  source:
    AtlasBrainDecisionPipelineInput["source"]
): string {
  if (
    typeof source !==
    "string"
  ) {
    return "unknown";
  }

  const normalized =
    source.trim();

  return normalized.length >
    0
    ? normalized
    : "unknown";
}


function buildWrapperMetadata(
  input:
    AtlasBrainDecisionPipelineInput,
  generatedAt:
    string,
  source:
    string,
  candidates:
    AtlasAdaptiveRecommendationCandidate[]
): Record<string, unknown> {
  return {
    ...input.metadata,

    brainDecisionPipelineVersion:
      ATLAS_BRAIN_DECISION_PIPELINE_VERSION,

    generatedAt,

    source,

    candidateCount:
      candidates.length,

    hasLedger:
      input.ledger !==
      null,

    hasPreviousBehaviorProfile:
      input.previousBehaviorProfile !==
        null &&
      input.previousBehaviorProfile !==
        undefined,

    availableMinutes:
      input.contextConfiguration
        ?.availableMinutes ??
      null,
  };
}


export async function runAtlasBrainDecisionPipeline(
  input:
    AtlasBrainDecisionPipelineInput
): Promise<
  AtlasBrainDecisionPipelineResult
> {
  const generatedAt =
    resolveTimestamp(
      input.generatedAt
    );

  const source =
    resolveSource(
      input.source
    );

  const candidates =
    buildAtlasRecommendationCandidates({
      brain:
        input.brain,

      generatedAt,

      maximumCandidates:
        input.candidateConfiguration
          ?.maximumCandidates,

      minimumBaseScore:
        input.candidateConfiguration
          ?.minimumBaseScore,

      includeCompleted:
        input.candidateConfiguration
          ?.includeCompleted ??
        false,
    });

  const metadata =
    buildWrapperMetadata(
      input,
      generatedAt,
      source,
      candidates
    );

  const decisionContext =
    buildAtlasDecisionContext({
      profile:
        input.profile,

      empire:
        input.empire,

      candidates,

      brain:
        input.brain,

      availableMinutes:
        input.contextConfiguration
          ?.availableMinutes,

      generatedAt,

      metadata: {
        ...metadata,

        stage:
          "decision-context",
      },
    });

  const pipeline =
    await runAtlasDecisionPipeline({
      ledger:
        input.ledger,

      previousBehaviorProfile:
        input.previousBehaviorProfile ??
        null,

      candidates,

      decisionContext,

      configuration:
        input.pipelineConfiguration,

      generatedAt,

      source,

      metadata: {
        ...metadata,

        stage:
          "decision-pipeline",
      },
    });

  return {
    version:
      ATLAS_BRAIN_DECISION_PIPELINE_VERSION,

    generatedAt,

    source,

    candidates,

    decisionContext,

    pipeline,

    metadata,
  };
}


export function getAtlasBrainPipelineDecision(
  result:
    AtlasBrainDecisionPipelineResult | null
) {
  if (
    !result ||
    result.pipeline.status ===
      "failed"
  ) {
    return null;
  }

  return result.pipeline.decision;
}


export function getAtlasBrainPipelinePrimaryRecommendation(
  result:
    AtlasBrainDecisionPipelineResult | null
) {
  return (
    getAtlasBrainPipelineDecision(
      result
    )
      ?.primaryRecommendation ??
    null
  );
}


export function isAtlasBrainDecisionPipelineSuccessful(
  result:
    AtlasBrainDecisionPipelineResult | null
): boolean {
  return (
    result !==
      null &&
    result.pipeline.status !==
      "failed"
  );
}