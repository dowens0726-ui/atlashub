import type {
  AtlasIdentityResult,
  AtlasOnboardingAnswers,
  AtlasOnboardingGoalId,
  AtlasPlaystyleId,
} from "@/app/types/onboarding";
import type { PlayerProfile } from "@/app/types";

export type AtlasPlayerIdentity = {
  archetype:
    | "Empire Builder"
    | "Solo Operator"
    | "Competitive Driver"
    | "Crew Specialist";

  strategy:
    | "Long-Term Growth"
    | "Fast Progression"
    | "Performance Focus"
    | "Team Expansion";

  riskProfile: "Calculated" | "Aggressive" | "Conservative";

  strengths: string[];

  focus: string;

  confidence: number;

  summary: string;
};

type PlaystyleIdentityDefinition = {
  identity: string;
  playstyle: string;
  primaryFocus: string;
  strength: string;
};

type GoalIdentityDefinition = {
  focus: string;
  confidenceBonus: number;
};

const PLAYSTYLE_IDENTITY_MAP: Record<
  AtlasPlaystyleId,
  PlaystyleIdentityDefinition
> = {
  entrepreneur: {
    identity: "Strategic Entrepreneur",
    playstyle: "Empire Builder",
    primaryFocus: "Businesses and Income",
    strength: "Strategic investment decisions",
  },

  collector: {
    identity: "Elite Collector",
    playstyle: "Collection Specialist",
    primaryFocus: "Vehicles, Properties, and Rare Unlocks",
    strength: "Building valuable collections",
  },

  racer: {
    identity: "Competitive Racer",
    playstyle: "Performance Driver",
    primaryFocus: "Vehicles and Racing",
    strength: "Vehicle performance optimization",
  },

  explorer: {
    identity: "World Explorer",
    playstyle: "Discovery Specialist",
    primaryFocus: "Exploration and Hidden Content",
    strength: "Discovering valuable opportunities",
  },

  completionist: {
    identity: "Completion Master",
    playstyle: "Progression Specialist",
    primaryFocus: "Missions and Full Completion",
    strength: "Systematic progression",
  },

  "solo-operator": {
    identity: "Efficient Solo Operator",
    playstyle: "Independent Specialist",
    primaryFocus: "Solo Missions and Efficient Progression",
    strength: "Independent decision making",
  },
};

const GOAL_IDENTITY_MAP: Record<
  AtlasOnboardingGoalId,
  GoalIdentityDefinition
> = {
  "build-biggest-empire": {
    focus: "Business Expansion",
    confidenceBonus: 4,
  },

  "own-everything": {
    focus: "Collection Growth",
    confidenceBonus: 3,
  },

  "complete-everything": {
    focus: "Game Completion",
    confidenceBonus: 3,
  },

  "become-wealthy": {
    focus: "Cash Flow and ROI",
    confidenceBonus: 4,
  },

  "explore-everything": {
    focus: "World Discovery",
    confidenceBonus: 3,
  },

  "dominate-online": {
    focus: "Competitive Online Progression",
    confidenceBonus: 4,
  },
};

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function getCombinedIdentityTitle(
  playstyles: AtlasPlaystyleId[],
): string {
  const primaryPlaystyle = playstyles[0];

  if (!primaryPlaystyle) {
    return "Balanced Operator";
  }

  const hasEntrepreneur = playstyles.includes("entrepreneur");
  const hasSoloOperator = playstyles.includes("solo-operator");
  const hasCollector = playstyles.includes("collector");
  const hasRacer = playstyles.includes("racer");
  const hasExplorer = playstyles.includes("explorer");
  const hasCompletionist = playstyles.includes("completionist");

  if (hasEntrepreneur && hasSoloOperator) {
    return "Solo Empire Builder";
  }

  if (hasEntrepreneur && hasCollector) {
    return "Luxury Empire Builder";
  }

  if (hasEntrepreneur && hasRacer) {
    return "Performance Entrepreneur";
  }

  if (hasExplorer && hasCollector) {
    return "Discovery Collector";
  }

  if (hasCompletionist && hasExplorer) {
    return "World Completion Specialist";
  }

  if (hasRacer && hasCollector) {
    return "Elite Vehicle Collector";
  }

  return PLAYSTYLE_IDENTITY_MAP[primaryPlaystyle].identity;
}

