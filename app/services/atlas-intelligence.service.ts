import { missions } from "@/app/data";
import type { Mission } from "@/app/types";

/**
 * Returns all missions that recommend a specific vehicle.
 */
export function getMissionsForVehicle(vehicleSlug: string): Mission[] {
  return missions.filter(
    (mission) => mission.recommendedVehicle === vehicleSlug
  );
}

/**
 * Returns all missions that recommend a specific weapon.
 */
export function getMissionsForWeapon(weaponSlug: string): Mission[] {
  return missions.filter(
    (mission) => mission.recommendedWeapon === weaponSlug
  );
}

/**
 * Returns featured missions.
 */
export function getFeaturedMissions(): Mission[] {
  return missions.filter((mission) => mission.featured);
}

/**
 * Returns missions by difficulty.
 */
export function getMissionsByDifficulty(
  difficulty: Mission["difficulty"]
): Mission[] {
  return missions.filter(
    (mission) => mission.difficulty === difficulty
  );
}