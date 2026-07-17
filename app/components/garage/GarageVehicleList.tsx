"use client";

import Link from "next/link";

import type { Vehicle } from "@/app/types";

type GarageVehicleListProps = {
  vehicles: Vehicle[];
  onRemoveVehicle: (
    vehicleSlug: string
  ) => void;
  onClearGarage: () => void;
};

function formatPrice(
  price: number
): string {
  if (price <= 0) {
    return "Price unavailable";
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }
  ).format(price);
}

export default function GarageVehicleList({
  vehicles,
  onRemoveVehicle,
  onClearGarage,
}: GarageVehicleListProps) {
  return (
    <section
      aria-labelledby="owned-vehicles-heading"
      className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            Player Garage
          </p>

          <h3
            id="owned-vehicles-heading"
            className="mt-2 text-2xl font-black text-white"
          >
            Owned Vehicles
          </h3>

          <p className="mt-3 text-zinc-400">
            {vehicles.length === 1
              ? "1 vehicle added"
              : `${vehicles.length} vehicles added`}
          </p>
        </div>

        {vehicles.length > 0 ? (
          <button
            type="button"
            onClick={onClearGarage}
            className="inline-flex w-fit items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-bold text-zinc-300 transition hover:border-red-400/60 hover:text-red-300"
          >
            Clear Garage
          </button>
        ) : null}
      </div>

      {vehicles.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 p-8 text-center">
          <p className="font-semibold text-zinc-300">
            Your garage is empty.
          </p>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Search the vehicle database and add the vehicles you currently own.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {vehicles.map((vehicle) => (
            <article
              key={vehicle.slug}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <Link
                  href={`/vehicles/${vehicle.slug}`}
                  className="font-bold text-white transition hover:text-emerald-400"
                >
                  {vehicle.name}
                </Link>

                <p className="mt-1 text-sm text-zinc-400">
                  {vehicle.manufacturer}
                  {" · "}
                  {vehicle.class}
                  {" · "}
                  {vehicle.seats}{" "}
                  {vehicle.seats === 1
                    ? "seat"
                    : "seats"}
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-400">
                  {formatPrice(
                    vehicle.price
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onRemoveVehicle(
                    vehicle.slug
                  )
                }
                className="inline-flex min-w-24 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-bold text-zinc-300 transition hover:border-red-400/60 hover:text-red-300"
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}