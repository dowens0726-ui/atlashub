import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const pfisterVehicles: Vehicle[] = [
  createVehicle({
    slug: "comet-s2",
    name: "Comet S2",
    manufacturer: "Pfister",
    class: "Sports",
    image: "/vehicles/comet-s2.jpg",
    price: 1878000,
    topSpeed: 123,
    acceleration: 82,
    handling: 78,
    braking: 74,
    drivetrain: "RWD",
    seats: 2,
    location: "Legendary Motorsport",
    description:
      "A modern Pfister sports coupe inspired by Porsche engineering.",
    featured: true,
    tags: ["sports", "coupe", "performance", "pfister"],
  }),
];