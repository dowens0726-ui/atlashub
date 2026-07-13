import type {
  AtlasBehaviorProfile,
} from "./behavioral-intelligence.engine";

import type {
  EmpireForecast,
} from "./forecast.engine";

import type {
  AtlasGreeting,
} from "./greeting.engine";

import type {
  AtlasLearningProfile,
} from "./learning.engine";

import type {
  AtlasMemoryInsight,
} from "./memory-insight.engine";

import type {
  AtlasPlayerIdentity,
} from "./player-identity.engine";

import type {
  AtlasRecommendation,
} from "./recommendation.engine";


export type AtlasCoachPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";


export type AtlasCoachTone =
  | "Exploratory"
  | "Supportive"
  | "Confident"
  | "Corrective";


export type AtlasCoachBriefing = {
  title: string;

  greeting: string;

  subtitle: string;

  summary: string;

  highlights: string[];

  recommendationTitle: string;

  recommendationSummary: string;

  confidence: number;

  priority: AtlasCoachPriority;

  tone: AtlasCoachTone;

  callToAction: string;
};


export type AtlasCoachInput = {
  greeting: AtlasGreeting;

  recommendation: AtlasRecommendation;

  forecast: EmpireForecast;

  learning: AtlasLearningProfile;

  behavior: AtlasBehaviorProfile;

  identity: AtlasPlayerIdentity;

  memoryInsight: AtlasMemoryInsight;
};


function clampPercentage(
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


function formatCurrency(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }
  ).format(value);
}


