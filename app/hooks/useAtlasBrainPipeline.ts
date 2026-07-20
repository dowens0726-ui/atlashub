"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  AtlasBrainModel,
  AtlasDecision,
  AtlasPersistentBehaviorProfile,
} from "@/app/intelligence";

import {
  loadAtlasMemoryLedger,
} from "@/app/intelligence/atlas-memory-storage.adapter";

import {
  getAtlasBrainPipelineDecision,
  getAtlasBrainPipelinePrimaryRecommendation,
  runAtlasBrainDecisionPipeline,
  type AtlasBrainCandidateConfiguration,
  type AtlasBrainDecisionContextConfiguration,
  type AtlasBrainDecisionPipelineResult,
} from "@/app/services/atlas-brain-decision-pipeline.service";

import type {
  AtlasDecisionPipelineConfiguration,
  AtlasDecisionPipelineSource,
} from "@/app/services/atlas-decision-pipeline.service";

import type {
  EmpireModel,
  PlayerProfile,
} from "@/app/types";


export type UseAtlasBrainPipelineInput = {
  brain:
    AtlasBrainModel;

  profile:
    PlayerProfile;

  empire:
    EmpireModel;

  hydrated:
    boolean;

  enabled?:
    boolean;

  source?:
    AtlasDecisionPipelineSource | string;

  candidateConfiguration?:
    AtlasBrainCandidateConfiguration;

  contextConfiguration?:
    AtlasBrainDecisionContextConfiguration;

  pipelineConfiguration?:
    AtlasDecisionPipelineConfiguration;

  metadata?:
    Record<string, unknown>;
};


export type AtlasBrainPipelineHookStatus =
  | "idle"
  | "waiting"
  | "loading"
  | "success"
  | "warning"
  | "failed";


export type UseAtlasBrainPipelineResult = {
  status:
    AtlasBrainPipelineHookStatus;

  loading:
    boolean;

  ready:
    boolean;

  successful:
    boolean;

  result:
    AtlasBrainDecisionPipelineResult | null;

  decision:
    AtlasDecision | null;

  primaryRecommendation:
    ReturnType<
      typeof getAtlasBrainPipelinePrimaryRecommendation
    >;

  behaviorProfile:
    AtlasPersistentBehaviorProfile | null;

  error:
    string | null;

  refresh:
    () => void;
};


function getErrorMessage(
  error:
    unknown
): string {
  if (
    error instanceof Error
  ) {
    return error.message;
  }

  return "Atlas could not complete the brain decision pipeline.";
}


function getResultError(
  result:
    AtlasBrainDecisionPipelineResult
): string | null {
  if (
    result.pipeline.status !==
    "failed"
  ) {
    return null;
  }

  return result.pipeline.error.message;
}


function resolveStatus(
  result:
    AtlasBrainDecisionPipelineResult
): AtlasBrainPipelineHookStatus {
  if (
    result.pipeline.status ===
    "failed"
  ) {
    return "failed";
  }

  if (
    result.pipeline.status ===
      "completed-with-warnings" ||
    result.pipeline.warnings.length >
      0
  ) {
    return "warning";
  }

  return "success";
}


export function useAtlasBrainPipeline({
  brain,
  profile,
  empire,
  hydrated,
  enabled = true,
  source = "unknown",
  candidateConfiguration,
  contextConfiguration,
  pipelineConfiguration,
  metadata,
}: UseAtlasBrainPipelineInput): UseAtlasBrainPipelineResult {
  const [
    result,
    setResult,
  ] =
    useState<
      AtlasBrainDecisionPipelineResult | null
    >(null);

  const [
    status,
    setStatus,
  ] =
    useState<
      AtlasBrainPipelineHookStatus
    >(
      hydrated
        ? "idle"
        : "waiting"
    );

  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);

  const [
    refreshVersion,
    setRefreshVersion,
  ] =
    useState(0);

  const requestIdRef =
    useRef(0);

  const previousBehaviorProfileRef =
    useRef<
      AtlasPersistentBehaviorProfile | null
    >(null);


  useEffect(
    () => {
      if (
        !enabled
      ) {
        requestIdRef.current +=
          1;

        setStatus(
          "idle"
        );

        setError(
          null
        );

        return;
      }

      if (
        !hydrated
      ) {
        requestIdRef.current +=
          1;

        setStatus(
          "waiting"
        );

        return;
      }

      const requestId =
        requestIdRef.current +
        1;

      requestIdRef.current =
        requestId;

      let active =
        true;


      async function executePipeline():
        Promise<void> {
        setStatus(
          "loading"
        );

        setError(
          null
        );

        try {
          const ledgerLoad =
            loadAtlasMemoryLedger();

          const pipelineResult =
            await runAtlasBrainDecisionPipeline({
              brain,

              profile,

              empire,

              ledger:
                ledgerLoad.ledger,

              previousBehaviorProfile:
                previousBehaviorProfileRef
                  .current,

              candidateConfiguration,

              contextConfiguration,

              pipelineConfiguration,

              source,

              metadata: {
                memoryLoadStatus:
                  ledgerLoad.status,

                memoryRecovered:
                  ledgerLoad.recovered,

                memoryLoadError:
                  ledgerLoad.error,

                ...metadata,
              },
            });

          if (
            !active ||
            requestIdRef.current !==
              requestId
          ) {
            return;
          }

          if (
            pipelineResult.pipeline
              .status !==
            "failed"
          ) {
            previousBehaviorProfileRef
              .current =
              pipelineResult.pipeline
                .behaviorProfile;

            setResult(
              pipelineResult
            );
          } else {
            /*
             * Preserve the last successful result during a failed
             * refresh so the interface does not discard valid Atlas
             * intelligence because of a transient execution failure.
             */
            setResult(
              (
                currentResult
              ) =>
                currentResult ??
                pipelineResult
            );
          }

          setStatus(
            resolveStatus(
              pipelineResult
            )
          );

          setError(
            getResultError(
              pipelineResult
            )
          );
        } catch (
          pipelineError
        ) {
          if (
            !active ||
            requestIdRef.current !==
              requestId
          ) {
            return;
          }

          setStatus(
            "failed"
          );

          setError(
            getErrorMessage(
              pipelineError
            )
          );
        }
      }


      void executePipeline();


      return () => {
        active =
          false;
      };
    },
    [
      brain,
      profile,
      empire,
      hydrated,
      enabled,
      source,
      candidateConfiguration,
      contextConfiguration,
      pipelineConfiguration,
      metadata,
      refreshVersion,
    ]
  );


  const decision =
    getAtlasBrainPipelineDecision(
      result
    );

  const primaryRecommendation =
    getAtlasBrainPipelinePrimaryRecommendation(
      result
    );

  const successful =
    result !==
      null &&
    result.pipeline.status !==
      "failed";

  return {
    status,

    loading:
      status ===
      "loading",

    ready:
      status !==
        "waiting" &&
      status !==
        "idle",

    successful,

    result,

    decision,

    primaryRecommendation,

    behaviorProfile:
      successful
        ? result.pipeline
            .behaviorProfile
        : previousBehaviorProfileRef
            .current,

    error,

    refresh: () => {
      setRefreshVersion(
        (
          currentVersion
        ) =>
          currentVersion +
          1
      );
    },
  };
}