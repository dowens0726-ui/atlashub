import type { Vehicle } from "@/app/types";

import { albanyVehicles } from "./albany";
import { annisVehicles } from "./annis";
import { benefactorVehicles } from "./benefactor";
import { bravadoVehicles } from "./bravado";
import { declasseVehicles } from "./declasse";
import { dewbaucheeVehicles } from "./dewbauchee";
import { dinkaVehicles } from "./dinka";
import { grottiVehicles } from "./grotti";
import { karinVehicles } from "./karin";
import { ocelotVehicles } from "./ocelot";
import { overflodVehicles } from "./overflod";
import { pegassiVehicles } from "./pegassi";
import { pfisterVehicles } from "./pfister";
import { principeVehicles } from "./principe";
import { progenVehicles } from "./progen";
import { truffadeVehicles } from "./truffade";
import { vapidVehicles } from "./vapid";

export const vehicles: Vehicle[] = [
  ...albanyVehicles,
  ...annisVehicles,
  ...benefactorVehicles,
  ...bravadoVehicles,
  ...declasseVehicles,
  ...dewbaucheeVehicles,
  ...dinkaVehicles,
  ...grottiVehicles,
  ...karinVehicles,
  ...ocelotVehicles,
  ...overflodVehicles,
  ...pegassiVehicles,
  ...pfisterVehicles,
  ...principeVehicles,
  ...progenVehicles,
  ...truffadeVehicles,
  ...vapidVehicles,
];