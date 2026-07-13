import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const dinkaVehicles: Vehicle[] = [
  createVehicle({
    slug: "jester",
    name: "Jester",
    manufacturer: "Dinka",
    class: "Sports",
    image: "/vehicles/jester.jpg",
    price: 240000,
    topSpeed: 119,
    acceleration: 81,
    handling: 82,
    braking: 75,
    drivetrain: "RWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "A nimble Japanese-inspired sports coupe built for corners.",
    featured: false,
    tags: ["sports", "jdm", "cornering", "dinka"],
  }),
];