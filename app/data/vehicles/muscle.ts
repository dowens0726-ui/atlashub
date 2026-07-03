import type { Vehicle } from "@/app/types";

export const muscleVehicles: Vehicle[] = [
  {
    id: "vehicle_002",
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
    description: "Modern American muscle with excellent acceleration.",
    featured: true,
    tags: ["muscle", "sedan"],
    verified: false,
  },
];