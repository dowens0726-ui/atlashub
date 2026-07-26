import type {
  CSSProperties,
} from "react";

import type {
  AtlasWorldState,
} from "@/app/world";


type AtlasSkyLayerProps = {
  worldState:
    AtlasWorldState;
};


type AtlasSkyStyles =
  CSSProperties & {
    "--atlas-sky-brightness":
      number;

    "--atlas-sky-cloud-cover":
      number;

    "--atlas-sky-haze":
      number;

    "--atlas-sky-motion":
      number;
  };


function buildSkyStyles(
  worldState:
    AtlasWorldState
): AtlasSkyStyles {
  return {
    "--atlas-sky-brightness":
      worldState.lighting.skyBrightness / 100,

    "--atlas-sky-cloud-cover":
      worldState.atmosphere.cloudCover / 100,

    "--atlas-sky-haze":
      worldState.atmosphere.haze / 100,

    "--atlas-sky-motion":
      worldState.atmosphere.ambientMotion / 100,
  };
}


export default function AtlasSkyLayer({
  worldState,
}: AtlasSkyLayerProps) {
  const styles =
    buildSkyStyles(worldState);

  return (
    <div
      aria-hidden="true"
      className="atlas-cinematic-sky absolute inset-0 overflow-hidden"
      data-time-of-day={worldState.timeOfDay}
      data-weather={worldState.weather}
      style={styles}
    >
      <div className="atlas-cinematic-sky__gradient absolute inset-0" />

      <div className="atlas-cinematic-sky__stars absolute inset-0" />

      <div className="atlas-cinematic-sky__celestial atlas-cinematic-sky__sun absolute" />

      <div className="atlas-cinematic-sky__celestial atlas-cinematic-sky__moon absolute" />

      <div className="atlas-cinematic-sky__cloud atlas-cinematic-sky__cloud--far absolute" />

      <div className="atlas-cinematic-sky__cloud atlas-cinematic-sky__cloud--mid absolute" />

      <div className="atlas-cinematic-sky__cloud atlas-cinematic-sky__cloud--near absolute" />

      <div className="atlas-cinematic-sky__horizon-bloom absolute inset-x-0" />

      <div className="atlas-cinematic-sky__weather-wash absolute inset-0" />

      <div className="atlas-cinematic-sky__color-grade absolute inset-0" />
    </div>
  );
}
