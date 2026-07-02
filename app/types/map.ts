export type AtlasMapMarker = {
  id: string;
  type: "mission" | "vehicle" | "weapon" | "business" | "collectible";
  title: string;
  description: string;
  x: number;
  y: number;
  href: string;
  icon: string;
};