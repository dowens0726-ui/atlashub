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
  AtlasWorldDynamics,
  AtlasWorldIntensity,
  AtlasWorldOperationalMode,
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

function resolveOperationalMode(
  input: {
    confidence: number;
    energy: number;
    shouldActNow: boolean;
  }
): AtlasWorldOperationalMode {
  if (
    input.shouldActNow &&
    input.confidence < 45
  ) {
    return "critical";
  }

  if (
    input.shouldActNow ||
    input.confidence < 58
  ) {
    return "alert";
  }

  if (input.energy >= 60) {
    return "active";
  }

  return "calm";
}

function resolveCashActivityScore(
  availableCash: number
): number {
  if (
    availableCash >=
    ATLAS_WORLD_CASH_ACTIVITY_THRESHOLDS.high
  ) {
    return 90;
  }

  if (
    availableCash >=
    ATLAS_WORLD_CASH_ACTIVITY_THRESHOLDS.moderate
  ) {
    return 65;
  }

  return 35;
}

function buildWorldDynamics(
  input: {
    empireScore: number;
    confidence: number;
    availableCash: number;
    shouldActNow: boolean;
  }
): AtlasWorldDynamics {
  const cashScore =
    resolveCashActivityScore(
      input.availableCash
    );

  const energy =
    clampWorldScore(
      averageWorldValues(
        input.empireScore,
        input.confidence,
        cashScore
      ) +
        (
          input.shouldActNow
            ? 8
            : 0
        )
    );

  const ambientTension =
    clampWorldScore(
      (
        input.shouldActNow
          ? 60
          : 20
      ) +
        Math.round(
          (
            100 -
            input.confidence
          ) *
            0.35
        )
    );

  return {
    energy,

    neonIntensity:
      clampWorldScore(
        energy +
          Math.round(
            input.confidence *
              0.1
          )
      ),

    districtActivityBias:
      clampWorldScore(
        averageWorldValues(
          energy,
          cashScore,
          input.empireScore
        )
      ),

    ambientTension,

    worldPulse:
      clampWorldScore(
        averageWorldValues(
          energy,
          input.confidence,
          100 - ambientTension
        )
      ),

    atmosphericClarity:
      clampWorldScore(
        90 -
          Math.round(
            ambientTension *
              0.25
          ) -
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

function buildLightingProfile(
  input: {
    base: AtlasLightingProfile;
    empireScore: number;
    confidence: number;
    shouldActNow: boolean;
    dynamics: AtlasWorldDynamics;
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
          ) +
          Math.round(
            input.dynamics.atmosphericClarity *
              0.04
          )
      ),

    skylineBrightness:
      clampWorldScore(
        input.base.skylineBrightness +
          empireBoost +
          Math.round(
            input.dynamics.neonIntensity *
              0.08
          )
      ),

    buildingLightIntensity:
      clampWorldScore(
        input.base.buildingLightIntensity +
          Math.round(
            empireBoost *
              0.7
          ) +
          Math.round(
            input.dynamics.energy *
              0.08
          )
      ),

    systemGlowIntensity:
      clampWorldScore(
        input.base.systemGlowIntensity +
          confidenceBoost +
          Math.round(
            input.dynamics.neonIntensity *
              0.08
          )
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
          ) +
          Math.round(
            input.dynamics.ambientTension *
              0.08
          )
      ),
  };
}

function buildTrafficProfile(
  input: {
    empireScore: number;
    availableCash: number;
    confidence: number;
    dynamics: AtlasWorldDynamics;
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
        input.confidence,
        input.dynamics.worldPulse
      ),
      {
        moderate: 52,
        high: 72,
        maximum: 90,
      }
    );

  return {
    road:
      input.dynamics.energy >= 90
        ? "maximum"
        : cashIntensity === "maximum"
          ? "maximum"
          : empireIntensity,

    harbor:
      input.dynamics.districtActivityBias >= 88
        ? "maximum"
        : cashIntensity,

    air:
      input.dynamics.worldPulse >= 90
        ? "maximum"
        : input.dynamics.worldPulse >= 80
          ? "high"
          : airIntensity,
  };
}

function buildAtmosphereProfile(
  input: {
    empireScore: number;
    confidence: number;
    shouldActNow: boolean;
    timeOfDay: AtlasWorldState["timeOfDay"];
    dynamics: AtlasWorldDynamics;
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
          ) +
          Math.round(
            input.dynamics.ambientTension *
              0.08
          ) -
          Math.round(
            input.dynamics.atmosphericClarity *
              0.06
          )
      ),

    cloudCover:
      clampWorldScore(
        (
          isNight
            ? 28
            : 22
        ) +
          Math.round(
            input.dynamics.ambientTension *
              0.06
          )
      ),

    windStrength:
      clampWorldScore(
        28 +
          Math.round(
            input.empireScore *
              0.18
          ) +
          Math.round(
            input.dynamics.energy *
              0.08
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
          ) +
          Math.round(
            input.dynamics.neonIntensity *
              0.08
          )
      ),

    ambientMotion:
      clampWorldScore(
        averageWorldValues(
          input.empireScore,
          input.confidence,
          input.dynamics.worldPulse
        )
      ),
  };
}

function buildSceneSummary(
  input: {
    stage: string;
    cityActivity: AtlasWorldIntensity;
    operationalMode: AtlasWorldOperationalMode;
    confidence: number;
  }
): string {
  const operationalPosture =
    input.operationalMode === "critical"
      ? "Atlas has elevated the environment to a critical operational posture."
      : input.operationalMode === "alert"
        ? "Atlas has elevated the environment to an alert operational posture."
        : input.operationalMode === "active"
          ? "The environment is operating in an active strategic posture."
          : "The environment is operating in a calm strategic posture.";

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

  const dynamics =
    buildWorldDynamics({
      empireScore,
      confidence,
      availableCash,
      shouldActNow,
    });

  const operationalMode =
    resolveOperationalMode({
      confidence,
      energy:
        dynamics.energy,
      shouldActNow,
    });

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
      dynamics,
    });

  const traffic =
    buildTrafficProfile({
      empireScore,
      availableCash,
      confidence,
      dynamics,
    });

  const atmosphere =
    buildAtmosphereProfile({
      empireScore,
      confidence,
      shouldActNow,
      timeOfDay,
      dynamics,
    });

  const cityActivity =
    resolveEmpireIntensity(
      dynamics.districtActivityBias
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

    operationalMode,

    lighting,
    traffic,
    atmosphere,
    dynamics,
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
        operationalMode,
        confidence,
      }),
  };
}
