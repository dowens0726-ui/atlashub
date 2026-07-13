import type { Vehicle } from "@/app/types";

import { bravadoVehicles } from "./bravado";
import { muscleVehicles } from "./muscle";
import { pegassiVehicles } from "./pegassi";
import { sportsVehicles } from "./sports";
import { superVehicles } from "./super";

export const vehicles: Vehicle[] = [
  ...bravadoVehicles,
  ...pegassiVehicles,
  ...sportsVehicles,
  ...muscleVehicles,
  ...superVehicles,
];