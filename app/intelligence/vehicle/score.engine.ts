import type {
  Vehicle,
} from "@/app/types";

import type {
  VehicleIntelligenceScore,
  VehicleScoreBreakdown,
} from "./types";

function clampScore(
  value: number
): number {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        value
      )
    )
  );
}

function normalizePriceScore(
  price: number
): number {
  if (
    price <= 0
  ) {
    return 35;
  }

  if (
    price <= 100000
  ) {
    return 100;
  }

  if (
    price <= 500000
  ) {
    return 90;
  }

  if (
    price <= 1000000
  ) {
    return 78;
  }

  if (
    price <= 2000000
  ) {
    return 65;
  }

  if (
    price <= 3000000
  ) {
    return 52;
  }

  return 40;
}

function getClassUtilityBonus(
  vehicleClass: string
): number {
  const normalizedClass =
    vehicleClass
      .trim()
      .toLowerCase();

  if (
    normalizedClass.includes(
      "suv"
    ) ||
    normalizedClass.includes(
      "off-road"
    ) ||
    normalizedClass.includes(
      "van"
    )
  ) {
    return 18;
  }

  if (
    normalizedClass.includes(
      "sedan"
    ) ||
    normalizedClass.includes(
      "coupe"
    )
  ) {
    return 10;
  }

  if (
    normalizedClass.includes(
      "motorcycle"
    ) ||
    normalizedClass.includes(
      "super"
    )
  ) {
    return 4;
  }

  return 7;
}

function buildPerformanceScore(
  vehicle: Vehicle
): number {
  return clampScore(
    vehicle.topSpeed *
      0.25 +
      vehicle.acceleration *
      0.3 +
      vehicle.handling *
      0.25 +
      vehicle.braking *
      0.2
  );
}

function buildValueScore(
  vehicle: Vehicle,
  performance: number
): number {
  const priceScore =
    normalizePriceScore(
      vehicle.price
    );

  return clampScore(
    priceScore *
      0.65 +
      performance *
      0.35
  );
}

function buildUtilityScore(
  vehicle: Vehicle
): number {
  const seatScore =
    Math.min(
      vehicle.seats *
        10,
      40
    );

  const drivetrainBonus =
    vehicle.drivetrain ===
      "AWD" ||
    vehicle.drivetrain ===
      "4WD"
      ? 22
      : vehicle.drivetrain ===
          "FWD"
        ? 12
        : 8;

  const classBonus =
    getClassUtilityBonus(
      vehicle.class
    );

  return clampScore(
    25 +
      seatScore +
      drivetrainBonus +
      classBonus
  );
}

function buildAccessibilityScore(
  vehicle: Vehicle
): number {
  const priceScore =
    normalizePriceScore(
      vehicle.price
    );

  const seatBonus =
    vehicle.seats >= 4
      ? 10
      : vehicle.seats >= 2
        ? 5
        : 0;

  const drivetrainBonus =
    vehicle.drivetrain ===
      "AWD" ||
    vehicle.drivetrain ===
      "4WD"
      ? 10
      : 4;

  return clampScore(
    priceScore *
      0.75 +
      seatBonus +
      drivetrainBonus
  );
}

function buildVersatilityScore(
  vehicle: Vehicle,
  performance: number,
  utility: number
): number {
  const featuredBonus =
    vehicle.featured
      ? 6
      : 0;

  const relationshipBonus =
    Math.min(
      (
        vehicle.relatedVehicles
          ?.length ??
        0
      ) *
        2,
      8
    );

  return clampScore(
    performance *
      0.4 +
      utility *
      0.45 +
      featuredBonus +
      relationshipBonus
  );
}

function buildOverallScore(
  score:
    Omit<
      VehicleIntelligenceScore,
      "overall"
    >
): number {
  return clampScore(
    score.performance *
      0.3 +
      score.value *
      0.2 +
      score.utility *
      0.2 +
      score.accessibility *
      0.15 +
      score.versatility *
      0.15
  );
}

function buildStrengths(
  score: VehicleIntelligenceScore
): string[] {
  const strengths:
    string[] = [];

  if (
    score.performance >=
    85
  ) {
    strengths.push(
      "Elite performance"
    );
  }

  if (
    score.value >=
    80
  ) {
    strengths.push(
      "Excellent value"
    );
  }

  if (
    score.utility >=
    80
  ) {
    strengths.push(
      "High utility"
    );
  }

  if (
    score.accessibility >=
    80
  ) {
    strengths.push(
      "Beginner friendly"
    );
  }

  if (
    score.versatility >=
    80
  ) {
    strengths.push(
      "Highly versatile"
    );
  }

  if (
    strengths.length ===
    0
  ) {
    strengths.push(
      "Balanced overall package"
    );
  }

  return strengths;
}

function buildWeaknesses(
  score: VehicleIntelligenceScore
): string[] {
  const weaknesses:
    string[] = [];

  if (
    score.performance <
    60
  ) {
    weaknesses.push(
      "Limited performance"
    );
  }

  if (
    score.value <
    55
  ) {
    weaknesses.push(
      "Weak value for the price"
    );
  }

  if (
    score.utility <
    55
  ) {
    weaknesses.push(
      "Limited utility"
    );
  }

  if (
    score.accessibility <
    55
  ) {
    weaknesses.push(
      "Less accessible for newer players"
    );
  }

  if (
    score.versatility <
    55
  ) {
    weaknesses.push(
      "Specialized use case"
    );
  }

  return weaknesses;
}

function buildSummary(
  vehicle: Vehicle,
  score: VehicleIntelligenceScore
): string {
  if (
    score.overall >=
    85
  ) {
    return `${vehicle.name} is an elite all-around option with strong performance and broad usefulness.`;
  }

  if (
    score.overall >=
    75
  ) {
    return `${vehicle.name} is a strong purchase with a dependable balance of performance, value, and utility.`;
  }

  if (
    score.overall >=
    65
  ) {
    return `${vehicle.name} is a solid specialist choice that performs well in the right role.`;
  }

  return `${vehicle.name} is best treated as a niche or collection-focused vehicle rather than a priority purchase.`;
}

export function scoreVehicle(
  vehicle: Vehicle
): VehicleScoreBreakdown {
  const performance =
    buildPerformanceScore(
      vehicle
    );

  const value =
    buildValueScore(
      vehicle,
      performance
    );

  const utility =
    buildUtilityScore(
      vehicle
    );

  const accessibility =
    buildAccessibilityScore(
      vehicle
    );

  const versatility =
    buildVersatilityScore(
      vehicle,
      performance,
      utility
    );

  const score:
    VehicleIntelligenceScore = {
      performance,
      value,
      utility,
      accessibility,
      versatility,
      overall:
        buildOverallScore({
          performance,
          value,
          utility,
          accessibility,
          versatility,
        }),
    };

  return {
    vehicle,
    score,
    strengths:
      buildStrengths(
        score
      ),
    weaknesses:
      buildWeaknesses(
        score
      ),
    summary:
      buildSummary(
        vehicle,
        score
      ),
  };
}