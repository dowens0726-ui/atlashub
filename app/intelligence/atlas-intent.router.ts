import type {
  AtlasIntentClassification,
  AtlasIntentRoute,
  AtlasIntentType,
} from "./atlas-intent.types";


type AtlasIntentRouteDefinition =
  Omit<
    AtlasIntentRoute,
    "metadata"
  >;


const ROUTES:
  Record<
    AtlasIntentType,
    AtlasIntentRouteDefinition
  > =
  {
    make_money: {
      intent:
        "make_money",

      domain:
        "economy",

      strategy:
        "maximize_income",

      title:
        "Income Optimization",

      description:
        "Identify the strongest available path for increasing active or passive income.",

      strategicObjective:
        "Maximize near-term earnings without weakening long-term empire growth.",

      responseSections: [
        "Strategic Assessment",
        "Primary Recommendation",
        "Income Rationale",
        "Expected Impact",
        "Immediate Next Step",
      ],
    },

    buy_business: {
      intent:
        "buy_business",

      domain:
        "business",

      strategy:
        "evaluate_business",

      title:
        "Business Acquisition",

      description:
        "Evaluate available business investments against the player’s current economy and progression.",

      strategicObjective:
        "Select the business purchase with the strongest strategic and financial fit.",

      responseSections: [
        "Business Assessment",
        "Recommended Acquisition",
        "Return Profile",
        "Requirements",
        "Immediate Next Step",
      ],
    },

    buy_property: {
      intent:
        "buy_property",

      domain:
        "property",

      strategy:
        "evaluate_property",

      title:
        "Property Acquisition",

      description:
        "Evaluate property utility, progression impact, and affordability.",

      strategicObjective:
        "Select the property that unlocks the highest-value capability for the current empire.",

      responseSections: [
        "Property Assessment",
        "Recommended Property",
        "Strategic Utility",
        "Affordability",
        "Immediate Next Step",
      ],
    },

    buy_vehicle: {
      intent:
        "buy_vehicle",

      domain:
        "vehicle",

      strategy:
        "evaluate_vehicle",

      title:
        "Vehicle Acquisition",

      description:
        "Evaluate vehicle performance, utility, affordability, and progression value.",

      strategicObjective:
        "Recommend the vehicle that best supports the player’s current priorities.",

      responseSections: [
        "Vehicle Assessment",
        "Recommended Vehicle",
        "Why It Fits",
        "Budget Considerations",
        "Immediate Next Step",
      ],
    },

    compare: {
      intent:
        "compare",

      domain:
        "progression",

      strategy:
        "compare_options",

      title:
        "Strategic Comparison",

      description:
        "Compare competing options using value, utility, timing, and strategic impact.",

      strategicObjective:
        "Determine which available option creates the strongest overall outcome.",

      responseSections: [
        "Comparison Summary",
        "Option Strengths",
        "Option Weaknesses",
        "Atlas Recommendation",
        "Decision Rule",
      ],
    },

    plan_session: {
      intent:
        "plan_session",

      domain:
        "planning",

      strategy:
        "build_session_plan",

      title:
        "Session Planning",

      description:
        "Build an efficient sequence of activities for the player’s available time.",

      strategicObjective:
        "Maximize progress, income, and momentum during the current play session.",

      responseSections: [
        "Session Objective",
        "Recommended Sequence",
        "Time Allocation",
        "Expected Outcome",
        "Fallback Plan",
      ],
    },

    next_action: {
      intent:
        "next_action",

      domain:
        "progression",

      strategy:
        "select_next_action",

      title:
        "Immediate Priority",

      description:
        "Select the strongest immediate action based on the current Atlas state.",

      strategicObjective:
        "Move the player toward the highest-value next milestone.",

      responseSections: [
        "Current Assessment",
        "Next Action",
        "Why Now",
        "Expected Impact",
        "Follow-Up Action",
      ],
    },

    empire_analysis: {
      intent:
        "empire_analysis",

      domain:
        "progression",

      strategy:
        "diagnose_empire",

      title:
        "Empire Diagnosis",

      description:
        "Identify bottlenecks, weaknesses, and underdeveloped areas in the player’s empire.",

      strategicObjective:
        "Remove the largest constraint limiting current progression.",

      responseSections: [
        "Empire Health",
        "Primary Bottleneck",
        "Supporting Evidence",
        "Corrective Action",
        "Long-Term Direction",
      ],
    },

    missions: {
      intent:
        "missions",

      domain:
        "mission",

      strategy:
        "optimize_missions",

      title:
        "Mission Strategy",

      description:
        "Recommend mission priorities, execution strategy, or mission progression.",

      strategicObjective:
        "Improve mission efficiency, completion reliability, and strategic reward.",

      responseSections: [
        "Mission Assessment",
        "Recommended Mission",
        "Execution Strategy",
        "Reward Impact",
        "Preparation",
      ],
    },

    weapons: {
      intent:
        "weapons",

      domain:
        "combat",

      strategy:
        "optimize_loadout",

      title:
        "Combat Optimization",

      description:
        "Evaluate weapons, loadouts, and combat priorities for the player’s current needs.",

      strategicObjective:
        "Build the most effective combat setup for the intended activity.",

      responseSections: [
        "Combat Assessment",
        "Recommended Loadout",
        "Role Coverage",
        "Upgrade Priority",
        "Immediate Next Step",
      ],
    },

    exploration: {
      intent:
        "exploration",

      domain:
        "exploration",

      strategy:
        "surface_discoveries",

      title:
        "Exploration Intelligence",

      description:
        "Surface relevant discoveries, collectibles, hidden content, and unexplored opportunities.",

      strategicObjective:
        "Direct the player toward valuable content they have not yet completed or discovered.",

      responseSections: [
        "Exploration Brief",
        "Recommended Discovery",
        "Location or Requirement",
        "Reward",
        "Next Discovery",
      ],
    },

    general: {
      intent:
        "general",

      domain:
        "general",

      strategy:
        "general_advisor",

      title:
        "General Atlas Advisory",

      description:
        "Use the broader Atlas intelligence system to answer an unspecialized strategic prompt.",

      strategicObjective:
        "Provide the strongest generally applicable recommendation from the current player state.",

      responseSections: [
        "Strategic Assessment",
        "Primary Recommendation",
        "Reasoning",
        "Immediate Next Step",
        "Long-Term Direction",
      ],
    },
  };


export function routeAtlasIntent(
  classification:
    AtlasIntentClassification
): AtlasIntentRoute {
  const route =
    ROUTES[
      classification.primary.intent
    ];

  return {
    ...route,

    metadata: {
      confidence:
        classification.primary.confidence,

      confidenceLevel:
        classification.primary.confidenceLevel,

      ambiguous:
        classification.ambiguous,

      matchedKeywords:
        classification.primary.matchedKeywords,

      matchedPatterns:
        classification.primary.matchedPatterns,

      alternativeIntents:
        classification.alternatives.map(
          (
            match
          ) =>
            match.intent
        ),
    },
  };
}
