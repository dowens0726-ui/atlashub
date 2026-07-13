import type { Vehicle } from "@/app/types";

import { bravadoVehicles } from "./bravado";
import { muscleVehicles } from "./muscle";
import { sportsVehicles } from "./sports";
import { superVehicles } from "./super";

export const vehicles: Vehicle[] = [
  ...bravadoVehicles,
  ...sportsVehicles,
  ...muscleVehicles,
  ...superVehicles,
];