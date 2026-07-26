import type {
  AtlasLightingProfile,
  AtlasTimeOfDay,
} from "./atlas-world.types";

export const ATLAS_WORLD_SCORE_MIN = 0;
export const ATLAS_WORLD_SCORE_MAX = 100;

export const ATLAS_WORLD_CASH_ACTIVITY_THRESHOLDS = {
  moderate: 100_000,
  high: 500_000,
  maximum: 2_000_000,
} as const;

export const ATLAS_WORLD_LIGHTING: Record<
  AtlasTimeOfDay,
  AtlasLightingProfile
> = {
  dawn: {
    skyBrightness: 54,
    skylineBrightness: 38,
    buildingLightIntensity: 62,
    systemGlowIntensity: 58,
    cautionGlowIntensity: 32,
  },

  morning: {
    skyBrightness: 78,
    skylineBrightness: 64,
    buildingLightIntensity: 24,
    systemGlowIntensity: 46,
    cautionGlowIntensity: 24,
  },

  afternoon: {
    skyBrightness: 92,
    skylineBrightness: 82,
    buildingLightIntensity: 18,
    systemGlowIntensity: 42,
    cautionGlowIntensity: 22,
  },

  "golden-hour": {
    skyBrightness: 76,
    skylineBrightness: 74,
    buildingLightIntensity: 38,
    systemGlowIntensity: 52,
    cautionGlowIntensity: 36,
  },

  sunset: {
    skyBrightness: 58,
    skylineBrightness: 56,
    buildingLightIntensity: 66,
    systemGlowIntensity: 68,
    cautionGlowIntensity: 44,
  },

  night: {
    skyBrightness: 22,
    skylineBrightness: 42,
    buildingLightIntensity: 92,
    systemGlowIntensity: 86,
    cautionGlowIntensity: 54,
  },
};

export const ATLAS_WORLD_SCENE_LABELS: Record<
  AtlasTimeOfDay,
  string
> = {
  dawn: "Leonida Dawn",
  morning: "Morning Operations",
  afternoon: "Leonida Active",
  "golden-hour": "Golden-Hour Command",
  sunset: "Sunset Operations",
  night: "Night Command",
};
