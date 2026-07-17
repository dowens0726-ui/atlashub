"use client";

import {
  useMemo,
  useState,
} from "react";

import type { Vehicle } from "@/app/types";

type GarageVehicleSearchProps = {
  vehicles: Vehicle[];
  ownedVehicleSlugs: Set<string>;
  onAddVehicle: (vehicle: Vehicle) => void;
};

function normalizeSearchValue(
  value: string
): string {
  return value
    .trim()
    .toLowerCase();
}

function matchesSearch(
  vehicle: Vehicle,
  query: string
): boolean {
  const searchableValues = [
    vehicle.name,
    vehicle.manufacturer,
    vehicle.class,
    vehicle.location,
    ...(vehicle.tags ?? []),
  ];

  return searchableValues.some(
    (value) =>
      value
        .toLowerCase()
        .includes(query)
  );
}

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

export default function GarageVehicleSearch({
  vehicles,
  ownedVehicleSlugs,
  onAddVehicle,
}: GarageVehicleSearchProps) {
  const [query, setQuery] =
    useState("");

  const normalizedQuery =
    normalizeSearchValue(query);

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return vehicles
      .filter((vehicle) =>
        matchesSearch(
          vehicle,
          normalizedQuery
        )
      )
      .sort((first, second) =>
        first.name.localeCompare(
          second.name
        )
      )
      .slice(0, 12);
  }, [
    normalizedQuery,
    vehicles,
  ]);

  return (
    <section
      aria-labelledby="garage-search-heading"
      className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          Vehicle Database
        </p>

        <h3
          id="garage-search-heading"
          className="mt-2 text-2xl font-black text-white"
        >
          Add Owned Vehicles
        </h3>

        <p className="mt-3 leading-7 text-zinc-400">
          Search by vehicle name, manufacturer, class, location, or capability.
        </p>
      </div>

      <div className="mt-6">
        <label
          htmlFor="garage-vehicle-search"
          className="sr-only"
        >
          Search vehicles
        </label>

        <input
          id="garage-vehicle-search"
          type="search"
          value={query}
          onChange={(event) =>
            setQuery(
              event.target.value
            )
          }
          placeholder="Search Adder, Mammoth, aircraft, armored..."
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400"
        />
      </div>

      {!normalizedQuery ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 p-6 text-center">
          <p className="font-semibold text-zinc-300">
            Start typing to search the vehicle database.
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Atlas will show up to twelve matching vehicles.
          </p>
        </div>
      ) : null}

      {normalizedQuery &&
      results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 p-6 text-center">
          <p className="font-semibold text-zinc-300">
            No matching vehicles found.
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Try a different name, manufacturer, or vehicle class.
          </p>
        </div>
      ) : null}

      {results.length > 0 ? (
        <div className="mt-6 space-y-3">
          {results.map((vehicle) => {
            const isOwned =
              ownedVehicleSlugs.has(
                vehicle.slug
              );

            return (
              <article
                key={vehicle.slug}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-bold text-white">
                    {vehicle.name}
                  </p>

                  <p className="mt-1 text-sm text-zinc-400">
                    {vehicle.manufacturer}
                    {" · "}
                    {vehicle.class}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-emerald-400">
                    {formatPrice(
                      vehicle.price
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isOwned}
                  onClick={() =>
                    onAddVehicle(
                      vehicle
                    )
                  }
                  className="inline-flex min-w-28 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2.5 text-sm font-bold text-emerald-400 transition hover:border-emerald-400 hover:bg-emerald-400/20 disabled:cursor-not-allowed disabled:border-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-500"
                >
                  {isOwned
                    ? "Owned"
                    : "Add Vehicle"}
                </button>
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}