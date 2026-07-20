"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useAtlasBrainPipeline,
} from "@/app/hooks/useAtlasBrainPipeline";

import {
  useAtlasIntelligence,
} from "@/app/hooks/useAtlasIntelligence";

import {
  useDashboard,
} from "@/app/hooks/useDashboard";

import {
  buildDashboardComposer,
} from "@/app/intelligence/dashboard-composer.engine";

import {
  buildAtlasIntent,
} from "@/app/intelligence/atlas-intent.engine";

import type {
  AtlasDecision,
  AtlasDecisionRecommendationReference,
  AtlasIntentEngineResult,
} from "@/app/intelligence";

import AtlasCopilot, {
  type AtlasCopilotStatusModel,
} from "./AtlasCopilot";

import type {
  AtlasCopilotMessageIntentModel,
  AtlasCopilotMessageModel,
} from "./AtlasCopilotMessage";


type PendingCopilotResponse = {
  id:
    string;

  intent:
    AtlasIntentEngineResult;

  hasObservedLoading:
    boolean;
};


const INITIAL_MESSAGES:
  AtlasCopilotMessageModel[] =
  [
    {
      id:
        "atlas-welcome",

      role:
        "atlas",

      content:
        "Atlas Copilot is online. I can evaluate your current empire position, surface the strongest strategic move, and explain what Atlas recommends next.",
    },
  ];


function createMessageId(
  prefix:
    string
): string {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}


function formatPercentage(
  value:
    number
): string {
  const normalizedValue =
    value <= 1
      ? value * 100
      : value;

  return `${Math.round(
    normalizedValue
  )}%`;
}


function formatRecommendation(
  recommendation:
    AtlasDecisionRecommendationReference
): string {
  return [
    recommendation.title,
    recommendation.explanation,
    `Priority: ${recommendation.priority}`,
    `Confidence: ${formatPercentage(
      recommendation.confidence
    )}`,
  ].join("\n");
}


function buildDecisionResponse(
  decision:
    AtlasDecision
): string {
  const sections:
    string[] =
    [
      decision.headline,
      decision.summary,
    ];

  if (
    decision.primaryRecommendation
  ) {
    sections.push(
      [
        "Primary Recommendation",
        formatRecommendation(
          decision.primaryRecommendation
        ),
      ].join("\n")
    );
  }

  if (
    decision.rationale
  ) {
    sections.push(
      [
        "Strategic Rationale",
        decision.rationale,
      ].join("\n")
    );
  }

  if (
    decision.immediateNextStep
  ) {
    sections.push(
      [
        "Immediate Next Step",
        decision.immediateNextStep,
      ].join("\n")
    );
  }

  if (
    decision.longTermDirection
  ) {
    sections.push(
      [
        "Long-Term Direction",
        decision.longTermDirection,
      ].join("\n")
    );
  }

  sections.push(
    [
      `Urgency: ${decision.urgency}`,
      `Confidence: ${formatPercentage(
        decision.confidence
      )}`,
    ].join("\n")
  );

  return sections
    .filter(Boolean)
    .join("\n\n");
}


function buildMessageIntent(
  intent:
    AtlasIntentEngineResult
): AtlasCopilotMessageIntentModel {
  return {
    type:
      intent.classification.primary.intent,

    domain:
      intent.classification.primary.domain,

    title:
      intent.route.title,

    strategy:
      intent.route.strategy,

    confidence:
      intent.classification.primary.confidence,

    confidenceLevel:
      intent.classification.primary.confidenceLevel,

    ambiguous:
      intent.classification.ambiguous,
  };
}


function buildResponseMessage(
  intent:
    AtlasIntentEngineResult,

  brainPipeline:
    ReturnType<
      typeof useAtlasBrainPipeline
    >
): AtlasCopilotMessageModel {
  const messageIntent =
    buildMessageIntent(
      intent
    );

  if (
    brainPipeline.error
  ) {
    return {
      id:
        createMessageId(
          "system"
        ),

      role:
        "system",

      label:
        "Pipeline Error",

      content:
        brainPipeline.error,

      intent:
        messageIntent,
    };
  }

  if (
    brainPipeline.decision
  ) {
    return {
      id:
        createMessageId(
          "atlas"
        ),

      role:
        "atlas",

      label:
        intent.route.title,

      content:
        buildDecisionResponse(
          brainPipeline.decision
        ),

      intent:
        messageIntent,
    };
  }

  return {
    id:
      createMessageId(
        "system"
      ),

    role:
      "system",

    label:
      "Intelligence Unavailable",

    content:
      "Atlas could not produce a completed strategic decision for this request.",

    intent:
      messageIntent,
  };
}