function formatDuration(
  totalMinutes: number
): string {
  if (totalMinutes <= 0) {
    return "No completion-time data yet";
  }

  const hours =
    Math.floor(
      totalMinutes / 60
    );

  const minutes =
    totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} minutes`;
  }

  if (minutes === 0) {
    return `${hours} ${
      hours === 1
        ? "hour"
        : "hours"
    }`;
  }

  return `${hours}h ${minutes}m`;
}


function getPriority(
  recommendation: AtlasRecommendation,
  learning: AtlasLearningProfile,
  behavior: AtlasBehaviorProfile
): AtlasCoachPriority {
  if (
    recommendation.priority ===
    "critical"
  ) {
    return "Critical";
  }

  if (
    learning.failureRate >= 50 ||
    behavior.abandonmentRate >= 50
  ) {
    return "High";
  }

  if (
    recommendation.priority ===
      "high" ||
    recommendation.confidence >= 90
  ) {
    return "High";
  }

  if (
    recommendation.priority ===
    "medium"
  ) {
    return "Medium";
  }

  return "Low";
}


function getTone(
  learning: AtlasLearningProfile,
  behavior: AtlasBehaviorProfile
): AtlasCoachTone {
  if (
    learning.completedStrategies === 0
  ) {
    return "Exploratory";
  }

  if (
    learning.failureRate >= 50 ||
    behavior.abandonmentRate >= 40
  ) {
    return "Corrective";
  }

  if (
    learning.successRate >= 75 &&
    behavior.completionRate >= 70
  ) {
    return "Confident";
  }

  return "Supportive";
}


function buildHighlights(
  learning: AtlasLearningProfile,
  behavior: AtlasBehaviorProfile,
  identity: AtlasPlayerIdentity,
  memoryInsight: AtlasMemoryInsight
): string[] {
  const highlights: string[] = [];


  if (
    learning.completedStrategies >
    0
  ) {
    highlights.push(
      `${learning.completedStrategies} ${
        learning.completedStrategies === 1
          ? "strategy has"
          : "strategies have"
      } been reported to Atlas.`
    );

    highlights.push(
      `Your recorded success rate is ${learning.successRate}%.`
    );
  }


  if (
    learning.averageIncome !==
    0
  ) {
    highlights.push(
      `Reported strategies average ${formatCurrency(
        learning.averageIncome
      )} in income impact.`
    );
  }


  if (
    learning.averageCompletionTimeMinutes >
    0
  ) {
    highlights.push(
      `Your average completion time is ${formatDuration(
        learning.averageCompletionTimeMinutes
      )}.`
    );
  }


  if (
    learning.predictionAccuracy >
    0
  ) {
    highlights.push(
      `Atlas income-prediction accuracy is currently ${learning.predictionAccuracy}%.`
    );
  }


  if (
    behavior.businessPreference >=
    60
  ) {
    highlights.push(
      `Observed behavior shows a ${behavior.businessPreference}% preference for business strategies.`
    );
  } else if (
    behavior.missionPreference >=
    60
  ) {
    highlights.push(
      `Observed behavior shows a ${behavior.missionPreference}% preference for mission strategies.`
    );
  } else if (
    behavior.vehiclePreference >=
    60
  ) {
    highlights.push(
      `Observed behavior shows a ${behavior.vehiclePreference}% preference for vehicle-focused strategies.`
    );
  }


  if (
    behavior.abandonmentRate >=
    40
  ) {
    highlights.push(
      "Atlas has detected frequent strategy switching and recommends narrowing your current focus."
    );
  }


  if (
    highlights.length < 3 &&
    memoryInsight.evidence.length >
    0
  ) {
    highlights.push(
      memoryInsight.evidence[0]
    );
  }


  if (
    highlights.length < 3
  ) {
    highlights.push(
      `Your current Atlas identity is ${identity.archetype} with a ${identity.strategy.toLowerCase()} strategy.`
    );
  }


  return highlights.slice(
    0,
    4
  );
}


function buildSummary(
  recommendation: AtlasRecommendation,
  learning: AtlasLearningProfile,
  behavior: AtlasBehaviorProfile,
  identity: AtlasPlayerIdentity
): string {
  if (
    learning.completedStrategies === 0
  ) {
    return `Atlas is still building a reliable coaching profile. Your current ${identity.archetype} identity and ${behavior.strongestCategory.toLowerCase()} preference provide the first signals for personalized guidance.`;
  }

  if (
    learning.failureRate >= 50
  ) {
    return `Recent results show that several strategies have not produced the intended outcome. Atlas recommends reducing risk and focusing on one high-confidence objective before expanding further.`;
  }

  if (
    behavior.abandonmentRate >=
    40
  ) {
    return `Atlas has detected frequent changes in strategic direction. Completing one focused objective will give Atlas stronger evidence and improve future recommendations.`;
  }

  if (
    learning.successRate >= 75 &&
    behavior.completionRate >= 70
  ) {
    return `Your recent history shows strong follow-through and consistent results. Atlas is confident that ${recommendation.title} aligns with your observed behavior and current progression path.`;
  }

  return `Atlas is refining its coaching using your recorded decisions, reported outcomes, and observed ${behavior.playPattern.toLowerCase()} pattern.`;
}


function buildCallToAction(
  recommendation: AtlasRecommendation,
  priority: AtlasCoachPriority,
  tone: AtlasCoachTone
): string {
  if (
    priority === "Critical"
  ) {
    return `Prioritize ${recommendation.title} before starting another major strategy.`;
  }

  if (
    tone === "Corrective"
  ) {
    return `Review the risks and complete one focused step toward ${recommendation.title}.`;
  }

  if (
    tone === "Exploratory"
  ) {
    return `Start ${recommendation.title} so Atlas can begin measuring real performance.`;
  }

  return `Continue with ${recommendation.title} as your next strategic move.`;
}


export function buildAtlasCoach({
  greeting,
  recommendation,
  forecast,
  learning,
  behavior,
  identity,
  memoryInsight,
}: AtlasCoachInput): AtlasCoachBriefing {
  const priority =
    getPriority(
      recommendation,
      learning,
      behavior
    );

  const tone =
    getTone(
      learning,
      behavior
    );

  const confidence =
    clampPercentage(
      recommendation.confidence *
        0.35 +
        learning.confidence *
          0.25 +
        behavior.confidence *
          0.25 +
        memoryInsight.confidence *
          0.15
    );

  const highlights =
    buildHighlights(
      learning,
      behavior,
      identity,
      memoryInsight
    );

  const summary =
    buildSummary(
      recommendation,
      learning,
      behavior,
      identity
    );

  return {
    title:
      "Atlas Coach",

    greeting:
      greeting.greeting,

    subtitle:
      greeting.subtitle,

    summary,

    highlights,

    recommendationTitle:
      recommendation.title,

    recommendationSummary:
      recommendation.summary,

    confidence,

    priority,

    tone,

    callToAction:
      buildCallToAction(
        recommendation,
        priority,
        tone
      ),
  };
}