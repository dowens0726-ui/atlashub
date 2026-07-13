import type {
  AtlasPlayerAction,
} from "./action-tracker.engine";

import type {
  AtlasDecisionHistoryItem,
} from "./decision-history.engine";

import type {
  AtlasOutcome,
} from "./outcome.engine";

import type {
  AtlasValidatedOutcome,
} from "./outcome-validation.engine";


export type AtlasIntelligenceTimelineEventType =
  | "decision"
  | "action-started"
  | "action-completed"
  | "action-abandoned"
  | "outcome"
  | "validation";


export type AtlasIntelligenceTimelineTone =
  | "cyan"
  | "emerald"
  | "amber"
  | "red"
  | "violet";


export type AtlasIntelligenceTimelineEvent = {
  id: string;

  type:
    AtlasIntelligenceTimelineEventType;

  title: string;

  description: string;

  timestamp: string;

  timestampValue: number;

  tone:
    AtlasIntelligenceTimelineTone;

  decisionId?: string;

  actionId?: string;

  outcomeId?: string;

  validationId?: string;

  metric?: {
    label: string;

    value: string;
  };
};


export type AtlasIntelligenceTimeline = {
  title: string;

  summary: string;

  events:
    AtlasIntelligenceTimelineEvent[];

  totalEvents: number;

  latestEvent:
    AtlasIntelligenceTimelineEvent | null;

  confidence: number;
};


export type AtlasIntelligenceTimelineInput = {
  decisions:
    AtlasDecisionHistoryItem[];

  actions:
    AtlasPlayerAction[];

  outcomes:
    AtlasOutcome[];

  validations:
    AtlasValidatedOutcome[];
};


function parseTimestamp(
  value?: string
): number {
  if (!value) {
    return 0;
  }

  const parsedValue =
    Date.parse(value);

  return Number.isFinite(
    parsedValue
  )
    ? parsedValue
    : 0;
}


function getDecisionTimestamp(
  decision: AtlasDecisionHistoryItem
): number {
  return parseTimestamp(
    decision.timestamp
  );
}


function getActionTimestamp(
  action: AtlasPlayerAction
): number {
  return parseTimestamp(
    action.completedAt ??
      action.startedAt
  );
}


function getOutcomeTimestamp(
  outcome: AtlasOutcome,
  action?: AtlasPlayerAction
): number {
  return parseTimestamp(
    outcome.reportedAt ??
      action?.completedAt ??
      action?.startedAt
  );
}


function getValidationTimestamp(
  validation: AtlasValidatedOutcome,
  outcome?: AtlasOutcome,
  action?: AtlasPlayerAction
): number {
  return parseTimestamp(
    outcome?.reportedAt ??
      action?.completedAt ??
      action?.startedAt
  );
}


function buildDecisionEvents(
  decisions: AtlasDecisionHistoryItem[]
): AtlasIntelligenceTimelineEvent[] {
  return decisions.map(
    (decision) => ({
      id:
        `timeline-decision-${decision.id}`,

      type:
        "decision",

      title:
        "Strategy accepted",

      description:
        decision.title,

      timestamp:
        decision.timestamp,

      timestampValue:
        getDecisionTimestamp(
          decision
        ),

      tone:
        "violet",

      decisionId:
        decision.id,

      metric: {
        label:
          "Confidence",

        value:
          `${decision.confidence}%`,
      },
    })
  );
}


function buildActionEvents(
  actions: AtlasPlayerAction[]
): AtlasIntelligenceTimelineEvent[] {
  return actions.flatMap(
    (action) => {
      const startedEvent:
        AtlasIntelligenceTimelineEvent = {
          id:
            `timeline-action-started-${action.id}`,

          type:
            "action-started",

          title:
            "Strategy started",

          description:
            action.title,

          timestamp:
            action.startedAt,

          timestampValue:
            parseTimestamp(
              action.startedAt
            ),

          tone:
            "cyan",

          decisionId:
            action.decisionId,

          actionId:
            action.id,
        };


      if (
        action.status ===
          "completed" &&
        action.completedAt
      ) {
        const completedEvent:
          AtlasIntelligenceTimelineEvent = {
            id:
              `timeline-action-completed-${action.id}`,

            type:
              "action-completed",

            title:
              "Strategy completed",

            description:
              action.notes,

            timestamp:
              action.completedAt,

            timestampValue:
              parseTimestamp(
                action.completedAt
              ),

            tone:
              "emerald",

            decisionId:
              action.decisionId,

            actionId:
              action.id,
          };

        return [
          startedEvent,
          completedEvent,
        ];
      }


      if (
        action.status ===
        "abandoned"
      ) {
        const abandonedEvent:
          AtlasIntelligenceTimelineEvent = {
            id:
              `timeline-action-abandoned-${action.id}`,

            type:
              "action-abandoned",

            title:
              "Strategy abandoned",

            description:
              action.notes,

            timestamp:
              action.completedAt ??
              action.startedAt,

            timestampValue:
              getActionTimestamp(
                action
              ),

            tone:
              "red",

            decisionId:
              action.decisionId,

            actionId:
              action.id,
          };

        return [
          startedEvent,
          abandonedEvent,
        ];
      }


      return [
        startedEvent,
      ];
    }
  );
}


