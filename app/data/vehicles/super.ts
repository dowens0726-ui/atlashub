import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const superVehicles: Vehicle[] = [
  createVehicle({
    slug: "adder",
    name: "Adder",
    manufacturer: "Truffade",
    class: "Super",
    image: "/vehicles/adder.jpg",
    price: 1000000,
    topSpeed: 124,
    acceleration: 85,
    handling: 78,
    braking: 76,
    drivetrain: "AWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "A legendary hypercar inspired by the Bugatti Veyron.",
    featured: true,
    tags: ["super", "hypercar"],
  }),

  createVehicle({
    slug: "zentorno",
    name: "Zentorno",
    manufacturer: "Pegassi",
    class: "Super",
    image: "/vehicles/zentorno.jpg",
    price: 725000,
    topSpeed: 122,
    acceleration: 88,
    handling: 83,
    braking: 80,
    drivetrain: "AWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "One of GTA's most iconic supercars with incredible acceleration.",
    featured: true,
    tags: ["super", "awd"],
  }),

  createVehicle({
    slug: "entity-xf",
    name: "Entity XF",
    manufacturer: "Överflöd",
    class: "Super",
    image: "/vehicles/entity-xf.jpg",
    price: 795000,
    topSpeed: 121,
    acceleration: 84,
    handling: 84,
    braking: 79,
    drivetrain: "RWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "Balanced handling and speed make it a fan favorite.",
    featured: false,
    tags: ["super"],
  }),
];