"use client";

import Link from "next/link";
import { useMemo } from "react";

import { vehicles } from "@/app/data/vehicles";
import useGarage from "@/app/hooks/useGarage";
import {
  buildVehicleIntelligenceProfile,
  getGarageRecommendation,
  scoreVehicle,
} from "@/app/intelligence/vehicle";

import GarageCoverageCard, {
  type GarageCoverageItem,
} from "./GarageCoverageCard";
import GarageInsightsCard from "./GarageInsightsCard";
import GarageMissingCategories from "./GarageMissingCategories";
import GarageRecommendationsCard from "./GarageRecommendationsCard";
import GarageScoreCard from "./GarageScoreCard";
import GarageVehicleList from "./GarageVehicleList";
import GarageVehicleSearch from "./GarageVehicleSearch";

const coverageDefinitions = [
  {
    key: "getaway",
    label: "Getaway Driving",
  },
  {
    key: "offRoad",
    label: "Off-Road",
  },
  {
    key: "racing",
    label: "Racing",
  },
  {
    key: "business",
    label: "Business",
  },
  {
    key: "crew",
    label: "Crew Transport",
  },
  {
    key: "pvp",
    label: "PvP Combat",
  },
  {
    key: "pve",
    label: "PvE Missions",
  },
] as const;

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return Math.round(
    values.reduce((total, value) => total + value, 0) /
      values.length
  );
}

export default function GarageAdvisor() {
  const {
    ownedVehicles,
    ownedVehicleSlugs,
    vehicleCount,
    isHydrated,
    addVehicle,
    removeVehicle,
    clearGarage,
  } = useGarage(vehicles);

  const analysis = useMemo(() => {
    const profiles = ownedVehicles.map((vehicle) =>
      buildVehicleIntelligenceProfile(vehicle)
    );

    const scoreBreakdowns = ownedVehicles.map((vehicle) =>
      scoreVehicle(vehicle)
    );

    const coverage: GarageCoverageItem[] =
      coverageDefinitions.map(({ key, label }) => ({
        key,
        label,
        score: average(
          profiles.map((profile) => profile.ratings[key])
        ),
      }));

    const averageVehicleScore = average(
      scoreBreakdowns.map(
        (breakdown) => breakdown.score.overall
      )
    );

    const coveredCategories = coverage.filter(
      (item) => item.score >= 55
    ).length;

    const coverageBreadth =
      coverage.length > 0
        ? Math.round(
            (coveredCategories / coverage.length) * 100
          )
        : 0;

    const garageScore =
      ownedVehicles.length === 0
        ? 0
        : Math.round(
            averageVehicleScore * 0.7 +
              coverageBreadth * 0.3
          );

    const rankedCoverage = [...coverage].sort(
      (first, second) => second.score - first.score
    );

    const strengths = rankedCoverage
      .filter((item) => item.score >= 65)
      .slice(0, 3)
      .map(
        (item) =>
          `${item.label} is a garage strength with a coverage rating of ${item.score}.`
      );

    const weaknesses = [...coverage]
      .sort((first, second) => first.score - second.score)
      .filter((item) => item.score < 60)
      .slice(0, 3)
      .map(
        (item) =>
          `${item.label} is underrepresented with a coverage rating of ${item.score}.`
      );

    const missingCategories = coverage
      .filter((item) => item.score < 55)
      .map((item) => item.label);

    const recommendation = getGarageRecommendation(
      ownedVehicles,
      vehicles
    );

    return {
      coverage,
      garageScore,
      strengths,
      weaknesses,
      missingCategories,
      recommendation,
    };
  }, [ownedVehicles]);

  return (
    <section aria-labelledby="garage-advisor-heading">
      <div className="mb-8 flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            Atlas Intelligence
          </p>

          <h2
            id="garage-advisor-heading"
            className="mt-2 text-3xl font-black text-white"
          >
            Garage Advisor
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
            Add the vehicles you own. Atlas will evaluate capability coverage,
            identify weaknesses, and recommend the strongest next purchase.
          </p>
        </div>

        <Link
          href="/garage-builder"
          className="inline-flex w-fit items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-bold text-zinc-200 transition hover:border-emerald-400/50 hover:text-emerald-400"
        >
          ← Garage Center
        </Link>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
          <p className="text-sm text-zinc-500">
            Owned Vehicles
          </p>

          <p className="mt-1 text-2xl font-black text-white">
            {isHydrated ? vehicleCount : "—"}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
          <p className="text-sm text-zinc-500">
            Vehicle Database
          </p>

          <p className="mt-1 text-2xl font-black text-white">
            {vehicles.length}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
          <p className="text-sm text-zinc-500">
            Save Status
          </p>

          <p className="mt-1 text-lg font-bold text-emerald-400">
            {isHydrated ? "Saved Locally" : "Loading"}
          </p>
        </div>
      </div>

      {!isHydrated ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 text-center">
          <p className="font-semibold text-zinc-300">
            Loading your garage...
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-2">
            <GarageVehicleSearch
              vehicles={vehicles}
              ownedVehicleSlugs={ownedVehicleSlugs}
              onAddVehicle={addVehicle}
            />

            <GarageVehicleList
              vehicles={ownedVehicles}
              onRemoveVehicle={removeVehicle}
              onClearGarage={clearGarage}
            />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <GarageScoreCard
              score={analysis.garageScore}
              vehicleCount={vehicleCount}
            />

            <GarageCoverageCard
              coverage={analysis.coverage}
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <GarageInsightsCard
              strengths={analysis.strengths}
              weaknesses={analysis.weaknesses}
            />

            <GarageMissingCategories
              categories={analysis.missingCategories}
            />
          </div>

          <div className="mt-6">
            <GarageRecommendationsCard
              recommendation={analysis.recommendation}
            />
          </div>
        </>
      )}
    </section>
  );
}