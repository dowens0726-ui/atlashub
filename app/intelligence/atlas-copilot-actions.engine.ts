import type {
  AtlasRouteContext,
} from "./atlas-route-context.types";


export type AtlasCopilotAction = {
  id:
    string;

  label:
    string;

  prompt:
    string;

  description:
    string;
};


export type BuildAtlasCopilotActionsInput = {
  routeContext:
    AtlasRouteContext;

  limit?:
    number;
};


function formatEntityName(
  slug:
    string
): string {
  return slug
    .replace(
      /[_-]+/g,
      " "
    )
    .split(" ")
    .filter(Boolean)
    .map(
      (
        segment
      ) =>
        segment.charAt(0)
          .toUpperCase() +
        segment.slice(1)
    )
    .join(" ");
}


function createEntityActions(
  routeContext:
    AtlasRouteContext
): AtlasCopilotAction[] {
  if (
    !routeContext.entitySlug
  ) {
    return [];
  }

  const entityName =
    formatEntityName(
      routeContext.entitySlug
    );

  switch (
    routeContext.domain
  ) {
    case "vehicle":
      return [
        {
          id:
            "analyze-current-vehicle",

          label:
            `Analyze ${entityName}`,

          prompt:
            `Analyze ${entityName} and tell me whether it is a strong vehicle for my current progression.`,

          description:
            "Evaluate performance, utility, ownership value, and strategic fit.",
        },

        {
          id:
            "compare-current-vehicle",

          label:
            "Compare This Vehicle",

          prompt:
            `Compare ${entityName} with the strongest alternatives for my current position.`,

          description:
            "Identify better options based on performance, utility, and cost.",
        },

        {
          id:
            "vehicle-ownership-fit",

          label:
            "Ownership Fit",

          prompt:
            `Does ${entityName} fit my current garage, playstyle, and empire priorities?`,

          description:
            "Determine whether this vehicle fills a meaningful ownership role.",
        },

        {
          id:
            "vehicle-best-alternative",

          label:
            "Find Better Alternative",

          prompt:
            `Find the best alternative to ${entityName} for my current goals.`,

          description:
            "Surface a stronger purchase if this vehicle is not the best fit.",
        },
      ];

    case "business":
      return [
        {
          id:
            "analyze-current-business",

          label:
            `Analyze ${entityName}`,

          prompt:
            `Analyze ${entityName} as an investment for my current empire.`,

          description:
            "Evaluate profitability, acquisition timing, and strategic impact.",
        },

        {
          id:
            "compare-current-business",

          label:
            "Compare This Business",

          prompt:
            `Compare ${entityName} with the strongest business investments available to me.`,

          description:
            "Compare income, payback period, utility, and growth potential.",
        },

        {
          id:
            "business-roi",

          label:
            "Calculate ROI",

          prompt:
            `Evaluate the return on investment and payback potential of ${entityName}.`,

          description:
            "Measure whether the investment is justified by its expected return.",
        },

        {
          id:
            "business-purchase-timing",

          label:
            "Purchase Timing",

          prompt:
            `Should I purchase ${entityName} now or prioritize another investment first?`,

          description:
            "Determine whether this is the right stage of progression to buy.",
        },
      ];

    case "property":
      return [
        {
          id:
            "analyze-current-property",

          label:
            `Analyze ${entityName}`,

          prompt:
            `Analyze ${entityName} and explain how it supports my current progression.`,

          description:
            "Evaluate access, utility, ownership priority, and strategic value.",
        },

        {
          id:
            "compare-current-property",

          label:
            "Compare This Property",

          prompt:
            `Compare ${entityName} with the strongest property alternatives.`,

          description:
            "Identify whether another property offers greater practical value.",
        },

        {
          id:
            "property-ownership-fit",

          label:
            "Ownership Fit",

          prompt:
            `Does ${entityName} fit my current empire strategy and ownership needs?`,

          description:
            "Determine whether the property fills an important progression role.",
        },

        {
          id:
            "property-purchase-timing",

          label:
            "Purchase Timing",

          prompt:
            `Should I purchase ${entityName} now or wait until later in my progression?`,

          description:
            "Evaluate whether the purchase should be an immediate priority.",
        },
      ];

    case "mission":
      return [
        {
          id:
            "analyze-current-mission",

          label:
            `Analyze ${entityName}`,

          prompt:
            `Analyze ${entityName} for payout, difficulty, preparation, and progression value.`,

          description:
            "Evaluate whether this mission is worth prioritizing.",
        },

        {
          id:
            "mission-strategy",

          label:
            "Build Mission Strategy",

          prompt:
            `Build the best strategy for completing ${entityName} efficiently.`,

          description:
            "Create a practical preparation and execution plan.",
        },

        {
          id:
            "compare-current-mission",

          label:
            "Compare This Mission",

          prompt:
            `Compare ${entityName} with other missions available for my current goals.`,

          description:
            "Find a stronger alternative based on payout and time efficiency.",
        },

        {
          id:
            "mission-readiness",

          label:
            "Check Readiness",

          prompt:
            `Am I ready to complete ${entityName}, and what should I prepare first?`,

          description:
            "Identify missing equipment, vehicles, or progression requirements.",
        },
      ];

    case "combat":
      return [
        {
          id:
            "analyze-current-weapon",

          label:
            `Analyze ${entityName}`,

          prompt:
            `Analyze ${entityName} for combat performance and current loadout value.`,

          description:
            "Evaluate damage, utility, role, and upgrade priority.",
        },

        {
          id:
            "compare-current-weapon",

          label:
            "Compare This Weapon",

          prompt:
            `Compare ${entityName} with the strongest alternatives for my current needs.`,

          description:
            "Find a better option for missions, PvE, or competitive combat.",
        },

        {
          id:
            "weapon-loadout-fit",

          label:
            "Loadout Fit",

          prompt:
            `How should ${entityName} fit into my current combat loadout?`,

          description:
            "Determine the weapon's role and ideal supporting equipment.",
        },

        {
          id:
            "weapon-upgrade-priority",

          label:
            "Upgrade Priority",

          prompt:
            `Should I prioritize purchasing or upgrading ${entityName}?`,

          description:
            "Evaluate whether this weapon deserves immediate investment.",
        },
      ];

    default:
      return [
        {
          id:
            "analyze-current-entity",

          label:
            `Analyze ${entityName}`,

          prompt:
            `Analyze ${entityName} and explain its strategic value for my current progression.`,

          description:
            "Evaluate this subject using your current Atlas context.",
        },

        {
          id:
            "compare-current-entity",

          label:
            "Compare This",

          prompt:
            `Compare ${entityName} with the strongest available alternatives.`,

          description:
            "Identify whether a better option is available.",
        },
      ];
  }
}


