import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const bravadoVehicles: Vehicle[] = [
  createVehicle({
    slug: "banshee",
    name: "Banshee",
    manufacturer: "Bravado",
    class: "Sports",
    image: "/vehicles/banshee.jpg",
    price: 105000,
    topSpeed: 117,
    acceleration: 80,
    handling: 75,
    braking: 70,
    drivetrain: "RWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "An iconic American sports car famous for street racing.",
    featured: true,
    tags: ["sports", "street-racing", "iconic", "bravado"],
  }),

  createVehicle({
    slug: "buffalo-stx",
    name: "Buffalo STX",
    manufacturer: "Bravado",
    class: "Muscle",
    image: "/vehicles/buffalo-stx.jpg",
    price: 2150000,
    topSpeed: 126,
    acceleration: 82,
    handling: 78,
    braking: 74,
    drivetrain: "AWD",
    seats: 4,
    location: "Southern San Andreas Super Autos",
    description:
      "Modern American muscle with excellent acceleration.",
    featured: true,
    tags: ["muscle", "sedan", "awd", "bravado"],
  }),
];