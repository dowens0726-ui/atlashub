import type { Vehicle } from "@/app/types";

import { benefactorVehicles } from "./benefactor";
import { bravadoVehicles } from "./bravado";
import { grottiVehicles } from "./grotti";
import { muscleVehicles } from "./muscle";
import { ocelotVehicles } from "./ocelot";
import { pegassiVehicles } from "./pegassi";
import { pfisterVehicles } from "./pfister";
import { sportsVehicles } from "./sports";
import { superVehicles } from "./super";

export const vehicles: Vehicle[] = [
  ...benefactorVehicles,
  ...bravadoVehicles,
  ...grottiVehicles,
  ...ocelotVehicles,
  ...pegassiVehicles,
  ...pfisterVehicles,
  ...sportsVehicles,
  ...muscleVehicles,
  ...superVehicles,
];