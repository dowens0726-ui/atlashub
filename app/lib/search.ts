import { missions } from "../data/missions";
import { vehicles } from "../data/vehicles";

export type SearchResult = {
  id: string;
  title: string;
  category: string;
  href: string;
  icon: string;
};

const searchIndex: SearchResult[] = [
  ...missions.map((mission) => ({
    id: `mission-${mission.slug}`,
    title: mission.title,
    category: "Mission",
    href: `/missions/${mission.slug}`,
    icon: mission.category === "Heist" ? "🎯" : "📖",
  })),

  ...vehicles.map((vehicle) => ({
    id: `vehicle-${vehicle.slug}`,
    title: vehicle.name,
    category: "Vehicle",
    href: `/vehicles/${vehicle.slug}`,
    icon: "🚗",
  })),
];

export function search(query: string) {
  if (!query.trim()) return [];

  return searchIndex.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
}