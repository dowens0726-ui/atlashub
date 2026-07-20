export type AtlasPlan = "free" | "pro" | "internal";

export type AtlasCapability =
  | "core-data"
  | "global-search"
  | "entity-comparison"
  | "basic-planner"
  | "basic-copilot"
  | "empire-score"
  | "personalized-copilot"
  | "copilot-history"
  | "atlas-memory"
  | "empire-forecast"
  | "empire-simulator"
  | "advanced-advisor"
  | "session-optimizer"
  | "roi-intelligence"
  | "weekly-empire-report";

export type AtlasCapabilityStatus =
  | "available"
  | "preview"
  | "unavailable";

export type AtlasCapabilityCategory =
  | "data"
  | "planning"
  | "intelligence"
  | "personalization"
  | "forecasting";

export type AtlasCapabilityDefinition = {
  id: AtlasCapability;
  name: string;
  description: string;
  category: AtlasCapabilityCategory;
  minimumPlan: AtlasPlan;
  previewAvailable: boolean;
};

export type AtlasCapabilityOverride = {
  capability: AtlasCapability;
  enabled: boolean;
};

export type AtlasCapabilityContext = {
  plan: AtlasPlan;
  overrides?: readonly AtlasCapabilityOverride[];
};

export type AtlasCapabilityEvaluation = {
  capability: AtlasCapability;
  status: AtlasCapabilityStatus;
  enabled: boolean;
  plan: AtlasPlan;
  requiredPlan: AtlasPlan;
  previewAvailable: boolean;
  reason:
    | "included-in-plan"
    | "enabled-by-override"
    | "disabled-by-override"
    | "upgrade-required";
};