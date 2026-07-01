export type Weapon = {
  slug: string;
  name: string;
  category: "Pistol" | "SMG" | "Rifle" | "Shotgun" | "Sniper" | "Heavy" | "Melee";
  price: number;
  damage: number;
  fireRate: number;
  accuracy: number;
  range: number;
  description: string;
  image: string;
  featured: boolean;
};