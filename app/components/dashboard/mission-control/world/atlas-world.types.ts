import type {
  AtlasDistrictCategory,
  AtlasDistrictId,
  AtlasEconomyState,
  AtlasHeatLevel,
  AtlasOperatingStatus,
  AtlasTimeOfDay,
  AtlasWeather,
} from "@/app/intelligence";


export type AtlasWorldState =
  | "idle"
  | "loading"
  | "ready"
  | "warning"
  | "failed";


export type AtlasWorldIntensity =
  | "low"
  | "medium"
  | "high";


export type AtlasWorldConfiguration = {
  state:
    AtlasWorldState;

  intensity:
    AtlasWorldIntensity;

  active:
    boolean;

  district:
    AtlasDistrictId | null;

  districtCategory:
    AtlasDistrictCategory | null;

  economy:
    AtlasEconomyState | null;

  heat:
    AtlasHeatLevel | null;

  timeOfDay:
    AtlasTimeOfDay | null;

  weather:
    AtlasWeather | null;

  operatingStatus:
    AtlasOperatingStatus | null;
};


export const defaultAtlasWorldConfiguration:
  AtlasWorldConfiguration = {
    state:
      "idle",

    intensity:
      "low",

    active:
      true,

    district:
      null,

    districtCategory:
      null,

    economy:
      null,

    heat:
      null,

    timeOfDay:
      null,

    weather:
      null,

    operatingStatus:
      null,
  };
