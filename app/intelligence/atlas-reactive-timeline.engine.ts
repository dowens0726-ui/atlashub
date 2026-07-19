import type {
  AtlasBrainChange,
  AtlasBrainChangeCategory,
  AtlasBrainChangeDirection,
  AtlasBrainChangeSeverity,
  AtlasBrainChangeSummary,
} from "./atlas-brain-change-detection.engine";


export type AtlasReactiveTimelineEventType =
  | "progress"
  | "setback"
  | "milestone"
  | "warning"
  | "opportunity"
  | "strategy-shift"
  | "status-update";


export type AtlasReactiveTimelineTone =
  | "positive"
  | "negative"
  | "neutral"
  | "attention";


export type AtlasReactiveTimelineEvent = {
  id: string;

  occurredAt: string;

  type:
    AtlasReactiveTimelineEventType;

  tone:
    AtlasReactiveTimelineTone;

  severity:
    AtlasBrainChangeSeverity;

  category:
    AtlasBrainChangeCategory;

  headline: string;

  summary: string;

  suggestedAction: string;

  confidence: number;

  affectedSystems: string[];

  sourceChangeIds: string[];
};


export type AtlasReactiveTimeline = {
  generatedAt: string;

  previousCapturedAt: string;

  currentCapturedAt: string;

  hasEvents: boolean;

  eventCount: number;

  progressCount: number;

  setbackCount: number;

  warningCount: number;

  opportunityCount: number;

  highestSeverity:
    AtlasBrainChangeSeverity | null;

  headline: string;

  summary: string;

  events:
    AtlasReactiveTimelineEvent[];
};


export type BuildAtlasReactiveTimelineInput = {
  changes:
    AtlasBrainChangeSummary;

  generatedAt?: string;

  maxEvents?: number;
};


const severityRank:
  Record<
    AtlasBrainChangeSeverity,
    number
  > = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
  };


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


function normalizeMaxEvents(
  value?: number
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return 8;
  }

  return Math.min(
    20,
    Math.max(
      1,
      Math.round(value)
    )
  );
}


function normalizeConfidence(
  value: number
): number {
  return Math.min(
    100,
    Math.max(
      0,
      Math.round(value)
    )
  );
}


function createTimelineEventId(
  change:
    AtlasBrainChange
): string {
  return `timeline-${change.id}`;
}


function resolveTone(
  direction:
    AtlasBrainChangeDirection,
  severity:
    AtlasBrainChangeSeverity
): AtlasReactiveTimelineTone {
  if (
    direction === "improved"
  ) {
    return "positive";
  }

  if (
    direction === "declined"
  ) {
    return severity ===
      "critical"
      ? "attention"
      : "negative";
  }

  if (
    severity === "critical" ||
    severity === "high"
  ) {
    return "attention";
  }

  return "neutral";
}


function resolveEventType(
  change:
    AtlasBrainChange
): AtlasReactiveTimelineEventType {
  if (
    change.category ===
      "copilot" &&
    change.id.includes(
      "warning-count"
    )
  ) {
    return change.direction ===
      "improved"
      ? "progress"
      : "warning";
  }

  if (
    change.category ===
      "copilot" &&
    change.id.includes(
      "opportunity-count"
    )
  ) {
    return change.direction ===
      "improved"
      ? "opportunity"
      : "status-update";
  }

  if (
    change.category ===
      "recommendation" ||
    change.category ===
      "priority"
  ) {
    return "strategy-shift";
  }

  if (
    change.category ===
      "empire" &&
    (
      change.id.includes(
        "growth-phase"
      ) ||
      change.id.includes(
        "empire-health"
      )
    )
  ) {
    return change.direction ===
      "improved"
      ? "milestone"
      : "setback";
  }

  if (
    change.direction ===
    "improved"
  ) {
    return "progress";
  }

  if (
    change.direction ===
    "declined"
  ) {
    return change.severity ===
      "critical"
      ? "warning"
      : "setback";
  }

  return "status-update";
}


