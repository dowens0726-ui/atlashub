export type PlayerPlaystyle =
  | "solo"
  | "crew"
  | "racing"
  | "business";

export type PlayerProfile = {
  cash: number;
  playstyle: PlayerPlaystyle;

  ownedBusinesses: string[];
  ownedVehicles: string[];

  ownedProperties?: string[];
};