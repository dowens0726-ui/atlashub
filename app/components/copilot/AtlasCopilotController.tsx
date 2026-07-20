"use client";

import {
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

import type {
  AtlasDecision,
  AtlasDecisionRecommendationReference,
} from "@/app/intelligence";

import AtlasCopilot, {
  type AtlasCopilotStatusModel,
} from "./AtlasCopilot";

import type {
  AtlasCopilotMessageModel,
} from "./AtlasCopilotMessage";


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
    });


  const statusModel =
    resolveStatusModel(
      brainPipeline.status
    );


  function submitPrompt(
    prompt:
      string
  ): void {
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
          prompt,
      };

    let responseMessage:
      AtlasCopilotMessageModel;

    if (
      brainPipeline.loading
    ) {
      responseMessage =
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
            "Atlas is still processing your current empire state. Try the command again once the Brain status shows online.",
        };
    } else if (
      brainPipeline.error
    ) {
      responseMessage =
        {
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
        };
    } else if (
      brainPipeline.decision
    ) {
      responseMessage =
        {
          id:
            createMessageId(
              "atlas"
            ),

          role:
            "atlas",

          label:
            "Atlas Strategic Response",

          content:
            buildDecisionResponse(
              brainPipeline.decision
            ),
        };
    } else {
      responseMessage =
        {
          id:
            createMessageId(
              "system"
            ),

          role:
            "system",

          label:
            "Intelligence Unavailable",

          content:
            "Atlas does not yet have a completed strategic decision for the current empire state.",
        };
    }

    setMessages(
      (
        currentMessages
      ) => [
        ...currentMessages,
        playerMessage,
        responseMessage,
      ]
    );
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
