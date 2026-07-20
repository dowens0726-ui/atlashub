"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useAtlasBrainPipeline,
} from "@/app/hooks/useAtlasBrainPipeline";

import type {
  AtlasIntentEngineResult,
} from "@/app/intelligence";

import type {
  AddAtlasCopilotSessionEntryInput,
} from "@/app/hooks/useAtlasCopilotSession";

import type {
  AtlasCopilotMessageModel,
} from "@/app/components/copilot/AtlasCopilotMessage";

import type {
  Dispatch,
  SetStateAction,
} from "react";


export type PendingCopilotResponse = {
  id:
    string;

  intent:
    AtlasIntentEngineResult;

  hasObservedLoading:
    boolean;
};


type AtlasBrainPipelineResult =
  ReturnType<
    typeof useAtlasBrainPipeline
  >;


type BuildResponseMessage =
  (
    intent:
      AtlasIntentEngineResult,

    brainPipeline:
      AtlasBrainPipelineResult
  ) =>
    AtlasCopilotMessageModel;


type AddSessionEntry =
  (
    input:
      AddAtlasCopilotSessionEntryInput
  ) =>
    void;


export type UseAtlasCopilotResponseLifecycleInput = {
  brainPipeline:
    AtlasBrainPipelineResult;

  setMessages:
    Dispatch<
      SetStateAction<
        AtlasCopilotMessageModel[]
      >
    >;

  buildResponseMessage:
    BuildResponseMessage;

  addAtlasEntry:
    AddSessionEntry;

  addSystemEntry:
    AddSessionEntry;
};


export type UseAtlasCopilotResponseLifecycleResult = {
  pendingResponse:
    PendingCopilotResponse | null;

  setPendingResponse:
    Dispatch<
      SetStateAction<
        PendingCopilotResponse | null
      >
    >;

  responsePending:
    boolean;
};


export function useAtlasCopilotResponseLifecycle({
  brainPipeline,
  setMessages,
  buildResponseMessage,
  addAtlasEntry,
  addSystemEntry,
}: UseAtlasCopilotResponseLifecycleInput):
  UseAtlasCopilotResponseLifecycleResult {
  const [
    pendingResponse,
    setPendingResponse,
  ] =
    useState<
      PendingCopilotResponse | null
    >(
      null
    );


  useEffect(
    () => {
      if (
        !pendingResponse
      ) {
        return;
      }


      if (
        brainPipeline.loading
      ) {
        if (
          !pendingResponse
            .hasObservedLoading
        ) {
          setPendingResponse(
            (
              currentResponse
            ) => {
              if (
                !currentResponse ||
                currentResponse.id !==
                  pendingResponse.id
              ) {
                return currentResponse;
              }

              return {
                ...currentResponse,

                hasObservedLoading:
                  true,
              };
            }
          );
        }

        return;
      }


      if (
        !pendingResponse
          .hasObservedLoading
      ) {
        return;
      }


      const responseMessage =
        buildResponseMessage(
          pendingResponse.intent,
          brainPipeline
        );


      setMessages(
        (
          currentMessages
        ) => [
          ...currentMessages,
          responseMessage,
        ]
      );


      const responseIntent =
        pendingResponse.intent
          .classification
          .primary
          .intent;


      if (
        responseMessage.role ===
        "atlas"
      ) {
        const decision =
          brainPipeline.decision;

        const recommendation =
          decision
            ?.primaryRecommendation;

        addAtlasEntry({
          id:
            responseMessage.id,

          content:
            responseMessage.content,

          intent:
            responseIntent,

          recommendationTitle:
            recommendation
              ?.title ??
            decision
              ?.headline,

          recommendationConfidence:
            recommendation
              ?.confidence ??
            decision
              ?.confidence,
        });
      } else {
        addSystemEntry({
          id:
            responseMessage.id,

          content:
            responseMessage.content,

          intent:
            responseIntent,
        });
      }


      setPendingResponse(
        null
      );
    },
    [
      pendingResponse,
      brainPipeline,
      setMessages,
      buildResponseMessage,
      addAtlasEntry,
      addSystemEntry,
    ]
  );


  return {
    pendingResponse,

    setPendingResponse,

    responsePending:
      pendingResponse !==
      null,
  };
}


export default useAtlasCopilotResponseLifecycle;