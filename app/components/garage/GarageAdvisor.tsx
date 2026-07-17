"use client";

import Link from "next/link";
import {
  useMemo,
} from "react";

import {
  vehicles,
} from "@/app/data/vehicles";

import useGarage from "@/app/hooks/useGarage";

import {
  buildGarageIntelligence,
} from "@/app/intelligence/vehicle";

import GarageCoverageCard from "./GarageCoverageCard";
import GarageImpactCard from "./GarageImpactCard";
import GarageInsightsCard from "./GarageInsightsCard";
import GarageMissingCategories from "./GarageMissingCategories";
import GarageRecommendationsCard from "./GarageRecommendationsCard";
import GarageScoreCard from "./GarageScoreCard";
import GarageVehicleList from "./GarageVehicleList";
import GarageVehicleSearch from "./GarageVehicleSearch";

export default function GarageAdvisor() {
  const {
    ownedVehicles,
    ownedVehicleSlugs,
    vehicleCount,
    isHydrated,
    addVehicle,
    removeVehicle,
    clearGarage,
  } =
    useGarage(
      vehicles
    );

  const analysis =
    useMemo(
      () =>
        buildGarageIntelligence(
          ownedVehicles,
          vehicles
        ),
      [
        ownedVehicles,
      ]
    );

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
            identify weaknesses, recommend the strongest next purchase, and
            simulate its projected impact.
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
            {isHydrated
              ? vehicleCount
              : "—"}
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
            {isHydrated
              ? "Saved Locally"
              : "Loading"}
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
              vehicles={
                vehicles
              }
              ownedVehicleSlugs={
                ownedVehicleSlugs
              }
              onAddVehicle={
                addVehicle
              }
            />

            <GarageVehicleList
              vehicles={
                ownedVehicles
              }
              onRemoveVehicle={
                removeVehicle
              }
              onClearGarage={
                clearGarage
              }
            />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <GarageScoreCard
              score={
                analysis.garageScore
              }
              vehicleCount={
                vehicleCount
              }
            />

            <GarageCoverageCard
              coverage={
                analysis.coverage
              }
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <GarageInsightsCard
              strengths={
                analysis.strengths
              }
              weaknesses={
                analysis.weaknesses
              }
            />

            <GarageMissingCategories
              categories={
                analysis.missingCategories
              }
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <GarageRecommendationsCard
              recommendation={
                analysis.recommendation
              }
            />

            <GarageImpactCard
              projection={
                analysis.projectedRecommendation
              }
            />
          </div>
        </>
      )}
    </section>
  );
}