import type {
  AtlasCollection,
} from "@/app/services/collection.service";

import {
  getAtlasVehicleScore,
} from "@/app/services/atlas-score.service";

import {
  canDisplayVehiclePrice,
} from "@/app/services/vehicle-data";


type CollectionStatsProps = {
  collection:
    AtlasCollection;
};


function getAverageScore(
  collection:
    AtlasCollection
): number | null {
  const availableScores =
    collection.vehicles
      .map(
        (
          vehicle
        ) =>
          getAtlasVehicleScore(
            vehicle
          ).overall
      )
      .filter(
        (
          score
        ): score is number =>
          score !==
          null
      );

  if (
    availableScores.length ===
    0
  ) {
    return null;
  }

  const total =
    availableScores.reduce(
      (
        sum,
        score
      ) =>
        sum +
        score,
      0
    );

  return Math.round(
    total /
      availableScores.length
  );
}


function getAveragePrice(
  collection:
    AtlasCollection
): number | null {
  const pricedVehicles =
    collection.vehicles.filter(
      canDisplayVehiclePrice
    );

  if (
    pricedVehicles.length ===
    0
  ) {
    return null;
  }

  const total =
    pricedVehicles.reduce(
      (
        sum,
        vehicle
      ) =>
        sum +
        vehicle.price,
      0
    );

  return Math.round(
    total /
      pricedVehicles.length
  );
}


function getTopVehicle(
  collection:
    AtlasCollection
) {
  return collection.vehicles
    .map(
      (
        vehicle
      ) => ({
        vehicle,
        score:
          getAtlasVehicleScore(
            vehicle
          ).overall,
      })
    )
    .filter(
      (
        result
      ): result is {
        vehicle:
          AtlasCollection["vehicles"][number];

        score:
          number;
      } =>
        result.score !==
        null
    )
    .sort(
      (
        firstResult,
        secondResult
      ) =>
        secondResult.score -
        firstResult.score
    )[0]?.vehicle;
}


export default function CollectionStats({
  collection,
}: CollectionStatsProps) {
  const averageScore =
    getAverageScore(
      collection
    );

  const averagePrice =
    getAveragePrice(
      collection
    );

  const topVehicle =
    getTopVehicle(
      collection
    );


  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">
          Vehicles
        </p>

        <p className="mt-2 text-2xl font-black text-white">
          {collection.vehicles.length}
        </p>
      </div>


      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">
          Avg Atlas Score
        </p>

        <p className="mt-2 text-2xl font-black text-amber-400">
          {averageScore ??
            "Not yet confirmed"}
        </p>
      </div>


      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">
          Average Price
        </p>

        <p className="mt-2 text-xl font-black text-white">
          {averagePrice ===
          null
            ? "Not yet confirmed"
            : `$${averagePrice.toLocaleString(
                "en-US"
              )}`}
        </p>
      </div>


      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">
          Top Vehicle
        </p>

        <p className="mt-2 text-xl font-black text-white">
          {topVehicle?.name ??
            "Not yet confirmed"}
        </p>
      </div>
    </div>
  );
}