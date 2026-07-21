export type AtlasWorldState =
  | "idle"
  | "waiting"
  | "loading"
  | "success"
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
};


export const defaultAtlasWorldConfiguration:
  AtlasWorldConfiguration = {
    state:
      "idle",

    intensity:
      "medium",

    active:
      true,
  };
