import type { BaseEntity } from "./content";

export type Vehicle = BaseEntity & {
  name: string;
  manufacturer: string;
  class: string;
  image: string;
  featured: boolean;
  price: number;
  topSpeed: number;
  acceleration: number;
  handling: number;
  braking: number;
  drivetrain: "RWD" | "FWD" | "AWD";
  seats: number;
  location: string;
};