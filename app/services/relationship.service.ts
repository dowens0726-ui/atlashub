import { businesses, missions, vehicles } from "@/app/data";
import type { Business, Mission, Vehicle } from "@/app/types";

export function getRelatedVehicles(
  business: Business,
  limit = 3
): Vehicle[] {
  return vehicles
    .filter((vehicle) =>
      business.relatedVehicles?.includes(vehicle.slug)
    )
    .slice(0, limit);
}

export function getRelatedMissions(
  business: Business,
  limit = 3
): Mission[] {
  return missions
    .filter((mission) =>
      business.relatedMissions?.includes(mission.slug)
    )
    .slice(0, limit);
}

export function getRelatedBusinesses(
  business: Business,
  limit = 3
): Business[] {
  return businesses
    .filter(
      (candidate) =>
        candidate.slug !== business.slug &&
        candidate.category === business.category
    )
    .slice(0, limit);
}