import type { Vehicle } from "@/app/types";
import { sportsVehicles } from "./sports";
import { muscleVehicles } from "./muscle";

export const vehicles: Vehicle[] = [...sportsVehicles, ...muscleVehicles];