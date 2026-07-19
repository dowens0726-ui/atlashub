import type {
  AtlasReactiveTimeline,
  AtlasReactiveTimelineEvent,
  AtlasReactiveTimelineEventType,
} from "./atlas-reactive-timeline.engine";

import type {
  AtlasBrainChangeCategory,
  AtlasBrainChangeSeverity,
} from "./atlas-brain-change-detection.engine";


export type AtlasEventAudience =
  | "dashboard"
  | "copilot"
  | "memory"
  | "notification"
  | "strategy";


export type AtlasEventStatus =
  | "active"
  | "acknowledged"
  | "resolved";


export type AtlasEvent = {
  id: string;

  occurredAt: string;

  publishedAt: string;

  type:
    AtlasReactiveTimelineEventType;

  category:
    AtlasBrainChangeCategory;

  severity:
    AtlasBrainChangeSeverity;

  headline: string;

  summary: string;

  suggestedAction: string;

  confidence: number;

  audiences:
    AtlasEventAudience[];

  affectedSystems:
    string[];

  sourceEventId: string;

  sourceChangeIds:
    string[];

  status:
    AtlasEventStatus;

  priority: number;
};


export type AtlasEventBus = {
  publishedAt: string;

  sourceGeneratedAt: string;

  previousCapturedAt: string;

  currentCapturedAt: string;

  hasEvents: boolean;

  totalEvents: number;

  criticalCount: number;

  highPriorityCount: number;

  notificationCount: number;

  dashboardEvents:
    AtlasEvent[];

  copilotEvents:
    AtlasEvent[];

  memoryEvents:
    AtlasEvent[];

  notificationEvents:
    AtlasEvent[];

  strategyEvents:
    AtlasEvent[];

  events:
    AtlasEvent[];

  headline: string;

  summary: string;
};


export type BuildAtlasEventBusInput = {
  timeline:
    AtlasReactiveTimeline;

  publishedAt?: string;

  maxEvents?: number;
};


const severityPriority:
  Record<
    AtlasBrainChangeSeverity,
    number
  > = {
    critical: 100,
    high: 75,
    medium: 50,
    low: 25,
  };


