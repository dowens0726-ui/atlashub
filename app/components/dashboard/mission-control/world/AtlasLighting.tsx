import type {
  CSSProperties,
} from "react";

import type {
  AtlasWorldConfiguration,
  AtlasWorldIntensity,
} from "./atlas-world.types";


type AtlasLightingProps = {
  configuration:
    AtlasWorldConfiguration;
};


type AtlasLightingProfile = {
  ambientColor: string;
  horizonColor: string;
  coreColor: string;
  weatherColor: string;
  emergencyColor: string;

  ambientStrength: number;
  horizonStrength: number;
  coreStrength: number;
  weatherStrength: number;
  emergencyStrength: number;

  bloomStrength: number;
  contrast: number;
  saturation: number;
  sceneBrightness: number;

  pulseDuration: string;
  transitionDuration: string;
};


type AtlasLightingStyle =
  CSSProperties & {
    "--atlas-light-ambient-rgb":
      string;

    "--atlas-light-horizon-rgb":
      string;

    "--atlas-light-core-rgb":
      string;

    "--atlas-light-weather-rgb":
      string;

    "--atlas-light-emergency-rgb":
      string;

    "--atlas-light-ambient-strength":
      number;

    "--atlas-light-horizon-strength":
      number;

    "--atlas-light-core-strength":
      number;

    "--atlas-light-weather-strength":
      number;

    "--atlas-light-emergency-strength":
      number;

    "--atlas-light-bloom-strength":
      number;

    "--atlas-light-contrast":
      number;

    "--atlas-light-saturation":
      number;

    "--atlas-light-scene-brightness":
      number;

    "--atlas-light-pulse-duration":
      string;

    "--atlas-light-transition-duration":
      string;
  };


const intensityEnergy:
  Record<
    AtlasWorldIntensity,
    number
  > = {
    low:
      0.72,

    medium:
      1,

    high:
      1.28,
  };


function clamp(
  value: number,
  minimum: number,
  maximum: number
) {
  return Math.min(
    Math.max(
      value,
      minimum
    ),
    maximum
  );
}


function resolveBaseProfile(
  configuration:
    AtlasWorldConfiguration
): AtlasLightingProfile {
  switch (
    configuration.timeOfDay
  ) {
    case "dawn":
      return {
        ambientColor:
          "76 120 176",

        horizonColor:
          "251 146 60",

        coreColor:
          "255 214 170",

        weatherColor:
          "148 197 255",

        emergencyColor:
          "251 113 133",

        ambientStrength:
          0.48,

        horizonStrength:
          0.74,

        coreStrength:
          0.42,

        weatherStrength:
          0.12,

        emergencyStrength:
          0,

        bloomStrength:
          0.72,

        contrast:
          0.94,

        saturation:
          1.02,

        sceneBrightness:
          1.04,

        pulseDuration:
          "13s",

        transitionDuration:
          "1400ms",
      };

    case "day":
      return {
        ambientColor:
          "84 149 202",

        horizonColor:
          "125 211 252",

        coreColor:
          "224 242 254",

        weatherColor:
          "186 230 253",

        emergencyColor:
          "251 113 133",

        ambientStrength:
          0.34,

        horizonStrength:
          0.48,

        coreStrength:
          0.26,

        weatherStrength:
          0.08,

        emergencyStrength:
          0,

        bloomStrength:
          0.38,

        contrast:
          0.92,

        saturation:
          0.94,

        sceneBrightness:
          1.1,

        pulseDuration:
          "16s",

        transitionDuration:
          "1400ms",
      };

    case "dusk":
      return {
        ambientColor:
          "91 58 145",

        horizonColor:
          "251 113 133",

        coreColor:
          "251 146 60",

        weatherColor:
          "192 132 252",

        emergencyColor:
          "251 113 133",

        ambientStrength:
          0.64,

        horizonStrength:
          0.9,

        coreStrength:
          0.46,

        weatherStrength:
          0.14,

        emergencyStrength:
          0,

        bloomStrength:
          0.94,

        contrast:
          1.02,

        saturation:
          1.16,

        sceneBrightness:
          0.94,

        pulseDuration:
          "10s",

        transitionDuration:
          "1400ms",
      };

    case "night":
    default:
      return {
        ambientColor:
          "12 38 82",

        horizonColor:
          "34 211 238",

        coreColor:
          "168 85 247",

        weatherColor:
          "63 94 251",

        emergencyColor:
          "251 113 133",

        ambientStrength:
          0.78,

        horizonStrength:
          0.72,

        coreStrength:
          0.54,

        weatherStrength:
          0.18,

        emergencyStrength:
          0,

        bloomStrength:
          1.08,

        contrast:
          1.14,

        saturation:
          1.2,

        sceneBrightness:
          0.74,

        pulseDuration:
          "9s",

        transitionDuration:
          "1400ms",
      };
  }
}


