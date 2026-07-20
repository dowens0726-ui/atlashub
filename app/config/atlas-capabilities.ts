import type {
  AtlasCapability,
  AtlasCapabilityDefinition,
  AtlasPlan,
} from "@/app/types/atlas-capability";

export const ATLAS_PLAN_ORDER: Record<AtlasPlan, number> = {
  free: 0,
  pro: 1,
  internal: 2,
};

export const ATLAS_CAPABILITIES: Record<
  AtlasCapability,
  AtlasCapabilityDefinition
> = {
  "core-data": {
    id: "core-data",
    name: "Atlas Data",
    description:
      "Access the Atlas database for vehicles, businesses, missions, properties, weapons, and other game entities.",
    category: "data",
    minimumPlan: "free",
    previewAvailable: false,
  },

  "global-search": {
    id: "global-search",
    name: "Global Search",
    description:
      "Search across Atlas entities, guides, collections, and intelligence content.",
    category: "data",
    minimumPlan: "free",
    previewAvailable: false,
  },

  "entity-comparison": {
    id: "entity-comparison",
    name: "Entity Comparison",
    description:
      "Compare vehicles, businesses, weapons, properties, and other supported entities.",
    category: "data",
    minimumPlan: "free",
    previewAvailable: false,
  },

  "basic-planner": {
    id: "basic-planner",
    name: "Mission Planner",
    description:
      "Build and manage basic activity plans, objectives, and gameplay priorities.",
    category: "planning",
    minimumPlan: "free",
    previewAvailable: false,
  },

  "basic-copilot": {
    id: "basic-copilot",
    name: "Atlas Copilot",
    description:
      "Receive general Atlas guidance using the core intelligence system.",
    category: "intelligence",
    minimumPlan: "free",
    previewAvailable: false,
  },

  "empire-score": {
    id: "empire-score",
    name: "Empire Score",
    description:
      "Measure the current strength, progression, and balance of a player's empire.",
    category: "intelligence",
    minimumPlan: "free",
    previewAvailable: false,
  },

  "personalized-copilot": {
    id: "personalized-copilot",
    name: "Personalized Copilot",
    description:
      "Receive recommendations tailored to the player's profile, goals, assets, and playstyle.",
    category: "personalization",
    minimumPlan: "pro",
    previewAvailable: true,
  },

  "copilot-history": {
    id: "copilot-history",
    name: "Copilot History",
    description:
      "Preserve and revisit prior Atlas Copilot conversations, recommendations, and decisions.",
    category: "personalization",
    minimumPlan: "pro",
    previewAvailable: true,
  },

  "atlas-memory": {
    id: "atlas-memory",
    name: "Atlas Memory",
    description:
      "Allow Atlas to remember meaningful player activity, preferences, milestones, and strategic patterns.",
    category: "personalization",
    minimumPlan: "pro",
    previewAvailable: true,
  },

  "empire-forecast": {
    id: "empire-forecast",
    name: "Empire Forecast",
    description:
      "Project how future purchases and strategic decisions may affect progression and empire strength.",
    category: "forecasting",
    minimumPlan: "pro",
    previewAvailable: true,
  },

  "empire-simulator": {
    id: "empire-simulator",
    name: "Empire Simulator",
    description:
      "Compare hypothetical purchase paths and simulate their expected strategic impact.",
    category: "forecasting",
    minimumPlan: "pro",
    previewAvailable: true,
  },

  "advanced-advisor": {
    id: "advanced-advisor",
    name: "Advanced Advisor",
    description:
      "Receive deeper recommendations based on player priorities, risk tolerance, and progression strategy.",
    category: "intelligence",
    minimumPlan: "pro",
    previewAvailable: true,
  },

  "session-optimizer": {
    id: "session-optimizer",
    name: "Session Optimizer",
    description:
      "Generate an efficient gameplay route based on available time, goals, and owned assets.",
    category: "planning",
    minimumPlan: "pro",
    previewAvailable: true,
  },

  "roi-intelligence": {
    id: "roi-intelligence",
    name: "ROI Intelligence",
    description:
      "Evaluate purchases using cost recovery, income potential, utility, and opportunity cost.",
    category: "intelligence",
    minimumPlan: "pro",
    previewAvailable: true,
  },

  "weekly-empire-report": {
    id: "weekly-empire-report",
    name: "Weekly Empire Report",
    description:
      "Summarize progression, decisions, opportunities, and recommended priorities over time.",
    category: "personalization",
    minimumPlan: "pro",
    previewAvailable: true,
  },
};

export const ATLAS_CAPABILITY_IDS = Object.freeze(
  Object.keys(ATLAS_CAPABILITIES) as AtlasCapability[]
);

export const ATLAS_FREE_CAPABILITIES = Object.freeze(
  ATLAS_CAPABILITY_IDS.filter(
    (capability) =>
      ATLAS_CAPABILITIES[capability].minimumPlan === "free"
  )
);

export const ATLAS_PRO_CAPABILITIES = Object.freeze(
  ATLAS_CAPABILITY_IDS.filter((capability) => {
    const minimumPlan = ATLAS_CAPABILITIES[capability].minimumPlan;

    return minimumPlan === "free" || minimumPlan === "pro";
  })
);

export const ATLAS_INTERNAL_CAPABILITIES = Object.freeze([
  ...ATLAS_CAPABILITY_IDS,
]);