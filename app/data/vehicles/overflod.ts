import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const overflodVehicles: Vehicle[] = [
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
      "A balanced supercar known for sharp handling, strong speed, and clean Scandinavian styling.",
    featured: false,
    tags: [
      "super",
      "balanced",
      "handling",
      "overflod",
      "legendary-motorsport",
    ],
  }),
];