function applyWeather(
  profile:
    AtlasLightingProfile,
  configuration:
    AtlasWorldConfiguration
): AtlasLightingProfile {
  switch (
    configuration.weather
  ) {
    case "humid":
      return {
        ...profile,
        weatherColor:
          "56 189 248",
        weatherStrength:
          profile.weatherStrength +
          0.14,
        ambientStrength:
          profile.ambientStrength +
          0.06,
        bloomStrength:
          profile.bloomStrength +
          0.16,
        contrast:
          profile.contrast -
          0.06,
        saturation:
          profile.saturation +
          0.04,
      };

    case "overcast":
      return {
        ...profile,
        ambientColor:
          "55 65 81",
        weatherColor:
          "100 116 139",
        weatherStrength:
          profile.weatherStrength +
          0.28,
        horizonStrength:
          profile.horizonStrength *
          0.7,
        coreStrength:
          profile.coreStrength *
          0.66,
        bloomStrength:
          profile.bloomStrength *
          0.72,
        contrast:
          profile.contrast -
          0.08,
        saturation:
          profile.saturation *
          0.72,
        sceneBrightness:
          profile.sceneBrightness *
          0.78,
      };

    case "storm":
      return {
        ...profile,
        ambientColor:
          "30 22 68",
        horizonColor:
          "99 102 241",
        coreColor:
          "168 85 247",
        weatherColor:
          "126 34 206",
        weatherStrength:
          profile.weatherStrength +
          0.58,
        ambientStrength:
          profile.ambientStrength +
          0.16,
        horizonStrength:
          profile.horizonStrength +
          0.12,
        coreStrength:
          profile.coreStrength +
          0.14,
        bloomStrength:
          profile.bloomStrength +
          0.32,
        contrast:
          profile.contrast +
          0.18,
        saturation:
          profile.saturation +
          0.12,
        sceneBrightness:
          profile.sceneBrightness *
          0.62,
        pulseDuration:
          "6.5s",
      };

    case "haze":
      return {
        ...profile,
        weatherColor:
          "251 146 60",
        weatherStrength:
          profile.weatherStrength +
          0.24,
        ambientStrength:
          profile.ambientStrength +
          0.1,
        horizonStrength:
          profile.horizonStrength +
          0.12,
        bloomStrength:
          profile.bloomStrength +
          0.22,
        contrast:
          profile.contrast -
          0.16,
        saturation:
          profile.saturation *
          0.84,
        sceneBrightness:
          profile.sceneBrightness *
          0.9,
      };

    case "clear":
    default:
      return profile;
  }
}


function applyHeat(
  profile:
    AtlasLightingProfile,
  configuration:
    AtlasWorldConfiguration
): AtlasLightingProfile {
  switch (
    configuration.heat
  ) {
    case "guarded":
      return {
        ...profile,
        emergencyStrength:
          0.08,
        horizonStrength:
          profile.horizonStrength +
          0.03,
      };

    case "elevated":
      return {
        ...profile,
        emergencyColor:
          "249 115 22",
        emergencyStrength:
          0.28,
        ambientStrength:
          profile.ambientStrength +
          0.08,
        horizonStrength:
          profile.horizonStrength +
          0.08,
        bloomStrength:
          profile.bloomStrength +
          0.14,
        contrast:
          profile.contrast +
          0.06,
        pulseDuration:
          "5.8s",
      };

    case "critical":
      return {
        ...profile,
        emergencyColor:
          "239 68 68",
        emergencyStrength:
          0.72,
        ambientStrength:
          profile.ambientStrength +
          0.12,
        horizonStrength:
          profile.horizonStrength +
          0.1,
        coreStrength:
          profile.coreStrength +
          0.14,
        bloomStrength:
          profile.bloomStrength +
          0.28,
        contrast:
          profile.contrast +
          0.14,
        saturation:
          profile.saturation +
          0.1,
        pulseDuration:
          "2.8s",
      };

    case "cold":
    default:
      return profile;
  }
}


