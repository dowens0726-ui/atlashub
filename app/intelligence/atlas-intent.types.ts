export const ATLAS_INTENT_TYPES = [
  "make_money",
  "buy_business",
  "buy_property",
  "buy_vehicle",
  "compare",
  "plan_session",
  "next_action",
  "empire_analysis",
  "missions",
  "weapons",
  "exploration",
  "general",
] as const;


export type AtlasIntentType =
  (
    typeof ATLAS_INTENT_TYPES
  )[number];


export const ATLAS_INTENT_DOMAINS = [
  "economy",
  "business",
  "property",
  "vehicle",
  "planning",
  "progression",
  "mission",
  "combat",
  "exploration",
  "general",
] as const;


export type AtlasIntentDomain =
  (
    typeof ATLAS_INTENT_DOMAINS
  )[number];


export type AtlasIntentConfidenceLevel =
  | "low"
  | "medium"
  | "high"
  | "very_high";


export type AtlasIntentMatch = {
  intent:
    AtlasIntentType;

  domain:
    AtlasIntentDomain;

  score:
    number;

  confidence:
    number;

  confidenceLevel:
    AtlasIntentConfidenceLevel;

  matchedKeywords:
    string[];

  matchedPatterns:
    string[];

  explanation:
    string;
};


export type AtlasIntentClassification = {
  version:
    number;

  generatedAt:
    string;

  prompt:
    string;

  normalizedPrompt:
    string;

  primary:
    AtlasIntentMatch;

  alternatives:
    AtlasIntentMatch[];

  ambiguous:
    boolean;
};


export type AtlasIntentStrategy =
  | "maximize_income"
  | "evaluate_business"
  | "evaluate_property"
  | "evaluate_vehicle"
  | "compare_options"
  | "build_session_plan"
  | "select_next_action"
  | "diagnose_empire"
  | "optimize_missions"
  | "optimize_loadout"
  | "surface_discoveries"
  | "general_advisor";


export type AtlasIntentRoute = {
  intent:
    AtlasIntentType;

  domain:
    AtlasIntentDomain;

  strategy:
    AtlasIntentStrategy;

  title:
    string;

  description:
    string;

  strategicObjective:
    string;

  responseSections:
    string[];

  metadata:
    Record<string, unknown>;
};


export type AtlasIntentEngineResult = {
  version:
    number;

  generatedAt:
    string;

  classification:
    AtlasIntentClassification;

  route:
    AtlasIntentRoute;
};


export type AtlasIntentDefinition = {
  intent:
    AtlasIntentType;

  domain:
    AtlasIntentDomain;

  keywords:
    string[];

  patterns:
    RegExp[];

  explanation:
    string;
};
