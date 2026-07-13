import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const sportsVehicles: Vehicle[] = [
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
    tags: ["sports", "tuner", "awd"],
  }),

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
    tags: ["sports", "jdm", "cornering"],
  }),

  createVehicle({
    slug: "sultan-rs",
    name: "Sultan RS",
    manufacturer: "Karin",
    class: "Sports",
    image: "/vehicles/sultan-rs.jpg",
    price: 795000,
    topSpeed: 118,
    acceleration: 84,
    handling: 82,
    braking: 76,
    drivetrain: "AWD",
    seats: 4,
    location: "Benny's Original Motor Works",
    description:
      "One of GTA's most respected tuner cars with incredible customization.",
    featured: true,
    tags: ["sports", "bennys", "awd", "tuner"],
  }),

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
    tags: ["sports", "race", "dewbauchee"],
  }),
];