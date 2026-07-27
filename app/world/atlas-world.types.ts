export type AtlasTimeOfDay =
  | "dawn"
  | "morning"
  | "afternoon"
  | "golden-hour"
  | "sunset"
  | "night";

export type AtlasWeather =
  | "clear"
  | "partly-cloudy"
  | "overcast"
  | "rain"
  | "storm";

export type AtlasWorldIntensity =
  | "low"
  | "moderate"
  | "high"
  | "maximum";

export type AtlasWorldOperationalMode =
  | "calm"
  | "active"
  | "alert"
  | "critical";

export type AtlasLightingProfile = {
  skyBrightness: number;
  skylineBrightness: number;
  buildingLightIntensity: number;
  systemGlowIntensity: number;
  cautionGlowIntensity: number;
};

export type AtlasTrafficProfile = {
  road: AtlasWorldIntensity;
  harbor: AtlasWorldIntensity;
  air: AtlasWorldIntensity;
};

export type AtlasAtmosphereProfile = {
  haze: number;
  cloudCover: number;
  windStrength: number;
  waterShimmer: number;
  ambientMotion: number;
};

export type AtlasWorldDynamics = {
  energy: number;
  neonIntensity: number;
  districtActivityBias: number;
  ambientTension: number;
  worldPulse: number;
  atmosphericClarity: number;
};

export type AtlasWorldInfluence = {
  empireScore: number;
  confidence: number;
  availableCash: number;
  progressionStage: string;
  shouldActNow: boolean;
};

export type AtlasWorldState = {
  generatedAt: string;
  localHour: number;
  timeOfDay: AtlasTimeOfDay;
  weather: AtlasWeather;
  operationalMode: AtlasWorldOperationalMode;
  lighting: AtlasLightingProfile;
  traffic: AtlasTrafficProfile;
  atmosphere: AtlasAtmosphereProfile;
  dynamics: AtlasWorldDynamics;
  cityActivity: AtlasWorldIntensity;
  influence: AtlasWorldInfluence;
  sceneLabel: string;
  sceneSummary: string;
};

export type BuildAtlasWorldStateInput = {
  empireScore: number;
  confidence: number;
  availableCash: number;
  progressionStage: string;
  shouldActNow?: boolean;
  date?: Date;
  weather?: AtlasWeather;
};
