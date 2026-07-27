import type {
  AtlasWorldContext,
} from "@/app/intelligence";

import type {
  AtlasWorldConfiguration,
  AtlasWorldIntensity,
  AtlasWorldState,
} from "./atlas-world.types";


export type BuildAtlasWorldConfigurationInput = {
  context:
    AtlasWorldContext | null;

  state:
    AtlasWorldState;

  active?:
    boolean;
};


function deriveWorldIntensity(
  context: AtlasWorldContext | null,
  state: AtlasWorldState
): AtlasWorldIntensity {
  if (
    state === "loading" ||
    state === "warning" ||
    state === "failed"
  ) {
    return "high";
  }

  if (
    !context
  ) {
    return "low";
  }

  if (
    context.heat === "critical" ||
    context.heat === "elevated"
  ) {
    return "high";
  }

  if (
    context.operatingStatus === "dominate" ||
    context.operatingStatus === "expand" ||
    context.economy === "surging"
  ) {
    return "medium";
  }

  return "low";
}


export function buildAtlasWorldConfiguration({
  context,
  state,
  active = true,
}: BuildAtlasWorldConfigurationInput):
  AtlasWorldConfiguration {
  return {
    state,

    intensity:
      deriveWorldIntensity(
        context,
        state
      ),

    active,

    district:
      context?.district.id ??
      null,

    districtCategory:
      context?.district.category ??
      null,

    economy:
      context?.economy ??
      null,

    heat:
      context?.heat ??
      null,

    timeOfDay:
      context?.timeOfDay ??
      null,

    weather:
      context?.weather ??
      null,

    operatingStatus:
      context?.operatingStatus ??
      null,
  };
}
