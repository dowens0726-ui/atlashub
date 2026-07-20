import {
  ATLAS_CAPABILITIES,
  ATLAS_CAPABILITY_IDS,
  ATLAS_PLAN_ORDER,
} from "@/app/config/atlas-capabilities";

import type {
  AtlasCapability,
  AtlasCapabilityContext,
  AtlasCapabilityDefinition,
  AtlasCapabilityEvaluation,
  AtlasCapabilityOverride,
  AtlasPlan,
} from "@/app/types/atlas-capability";

function findCapabilityOverride(
  capability: AtlasCapability,
  overrides: readonly AtlasCapabilityOverride[] | undefined
): AtlasCapabilityOverride | undefined {
  return overrides?.find(
    (override) => override.capability === capability
  );
}

function planIncludesCapability(
  plan: AtlasPlan,
  requiredPlan: AtlasPlan
): boolean {
  return ATLAS_PLAN_ORDER[plan] >= ATLAS_PLAN_ORDER[requiredPlan];
}

export function getAtlasCapabilityDefinition(
  capability: AtlasCapability
): AtlasCapabilityDefinition {
  return ATLAS_CAPABILITIES[capability];
}

export function getAtlasCapabilityDefinitions(): readonly AtlasCapabilityDefinition[] {
  return ATLAS_CAPABILITY_IDS.map(
    (capability) => ATLAS_CAPABILITIES[capability]
  );
}

export function getAtlasCapabilitiesForPlan(
  plan: AtlasPlan
): readonly AtlasCapability[] {
  return ATLAS_CAPABILITY_IDS.filter((capability) => {
    const definition = ATLAS_CAPABILITIES[capability];

    return planIncludesCapability(plan, definition.minimumPlan);
  });
}

export function evaluateAtlasCapability(
  capability: AtlasCapability,
  context: AtlasCapabilityContext
): AtlasCapabilityEvaluation {
  const definition = getAtlasCapabilityDefinition(capability);
  const override = findCapabilityOverride(
    capability,
    context.overrides
  );

  if (override?.enabled === true) {
    return {
      capability,
      status: "available",
      enabled: true,
      plan: context.plan,
      requiredPlan: definition.minimumPlan,
      previewAvailable: definition.previewAvailable,
      reason: "enabled-by-override",
    };
  }

  if (override?.enabled === false) {
    return {
      capability,
      status: definition.previewAvailable
        ? "preview"
        : "unavailable",
      enabled: false,
      plan: context.plan,
      requiredPlan: definition.minimumPlan,
      previewAvailable: definition.previewAvailable,
      reason: "disabled-by-override",
    };
  }

  if (
    planIncludesCapability(
      context.plan,
      definition.minimumPlan
    )
  ) {
    return {
      capability,
      status: "available",
      enabled: true,
      plan: context.plan,
      requiredPlan: definition.minimumPlan,
      previewAvailable: definition.previewAvailable,
      reason: "included-in-plan",
    };
  }

  return {
    capability,
    status: definition.previewAvailable
      ? "preview"
      : "unavailable",
    enabled: false,
    plan: context.plan,
    requiredPlan: definition.minimumPlan,
    previewAvailable: definition.previewAvailable,
    reason: "upgrade-required",
  };
}

export function hasAtlasCapability(
  capability: AtlasCapability,
  context: AtlasCapabilityContext
): boolean {
  return evaluateAtlasCapability(capability, context).enabled;
}

export function getUnavailableAtlasCapabilities(
  context: AtlasCapabilityContext
): readonly AtlasCapabilityEvaluation[] {
  return ATLAS_CAPABILITY_IDS.map((capability) =>
    evaluateAtlasCapability(capability, context)
  ).filter((evaluation) => !evaluation.enabled);
}

export function getPreviewableAtlasCapabilities(
  context: AtlasCapabilityContext
): readonly AtlasCapabilityEvaluation[] {
  return getUnavailableAtlasCapabilities(context).filter(
    (evaluation) => evaluation.status === "preview"
  );
}