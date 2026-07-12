"use client";

import { useMemo, useState } from "react";

import Button from "@/app/components/ui/Button";

import type {
  AtlasDecisionHistoryItem,
  AtlasPlayerAction,
  AtlasRecommendation,
} from "@/app/intelligence";

import {
  abandonAtlasAction,
  acceptAtlasRecommendation,
  completeAtlasAction,
  startAtlasDecision,
} from "@/app/services";

import { useAtlasIntelligence } from "@/app/hooks/useAtlasIntelligence";


type AtlasDecisionControlsProps = {
  recommendation: AtlasRecommendation;
};


type DecisionMessage = {
  type: "success" | "error";
  text: string;
};


function getLatestAction(
  recommendationId: string,
  decisions: AtlasDecisionHistoryItem[],
  actions: AtlasPlayerAction[]
): AtlasPlayerAction | null {
  const relatedDecisionIds = new Set(
    decisions
      .filter(
        (decision) =>
          decision.recommendationId === recommendationId
      )
      .map((decision) => decision.id)
  );

  return (
    actions.find((action) =>
      relatedDecisionIds.has(action.decisionId)
    ) ?? null
  );
}


export default function AtlasDecisionControls({
  recommendation,
}: AtlasDecisionControlsProps) {
  const {
    decisions,
    actions,
    hydrated,
  } = useAtlasIntelligence();

  const [message, setMessage] =
    useState<DecisionMessage | null>(null);


  const activeAction = useMemo(
    () =>
      getLatestAction(
        recommendation.id,
        decisions,
        actions
      ),
    [
      recommendation.id,
      decisions,
      actions,
    ]
  );


  function handleStartStrategy() {
    setMessage(null);

    const decision =
      acceptAtlasRecommendation(recommendation);

    const result =
      startAtlasDecision(decision.id);

    if (!result.ok) {
      setMessage({
        type: "error",
        text: result.message,
      });

      return;
    }

    setMessage({
      type: "success",
      text: "Atlas is now tracking this strategy.",
    });
  }


  function handleCompleteAction() {
    if (!activeAction) {
      return;
    }

    setMessage(null);

    const result =
      completeAtlasAction(activeAction.id);

    if (!result.ok) {
      setMessage({
        type: "error",
        text: result.message,
      });

      return;
    }

    setMessage({
      type: "success",
      text:
        "Strategy marked complete. Atlas can now evaluate the result.",
    });
  }


  function handleAbandonAction() {
    if (!activeAction) {
      return;
    }

    setMessage(null);

    const result =
      abandonAtlasAction(activeAction.id);

    if (!result.ok) {
      setMessage({
        type: "error",
        text: result.message,
      });

      return;
    }

    setMessage({
      type: "success",
      text:
        "Strategy abandoned. Atlas will keep this decision in your history.",
    });
  }


  if (!hydrated) {
    return (
      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-sm text-zinc-400">
          Loading Atlas decision history...
        </p>
      </div>
    );
  }


  const actionIsStarted =
    activeAction?.status === "started";

  const actionIsCompleted =
    activeAction?.status === "completed";

  const actionIsAbandoned =
    activeAction?.status === "abandoned";


  return (
    <div className="mt-6 rounded-2xl border border-violet-400/20 bg-violet-400/[0.04] p-5">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-400">
        Strategy Tracking
      </p>


      {!activeAction ? (
        <>
          <h3 className="mt-3 text-xl font-black text-white">
            Ready to follow this strategy?
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Start this recommendation to let Atlas track your progress and
            improve future advice using your real decisions.
          </p>

          <div className="mt-5">
            <Button onClick={handleStartStrategy}>
              Start Strategy
            </Button>
          </div>
        </>
      ) : null}


      {actionIsStarted ? (
        <>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-400">
              In Progress
            </span>

            <span className="text-sm text-zinc-400">
              Started{" "}
              {new Date(
                activeAction.startedAt
              ).toLocaleString()}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-black text-white">
            Atlas is tracking this strategy
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Update the action when you complete it or decide not to continue.
            Atlas will only learn from results you confirm.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={handleCompleteAction}>
              Mark Complete
            </Button>

            <Button
              variant="secondary"
              onClick={handleAbandonAction}
            >
              Abandon Strategy
            </Button>
          </div>
        </>
      ) : null}


      {actionIsCompleted ? (
        <>
          <div className="mt-3">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-400">
              Completed
            </span>
          </div>

          <h3 className="mt-4 text-xl font-black text-white">
            Strategy completed
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            This action is ready for outcome reporting and validation.
          </p>

          <div className="mt-5">
            <Button
              variant="secondary"
              onClick={handleStartStrategy}
            >
              Start Strategy Again
            </Button>
          </div>
        </>
      ) : null}


      {actionIsAbandoned ? (
        <>
          <div className="mt-3">
            <span className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-red-400">
              Abandoned
            </span>
          </div>

          <h3 className="mt-4 text-xl font-black text-white">
            Strategy ended
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Atlas preserved this decision but will not treat it as a completed
            result.
          </p>

          <div className="mt-5">
            <Button
              variant="secondary"
              onClick={handleStartStrategy}
            >
              Try Strategy Again
            </Button>
          </div>
        </>
      ) : null}


      {message ? (
        <p
          aria-live="polite"
          className={`mt-5 text-sm font-semibold ${
            message.type === "success"
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {message.text}
        </p>
      ) : null}
    </div>
  );
}