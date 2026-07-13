import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const dewbaucheeVehicles: Vehicle[] = [
  createVehicle({
    slug: "massacro",
    name: "Massacro",
    manufacturer: "Dewbauchee",
    class: "Sports",
    image: "/vehicles/massacro.jpg",
    price: 275000,
    topSpeed: 121,
    acceleration: 84,
    handling: 83,
    braking: 77,
    drivetrain: "RWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "A race-inspired sports car with strong all-around performance.",
    featured: false,
    tags: ["sports", "race", "performance", "dewbauchee"],
  }),
];