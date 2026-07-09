import { vehicles, businesses } from "@/app/data";

import type {
  Vehicle,
  Business,
  PlayerProfile,
} from "@/app/types";

import {
  getVehicleMatch,
  getBusinessMatch,
} from "./match.engine";


export type PersonalRanking<T> = {
  item: T;

  match: number;

  factors: {
    performance: number;
    budget: number;
    playstyle: number;
    progression: number;
  };

  reasons: string[];
};


export function getPersonalVehicleRankings(
  profile: PlayerProfile,
  limit = 5
): PersonalRanking<Vehicle>[] {
  const ownedVehicles = new Set(
    profile.ownedVehicles
  );

  return vehicles
    .filter(
      (vehicle) =>
        !ownedVehicles.has(vehicle.slug)
    )
    .map((vehicle) => {
      const match =
        getVehicleMatch(
          profile,
          vehicle
        );

      return {
        item: vehicle,
        match: match.overall,
        factors: match.factors,
        reasons: match.reasons,
      };
    })
    .sort(
      (a, b) =>
        b.match - a.match
    )
    .slice(0, limit);
}


export function getPersonalBusinessRankings(
  profile: PlayerProfile,
  limit = 5
): PersonalRanking<Business>[] {
  const ownedBusinesses = new Set(
    profile.ownedBusinesses
  );

  return businesses
    .filter(
      (business) =>
        !ownedBusinesses.has(
          business.slug
        )
    )
    .map((business) => {
      const match =
        getBusinessMatch(
          profile,
          business
        );

      return {
        item: business,
        match: match.overall,
        factors: match.factors,
        reasons: match.reasons,
      };
    })
    .sort(
      (a, b) =>
        b.match - a.match
    )
    .slice(0, limit);
}