function applyRendererState(
  profile:
    AtlasLightingProfile,
  configuration:
    AtlasWorldConfiguration
): AtlasLightingProfile {
  switch (
    configuration.state
  ) {
    case "loading":
      return {
        ...profile,
        coreStrength:
          profile.coreStrength +
          0.12,
        bloomStrength:
          profile.bloomStrength +
          0.16,
        pulseDuration:
          "4.8s",
      };

    case "warning":
      return {
        ...profile,
        emergencyColor:
          "251 146 60",
        emergencyStrength:
          Math.max(
            profile.emergencyStrength,
            0.34
          ),
        pulseDuration:
          "4.2s",
      };

    case "failed":
      return {
        ...profile,
        emergencyColor:
          "251 113 133",
        emergencyStrength:
          0.88,
        sceneBrightness:
          profile.sceneBrightness *
          0.72,
        saturation:
          profile.saturation *
          0.82,
        pulseDuration:
          "2.4s",
      };

    case "idle":
      return {
        ...profile,
        ambientStrength:
          profile.ambientStrength *
          0.82,
        horizonStrength:
          profile.horizonStrength *
          0.82,
        coreStrength:
          profile.coreStrength *
          0.76,
        sceneBrightness:
          profile.sceneBrightness *
          0.9,
      };

    case "ready":
    default:
      return profile;
  }
}


function applyIntensity(
  profile:
    AtlasLightingProfile,
  configuration:
    AtlasWorldConfiguration
): AtlasLightingProfile {
  const energy =
    intensityEnergy[
      configuration.intensity
    ];

  return {
    ...profile,
    ambientStrength:
      clamp(
        profile.ambientStrength *
          energy,
        0,
        1.4
      ),
    horizonStrength:
      clamp(
        profile.horizonStrength *
          energy,
        0,
        1.4
      ),
    coreStrength:
      clamp(
        profile.coreStrength *
          energy,
        0,
        1.4
      ),
    weatherStrength:
      clamp(
        profile.weatherStrength *
          energy,
        0,
        1.4
      ),
    emergencyStrength:
      clamp(
        profile.emergencyStrength *
          energy,
        0,
        1
      ),
    bloomStrength:
      clamp(
        profile.bloomStrength *
          energy,
        0.2,
        1.8
      ),
  };
}


function buildLightingProfile(
  configuration:
    AtlasWorldConfiguration
): AtlasLightingProfile {
  const baseProfile =
    resolveBaseProfile(
      configuration
    );

  const weatherProfile =
    applyWeather(
      baseProfile,
      configuration
    );

  const heatProfile =
    applyHeat(
      weatherProfile,
      configuration
    );

  const rendererProfile =
    applyRendererState(
      heatProfile,
      configuration
    );

  return applyIntensity(
    rendererProfile,
    configuration
  );
}


function buildLightingStyle(
  profile:
    AtlasLightingProfile
): AtlasLightingStyle {
  return {
    "--atlas-light-ambient-rgb":
      profile.ambientColor,
    "--atlas-light-horizon-rgb":
      profile.horizonColor,
    "--atlas-light-core-rgb":
      profile.coreColor,
    "--atlas-light-weather-rgb":
      profile.weatherColor,
    "--atlas-light-emergency-rgb":
      profile.emergencyColor,
    "--atlas-light-ambient-strength":
      profile.ambientStrength,
    "--atlas-light-horizon-strength":
      profile.horizonStrength,
    "--atlas-light-core-strength":
      profile.coreStrength,
    "--atlas-light-weather-strength":
      profile.weatherStrength,
    "--atlas-light-emergency-strength":
      profile.emergencyStrength,
    "--atlas-light-bloom-strength":
      profile.bloomStrength,
    "--atlas-light-contrast":
      profile.contrast,
    "--atlas-light-saturation":
      profile.saturation,
    "--atlas-light-scene-brightness":
      profile.sceneBrightness,
    "--atlas-light-pulse-duration":
      profile.pulseDuration,
    "--atlas-light-transition-duration":
      profile.transitionDuration,
  };
}


export default function AtlasLighting({
  configuration,
}: AtlasLightingProps) {
  const profile =
    buildLightingProfile(
      configuration
    );

  const style =
    buildLightingStyle(
      profile
    );

  return (
    <div
      aria-hidden="true"
      className="atlas-world-lighting"
      data-lighting-heat={
        configuration.heat ??
        undefined
      }
      data-lighting-intensity={
        configuration.intensity
      }
      data-lighting-state={
        configuration.state
      }
      data-lighting-time={
        configuration.timeOfDay ??
        undefined
      }
      data-lighting-weather={
        configuration.weather ??
        undefined
      }
      style={style}
    >
      <div className="atlas-world-lighting__scene" />
      <div className="atlas-world-lighting__ambient" />
      <div className="atlas-world-lighting__horizon" />
      <div className="atlas-world-lighting__core" />
      <div className="atlas-world-lighting__weather" />
      <div className="atlas-world-lighting__scan" />
      <div className="atlas-world-lighting__alert" />
    </div>
  );
}
