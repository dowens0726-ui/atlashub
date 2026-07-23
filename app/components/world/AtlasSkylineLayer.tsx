import AtlasSkyline from "./AtlasSkyline";

export default function AtlasSkylineLayer() {
  return (
    <div className="atlas-v2-city absolute inset-0">
      <AtlasSkyline layer="far" />
      <AtlasSkyline layer="mid" />
      <AtlasSkyline layer="near" />
    </div>
  );
}
