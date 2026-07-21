import AtlasSky from "./AtlasSky";
import AtlasSkyline from "./AtlasSkyline";

export default function AtlasWorldRenderer() {
  return (
    <div className="atlas-v2-world absolute inset-0 overflow-hidden">
      <AtlasSky />

      <div className="atlas-v2-city absolute inset-0">
        <AtlasSkyline layer="far" />
        <AtlasSkyline layer="mid" />
        <AtlasSkyline layer="near" />
      </div>

      <div className="atlas-v2-world__shoreline" />
      <div className="atlas-v2-world__water" />
      <div className="atlas-v2-world__reflection" />
      <div className="atlas-v2-world__haze" />
    </div>
  );
}
