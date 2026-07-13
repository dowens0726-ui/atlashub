import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const karinVehicles: Vehicle[] = [
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
    tags: ["sports", "bennys", "awd", "tuner", "karin"],
  }),
];