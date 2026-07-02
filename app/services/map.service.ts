import { missions, vehicles, weapons } from "@/app/data";
import type { AtlasMapMarker } from "@/app/types";

export function getMapMarkers(): AtlasMapMarker[] {
  return [
    ...missions.map((mission, index) => ({
      id: mission.id,
      type: "mission" as const,
      title: mission.title,
      description: mission.description,
      x: 20 + index * 10,
      y: 30 + index * 8,
      href: `/missions/${mission.slug}`,
      icon: "🎯",
    })),

    ...vehicles.map((vehicle, index) => ({
      id: vehicle.id,
      type: "vehicle" as const,
      title: vehicle.name,
      description: vehicle.description,
      x: 35 + index * 12,
      y: 55 + index * 6,
      href: `/vehicles/${vehicle.slug}`,
      icon: "🚗",
    })),

    ...weapons.map((weapon, index) => ({
      id: weapon.id,
      type: "weapon" as const,
      title: weapon.name,
      description: weapon.description,
      x: 60 + index * 8,
      y: 25 + index * 10,
      href: `/weapons/${weapon.slug}`,
      icon: "🔫",
    })),
  ];
}