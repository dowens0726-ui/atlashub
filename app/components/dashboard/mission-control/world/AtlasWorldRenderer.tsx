import AtlasAtmosphere from "./AtlasAtmosphere";
import AtlasEffects from "./AtlasEffects";
import AtlasLighting from "./AtlasLighting";
import AtlasOcean from "./AtlasOcean";
import AtlasSky from "./AtlasSky";
import AtlasSkyline from "./AtlasSkyline";

import {
  defaultAtlasWorldConfiguration,
  type AtlasWorldConfiguration,
} from "./atlas-world.types";


type AtlasWorldRendererProps = {
  configuration?:
    AtlasWorldConfiguration;
};


export default function AtlasWorldRenderer({
  configuration =
    defaultAtlasWorldConfiguration,
}: AtlasWorldRendererProps) {
  if (
    !configuration.active
  ) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="atlas-world-renderer"
      data-world-district={
        configuration.district ??
        undefined
      }
      data-world-district-category={
        configuration.districtCategory ??
        undefined
      }
      data-world-economy={
        configuration.economy ??
        undefined
      }
      data-world-heat={
        configuration.heat ??
        undefined
      }
      data-world-intensity={
        configuration.intensity
      }
      data-world-operating-status={
        configuration.operatingStatus ??
        undefined
      }
      data-world-state={
        configuration.state
      }
      data-world-time-of-day={
        configuration.timeOfDay ??
        undefined
      }
      data-world-weather={
        configuration.weather ??
        undefined
      }
    >
      <AtlasSky />

      <AtlasLighting
        configuration={
          configuration
        }
      />

      <AtlasSkyline />

      <AtlasOcean />

      <AtlasAtmosphere />

      <AtlasEffects />
    </div>
  );
}
