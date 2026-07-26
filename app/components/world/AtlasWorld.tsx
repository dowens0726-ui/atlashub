import AtlasAtmosphereLayer from "./AtlasAtmosphereLayer";
import AtlasForegroundLayer from "./AtlasForegroundLayer";
import AtlasLightingLayer from "./AtlasLightingLayer";
import AtlasMountainLayer from "./AtlasMountainLayer";
import AtlasOverlayLayer from "./AtlasOverlayLayer";
import AtlasSkyLayer from "./AtlasSkyLayer";
import AtlasSkylineLayer from "./AtlasSkylineLayer";
import AtlasTrafficLayer from "./AtlasTrafficLayer";
import AtlasWaterfrontLayer from "./AtlasWaterfrontLayer";

export default function AtlasWorld() {
  return (
    <div className="atlas-v2-world absolute inset-0 overflow-hidden">
      <AtlasSkyLayer />
      <AtlasAtmosphereLayer />
      <AtlasMountainLayer />
      <AtlasSkylineLayer />
      <AtlasWaterfrontLayer />
      <AtlasTrafficLayer />
      <AtlasForegroundLayer />
      <AtlasLightingLayer />
      <AtlasOverlayLayer />
    </div>
  );
}
