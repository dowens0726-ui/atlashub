"use client";

import AtlasSurface from "@/app/components/design-system/AtlasSurface";

import type {
  AtlasCopilotAction,
  AtlasCopilotSession,
  AtlasRecommendationWeight,
} from "@/app/intelligence";

import AtlasBriefingHero, {
  type AtlasBriefingHeroProps,
} from "./AtlasBriefingHero";

import AtlasCopilotMessage, {
  type AtlasCopilotMessageModel,
} from "./AtlasCopilotMessage";

import AtlasCopilotPrompt from "./AtlasCopilotPrompt";

import AtlasCopilotQuickActions from "./AtlasCopilotQuickActions";

import AtlasCopilotTimeline from "./AtlasCopilotTimeline";

import RecommendationWeightCard from "./RecommendationWeightCard";


export type AtlasCopilotStatusTone =
  | "waiting"
  | "loading"
  | "ready"
  | "warning"
  | "error";


export type AtlasCopilotStatusModel = {
  label:
    string;

  tone:
    AtlasCopilotStatusTone;
};


type AtlasCopilotProps = {
  messages:
    AtlasCopilotMessageModel[];

  session:
    AtlasCopilotSession | null;

  sessionReady:
    boolean;

  status:
    AtlasCopilotStatusModel;

  briefing:
    AtlasBriefingHeroProps;

  recommendationWeight:
    AtlasRecommendationWeight;

  actions:
    AtlasCopilotAction[];

  loading:
    boolean;

  onSubmit:
    (
      prompt:
        string
    ) => void;
};


export default function AtlasCopilot({
  messages,
  session,
  sessionReady,
  status,
  briefing,
  recommendationWeight,
  actions,
  loading,
  onSubmit,
}: AtlasCopilotProps) {
  function handleQuickAction(
    action:
      AtlasCopilotAction
  ): void {
    onSubmit(
      action.prompt
    );
  }


  return (
    <div className="space-y-6">
      <AtlasBriefingHero
        {...briefing}
      />

      <RecommendationWeightCard
        weight={
          recommendationWeight
        }
      />

      <AtlasCopilotTimeline
        session={
          session
        }

        isReady={
          sessionReady
        }
      />

      <AtlasSurface
        tone="subtle"
        className="p-5 sm:p-6"
      >
        <AtlasCopilotQuickActions
          actions={
            actions
          }

          onSelect={
            handleQuickAction
          }

          disabled={
            loading
          }
        />
      </AtlasSurface>

      <section
        aria-labelledby="atlas-copilot-conversation-heading"
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/20"
      >
        <header className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.025] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Active Session
            </p>

            <h2
              id="atlas-copilot-conversation-heading"
              className="mt-2 text-xl font-black text-white"
            >
              Strategic Conversation
            </h2>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-zinc-600">
              {messages.length} messages
            </p>

            <p className="mt-1 text-xs font-semibold text-zinc-500">
              {status.label}
            </p>
          </div>
        </header>

        <div className="max-h-[560px] min-h-[420px] space-y-5 overflow-y-auto px-5 py-6 sm:px-6">
          {messages.map(
            (
              message
            ) => (
              <AtlasCopilotMessage
                key={
                  message.id
                }

                message={
                  message
                }
              />
            )
          )}
        </div>

        <div className="border-t border-white/10 bg-black/30 p-4 sm:p-5">
          <AtlasCopilotPrompt
            onSubmit={
              onSubmit
            }
          />
        </div>
      </section>
    </div>
  );
}