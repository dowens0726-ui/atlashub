"use client";

import { usePlayerProfile } from "@/app/hooks/usePlayerProfile";

import {
  getPersonalVehicleRankings,
  getPersonalBusinessRankings,
} from "@/app/intelligence";

import {
  PersonalRankingSection,
} from "@/app/components/rankings";

import {
  vehicleRankingAdapter,
  businessRankingAdapter,
} from "@/app/services";

export default function RankingsClient() {
  const { profile, hydrated } = usePlayerProfile();

  if (!hydrated) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-zinc-400">
          Loading Atlas recommendations...
        </p>
      </div>
    );
  }

  const vehicles =
    getPersonalVehicleRankings(profile);

  const businesses =
    getPersonalBusinessRankings(profile);

  return (
    <div className="space-y-8">
      <PersonalRankingSection
        title="Your Recommended Vehicles"
        description="Atlas ranked these vehicles based on your cash, playstyle, and current progression."
        rankings={vehicles}
        {...vehicleRankingAdapter}
      />

      <PersonalRankingSection
        title="Your Recommended Businesses"
        description="Atlas ranked these businesses based on empire growth, income potential, and strategy."
        rankings={businesses}
        {...businessRankingAdapter}
      />
    </div>
  );
}