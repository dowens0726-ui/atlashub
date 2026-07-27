export type AtlasDistrictId =
  | "downtown"
  | "vice-beach"
  | "port"
  | "industrial"
  | "suburbs"
  | "everglades"
  | "open-road";


export type AtlasDistrictCategory =
  | "commercial"
  | "entertainment"
  | "logistics"
  | "industrial"
  | "residential"
  | "wilderness"
  | "transit";


export type AtlasDistrict = {
  id: AtlasDistrictId;
  name: string;
  category: AtlasDistrictCategory;
  description: string;
};


export type AtlasEconomyState =
  | "contracting"
  | "stable"
  | "growing"
  | "surging";


export type AtlasHeatLevel =
  | "cold"
  | "guarded"
  | "elevated"
  | "critical";


export type AtlasTimeOfDay =
  | "dawn"
  | "day"
  | "dusk"
  | "night";


export type AtlasWeather =
  | "clear"
  | "humid"
  | "overcast"
  | "storm"
  | "haze";


export type AtlasOperatingStatus =
  | "stabilize"
  | "operate"
  | "expand"
  | "dominate";


export type AtlasWorldOpportunityType =
  | "cash-flow"
  | "business-expansion"
  | "portfolio-diversification"
  | "mission-progression"
  | "risk-reduction";


export type AtlasWorldDestination = {
  district: AtlasDistrict;
  label: string;
  reason: string;
};


export type AtlasWorldOpportunity = {
  type: AtlasWorldOpportunityType;
  title: string;
  summary: string;
  priority: number;
};


export type AtlasWorldContext = {
  district: AtlasDistrict;
  economy: AtlasEconomyState;
  heat: AtlasHeatLevel;
  timeOfDay: AtlasTimeOfDay;
  weather: AtlasWeather;
  operatingStatus: AtlasOperatingStatus;

  recommendedDestination: AtlasWorldDestination;
  recommendedActivity: string;
  strategicOpportunity: AtlasWorldOpportunity;

  empireScore: number;
  confidence: number;
  generatedAt: string;
};


export type BuildAtlasWorldContextInput = {
  cash: number;
  ownedBusinessCount: number;
  playstyle?: string | null;

  empireScore: number;
  cashScore: number;
  diversityScore: number;
  expansionScore: number;

  now?: Date;
  weather?: AtlasWeather;
};