const eventTypePriority:
  Record<
    AtlasReactiveTimelineEventType,
    number
  > = {
    warning: 25,
    setback: 20,
    milestone: 18,
    opportunity: 16,
    "strategy-shift": 14,
    progress: 10,
    "status-update": 5,
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
    return 12;
  }

  return Math.min(
    30,
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


function createEventId(
  timelineEvent:
    AtlasReactiveTimelineEvent
): string {
  return `atlas-event-${timelineEvent.id}`;
}


function resolveAudiences(
  event:
    AtlasReactiveTimelineEvent
): AtlasEventAudience[] {
  const audiences =
    new Set<AtlasEventAudience>();

  audiences.add(
    "dashboard"
  );

  audiences.add(
    "memory"
  );

  if (
    event.type === "warning" ||
    event.type === "setback" ||
    event.type ===
      "strategy-shift" ||
    event.severity ===
      "critical" ||
    event.severity ===
      "high"
  ) {
    audiences.add(
      "copilot"
    );
  }

  if (
    event.type ===
      "strategy-shift" ||
    event.type ===
      "opportunity" ||
    event.type ===
      "milestone"
  ) {
    audiences.add(
      "strategy"
    );
  }

  if (
    event.type === "warning" ||
    event.severity ===
      "critical"
  ) {
    audiences.add(
      "notification"
    );
  }

  return Array.from(
    audiences
  );
}


function calculatePriority(
  event:
    AtlasReactiveTimelineEvent
): number {
  const severityScore =
    severityPriority[
      event.severity
    ];

  const eventTypeScore =
    eventTypePriority[
      event.type
    ];

  const confidenceScore =
    Math.round(
      normalizeConfidence(
        event.confidence
      ) / 10
    );

  return (
    severityScore +
    eventTypeScore +
    confidenceScore
  );
}


function buildEvent(
  timelineEvent:
    AtlasReactiveTimelineEvent,
  publishedAt: string
): AtlasEvent {
  return {
    id:
      createEventId(
        timelineEvent
      ),

    occurredAt:
      timelineEvent.occurredAt,

    publishedAt,

    type:
      timelineEvent.type,

    category:
      timelineEvent.category,

    severity:
      timelineEvent.severity,

    headline:
      timelineEvent.headline,

    summary:
      timelineEvent.summary,

    suggestedAction:
      timelineEvent
        .suggestedAction,

    confidence:
      normalizeConfidence(
        timelineEvent.confidence
      ),

    audiences:
      resolveAudiences(
        timelineEvent
      ),

    affectedSystems:
      [
        ...timelineEvent
          .affectedSystems,
      ],

    sourceEventId:
      timelineEvent.id,

    sourceChangeIds:
      [
        ...timelineEvent
          .sourceChangeIds,
      ],

    status:
      "active",

    priority:
      calculatePriority(
        timelineEvent
      ),
  };
}


function compareEvents(
  first:
    AtlasEvent,
  second:
    AtlasEvent
): number {
  if (
    second.priority !==
    first.priority
  ) {
    return (
      second.priority -
      first.priority
    );
  }

  const firstTime =
    new Date(
      first.occurredAt
    ).getTime();

  const secondTime =
    new Date(
      second.occurredAt
    ).getTime();

  return (
    secondTime -
    firstTime
  );
}


function filterByAudience(
  events:
    AtlasEvent[],
  audience:
    AtlasEventAudience
): AtlasEvent[] {
  return events.filter(
    (event) =>
      event.audiences.includes(
        audience
      )
  );
}


function buildHeadline(
  events:
    AtlasEvent[]
): string {
  if (
    events.length === 0
  ) {
    return "Atlas has no new events to publish.";
  }

  const leadEvent =
    events[0];

  if (
    leadEvent.severity ===
    "critical"
  ) {
    return `Critical Atlas event: ${leadEvent.headline}.`;
  }

  if (
    leadEvent.type ===
    "warning"
  ) {
    return `Atlas requires attention: ${leadEvent.headline}.`;
  }

  if (
    leadEvent.type ===
    "milestone"
  ) {
    return `Atlas recorded a milestone: ${leadEvent.headline}.`;
  }

  if (
    leadEvent.type ===
    "opportunity"
  ) {
    return `Atlas identified an opportunity: ${leadEvent.headline}.`;
  }

  return `Atlas published a strategic update: ${leadEvent.headline}.`;
}


function buildSummary(
  events:
    AtlasEvent[],
  criticalCount: number,
  highPriorityCount: number,
  notificationCount: number
): string {
  if (
    events.length === 0
  ) {
    return "The latest reactive timeline contained no events requiring distribution.";
  }

  const parts:
    string[] = [
      `${events.length} ${
        events.length === 1
          ? "event"
          : "events"
      } published`,
  ];

  if (
    criticalCount > 0
  ) {
    parts.push(
      `${criticalCount} critical`
    );
  }

  if (
    highPriorityCount > 0
  ) {
    parts.push(
      `${highPriorityCount} high priority`
    );
  }

  if (
    notificationCount > 0
  ) {
    parts.push(
      `${notificationCount} ${
        notificationCount === 1
          ? "notification"
          : "notifications"
      }`
    );
  }

  return `${parts.join(
    ", "
  )}.`;
}


export function buildAtlasEventBus({
  timeline,
  publishedAt,
  maxEvents,
}: BuildAtlasEventBusInput): AtlasEventBus {
  const resolvedPublishedAt =
    resolveTimestamp(
      publishedAt
    );

  const eventLimit =
    normalizeMaxEvents(
      maxEvents
    );

  const events =
    timeline.events
      .map(
        (
          timelineEvent
        ) =>
          buildEvent(
            timelineEvent,
            resolvedPublishedAt
          )
      )
      .sort(
        compareEvents
      )
      .slice(
        0,
        eventLimit
      );

  const dashboardEvents =
    filterByAudience(
      events,
      "dashboard"
    );

  const copilotEvents =
    filterByAudience(
      events,
      "copilot"
    );

  const memoryEvents =
    filterByAudience(
      events,
      "memory"
    );

  const notificationEvents =
    filterByAudience(
      events,
      "notification"
    );

  const strategyEvents =
    filterByAudience(
      events,
      "strategy"
    );

  const criticalCount =
    events.filter(
      (event) =>
        event.severity ===
        "critical"
    ).length;

  const highPriorityCount =
    events.filter(
      (event) =>
        event.severity ===
          "critical" ||
        event.severity ===
          "high"
    ).length;

  const notificationCount =
    notificationEvents.length;

  return {
    publishedAt:
      resolvedPublishedAt,

    sourceGeneratedAt:
      timeline.generatedAt,

    previousCapturedAt:
      timeline.previousCapturedAt,

    currentCapturedAt:
      timeline.currentCapturedAt,

    hasEvents:
      events.length > 0,

    totalEvents:
      events.length,

    criticalCount,

    highPriorityCount,

    notificationCount,

    dashboardEvents,

    copilotEvents,

    memoryEvents,

    notificationEvents,

    strategyEvents,

    events,

    headline:
      buildHeadline(
        events
      ),

    summary:
      buildSummary(
        events,
        criticalCount,
        highPriorityCount,
        notificationCount
      ),
  };
}