export type SearchItem = {
  id: string;
  title: string;
  category: string;
  href: string;
};

export const searchItems: SearchItem[] = [
  {
    id: "mission-1",
    title: "Prologue",
    category: "Mission",
    href: "/missions/prologue",
  },
  {
    id: "mission-2",
    title: "First Heist",
    category: "Mission",
    href: "/missions/first-heist",
  },
  {
    id: "vehicle-1",
    title: "Adder",
    category: "Vehicle",
    href: "/vehicles/adder",
  },
  {
    id: "weapon-1",
    title: "Combat Pistol",
    category: "Weapon",
    href: "/weapons/combat-pistol",
  },
];
