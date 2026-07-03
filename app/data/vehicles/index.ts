import type { Vehicle } from "@/app/types";

import { sportsVehicles } from "./sports";
import { muscleVehicles } from "./muscle";
import { superVehicles } from "./super";

export const vehicles: Vehicle[] = [
  ...sportsVehicles,
  ...muscleVehicles,
  ...superVehicles,
];