import AtlasAtmosphere from "./AtlasAtmosphere";
import AtlasEffects from "./AtlasEffects";
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
      data-world-intensity={
        configuration.intensity
      }
      data-world-state={
        configuration.state
      }
    >
      <AtlasSky />

      <AtlasSkyline />

      <AtlasOcean />

      <AtlasAtmosphere />

      <AtlasEffects />
    </div>
  );
}
