import type {
  Vehicle,
} from "@/app/types";

import {
  getGarageRecommendation,
} from "./garage.engine";

import {
  buildVehicleIntelligenceProfile,
} from "./profile.engine";

import {
  scoreVehicle,
} from "./score.engine";

import type {
  GarageCoverageImprovement,
  GarageCoverageItem,
  GarageIntelligenceResult,
  GarageProjectedRecommendation,
} from "./types";

const COVERAGE_DEFINITIONS = [
  {
    key: "getaway",
    label: "Getaway Driving",
  },
  {
    key: "offRoad",
    label: "Off-Road",
  },
  {
    key: "racing",
    label: "Racing",
  },
  {
    key: "business",
    label: "Business",
  },
  {
    key: "crew",
    label: "Crew Transport",
  },
  {
    key: "pvp",
    label: "PvP Combat",
  },
  {
    key: "pve",
    label: "PvE Missions",
  },
] as const;

function average(
  values: number[]
): number {
  if (
    values.length ===
    0
  ) {
    return 0;
  }

  return Math.round(
    values.reduce(
      (
        total,
        value
      ) =>
        total +
        value,
      0
    ) /
      values.length
  );
}

function buildCoverage(
  ownedVehicles: Vehicle[]
): GarageCoverageItem[] {
  const profiles =
    ownedVehicles.map(
      (vehicle) =>
        buildVehicleIntelligenceProfile(
          vehicle
        )
    );

  return COVERAGE_DEFINITIONS.map(
    ({
      key,
      label,
    }) => ({
      key,
      label,
      score:
        average(
          profiles.map(
            (profile) =>
              profile.ratings[
                key
              ]
          )
        ),
    })
  );
}

function buildGarageScore(
  ownedVehicles: Vehicle[],
  coverage: GarageCoverageItem[]
): number {
  if (
    ownedVehicles.length ===
    0
  ) {
    return 0;
  }

  const averageVehicleScore =
    average(
      ownedVehicles.map(
        (vehicle) =>
          scoreVehicle(
            vehicle
          ).score.overall
      )
    );

  const coveredCategories =
    coverage.filter(
      (item) =>
        item.score >=
        55
    ).length;

  const coverageBreadth =
    coverage.length ===
    0
      ? 0
      : Math.round(
          (
            coveredCategories /
            coverage.length
          ) *
            100
        );

  return Math.round(
    averageVehicleScore *
      0.7 +
      coverageBreadth *
        0.3
  );
}

function buildStrengths(
  coverage: GarageCoverageItem[]
): string[] {
  return [...coverage]
    .sort(
      (
        first,
        second
      ) =>
        second.score -
        first.score
    )
    .filter(
      (item) =>
        item.score >=
        65
    )
    .slice(
      0,
      3
    )
    .map(
      (item) =>
        `${item.label} is a garage strength with a coverage rating of ${item.score}.`
    );
}

function buildWeaknesses(
  coverage: GarageCoverageItem[]
): string[] {
  return [...coverage]
    .sort(
      (
        first,
        second
      ) =>
        first.score -
        second.score
    )
    .filter(
      (item) =>
        item.score <
        60
    )
    .slice(
      0,
      3
    )
    .map(
      (item) =>
        `${item.label} is underrepresented with a coverage rating of ${item.score}.`
    );
}

function buildMissingCategories(
  coverage: GarageCoverageItem[]
): string[] {
  return coverage
    .filter(
      (item) =>
        item.score <
        55
    )
    .map(
      (item) =>
        item.label
    );
}

function buildCoverageImprovements(
  currentCoverage: GarageCoverageItem[],
  projectedCoverage: GarageCoverageItem[]
): GarageCoverageImprovement[] {
  return projectedCoverage
    .map(
      (
        projectedItem
      ) => {
        const currentItem =
          currentCoverage.find(
            (item) =>
              item.key ===
              projectedItem.key
          );

        const currentScore =
          currentItem?.score ??
          0;

        return {
          key:
            projectedItem.key,
          label:
            projectedItem.label,
          currentScore,
          projectedScore:
            projectedItem.score,
          increase:
            projectedItem.score -
            currentScore,
        };
      }
    )
    .filter(
      (item) =>
        item.increase >
        0
    )
    .sort(
      (
        first,
        second
      ) =>
        second.increase -
        first.increase
    );
}

function buildProjectedRecommendation(
  ownedVehicles: Vehicle[],
  recommendationVehicle: Vehicle,
  currentScore: number,
  currentCoverage: GarageCoverageItem[]
): GarageProjectedRecommendation {
  const projectedVehicles = [
    ...ownedVehicles,
    recommendationVehicle,
  ];

  const projectedCoverage =
    buildCoverage(
      projectedVehicles
    );

  const projectedScore =
    buildGarageScore(
      projectedVehicles,
      projectedCoverage
    );

  return {
    vehicle:
      recommendationVehicle,
    currentScore,
    projectedScore,
    scoreIncrease:
      projectedScore -
      currentScore,
    currentCoverage,
    projectedCoverage,
    improvements:
      buildCoverageImprovements(
        currentCoverage,
        projectedCoverage
      ),
  };
}

export function buildGarageIntelligence(
  ownedVehicles: Vehicle[],
  availableVehicles: Vehicle[]
): GarageIntelligenceResult {
  const coverage =
    buildCoverage(
      ownedVehicles
    );

  const garageScore =
    buildGarageScore(
      ownedVehicles,
      coverage
    );

  const recommendation =
    getGarageRecommendation(
      ownedVehicles,
      availableVehicles
    );

  const projectedRecommendation =
    recommendation
      ? buildProjectedRecommendation(
          ownedVehicles,
          recommendation
            .recommendedVehicle,
          garageScore,
          coverage
        )
      : null;

  return {
    garageScore,
    coverage,
    strengths:
      buildStrengths(
        coverage
      ),
    weaknesses:
      buildWeaknesses(
        coverage
      ),
    missingCategories:
      buildMissingCategories(
        coverage
      ),
    recommendation,
    projectedRecommendation,
  };
}