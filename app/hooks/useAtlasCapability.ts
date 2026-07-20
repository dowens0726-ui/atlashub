import {
  evaluateAtlasCapability,
} from "@/app/services";

import type {
  AtlasCapability,
  AtlasCapabilityContext,
  AtlasCapabilityEvaluation,
} from "@/app/types";

const DEFAULT_CONTEXT: AtlasCapabilityContext = {
  plan: "free",
};

export default function useAtlasCapability(
  capability: AtlasCapability,
  context: AtlasCapabilityContext = DEFAULT_CONTEXT
): AtlasCapabilityEvaluation {
  return evaluateAtlasCapability(
    capability,
    context
  );
}