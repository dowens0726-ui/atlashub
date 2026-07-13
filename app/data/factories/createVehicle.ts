import type {
  ContentVerification,
  Vehicle,
  VehicleAcquisition,
  VehicleDataAvailability,
  VehicleDataConfidence,
  VehicleDataQuality,
  VehicleDrivetrain,
  VehiclePerformance,
  VehicleRarity,
  VehicleSourceGame,
} from "@/app/types";

export type CreateVehicleInput = Omit<
  Vehicle,
  | "id"
  | "verified"
  | "verification"
  | "featured"
  | "drivetrain"
  | "rarity"
  | "sourceGame"
  | "performance"
  | "acquisition"
  | "dataQuality"
  | "images"
  | "relatedVehicles"
  | "recommendedMissions"
  | "notes"
> & {
  id?: string;
  verified?: boolean;
  verification?: ContentVerification;
  featured?: boolean;
  drivetrain?: VehicleDrivetrain;
  rarity?: VehicleRarity;
  sourceGame?: VehicleSourceGame;
  performance?: VehiclePerformance;
  acquisition?: VehicleAcquisition;
  dataQuality?: VehicleDataQuality;
  images?: string[];
  relatedVehicles?: string[];
  recommendedMissions?: string[];
  notes?: string[];
};

function createVehicleId(slug: string): string {
  return `veh:${slug}`;
}

function buildDefaultVerification(
  input: CreateVehicleInput
): ContentVerification {
  if (input.verified === true) {
    return {
      status: "Official",
    };
  }

  if (
    input.sourceGame === "GTA V" ||
    input.sourceGame === "GTA Online"
  ) {
    return {
      status: "Legacy",
    };
  }

  return {
    status: "Unknown",
  };
}

function buildDefaultConfidence(
  input: CreateVehicleInput,
  verification: ContentVerification
): VehicleDataConfidence {
  if (
    input.sourceGame === "GTA V" ||
    input.sourceGame === "GTA Online" ||
    verification.status === "Legacy"
  ) {
    return "Legacy";
  }

  if (
    verification.status === "Official" &&
    input.sourceGame === "GTA VI"
  ) {
    return "Confirmed";
  }

  if (
    verification.status === "Observed" ||
    verification.status === "Community"
  ) {
    return "Estimated";
  }

  return "Unknown";
}

function hasConfirmedNumericValue(
  value: number,
  confidence: VehicleDataConfidence
): boolean {
  if (
    confidence === "Unknown"
  ) {
    return false;
  }

  return Number.isFinite(value) && value > 0;
}

function buildDefaultAvailability(
  input: CreateVehicleInput,
  confidence: VehicleDataConfidence
): VehicleDataAvailability {
  return {
    price: hasConfirmedNumericValue(
      input.price,
      confidence
    ),

    topSpeed: hasConfirmedNumericValue(
      input.topSpeed,
      confidence
    ),

    acceleration: hasConfirmedNumericValue(
      input.acceleration,
      confidence
    ),

    handling: hasConfirmedNumericValue(
      input.handling,
      confidence
    ),

    braking: hasConfirmedNumericValue(
      input.braking,
      confidence
    ),

    drivetrain:
      confidence !== "Unknown" &&
      Boolean(input.drivetrain) &&
      input.drivetrain !== "Unknown",

    seats:
      confidence !== "Unknown" &&
      Number.isFinite(input.seats) &&
      input.seats > 0,

    location:
      confidence !== "Unknown" &&
      input.location.trim().length > 0,

    horsepower:
      confidence !== "Unknown" &&
      Number.isFinite(
        input.performance?.horsepower
      ) &&
      (input.performance?.horsepower ?? 0) > 0,
  };
}

function buildDefaultDataQuality(
  input: CreateVehicleInput,
  verification: ContentVerification
): VehicleDataQuality {
  const confidence =
    buildDefaultConfidence(
      input,
      verification
    );

  return {
    confidence,
    availability:
      buildDefaultAvailability(
        input,
        confidence
      ),
  };
}

export function createVehicle(
  input: CreateVehicleInput
): Vehicle {
  const verification =
    input.verification ??
    buildDefaultVerification(
      input
    );

  const verified =
    input.verified ??
    verification.status === "Official";

  const sourceGame =
    input.sourceGame ??
    "Unknown";

  const dataQuality =
    input.dataQuality ??
    buildDefaultDataQuality(
      {
        ...input,
        sourceGame,
      },
      verification
    );

  return {
    ...input,

    id:
      input.id ??
      createVehicleId(
        input.slug
      ),

    verified,
    verification,

    featured:
      input.featured ??
      false,

    drivetrain:
      input.drivetrain ??
      "Unknown",

    rarity:
      input.rarity ??
      "Unknown",

    sourceGame,

    performance:
      input.performance ?? {
        topSpeed:
          input.topSpeed,

        acceleration:
          input.acceleration,

        handling:
          input.handling,

        braking:
          input.braking,
      },

    acquisition:
      input.acquisition ?? {
        method:
          "Unknown",
      },

    dataQuality,

    images:
      input.images ??
      [input.image],

    relatedVehicles:
      input.relatedVehicles ??
      [],

    recommendedMissions:
      input.recommendedMissions ??
      [],

    notes:
      input.notes ??
      [],
  };
}