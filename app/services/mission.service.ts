import { missions } from "@/app/data/missions";
import type { Mission } from "@/app/types";


export function getAllMissions(): Mission[] {
  return missions;
}


export function getMissionBySlug(
  slug: string
): Mission | undefined {
  return missions.find(
    (mission) =>
      mission.slug === slug
  );
}