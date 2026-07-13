import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const principeVehicles: Vehicle[] = [
  createVehicle({
    slug: "deveste-eight",
    name: "Deveste Eight",
    manufacturer: "Principe",
    class: "Super",
    image: "/vehicles/deveste-eight.jpg",
    price: 1795000,
    topSpeed: 132,
    acceleration: 90,
    handling: 80,
    braking: 78,
    drivetrain: "AWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "An extreme high-speed supercar built around straight-line dominance and dramatic styling.",
    featured: true,
    tags: [
      "super",
      "top-speed",
      "hypercar",
      "legendary-motorsport",
      "principe",
    ],
  }),
];