function resolveSuggestedAction(
  change:
    AtlasBrainChange
): string {
  if (
    change.id.includes(
      "cash"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Review newly affordable investments while preserving an appropriate operating reserve."
      : "Reduce discretionary spending and prioritize activities that rebuild available cash.";
  }

  if (
    change.id.includes(
      "liquidity-status"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Reassess expansion opportunities that were previously limited by liquidity."
      : "Protect liquidity before committing to another major purchase.";
  }

  if (
    change.id.includes(
      "growth-phase"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Align the next objective with the requirements of the new growth phase."
      : "Stabilize the current empire before attempting another expansion.";
  }

  if (
    change.id.includes(
      "expansion-readiness"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Compare the strongest available expansion options and select the highest-impact move."
      : "Delay expansion until readiness improves or the identified constraint is resolved.";
  }

  if (
    change.id.includes(
      "risk-level"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Use the lower-risk position to pursue a controlled growth opportunity."
      : "Address the highest-impact risk before advancing the current strategy.";
  }

  if (
    change.id.includes(
      "urgency"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Use the reduced urgency to optimize the next move rather than rushing execution."
      : "Complete the most urgent objective before pursuing lower-priority opportunities.";
  }

  if (
    change.id.includes(
      "momentum"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Maintain momentum by completing the next recommended action during the current session."
      : "Choose a short, achievable objective that can restore forward progress.";
  }

  if (
    change.id.includes(
      "investment-readiness"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Review investments that now match the player's readiness and strategic focus."
      : "Preserve capital and improve readiness before making another significant investment.";
  }

  if (
    change.id.includes(
      "efficiency-score"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Continue the activities contributing most strongly to improved efficiency."
      : "Review the current activity mix and remove low-value or inefficient objectives.";
  }

  if (
    change.id.includes(
      "recommendation"
    )
  ) {
    return "Review the updated Atlas recommendation and confirm that the next planned action still aligns with it.";
  }

  if (
    change.id.includes(
      "top-priority"
    ) ||
    change.id.includes(
      "recommended-focus"
    )
  ) {
    return "Update the active session objective to match Atlas's latest strategic priority.";
  }

  if (
    change.id.includes(
      "warning-count"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Continue the strategy that resolved the warning and monitor for recurrence."
      : "Review the newest warning before committing resources to another objective.";
  }

  if (
    change.id.includes(
      "opportunity-count"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Compare the newly detected opportunities and prioritize the one with the strongest strategic fit."
      : "Reassess current objectives because fewer opportunities are presently available.";
  }

  if (
    change.id.includes(
      "copilot-confidence"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Proceed with the current plan while confidence remains strong."
      : "Gather more player or empire data before relying on a major strategic recommendation.";
  }

  if (
    change.id.includes(
      "empire-score"
    ) ||
    change.id.includes(
      "empire-health"
    )
  ) {
    return change.direction ===
      "improved"
      ? "Build on the improvement by completing the next highest-impact objective."
      : "Identify the weakest empire dimension and make it the next recovery priority.";
  }

  return "Review the change and determine whether the current session objective should be updated.";
}


function resolveAffectedSystems(
  change:
    AtlasBrainChange
): string[] {
  const systems =
    new Set<string>();

  systems.add(
    "Atlas Brain"
  );

  switch (
    change.category
  ) {
    case "financial":
      systems.add(
        "Player Profile"
      );
      systems.add(
        "Investment Intelligence"
      );
      break;

    case "empire":
      systems.add(
        "Empire Intelligence"
      );
      systems.add(
        "Strategy"
      );
      break;

    case "situation":
      systems.add(
        "Situation Analysis"
      );
      systems.add(
        "Coach"
      );
      break;

    case "recommendation":
      systems.add(
        "Recommendation Engine"
      );
      systems.add(
        "Copilot"
      );
      break;

    case "priority":
      systems.add(
        "Dashboard Priority"
      );
      systems.add(
        "Copilot"
      );
      break;

    case "copilot":
      systems.add(
        "Copilot"
      );
      systems.add(
        "Dashboard"
      );
      break;
  }

  return Array.from(
    systems
  );
}


function resolveEventConfidence(
  change:
    AtlasBrainChange
): number {
  let confidence =
    72;

  if (
    change.severity ===
    "critical"
  ) {
    confidence += 14;
  } else if (
    change.severity ===
    "high"
  ) {
    confidence += 10;
  } else if (
    change.severity ===
    "medium"
  ) {
    confidence += 5;
  }

  if (
    change.previousValue !==
    change.currentValue
  ) {
    confidence += 4;
  }

  if (
    typeof change.delta ===
      "number" &&
    Math.abs(
      change.delta
    ) >= 10
  ) {
    confidence += 4;
  }

  return normalizeConfidence(
    confidence
  );
}


function buildTimelineEvent(
  change:
    AtlasBrainChange,
  occurredAt: string
): AtlasReactiveTimelineEvent {
  return {
    id:
      createTimelineEventId(
        change
      ),

    occurredAt,

    type:
      resolveEventType(
        change
      ),

    tone:
      resolveTone(
        change.direction,
        change.severity
      ),

    severity:
      change.severity,

    category:
      change.category,

    headline:
      change.title,

    summary:
      change.description,

    suggestedAction:
      resolveSuggestedAction(
        change
      ),

    confidence:
      resolveEventConfidence(
        change
      ),

    affectedSystems:
      resolveAffectedSystems(
        change
      ),

    sourceChangeIds: [
      change.id,
    ],
  };
}


function compareEvents(
  first:
    AtlasReactiveTimelineEvent,
  second:
    AtlasReactiveTimelineEvent
): number {
  const severityDifference =
    severityRank[
      second.severity
    ] -
    severityRank[
      first.severity
    ];

  if (
    severityDifference !== 0
  ) {
    return severityDifference;
  }

  return (
    second.confidence -
    first.confidence
  );
}


function getHighestSeverity(
  events:
    AtlasReactiveTimelineEvent[]
): AtlasBrainChangeSeverity | null {
  if (
    events.length === 0
  ) {
    return null;
  }

  return [...events]
    .sort(compareEvents)[0]
    .severity;
}


function buildTimelineHeadline(
  events:
    AtlasReactiveTimelineEvent[],
  progressCount: number,
  setbackCount: number
): string {
  if (
    events.length === 0
  ) {
    return "No new Atlas timeline events.";
  }

  const leadEvent =
    [...events]
      .sort(compareEvents)[0];

  if (
    setbackCount >
    progressCount
  ) {
    return `Atlas identified a priority issue: ${leadEvent.headline}.`;
  }

  if (
    progressCount >
    setbackCount
  ) {
    return `Atlas recorded meaningful progress: ${leadEvent.headline}.`;
  }

  return `Atlas recorded a strategic update: ${leadEvent.headline}.`;
}


function buildTimelineSummary(
  eventCount: number,
  progressCount: number,
  setbackCount: number,
  warningCount: number,
  opportunityCount: number
): string {
  if (
    eventCount === 0
  ) {
    return "The player's strategic position remains materially unchanged since the previous Atlas Brain snapshot.";
  }

  const parts:
    string[] = [];

  if (
    progressCount > 0
  ) {
    parts.push(
      `${progressCount} ${
        progressCount === 1
          ? "progress event"
          : "progress events"
      }`
    );
  }

  if (
    setbackCount > 0
  ) {
    parts.push(
      `${setbackCount} ${
        setbackCount === 1
          ? "setback"
          : "setbacks"
      }`
    );
  }

  if (
    warningCount > 0
  ) {
    parts.push(
      `${warningCount} ${
        warningCount === 1
          ? "warning"
          : "warnings"
      }`
    );
  }

  if (
    opportunityCount > 0
  ) {
    parts.push(
      `${opportunityCount} ${
        opportunityCount === 1
          ? "opportunity"
          : "opportunities"
      }`
    );
  }

  const describedEvents =
    parts.reduce(
      (
        total,
        part
      ) => {
        const count =
          Number.parseInt(
            part,
            10
          );

        return Number.isNaN(
          count
        )
          ? total
          : total + count;
      },
      0
    );

  const remainingEvents =
    Math.max(
      0,
      eventCount -
        describedEvents
    );

  if (
    remainingEvents > 0
  ) {
    parts.push(
      `${remainingEvents} ${
        remainingEvents === 1
          ? "strategic update"
          : "strategic updates"
      }`
    );
  }

  return `Atlas generated ${parts.join(
    ", "
  )} from the latest Brain comparison.`;
}


export function buildAtlasReactiveTimeline({
  changes,
  generatedAt,
  maxEvents,
}: BuildAtlasReactiveTimelineInput): AtlasReactiveTimeline {
  const resolvedGeneratedAt =
    resolveTimestamp(
      generatedAt
    );

  const eventLimit =
    normalizeMaxEvents(
      maxEvents
    );

  const events =
    changes.changes
      .map(
        (change) =>
          buildTimelineEvent(
            change,
            changes.currentCapturedAt
          )
      )
      .sort(
        compareEvents
      )
      .slice(
        0,
        eventLimit
      );

  const progressCount =
    events.filter(
      (event) =>
        event.type ===
          "progress" ||
        event.type ===
          "milestone"
    ).length;

  const setbackCount =
    events.filter(
      (event) =>
        event.type ===
        "setback"
    ).length;

  const warningCount =
    events.filter(
      (event) =>
        event.type ===
        "warning"
    ).length;

  const opportunityCount =
    events.filter(
      (event) =>
        event.type ===
        "opportunity"
    ).length;

  return {
    generatedAt:
      resolvedGeneratedAt,

    previousCapturedAt:
      changes.previousCapturedAt,

    currentCapturedAt:
      changes.currentCapturedAt,

    hasEvents:
      events.length > 0,

    eventCount:
      events.length,

    progressCount,

    setbackCount,

    warningCount,

    opportunityCount,

    highestSeverity:
      getHighestSeverity(
        events
      ),

    headline:
      buildTimelineHeadline(
        events,
        progressCount,
        setbackCount
      ),

    summary:
      buildTimelineSummary(
        events.length,
        progressCount,
        setbackCount,
        warningCount,
        opportunityCount
      ),

    events,
  };
}