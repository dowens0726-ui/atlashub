import type { AtlasCollection } from "@/app/services/collection.service";
import { getAtlasVehicleScore } from "@/app/services/atlas-score.service";

type CollectionStatsProps = {
  collection: AtlasCollection;
};

function getAverageScore(collection: AtlasCollection) {
  if (collection.vehicles.length === 0) return 0;

  const total = collection.vehicles.reduce(
    (sum, vehicle) => sum + getAtlasVehicleScore(vehicle).overall,
    0
  );

  return Math.round(total / collection.vehicles.length);
}

function getAveragePrice(collection: AtlasCollection) {
  if (collection.vehicles.length === 0) return 0;

  const total = collection.vehicles.reduce(
    (sum, vehicle) => sum + vehicle.price,
    0
  );

  return Math.round(total / collection.vehicles.length);
}

function getTopVehicle(collection: AtlasCollection) {
  return collection.vehicles
    .slice()
    .sort(
      (a, b) =>
        getAtlasVehicleScore(b).overall - getAtlasVehicleScore(a).overall
    )[0];
}

export default function CollectionStats({
  collection,
}: CollectionStatsProps) {
  const averageScore = getAverageScore(collection);
  const averagePrice = getAveragePrice(collection);
  const topVehicle = getTopVehicle(collection);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Vehicles</p>
        <p className="mt-2 text-2xl font-black text-white">
          {collection.vehicles.length}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Avg Atlas Score</p>
        <p className="mt-2 text-2xl font-black text-amber-400">
          {averageScore}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Average Price</p>
        <p className="mt-2 text-xl font-black text-white">
          ${averagePrice.toLocaleString()}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Top Vehicle</p>
        <p className="mt-2 text-xl font-black text-white">
          {topVehicle?.name ?? "—"}
        </p>
      </div>
    </div>
  );
}