import {
  ATLAS_WORLD_SCORE_MAX,
  ATLAS_WORLD_SCORE_MIN,
} from "./atlas-world.constants";

import type {
  AtlasTimeOfDay,
  AtlasWorldIntensity,
} from "./atlas-world.types";

export function clampWorldScore(
  value: number
): number {
  if (
    !Number.isFinite(value)
  ) {
    return ATLAS_WORLD_SCORE_MIN;
  }

  return Math.min(
    ATLAS_WORLD_SCORE_MAX,
    Math.max(
      ATLAS_WORLD_SCORE_MIN,
      Math.round(value)
    )
  );
}

export function normalizeWorldPercentage(
  value: number
): number {
  const normalized =
    value <= 1
      ? value * 100
      : value;

  return clampWorldScore(
    normalized
  );
}

export function resolveAtlasTimeOfDay(
  hour: number
): AtlasTimeOfDay {
  const normalizedHour =
    ((Math.floor(hour) % 24) + 24) % 24;

  if (
    normalizedHour >= 5 &&
    normalizedHour < 7
  ) {
    return "dawn";
  }

  if (
    normalizedHour >= 7 &&
    normalizedHour < 12
  ) {
    return "morning";
  }

  if (
    normalizedHour >= 12 &&
    normalizedHour < 17
  ) {
    return "afternoon";
  }

  if (
    normalizedHour >= 17 &&
    normalizedHour < 19
  ) {
    return "golden-hour";
  }

  if (
    normalizedHour >= 19 &&
    normalizedHour < 21
  ) {
    return "sunset";
  }

  return "night";
}

export function resolveIntensity(
  value: number,
  thresholds: {
    moderate: number;
    high: number;
    maximum: number;
  }
): AtlasWorldIntensity {
  if (
    value >= thresholds.maximum
  ) {
    return "maximum";
  }

  if (
    value >= thresholds.high
  ) {
    return "high";
  }

  if (
    value >= thresholds.moderate
  ) {
    return "moderate";
  }

  return "low";
}

export function averageWorldValues(
  ...values: number[]
): number {
  if (
    values.length === 0
  ) {
    return 0;
  }

  const total =
    values.reduce(
      (
        sum,
        value
      ) =>
        sum +
        clampWorldScore(
          value
        ),
      0
    );

  return clampWorldScore(
    total /
      values.length
  );
}
