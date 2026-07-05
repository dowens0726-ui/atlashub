import { businesses, missions, vehicles, weapons } from "@/app/data";

export type ExplorerCategory =
  | "vehicle"
  | "mission"
  | "weapon"
  | "business"
  | "collectible";

export type ExplorerMarker = {
  id: string;
  name: string;
  category: ExplorerCategory;
  slug: string;
  x: number;
  y: number;
};

const vehicleMarkers: ExplorerMarker[] = vehicles.map((vehicle, index) => ({
  id: vehicle.slug,
  name: vehicle.name,
  category: "vehicle",
  slug: vehicle.slug,

  x: 15 + (index * 8) % 70,
  y: 20 + (index * 11) % 60,
}));

const missionMarkers: ExplorerMarker[] = missions.map((mission, index) => ({
  id: mission.slug,
  name: mission.title,
  category: "mission",
  slug: mission.slug,

  x: 10 + (index * 13) % 75,
  y: 15 + (index * 9) % 65,
}));

const weaponMarkers: ExplorerMarker[] = weapons.map((weapon, index) => ({
  id: weapon.slug,
  name: weapon.name,
  category: "weapon",
  slug: weapon.slug,

  x: 20 + (index * 7) % 65,
  y: 25 + (index * 5) % 55,
}));

const businessMarkers: ExplorerMarker[] = businesses.map((business, index) => ({
  id: business.slug,
  name: business.name,
  category: "business",
  slug: business.slug,

  x: 30 + (index * 9) % 60,
  y: 18 + (index * 8) % 60,
}));

export function getExplorerMarkers(): ExplorerMarker[] {
  return [
    ...vehicleMarkers,
    ...missionMarkers,
    ...weaponMarkers,
    ...businessMarkers,
  ];
}