function buildOutcomeEvents(
  outcomes: AtlasOutcome[],
  actions: AtlasPlayerAction[]
): AtlasIntelligenceTimelineEvent[] {
  const actionsById =
    new Map(
      actions.map(
        (action) => [
          action.id,
          action,
        ]
      )
    );


  return outcomes
    .filter(
      (outcome) =>
        outcome.source ===
        "player-reported"
    )
    .map(
      (outcome) => {
        const action =
          outcome.actionId
            ? actionsById.get(
                outcome.actionId
              )
            : undefined;

        const tone:
          AtlasIntelligenceTimelineTone =
            outcome.rating ===
            "positive"
              ? "emerald"
              : outcome.rating ===
                  "negative"
                ? "red"
                : "amber";

        return {
          id:
            `timeline-outcome-${outcome.id}`,

          type:
            "outcome",

          title:
            outcome.rating ===
            "positive"
              ? "Positive outcome reported"
              : outcome.rating ===
                  "negative"
                ? "Failed outcome reported"
                : "Neutral outcome reported",

          description:
            outcome.summary,

          timestamp:
            outcome.reportedAt ??
            action?.completedAt ??
            action?.startedAt ??
            "",

          timestampValue:
            getOutcomeTimestamp(
              outcome,
              action
            ),

          tone,

          decisionId:
            outcome.decisionId,

          actionId:
            outcome.actionId,

          outcomeId:
            outcome.id,

          metric: {
            label:
              "Empire Impact",

            value:
              outcome.empireScoreChange > 0
                ? `+${outcome.empireScoreChange}`
                : outcome.empireScoreChange.toString(),
          },
        };
      }
    );
}


function buildValidationEvents(
  validations: AtlasValidatedOutcome[],
  outcomes: AtlasOutcome[],
  actions: AtlasPlayerAction[]
): AtlasIntelligenceTimelineEvent[] {
  const outcomesById =
    new Map(
      outcomes.map(
        (outcome) => [
          outcome.id,
          outcome,
        ]
      )
    );

  const actionsById =
    new Map(
      actions.map(
        (action) => [
          action.id,
          action,
        ]
      )
    );


  return validations.map(
    (validation) => {
      const outcome =
        outcomesById.get(
          validation.outcomeId
        );

      const action =
        actionsById.get(
          validation.actionId
        );

      const tone:
        AtlasIntelligenceTimelineTone =
          validation.status ===
          "confirmed"
            ? "emerald"
            : validation.status ===
                "failed"
              ? "red"
              : "amber";

      return {
        id:
          `timeline-validation-${validation.id}`,

        type:
          "validation",

        title:
          validation.status ===
          "confirmed"
            ? "Outcome validated"
            : validation.status ===
                "failed"
              ? "Outcome failed validation"
              : "Validation pending",

        description:
          validation.summary,

        timestamp:
          outcome?.reportedAt ??
          action?.completedAt ??
          action?.startedAt ??
          "",

        timestampValue:
          getValidationTimestamp(
            validation,
            outcome,
            action
          ),

        tone,

        decisionId:
          action?.decisionId,

        actionId:
          validation.actionId,

        outcomeId:
          validation.outcomeId,

        validationId:
          validation.id,

        metric: {
          label:
            "Success Score",

          value:
            validation.successScore.toString(),
        },
      };
    }
  );
}


function calculateTimelineConfidence(
  input: AtlasIntelligenceTimelineInput
): number {
  const evidenceCount =
    input.decisions.length +
    input.actions.length +
    input.outcomes.length +
    input.validations.length;

  return Math.min(
    100,
    evidenceCount * 8
  );
}


export function buildIntelligenceTimeline({
  decisions,
  actions,
  outcomes,
  validations,
}: AtlasIntelligenceTimelineInput): AtlasIntelligenceTimeline {
  const events = [
    ...buildDecisionEvents(
      decisions
    ),

    ...buildActionEvents(
      actions
    ),

    ...buildOutcomeEvents(
      outcomes,
      actions
    ),

    ...buildValidationEvents(
      validations,
      outcomes,
      actions
    ),
  ].sort(
    (first, second) =>
      second.timestampValue -
      first.timestampValue
  );


  return {
    title:
      "Atlas Intelligence Timeline",

    summary:
      events.length > 0
        ? `Atlas has recorded ${events.length} ${
            events.length === 1
              ? "intelligence event"
              : "intelligence events"
          } across your strategic history.`
        : "Atlas will build a timeline as you accept, complete, and report strategy results.",

    events,

    totalEvents:
      events.length,

    latestEvent:
      events[0] ?? null,

    confidence:
      calculateTimelineConfidence({
        decisions,
        actions,
        outcomes,
        validations,
      }),
  };
}