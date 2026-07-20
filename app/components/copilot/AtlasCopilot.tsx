"use client";

import AtlasSurface from "@/app/components/design-system/AtlasSurface";

import AtlasCopilotMessage, {
  type AtlasCopilotMessageModel,
} from "./AtlasCopilotMessage";

import AtlasCopilotPrompt from "./AtlasCopilotPrompt";

import AtlasCopilotQuickActions, {
  type AtlasCopilotQuickAction,
} from "./AtlasCopilotQuickActions";


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

  status:
    AtlasCopilotStatusModel;

  loading:
    boolean;

  onSubmit:
    (
      prompt:
        string
    ) => void;
};


const QUICK_ACTIONS:
  AtlasCopilotQuickAction[] =
  [
    {
      id:
        "make-money",

      label:
        "Make Money",

      prompt:
        "What is the fastest way for me to make money right now?",

      description:
        "Find the highest-value activity available for your current position.",
    },

    {
      id:
        "expand-empire",

      label:
        "Expand Empire",

      prompt:
        "What should I invest in next to expand my empire?",

      description:
        "Compare your next business, property, and progression opportunities.",
    },

    {
      id:
        "plan-session",

      label:
        "Plan Session",

      prompt:
        "Plan my next 45-minute session.",

      description:
        "Build an efficient sequence of objectives for your available time.",
    },

    {
      id:
        "vehicle-purchase",

      label:
        "Buy a Vehicle",

      prompt:
        "Which vehicle should I purchase next and why?",

      description:
        "Balance performance, utility, progression, and available cash.",
    },

    {
      id:
        "find-bottleneck",

      label:
        "Find Bottleneck",

      prompt:
        "What is currently slowing down my empire progression?",

      description:
        "Identify the largest weakness limiting your next stage of growth.",
    },

    {
      id:
        "compare-investments",

      label:
        "Compare Investments",

      prompt:
        "Should I buy a business, property, or vehicle next?",

      description:
        "Compare competing purchases using Atlas strategic priorities.",
    },
  ];


function getStatusStyles(
  tone:
    AtlasCopilotStatusTone
): string {
  switch (
    tone
  ) {
    case "ready":
      return "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-100";

    case "warning":
      return "border-amber-400/20 bg-amber-400/[0.07] text-amber-100";

    case "error":
      return "border-red-400/20 bg-red-400/[0.07] text-red-100";

    case "loading":
      return "border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-100";

    case "waiting":
    default:
      return "border-white/10 bg-white/[0.04] text-zinc-200";
  }
}


export default function AtlasCopilot({
  messages,
  status,
  loading,
  onSubmit,
}: AtlasCopilotProps) {
  function handleQuickAction(
    action:
      AtlasCopilotQuickAction
  ): void {
    onSubmit(
      action.prompt
    );
  }


  const statusStyles =
    getStatusStyles(
      status.tone
    );


  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 shadow-2xl shadow-cyan-950/10 sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-blue-500/[0.07] blur-3xl"
        />

        <div className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]"
                />

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  Atlas Intelligence
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Atlas Copilot
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
                Your strategic command interface for planning, progression, investments, and empire decisions.
              </p>
            </div>

            <div
              className={[
                "inline-flex w-fit items-center gap-3 rounded-2xl border px-4 py-3",
                statusStyles,
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className={[
                  "h-2 w-2 rounded-full",
                  loading
                    ? "animate-pulse bg-cyan-300"
                    : "bg-current",
                ].join(" ")}
              />

              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] opacity-60">
                  Brain Status
                </p>

                <p className="mt-1 text-sm font-bold">
                  {status.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AtlasSurface
        tone="subtle"
        className="p-5 sm:p-6"
      >
        <AtlasCopilotQuickActions
          actions={
            QUICK_ACTIONS
          }

          onSelect={
            handleQuickAction
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

          <p className="text-xs font-medium text-zinc-600">
            {messages.length} messages
          </p>
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
