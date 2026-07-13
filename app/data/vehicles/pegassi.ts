import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const pegassiVehicles: Vehicle[] = [
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
      "One of GTA's most iconic supercars with incredible acceleration and aggressive styling.",
    featured: true,
    tags: [
      "super",
      "awd",
      "iconic",
      "legendary-motorsport",
      "pegassi",
    ],
  }),

  createVehicle({
    slug: "osiris",
    name: "Osiris",
    manufacturer: "Pegassi",
    class: "Super",
    image: "/vehicles/osiris.jpg",
    price: 1950000,
    topSpeed: 122,
    acceleration: 89,
    handling: 85,
    braking: 81,
    drivetrain: "AWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "A sleek Pegassi hypercar built for players who want speed, style, and confidence in fast corners.",
    featured: false,
    tags: [
      "super",
      "hypercar",
      "pegassi",
      "legendary-motorsport",
    ],
  }),
];