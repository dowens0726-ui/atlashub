import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const ocelotVehicles: Vehicle[] = [
  createVehicle({
    slug: "jugular",
    name: "Jugular",
    manufacturer: "Ocelot",
    class: "Sports",
    image: "/vehicles/jugular.jpg",
    price: 1225000,
    topSpeed: 126,
    acceleration: 82,
    handling: 78,
    braking: 74,
    drivetrain: "AWD",
    seats: 4,
    location: "Legendary Motorsport",
    description:
      "Luxury sports sedan with impressive speed and handling.",
    featured: false,
    tags: ["sports", "sedan", "awd", "ocelot"],
  }),

  createVehicle({
    slug: "pariah",
    name: "Pariah",
    manufacturer: "Ocelot",
    class: "Sports",
    image: "/vehicles/pariah.jpg",
    price: 1420000,
    topSpeed: 136,
    acceleration: 86,
    handling: 81,
    braking: 77,
    drivetrain: "RWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "An absolute monster in straight-line speed and one of GTA's fastest sports cars.",
    featured: true,
    tags: ["sports", "fastest", "top-speed", "ocelot"],
  }),
];