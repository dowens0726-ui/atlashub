import type {
  Vehicle,
  VehicleAcquisition,
  VehicleDrivetrain,
  VehiclePerformance,
  VehicleRarity,
  VehicleSourceGame,
} from "@/app/types";

export type CreateVehicleInput = Omit<
  Vehicle,
  | "id"
  | "verified"
  | "featured"
  | "drivetrain"
  | "rarity"
  | "sourceGame"
  | "performance"
  | "acquisition"
  | "images"
  | "relatedVehicles"
  | "recommendedMissions"
  | "notes"
> & {
  id?: string;
  verified?: boolean;
  featured?: boolean;
  drivetrain?: VehicleDrivetrain;
  rarity?: VehicleRarity;
  sourceGame?: VehicleSourceGame;
  performance?: VehiclePerformance;
  acquisition?: VehicleAcquisition;
  images?: string[];
  relatedVehicles?: string[];
  recommendedMissions?: string[];
  notes?: string[];
};

function createVehicleId(slug: string) {
  return `veh:${slug}`;
}

export function createVehicle(input: CreateVehicleInput): Vehicle {
  return {
    ...input,

    id: input.id ?? createVehicleId(input.slug),

    verified: input.verified ?? false,
    featured: input.featured ?? false,

    drivetrain: input.drivetrain ?? "RWD",

    rarity: input.rarity ?? "Unknown",
    sourceGame: input.sourceGame ?? "GTA VI",

    performance:
      input.performance ?? {
        topSpeed: input.topSpeed,
        acceleration: input.acceleration,
        handling: input.handling,
        braking: input.braking,
      },

    acquisition:
      input.acquisition ?? {
        method: "Unknown",
      },

    images: input.images ?? [input.image],

    relatedVehicles: input.relatedVehicles ?? [],

    recommendedMissions: input.recommendedMissions ?? [],

    notes: input.notes ?? [],
  };
}