import {
  buildAtlasBriefing,
} from "./briefing.engine";

import {
  buildAtlasGreeting,
} from "./greeting.engine";

import {
  buildAtlasImpact,
} from "./impact.engine";

import type {
  DashboardModel,
} from "@/app/services";


export type DashboardPipelineStatus =
  | "idle"
  | "waiting"
  | "loading"
  | "success"
  | "warning"
  | "failed";


export type DashboardPresenterDecision = {
  confidence?: number;

  headline?: string;

  summary?: string;

  immediateNextStep?: string;

  longTermDirection?: string;

  rationale?: string;

  coachingResponse?: string;

  shouldActNow?: boolean;

  urgency?: unknown;
};


export type DashboardPresenterRecommendation = {
  confidence?: number;

  title?: string;

  explanation?: string;
};


export type DashboardPresenterPipeline = {
  status:
    DashboardPipelineStatus;

  loading:
    boolean;

  successful:
    boolean;

  decision:
    DashboardPresenterDecision | null;

  primaryRecommendation:
    DashboardPresenterRecommendation | null;

  error:
    string | null;
};


export type DashboardEmpireStatus =
  | "Thriving"
  | "Growing"
  | "Developing"
  | "At Risk";


export type DashboardConfidenceLevel =
  | "High"
  | "Moderate"
  | "Review";


export type DashboardPresenterModel = {
  greeting: {
    eyebrow: string;

    subtitle: string;
  };

  briefing: {
    title: string;

    summary: string;

    immediateNextStep: string;

    longTermDirection: string;

    rationale: string;

    coachingResponse: string;

    recommendedSessionMinutes: number;
  };

  confidence: {
    value: number;

    level:
      DashboardConfidenceLevel;
  };

  empire: {
    score: number;

    grade: string;

    status:
      DashboardEmpireStatus;

    summary: string;
  };

  urgency: {
    label: string;

    shouldActNow: boolean;
  };

  pipeline: {
    status:
      DashboardPipelineStatus;

    label: string;

    operationalState:
      | "Operational"
      | "Processing"
      | "Standby";

    error:
      string | null;
  };

  metrics: {
    empireHealth: {
      label: string;

      value: number;

      description: string;

      trend: string;
    };

    atlasConfidence: {
      label: string;

      value: string;

      description: string;

      trend: string;
    };

    currentStage: {
      label: string;

      value: string;

      description: string;
    };

    availableCash: {
      label: string;

      value: string;

      description: string;
    };
  };
};


export type BuildDashboardPresenterInput = {
  dashboard:
    DashboardModel;

  pipeline:
    DashboardPresenterPipeline;
};


function clampPercentage(
  value: number
): number {
  return Math.min(
    100,
    Math.max(
      0,
      value
    )
  );
}


function getEmpireStatus(
  score: number
): {
  label:
    DashboardEmpireStatus;

  summary:
    string;
} {
  if (
    score >=
    85
  ) {
    return {
      label:
        "Thriving",

      summary:
        "Your empire is operating from a position of strength with healthy momentum and room to expand.",
    };
  }

  if (
    score >=
    70
  ) {
    return {
      label:
        "Growing",

      summary:
        "Your empire is progressing well. Atlas has identified the next move most likely to preserve momentum.",
    };
  }

  if (
    score >=
    50
  ) {
    return {
      label:
        "Developing",

      summary:
        "Your foundation is taking shape, but the next decision should prioritize stability and efficient progression.",
    };
  }

  return {
    label:
      "At Risk",

    summary:
      "Your empire needs a focused recovery move before committing resources to broader expansion.",
  };
}


function getConfidenceLevel(
  confidence: number
): DashboardConfidenceLevel {
  if (
    confidence >=
    85
  ) {
    return "High";
  }

  if (
    confidence >=
    65
  ) {
    return "Moderate";
  }

  return "Review";
}


function getPipelineStatusLabel(
  status:
    DashboardPipelineStatus
): string {
  switch (
    status
  ) {
    case "waiting":
      return "Awaiting Data";

    case "loading":
      return "Analyzing Empire";

    case "success":
      return "Atlas Online";

    case "warning":
      return "Review Required";

    case "failed":
      return "Atlas Limited";

    case "idle":
    default:
      return "Atlas Standby";
  }
}


function getPipelineOperationalState(
  pipeline:
    DashboardPresenterPipeline
):
  | "Operational"
  | "Processing"
  | "Standby" {
  if (
    pipeline.successful
  ) {
    return "Operational";
  }

  if (
    pipeline.loading
  ) {
    return "Processing";
  }

  return "Standby";
}


