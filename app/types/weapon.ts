import type { BaseEntity } from "./content";

export type Weapon = BaseEntity & {
  name: string;
  category:
    | "Pistol"
    | "SMG"
    | "Rifle"
    | "Shotgun"
    | "Sniper"
    | "Heavy"
    | "Melee";
  image: string;
  featured: boolean;
  price: number;
  damage: number;
  fireRate: number;
  accuracy: number;
  range: number;
};