export function buildOnboardingIdentity(
  answers: AtlasOnboardingAnswers,
): AtlasIdentityResult {
  const primaryPlaystyleId = answers.playstyles[0];
  const secondaryPlaystyleId = answers.playstyles[1];
  const primaryGoalId = answers.goals[0];
  const secondaryGoalId = answers.goals[1];

  const primaryPlaystyle = primaryPlaystyleId
    ? PLAYSTYLE_IDENTITY_MAP[primaryPlaystyleId]
    : null;

  const secondaryPlaystyle = secondaryPlaystyleId
    ? PLAYSTYLE_IDENTITY_MAP[secondaryPlaystyleId]
    : null;

  const primaryGoal = primaryGoalId
    ? GOAL_IDENTITY_MAP[primaryGoalId]
    : null;

  const secondaryGoal = secondaryGoalId
    ? GOAL_IDENTITY_MAP[secondaryGoalId]
    : null;

  const confidenceBonus = answers.goals.reduce(
    (total, goalId) =>
      total + GOAL_IDENTITY_MAP[goalId].confidenceBonus,
    0,
  );

  const confidence = Math.min(
    96,
    66 + answers.playstyles.length * 6 + confidenceBonus,
  );

  const strengths = unique(
    answers.playstyles.map(
      (playstyleId) =>
        PLAYSTYLE_IDENTITY_MAP[playstyleId].strength,
    ),
  );

  const identity = getCombinedIdentityTitle(answers.playstyles);

  const playstyle =
    primaryPlaystyle?.playstyle ?? "Balanced Operator";

  const primaryFocus =
    primaryGoal?.focus ??
    primaryPlaystyle?.primaryFocus ??
    "Balanced Progression";

  const secondaryFocus =
    secondaryGoal?.focus ??
    secondaryPlaystyle?.primaryFocus ??
    "Flexible Growth";

  const strengthSummary =
    strengths.length > 0
      ? ` Your strongest tendencies are ${strengths
          .slice(0, 2)
          .join(" and ")
          .toLowerCase()}.`
      : "";

  return {
    identity,
    playstyle,
    primaryFocus,
    secondaryFocus,
    confidence,
    explanation:
      `Atlas combined your selected playstyles and goals to create an initial player identity. Your recommended focus is ${primaryFocus.toLowerCase()}, followed by ${secondaryFocus.toLowerCase()}.${strengthSummary} This identity will continue evolving as Atlas learns from your progression.`,
  };
}

export function buildPlayerIdentity(
  profile: PlayerProfile,
): AtlasPlayerIdentity {
  const strengths: string[] = [];

  let archetype: AtlasPlayerIdentity["archetype"] =
    "Empire Builder";

  let strategy: AtlasPlayerIdentity["strategy"] =
    "Long-Term Growth";

  let riskProfile: AtlasPlayerIdentity["riskProfile"] =
    "Calculated";

  if (profile.playstyle === "solo") {
    archetype = "Solo Operator";
    strategy = "Fast Progression";

    strengths.push("Independent decision making");
  }

  if (profile.playstyle === "crew") {
    archetype = "Crew Specialist";
    strategy = "Team Expansion";

    strengths.push("Team-based progression");
  }

  if (profile.playstyle === "racing") {
    archetype = "Competitive Driver";
    strategy = "Performance Focus";

    strengths.push("Vehicle optimization");
  }

  if (profile.playstyle === "business") {
    strengths.push("Building scalable income assets");
    strengths.push("Strategic investment decisions");
  }

  if (profile.cash > 5_000_000) {
    riskProfile = "Aggressive";

    strengths.push("Strong financial flexibility");
  }

  if (profile.cash < 500_000) {
    riskProfile = "Conservative";
  }

  return {
    archetype,
    strategy,
    riskProfile,
    strengths: unique(strengths),

    focus:
      profile.playstyle === "business"
        ? "Growing your empire through smart investments."
        : "Optimizing your preferred playstyle.",

    confidence: Math.min(
      95,
      60 +
        profile.ownedBusinesses.length * 5 +
        profile.ownedVehicles.length * 3,
    ),

    summary:
      "Atlas is building your player identity from your decisions, assets, and progression style.",
  };
}