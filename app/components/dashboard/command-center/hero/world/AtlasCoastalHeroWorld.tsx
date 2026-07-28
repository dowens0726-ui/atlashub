import {
  AtlasCoastline,
  AtlasLandmarks,
  AtlasOcean,
  AtlasSkyline,
  AtlasTerrain,
} from "../../../mission-control/world";


export default function AtlasCoastalHeroWorld() {
  return (
    <div
      aria-hidden="true"
      className="atlas-hero-coastal-world atlas-coastal-world"
    >
      <AtlasTerrain />

      <AtlasSkyline />

      <AtlasLandmarks />

      <AtlasCoastline />

      <AtlasOcean />
    </div>
  );
}
