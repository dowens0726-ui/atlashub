import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const progenVehicles: Vehicle[] = [
  createVehicle({
    slug: "t20",
    name: "T20",
    manufacturer: "Progen",
    class: "Super",
    image: "/vehicles/t20.jpg",
    price: 2200000,
    topSpeed: 122,
    acceleration: 90,
    handling: 86,
    braking: 82,
    drivetrain: "AWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "A premium supercar with elite acceleration, precise handling, and active aerodynamic styling.",
    featured: true,
    tags: [
      "super",
      "premium",
      "awd",
      "legendary-motorsport",
      "progen",
    ],
  }),

  createVehicle({
    slug: "itali-gtb",
    name: "Itali GTB",
    manufacturer: "Progen",
    class: "Super",
    image: "/vehicles/itali-gtb.jpg",
    price: 1189000,
    topSpeed: 126,
    acceleration: 86,
    handling: 83,
    braking: 78,
    drivetrain: "AWD",
    seats: 2,
    location: "Benny's Original Motor Works",
    description:
      "A fast, stylish supercar with strong customization potential and excellent street presence.",
    featured: false,
    tags: [
      "super",
      "customizable",
      "bennys",
      "street",
      "progen",
    ],
  }),
];