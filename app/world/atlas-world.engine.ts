import {
  ATLAS_WORLD_CASH_ACTIVITY_THRESHOLDS,
  ATLAS_WORLD_LIGHTING,
  ATLAS_WORLD_SCENE_LABELS,
} from "./atlas-world.constants";

import {
  averageWorldValues,
  clampWorldScore,
  normalizeWorldPercentage,
  resolveAtlasTimeOfDay,
  resolveIntensity,
} from "./atlas-world.utils";

import type {
  AtlasAtmosphereProfile,
  AtlasLightingProfile,
  AtlasTrafficProfile,
  AtlasWorldIntensity,
  AtlasWorldState,
  BuildAtlasWorldStateInput,
} from "./atlas-world.types";

function resolveEmpireIntensity(
  empireScore: number
): AtlasWorldIntensity {
  return resolveIntensity(
    empireScore,
    {
      moderate: 45,
      high: 70,
      maximum: 88,
    }
  );
}

function buildLightingProfile(
  input: {
    base:
      AtlasLightingProfile;

    empireScore:
      number;

    confidence:
      number;

    shouldActNow:
      boolean;
  }
): AtlasLightingProfile {
  const empireBoost =
    Math.round(
      input.empireScore *
        0.12
    );

  const confidenceBoost =
    Math.round(
      input.confidence *
        0.14
    );

  return {
    skyBrightness:
      clampWorldScore(
        input.base.skyBrightness +
          Math.round(
            empireBoost *
              0.25
          )
      ),

    skylineBrightness:
      clampWorldScore(
        input.base.skylineBrightness +
          empireBoost
      ),

    buildingLightIntensity:
      clampWorldScore(
        input.base.buildingLightIntensity +
          Math.round(
            empireBoost *
              0.7
          )
      ),

    systemGlowIntensity:
      clampWorldScore(
        input.base.systemGlowIntensity +
          confidenceBoost
      ),

    cautionGlowIntensity:
      clampWorldScore(
        input.base.cautionGlowIntensity +
          (
            input.shouldActNow
              ? 24
              : 0
          ) +
          Math.round(
            (
              100 -
              input.confidence
            ) *
              0.12
          )
      ),
  };
}

function buildTrafficProfile(
  input: {
    empireScore:
      number;

    availableCash:
      number;

    confidence:
      number;
  }
): AtlasTrafficProfile {
  const cashIntensity =
    resolveIntensity(
      input.availableCash,
      ATLAS_WORLD_CASH_ACTIVITY_THRESHOLDS
    );

  const empireIntensity =
    resolveEmpireIntensity(
      input.empireScore
    );

  const airIntensity =
    resolveIntensity(
      averageWorldValues(
        input.empireScore,
        input.confidence
      ),
      {
        moderate: 52,
        high: 72,
        maximum: 90,
      }
    );

  return {
    road:
      cashIntensity ===
        "maximum"
        ? "maximum"
        : empireIntensity,

    harbor:
      cashIntensity,

    air:
      airIntensity,
  };
}

function buildAtmosphereProfile(
  input: {
    empireScore:
      number;

    confidence:
      number;

    shouldActNow:
      boolean;

    timeOfDay:
      AtlasWorldState["timeOfDay"];
  }
): AtlasAtmosphereProfile {
  const isNight =
    input.timeOfDay ===
      "night";

  const isTransitionPeriod =
    input.timeOfDay ===
      "dawn" ||
    input.timeOfDay ===
      "sunset" ||
    input.timeOfDay ===
      "golden-hour";

  return {
    haze:
      clampWorldScore(
        (
          isTransitionPeriod
            ? 58
            : 34
        ) +
          (
            input.shouldActNow
              ? 8
              : 0
          )
      ),

    cloudCover:
      clampWorldScore(
        isNight
          ? 28
          : 22
      ),

    windStrength:
      clampWorldScore(
        28 +
          Math.round(
            input.empireScore *
              0.18
          )
      ),

    waterShimmer:
      clampWorldScore(
        (
          isNight
            ? 72
            : 54
        ) +
          Math.round(
            input.confidence *
              0.12
          )
      ),

    ambientMotion:
      clampWorldScore(
        averageWorldValues(
          input.empireScore,
          input.confidence
        )
      ),
  };
}

function buildSceneSummary(
  input: {
    stage:
      string;

    cityActivity:
      AtlasWorldIntensity;

    shouldActNow:
      boolean;

    confidence:
      number;
  }
): string {
  const operationalPosture =
    input.shouldActNow
      ? "Atlas has elevated the environment to an active operational posture."
      : "The environment is operating in a stable strategic posture.";

  const confidenceSummary =
    input.confidence >= 80
      ? "Decision confidence is high."
      : input.confidence >= 60
        ? "Decision confidence is moderate."
        : "Atlas is maintaining a cautious intelligence posture.";

  return [
    `${input.stage} progression is producing ${input.cityActivity} world activity.`,
    operationalPosture,
    confidenceSummary,
  ].join(" ");
}

export function buildAtlasWorldState(
  input: BuildAtlasWorldStateInput
): AtlasWorldState {
  const now =
    input.date ??
    new Date();

  const localHour =
    now.getHours();

  const timeOfDay =
    resolveAtlasTimeOfDay(
      localHour
    );

  const empireScore =
    clampWorldScore(
      input.empireScore
    );

  const confidence =
    normalizeWorldPercentage(
      input.confidence
    );

  const availableCash =
    Math.max(
      0,
      Math.round(
        input.availableCash
      )
    );

  const shouldActNow =
    input.shouldActNow ??
    false;

  const baseLighting =
    ATLAS_WORLD_LIGHTING[
      timeOfDay
    ];

  const lighting =
    buildLightingProfile({
      base:
        baseLighting,

      empireScore,
      confidence,
      shouldActNow,
    });

  const traffic =
    buildTrafficProfile({
      empireScore,
      availableCash,
      confidence,
    });

  const atmosphere =
    buildAtmosphereProfile({
      empireScore,
      confidence,
      shouldActNow,
      timeOfDay,
    });

  const cityActivity =
    resolveEmpireIntensity(
      averageWorldValues(
        empireScore,
        confidence,
        availableCash >=
          ATLAS_WORLD_CASH_ACTIVITY_THRESHOLDS.high
          ? 90
          : availableCash >=
                ATLAS_WORLD_CASH_ACTIVITY_THRESHOLDS.moderate
            ? 65
            : 35
      )
    );

  const progressionStage =
    input.progressionStage.trim() ||
    "Developing";

  return {
    generatedAt:
      now.toISOString(),

    localHour,
    timeOfDay,

    weather:
      input.weather ??
      "clear",

    lighting,
    traffic,
    atmosphere,
    cityActivity,

    influence: {
      empireScore,
      confidence,
      availableCash,
      progressionStage,
      shouldActNow,
    },

    sceneLabel:
      ATLAS_WORLD_SCENE_LABELS[
        timeOfDay
      ],

    sceneSummary:
      buildSceneSummary({
        stage:
          progressionStage,

        cityActivity,
        shouldActNow,
        confidence,
      }),
  };
}
