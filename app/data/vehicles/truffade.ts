import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const truffadeVehicles: Vehicle[] = [
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
    tags: [
      "super",
      "hypercar",
      "legendary-motorsport",
      "truffade",
    ],
  }),

  createVehicle({
    slug: "nero",
    name: "Nero",
    manufacturer: "Truffade",
    class: "Super",
    image: "/vehicles/nero.jpg",
    price: 1440000,
    topSpeed: 127,
    acceleration: 87,
    handling: 82,
    braking: 79,
    drivetrain: "AWD",
    seats: 2,
    location: "Benny's Original Motor Works",
    description:
      "A refined Truffade hypercar with immense straight-line speed and upgrade potential through Benny's.",
    featured: false,
    tags: [
      "super",
      "hypercar",
      "bennys",
      "upgradeable",
      "truffade",
    ],
  }),
];