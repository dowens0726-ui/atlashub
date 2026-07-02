import { missions } from "@/app/data";
import type { Mission } from "@/app/types";

export function getMissionsForVehicle(vehicleSlug: string): Mission[] {
  return missions.filter(
    (mission) => mission.recommendedVehicle === vehicleSlug
  );
}

export function getMissionsForWeapon(weaponSlug: string): Mission[] {
  return missions.filter(
    (mission) => mission.recommendedWeapon === weaponSlug
  );
}