function createSectionActions(
  routeContext:
    AtlasRouteContext
): AtlasCopilotAction[] {
  switch (
    routeContext.section
  ) {
    case "dashboard":
      return [
        {
          id:
            "review-empire",

          label:
            "Review Empire",

          prompt:
            "Review my current empire and identify the most important opportunity.",

          description:
            "Assess your complete position and surface the strongest next move.",
        },

        {
          id:
            "find-highest-roi",

          label:
            "Highest ROI",

          prompt:
            "What is the highest-return investment available to me right now?",

          description:
            "Find the strongest return based on your current resources.",
        },

        {
          id:
            "find-bottleneck",

          label:
            "Find Bottleneck",

          prompt:
            "What is currently slowing down my empire progression?",

          description:
            "Identify the largest weakness limiting your growth.",
        },

        {
          id:
            "next-expansion",

          label:
            "Next Expansion",

          prompt:
            "What should I acquire next to expand my empire efficiently?",

          description:
            "Prioritize the best business, property, or strategic upgrade.",
        },
      ];

    case "vehicles":
    case "manufacturers":
    case "garage_builder":
      return [
        {
          id:
            "best-vehicle",

          label:
            "Best Vehicle",

          prompt:
            "Which vehicle is the best purchase for my current goals?",

          description:
            "Balance performance, utility, price, and progression value.",
        },

        {
          id:
            "compare-vehicles",

          label:
            "Compare Vehicles",

          prompt:
            "Compare the strongest vehicle options for my current position.",

          description:
            "Evaluate the most relevant vehicles side by side.",
        },

        {
          id:
            "best-upgrade",

          label:
            "Best Upgrade",

          prompt:
            "What is the best vehicle upgrade for my current garage?",

          description:
            "Find the upgrade that adds the most meaningful capability.",
        },

        {
          id:
            "vehicle-value",

          label:
            "Best Value",

          prompt:
            "Which vehicle provides the best overall value for its price?",

          description:
            "Identify the strongest performance and utility per dollar.",
        },
      ];

    case "businesses":
      return [
        {
          id:
            "highest-business-roi",

          label:
            "Highest ROI",

          prompt:
            "Which business offers the highest return on investment for me?",

          description:
            "Compare profitability, payback period, and progression value.",
        },

        {
          id:
            "compare-businesses",

          label:
            "Compare Businesses",

          prompt:
            "Compare the strongest businesses available for my next investment.",

          description:
            "Evaluate income, utility, cost, and long-term empire impact.",
        },

        {
          id:
            "business-expansion",

          label:
            "Expansion Strategy",

          prompt:
            "Build the best business expansion strategy for my current empire.",

          description:
            "Create a prioritized acquisition path for sustainable growth.",
        },

        {
          id:
            "optimize-business-income",

          label:
            "Optimize Income",

          prompt:
            "How can I improve the income generated by my current businesses?",

          description:
            "Find upgrades and operational changes that increase profit.",
        },
      ];

    case "planner":
      return [
        {
          id:
            "plan-short-session",

          label:
            "Plan 30 Minutes",

          prompt:
            "Plan the most productive 30-minute session for me.",

          description:
            "Create a focused sequence for a short play session.",
        },

        {
          id:
            "plan-standard-session",

          label:
            "Plan 60 Minutes",

          prompt:
            "Plan the most productive 60-minute session for me.",

          description:
            "Build a balanced session around progression and income.",
        },

        {
          id:
            "prioritize-objectives",

          label:
            "Prioritize Objectives",

          prompt:
            "Rank my current objectives in the order I should complete them.",

          description:
            "Turn competing goals into a clear progression sequence.",
        },

        {
          id:
            "remove-session-bottlenecks",

          label:
            "Remove Bottlenecks",

          prompt:
            "Identify and remove the biggest bottlenecks in my current plan.",

          description:
            "Improve efficiency by resolving blocked or low-value steps.",
        },
      ];

    case "missions":
      return [
        {
          id:
            "best-mission-payout",

          label:
            "Best Payout",

          prompt:
            "Which mission gives me the best payout for my current position?",

          description:
            "Find the strongest earning opportunity among available missions.",
        },

        {
          id:
            "fastest-mission-progression",

          label:
            "Fastest Progression",

          prompt:
            "Which mission will advance my progression the fastest?",

          description:
            "Prioritize unlocks, reputation, and strategic advancement.",
        },

        {
          id:
            "solo-mission-strategy",

          label:
            "Best Solo Strategy",

          prompt:
            "What is the best mission strategy for a solo session?",

          description:
            "Find efficient missions and preparation for independent play.",
        },

        {
          id:
            "compare-missions",

          label:
            "Compare Missions",

          prompt:
            "Compare the strongest missions for payout, difficulty, and time efficiency.",

          description:
            "Choose the best activity for your available time and resources.",
        },
      ];

    case "properties":
      return [
        {
          id:
            "best-property",

          label:
            "Best Property",

          prompt:
            "Which property should I purchase next?",

          description:
            "Compare utility, access, cost, and progression impact.",
        },

        {
          id:
            "compare-properties",

          label:
            "Compare Properties",

          prompt:
            "Compare the strongest property purchases for my current position.",

          description:
            "Identify the property that adds the most practical value.",
        },

        {
          id:
            "property-priority",

          label:
            "Purchase Priority",

          prompt:
            "Where should property ownership rank among my current priorities?",

          description:
            "Determine whether a property should come before other investments.",
        },

        {
          id:
            "property-utility",

          label:
            "Best Utility",

          prompt:
            "Which property provides the strongest overall utility?",

          description:
            "Find the property with the most useful access and capabilities.",
        },
      ];

    case "weapons":
      return [
        {
          id:
            "best-loadout",

          label:
            "Best Loadout",

          prompt:
            "Build the best combat loadout for my current progression.",

          description:
            "Optimize weapons and roles for your current needs.",
        },

        {
          id:
            "mission-loadout",

          label:
            "Mission Loadout",

          prompt:
            "Build the best weapon loadout for missions and PvE combat.",

          description:
            "Prioritize reliability, damage, range, and ammunition efficiency.",
        },

        {
          id:
            "weapon-upgrade",

          label:
            "Best Upgrade",

          prompt:
            "Which weapon should I purchase or upgrade next?",

          description:
            "Identify the combat investment with the greatest impact.",
        },

        {
          id:
            "compare-weapons",

          label:
            "Compare Weapons",

          prompt:
            "Compare the strongest weapons for my current combat needs.",

          description:
            "Evaluate performance, utility, and strategic role.",
        },
      ];

    case "collections":
    case "explorer":
    case "map":
      return [
        {
          id:
            "surface-discoveries",

          label:
            "Find Discoveries",

          prompt:
            "What are the most valuable discoveries I should pursue next?",

          description:
            "Surface high-priority collectibles, locations, and opportunities.",
        },

        {
          id:
            "collection-progress",

          label:
            "Review Progress",

          prompt:
            "Review my exploration and collection progress.",

          description:
            "Identify completed areas, missing targets, and next priorities.",
        },

        {
          id:
            "exploration-route",

          label:
            "Build Route",

          prompt:
            "Build an efficient route for my next exploration session.",

          description:
            "Sequence nearby discoveries to reduce wasted travel time.",
        },

        {
          id:
            "rare-targets",

          label:
            "Rare Targets",

          prompt:
            "Which rare or high-value targets should I prioritize?",

          description:
            "Focus your next session on the most meaningful discoveries.",
        },
      ];

    case "rankings":
    case "compare":
      return [
        {
          id:
            "compare-best-options",

          label:
            "Compare Best Options",

          prompt:
            "Compare the strongest options available for my current goals.",

          description:
            "Rank competing choices using Atlas strategic priorities.",
        },

        {
          id:
            "best-overall-choice",

          label:
            "Best Overall Choice",

          prompt:
            "Which option is the best overall choice for my current position?",

          description:
            "Identify the strongest balance of value, utility, and timing.",
        },

        {
          id:
            "best-value-choice",

          label:
            "Best Value",

          prompt:
            "Which option provides the best value for its cost?",

          description:
            "Find the greatest practical return for your available resources.",
        },

        {
          id:
            "best-long-term-choice",

          label:
            "Best Long-Term Choice",

          prompt:
            "Which option provides the strongest long-term strategic value?",

          description:
            "Prioritize lasting progression impact over short-term gains.",
        },
      ];

    case "copilot":
    default:
      return [
        {
          id:
            "make-money",

          label:
            "Make Money",

          prompt:
            "What is the fastest way for me to make money right now?",

          description:
            "Find the highest-value activity available for your current position.",
        },

        {
          id:
            "expand-empire",

          label:
            "Expand Empire",

          prompt:
            "What should I invest in next to expand my empire?",

          description:
            "Compare your next business, property, and progression opportunities.",
        },

        {
          id:
            "plan-session",

          label:
            "Plan Session",

          prompt:
            "Plan my next 45-minute session.",

          description:
            "Build an efficient sequence of objectives for your available time.",
        },

        {
          id:
            "find-bottleneck",

          label:
            "Find Bottleneck",

          prompt:
            "What is currently slowing down my empire progression?",

          description:
            "Identify the largest weakness limiting your growth.",
        },
      ];
  }
}


export function buildAtlasCopilotActions({
  routeContext,
  limit = 4,
}: BuildAtlasCopilotActionsInput):
  AtlasCopilotAction[] {
  const actions =
    routeContext.entitySlug
      ? createEntityActions(
          routeContext
        )
      : createSectionActions(
          routeContext
        );

  const normalizedLimit =
    Math.max(
      1,
      Math.floor(
        limit
      )
    );

  return actions.slice(
    0,
    normalizedLimit
  );
}
