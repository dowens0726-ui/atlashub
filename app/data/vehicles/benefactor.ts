import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const benefactorVehicles: Vehicle[] = [
  createVehicle({
    slug: "feltzer",
    name: "Feltzer",
    manufacturer: "Benefactor",
    class: "Sports",
    image: "/vehicles/feltzer.jpg",
    price: 145000,
    topSpeed: 119,
    acceleration: 83,
    handling: 84,
    braking: 78,
    drivetrain: "RWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "Balanced handling and acceleration make it a favorite among experienced drivers.",
    featured: false,
    tags: ["sports", "balanced", "benefactor"],
  }),

  createVehicle({
    slug: "schafter-v12",
    name: "Schafter V12",
    manufacturer: "Benefactor",
    class: "Sports",
    image: "/vehicles/schafter-v12.jpg",
    price: 116000,
    topSpeed: 123,
    acceleration: 84,
    handling: 78,
    braking: 74,
    drivetrain: "RWD",
    seats: 4,
    location: "Legendary Motorsport",
    description:
      "Luxury meets muscle in one of Benefactor's fastest sedans.",
    featured: false,
    tags: ["sports", "sedan", "luxury", "benefactor"],
  }),
];