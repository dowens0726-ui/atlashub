import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const annisVehicles: Vehicle[] = [
  createVehicle({
    slug: "elegy-rh8",
    name: "Elegy RH8",
    manufacturer: "Annis",
    class: "Sports",
    image: "/vehicles/elegy-rh8.jpg",
    price: 95000,
    topSpeed: 118,
    acceleration: 82,
    handling: 81,
    braking: 74,
    drivetrain: "AWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "A legendary tuner car with exceptional grip and balance.",
    featured: true,
    tags: ["sports", "tuner", "awd", "annis"],
  }),
];