function getUrgencyLabel(
  urgency: unknown,
  shouldActNow: boolean
): string {
  if (
    shouldActNow
  ) {
    return "Act Now";
  }

  if (
    typeof urgency ===
      "string" &&
    urgency.trim().length >
      0
  ) {
    return urgency;
  }

  return "Strategic";
}


function formatCash(
  value: number
): string {
  return `$${value.toLocaleString(
    "en-US"
  )}`;
}


export function buildDashboardPresenter({
  dashboard,
  pipeline,
}: BuildDashboardPresenterInput): DashboardPresenterModel {
  const decision =
    pipeline.decision;

  const primaryRecommendation =
    pipeline.primaryRecommendation;

  const fallbackConfidence =
    dashboard.recommendation
      ?.confidence ??
    90;

  const recommendationConfidence =
    decision?.confidence ??
    primaryRecommendation
      ?.confidence ??
    fallbackConfidence;

  const normalizedConfidence =
    clampPercentage(
      recommendationConfidence
    );

  const greeting =
    buildAtlasGreeting(
      dashboard.profile
    );

  const impact =
    buildAtlasImpact(
      recommendationConfidence
    );

  const fallbackBriefing =
    buildAtlasBriefing(
      dashboard.profile,
      impact
    );

  const briefingTitle =
    decision?.headline ??
    primaryRecommendation
      ?.title ??
    fallbackBriefing.title;

  const briefingSummary =
    decision?.summary ??
    primaryRecommendation
      ?.explanation ??
    fallbackBriefing.summary;

  const immediateNextStep =
    decision?.immediateNextStep ??
    primaryRecommendation
      ?.explanation ??
    fallbackBriefing.objective;

  const longTermDirection =
    decision?.longTermDirection ??
    "Continue building momentum while preserving enough capital for the next high-impact opportunity.";

  const rationale =
    decision?.rationale ??
    primaryRecommendation
      ?.explanation ??
    "Atlas is balancing your current resources, empire progression, and highest-value available action.";

  const coachingResponse =
    decision?.coachingResponse ??
    "Complete the priority action before redirecting resources. The next measurable gain matters more than adding another competing objective.";

  const shouldActNow =
    decision?.shouldActNow ??
    false;

  const empireStatus =
    getEmpireStatus(
      dashboard.empire
        .overallScore
    );

  const confidenceLevel =
    getConfidenceLevel(
      normalizedConfidence
    );

  return {
    greeting: {
      eyebrow:
        `Atlas AI · ${greeting.greeting}, Commander`,

      subtitle:
        greeting.subtitle,
    },

    briefing: {
      title:
        briefingTitle,

      summary:
        briefingSummary,

      immediateNextStep,

      longTermDirection,

      rationale,

      coachingResponse,

      recommendedSessionMinutes:
        fallbackBriefing
          .recommendedSessionMinutes,
    },

    confidence: {
      value:
        normalizedConfidence,

      level:
        confidenceLevel,
    },

    empire: {
      score:
        dashboard.empire
          .overallScore,

      grade:
        dashboard.empire
          .overallGrade,

      status:
        empireStatus.label,

      summary:
        empireStatus.summary,
    },

    urgency: {
      label:
        getUrgencyLabel(
          decision?.urgency,
          shouldActNow
        ),

      shouldActNow,
    },

    pipeline: {
      status:
        pipeline.status,

      label:
        getPipelineStatusLabel(
          pipeline.status
        ),

      operationalState:
        getPipelineOperationalState(
          pipeline
        ),

      error:
        pipeline.error,
    },

    metrics: {
      empireHealth: {
        label:
          "Empire Health",

        value:
          dashboard.empire
            .overallScore,

        description:
          "Overall strategic strength",

        trend:
          `${dashboard.empire.overallGrade} grade`,
      },

      atlasConfidence: {
        label:
          "Atlas Confidence",

        value:
          `${normalizedConfidence}%`,

        description:
          "Recommendation reliability",

        trend:
          normalizedConfidence >=
          85
            ? "High confidence"
            : "Review signals",
      },

      currentStage: {
        label:
          "Current Stage",

        value:
          dashboard.summary
            .stage,

        description:
          "Active empire phase",
      },

      availableCash: {
        label:
          "Available Cash",

        value:
          formatCash(
            dashboard.summary
              .cash
          ),

        description:
          "Capital ready for deployment",
      },
    },
  };
}