import type {
  AtlasAction,
  AtlasActionId,
  AtlasStrategicActionInput,
} from "./atlas-action.types";


const atlasActionRegistry:
  Record<
    AtlasActionId,
    AtlasAction
  > = {
    "open-copilot": {
      id:
        "open-copilot",

      label:
        "Open Atlas Copilot",

      description:
        "Review the current intelligence state and recommendation with Atlas.",

      href:
        "/copilot",

      category:
        "intelligence",
    },

    "open-planner": {
      id:
        "open-planner",

      label:
        "Open Mission Planner",

      description:
        "Convert the active recommendation into an executable session plan.",

      href:
        "/planner",

      category:
        "planning",
    },

    "open-businesses": {
      id:
        "open-businesses",

      label:
        "Review Businesses",

      description:
        "Evaluate business opportunities, ownership strategy, and expansion options.",

      href:
        "/data/businesses",

      category:
        "economy",
    },

    "open-properties": {
      id:
        "open-properties",

      label:
        "Review Properties",

      description:
        "Assess property progression and strengthen the current empire foundation.",

      href:
        "/properties",

      category:
        "progression",
    },

    "open-vehicles": {
      id:
        "open-vehicles",

      label:
        "Review Vehicles",

      description:
        "Evaluate mobility, performance, and vehicle investment opportunities.",

      href:
        "/vehicles",

      category:
        "mobility",
    },

    "open-missions": {
      id:
        "open-missions",

      label:
        "Open Missions",

      description:
        "Review available missions and act on the current priority opportunity.",

      href:
        "/missions",

      category:
        "mission",
    },

    "open-garage-builder": {
      id:
        "open-garage-builder",

      label:
        "Open Garage Builder",

      description:
        "Build and evaluate a strategic vehicle portfolio.",

      href:
        "/garage-builder",

      category:
        "mobility",
    },

    "review-dashboard": {
      id:
        "review-dashboard",

      label:
        "Review Command Center",

      description:
        "Return to the Atlas command center and review current system conditions.",

      href:
        "/dashboard",

      category:
        "system",
    },
  };


export function getAtlasAction(
  actionId:
    AtlasActionId
): AtlasAction {
  return atlasActionRegistry[
    actionId
  ];
}


export function resolveAtlasStrategicAction({
  empireScore,
  cash,
  shouldActNow,
  pipelineStatus,
}: AtlasStrategicActionInput): AtlasAction {
  if (
    pipelineStatus ===
    "failed"
  ) {
    return getAtlasAction(
      "open-copilot"
    );
  }

  if (
    shouldActNow
  ) {
    return getAtlasAction(
      "open-planner"
    );
  }

  if (
    empireScore <
      50
  ) {
    return getAtlasAction(
      "open-properties"
    );
  }

  if (
    cash >=
      1000000
  ) {
    return getAtlasAction(
      "open-businesses"
    );
  }

  if (
    empireScore >=
      75
  ) {
    return getAtlasAction(
      "open-businesses"
    );
  }

  return getAtlasAction(
    "open-planner"
  );
}


export function getAtlasActionRegistry():
  readonly AtlasAction[] {
  return Object.values(
    atlasActionRegistry
  );
}