function resolveStatusModel(
  status:
    ReturnType<
      typeof useAtlasBrainPipeline
    >["status"]
): AtlasCopilotStatusModel {
  switch (
    status
  ) {
    case "waiting":
      return {
        label:
          "Waiting for Memory",

        tone:
          "waiting",
      };

    case "loading":
      return {
        label:
          "Loading Intelligence",

        tone:
          "loading",
      };

    case "warning":
      return {
        label:
          "Ready with Warnings",

        tone:
          "warning",
      };

    case "failed":
      return {
        label:
          "Pipeline Error",

        tone:
          "error",
      };

    case "success":
      return {
        label:
          "Brain Online",

        tone:
          "ready",
      };

    case "idle":
    default:
      return {
        label:
          "Initializing",

        tone:
          "waiting",
      };
  }
}


export default function AtlasCopilotController() {
  const dashboard =
    useDashboard();

  const {
    decisions,
    actions,
    outcomes,
    validations,
    hydrated,
  } =
    useAtlasIntelligence();

  const [
    messages,
    setMessages,
  ] =
    useState<
      AtlasCopilotMessageModel[]
    >(
      INITIAL_MESSAGES
    );

  const [
    activeIntent,
    setActiveIntent,
  ] =
    useState<
      AtlasIntentEngineResult | null
    >(
      null
    );

  const [
    pendingResponse,
    setPendingResponse,
  ] =
    useState<
      PendingCopilotResponse | null
    >(
      null
    );


  const dashboardIntelligence =
    useMemo(
      () =>
        buildDashboardComposer({
          profile:
            dashboard.profile,

          empire:
            dashboard.empire,

          history: {
            decisions,

            actions,

            outcomes,

            validations,
          },
        }),
      [
        dashboard.profile,
        dashboard.empire,
        decisions,
        actions,
        outcomes,
        validations,
      ]
    );


  const intentMetadata =
    useMemo<
      Record<
        string,
        unknown
      > | undefined
    >(
      () => {
        if (
          !activeIntent
        ) {
          return undefined;
        }

        return {
          atlasIntent:
            activeIntent.classification
              .primary.intent,

          atlasIntentDomain:
            activeIntent.classification
              .primary.domain,

          atlasIntentStrategy:
            activeIntent.route.strategy,

          atlasIntentTitle:
            activeIntent.route.title,

          atlasIntentConfidence:
            activeIntent.classification
              .primary.confidence,

          atlasIntentConfidenceLevel:
            activeIntent.classification
              .primary.confidenceLevel,

          atlasIntentAmbiguous:
            activeIntent.classification
              .ambiguous,

          atlasIntentStrategicObjective:
            activeIntent.route
              .strategicObjective,

          atlasIntentResponseSections:
            activeIntent.route
              .responseSections,

          atlasPrompt:
            activeIntent.classification
              .prompt,

          atlasNormalizedPrompt:
            activeIntent.classification
              .normalizedPrompt,

          atlasIntentGeneratedAt:
            activeIntent.generatedAt,
        };
      },
      [
        activeIntent,
      ]
    );


  const brainPipeline =
    useAtlasBrainPipeline({
      brain:
        dashboardIntelligence.brain,

      profile:
        dashboard.profile,

      empire:
        dashboard.empire,

      hydrated,

      source:
        "copilot",

      metadata:
        intentMetadata,
    });


  const statusModel =
    resolveStatusModel(
      brainPipeline.status
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

      setPendingResponse(
        null
      );
    },
    [
      pendingResponse,
      brainPipeline.loading,
      brainPipeline.error,
      brainPipeline.decision,
    ]
  );


  function submitPrompt(
    prompt:
      string
  ): void {
    const normalizedPrompt =
      prompt.trim();

    if (
      normalizedPrompt.length ===
      0
    ) {
      return;
    }

    if (
      pendingResponse ||
      brainPipeline.loading
    ) {
      const busyMessage:
        AtlasCopilotMessageModel =
        {
          id:
            createMessageId(
              "system"
            ),

          role:
            "system",

          label:
            "Atlas Brain",

          content:
            "Atlas is already processing a strategic request. Wait for the current analysis to finish before submitting another command.",
        };

      setMessages(
        (
          currentMessages
        ) => [
          ...currentMessages,
          busyMessage,
        ]
      );

      return;
    }

    const intent =
      buildAtlasIntent({
        prompt:
          normalizedPrompt,
      });

    const messageIntent =
      buildMessageIntent(
        intent
      );

    const playerMessage:
      AtlasCopilotMessageModel =
      {
        id:
          createMessageId(
            "player"
          ),

        role:
          "player",

        content:
          normalizedPrompt,

        intent:
          messageIntent,
      };

    setMessages(
      (
        currentMessages
      ) => [
        ...currentMessages,
        playerMessage,
      ]
    );

    setActiveIntent(
      intent
    );

    setPendingResponse({
      id:
        createMessageId(
          "request"
        ),

      intent,

      hasObservedLoading:
        false,
    });
  }


  return (
    <AtlasCopilot
      messages={
        messages
      }

      status={
        statusModel
      }

      loading={
        brainPipeline.loading
      }

      onSubmit={
        submitPrompt
      }
    />
  );
}