import type {
  GarageIntelligenceResult,
} from "./vehicle";

export type GarageCopilotHealth =
  | "Excellent"
  | "Good"
  | "Fair"
  | "Needs Attention"
  | "Not Evaluated";

export type GarageCopilotRecommendation = {
  vehicleName: string;
  vehicleSlug: string;
  reason: string;
  projectedScore: number | null;
  scoreIncrease: number | null;
  capabilityImprovements: string[];
};

export type GarageCopilotRoadmapItem = {
  priority: number;
  title: string;
  description: string;
};

export type GarageCopilotReport = {
  title: string;
  overallHealth: GarageCopilotHealth;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  priorities: string[];
  recommendation: GarageCopilotRecommendation | null;
  roadmap: GarageCopilotRoadmapItem[];
  confidence: number;
};

function getOverallHealth(
  garageScore: number
): GarageCopilotHealth {
  if (
    garageScore <=
    0
  ) {
    return "Not Evaluated";
  }

  if (
    garageScore >=
    85
  ) {
    return "Excellent";
  }

  if (
    garageScore >=
    70
  ) {
    return "Good";
  }

  if (
    garageScore >=
    50
  ) {
    return "Fair";
  }

  return "Needs Attention";
}

function buildSummary(
  analysis: GarageIntelligenceResult,
  overallHealth: GarageCopilotHealth
): string {
  if (
    analysis.garageScore ===
    0
  ) {
    return "Add vehicles to your garage so Atlas can evaluate its capability coverage, identify strategic gaps, and recommend the strongest next purchase.";
  }

  const strengthCount =
    analysis.strengths.length;

  const weaknessCount =
    analysis.weaknesses.length;

  const missingCount =
    analysis.missingCategories.length;

  if (
    overallHealth ===
    "Excellent"
  ) {
    if (
      missingCount ===
      0
    ) {
      return `Your garage is exceptionally well balanced with a score of ${analysis.garageScore}. It provides strong coverage across every evaluated capability and currently has no major strategic gaps.`;
    }

    return `Your garage is performing at an excellent level with a score of ${analysis.garageScore}. It has ${strengthCount} established strengths, although ${missingCount} capability area${missingCount === 1 ? "" : "s"} can still be improved.`;
  }

  if (
    overallHealth ===
    "Good"
  ) {
    return `Your garage has a strong foundation with a score of ${analysis.garageScore}. It performs well in several important areas, but addressing ${missingCount} missing capability area${missingCount === 1 ? "" : "s"} would create a more complete and dependable vehicle lineup.`;
  }

  if (
    overallHealth ===
    "Fair"
  ) {
    return `Your garage is functional but uneven with a score of ${analysis.garageScore}. Atlas identified ${weaknessCount} notable weakness${weaknessCount === 1 ? "" : "es"} and ${missingCount} missing capability area${missingCount === 1 ? "" : "s"} that should guide your next purchases.`;
  }

  return `Your garage currently needs focused development. Its score of ${analysis.garageScore} indicates limited capability coverage, so your highest-value purchases should address the most important missing roles before adding specialist or luxury vehicles.`;
}

function buildPriorities(
  analysis: GarageIntelligenceResult
): string[] {
  const priorities: string[] = [];

  for (
    const category of
    analysis.missingCategories.slice(
      0,
      3
    )
  ) {
    priorities.push(
      `Improve ${category} coverage.`
    );
  }

  if (
    analysis.recommendation
  ) {
    priorities.push(
      `Consider ${analysis.recommendation.recommendedVehicle.name} as your next strategic purchase.`
    );
  }

  if (
    priorities.length ===
      0 &&
    analysis.garageScore >
      0
  ) {
    priorities.push(
      "Maintain broad capability coverage while adding vehicles that support your preferred playstyle."
    );
  }

  return priorities.slice(
    0,
    4
  );
}

function buildRecommendation(
  analysis: GarageIntelligenceResult
): GarageCopilotRecommendation | null {
  const recommendation =
    analysis.recommendation;

  if (
    !recommendation
  ) {
    return null;
  }

  const projected =
    analysis.projectedRecommendation;

  return {
    vehicleName:
      recommendation
        .recommendedVehicle
        .name,
    vehicleSlug:
      recommendation
        .recommendedVehicle
        .slug,
    reason:
      recommendation.reason,
    projectedScore:
      projected?.projectedScore ??
      null,
    scoreIncrease:
      projected?.scoreIncrease ??
      null,
    capabilityImprovements:
      projected?.improvements
        .slice(
          0,
          4
        )
        .map(
          (improvement) =>
            `${improvement.label}: ${improvement.currentScore} to ${improvement.projectedScore} (+${improvement.increase})`
        ) ??
      [],
  };
}

function buildRoadmap(
  analysis: GarageIntelligenceResult
): GarageCopilotRoadmapItem[] {
  const roadmap: GarageCopilotRoadmapItem[] =
    [];

  if (
    analysis.garageScore ===
    0
  ) {
    return [
      {
        priority: 1,
        title:
          "Build Your Garage Profile",
        description:
          "Add every vehicle you currently own so Atlas can establish an accurate capability baseline.",
      },
      {
        priority: 2,
        title:
          "Cover Essential Roles",
        description:
          "Prioritize dependable vehicles for missions, business activities, transportation, and escape routes.",
      },
      {
        priority: 3,
        title:
          "Add Specialist Vehicles",
        description:
          "Once the essentials are covered, add vehicles designed for racing, combat, off-road travel, or collection value.",
      },
    ];
  }

  if (
    analysis.recommendation
  ) {
    roadmap.push({
      priority:
        roadmap.length +
        1,
      title: `Acquire ${analysis.recommendation.recommendedVehicle.name}`,
      description:
        analysis.recommendation.reason,
    });
  }

  for (
    const category of
    analysis.missingCategories.slice(
      0,
      3
    )
  ) {
    roadmap.push({
      priority:
        roadmap.length +
        1,
      title: `Strengthen ${category}`,
      description: `Add a vehicle that performs strongly in ${category.toLowerCase()} situations to improve garage balance and operational flexibility.`,
    });
  }

  if (
    roadmap.length <
    4
  ) {
    roadmap.push({
      priority:
        roadmap.length +
        1,
      title:
        "Expand Specialist Coverage",
      description:
        "After closing the most important gaps, add vehicles that support specialized missions, competitive play, and personal collection goals.",
    });
  }

  return roadmap.slice(
    0,
    4
  );
}

function calculateConfidence(
  analysis: GarageIntelligenceResult
): number {
  if (
    analysis.garageScore ===
    0
  ) {
    return 35;
  }

  let confidence = 70;

  if (
    analysis.coverage.length >=
    7
  ) {
    confidence += 8;
  }

  if (
    analysis.strengths.length >
    0
  ) {
    confidence += 5;
  }

  if (
    analysis.weaknesses.length >
    0
  ) {
    confidence += 5;
  }

  if (
    analysis.recommendation
  ) {
    confidence += 6;
  }

  if (
    analysis
      .projectedRecommendation
      ?.improvements.length
  ) {
    confidence += 6;
  }

  return Math.min(
    confidence,
    98
  );
}

export function buildGarageCopilotReport(
  analysis: GarageIntelligenceResult
): GarageCopilotReport {
  const overallHealth =
    getOverallHealth(
      analysis.garageScore
    );

  return {
    title:
      "Atlas Garage Assessment",
    overallHealth,
    summary:
      buildSummary(
        analysis,
        overallHealth
      ),
    strengths:
      analysis.strengths,
    weaknesses:
      analysis.weaknesses,
    priorities:
      buildPriorities(
        analysis
      ),
    recommendation:
      buildRecommendation(
        analysis
      ),
    roadmap:
      buildRoadmap(
        analysis
      ),
    confidence:
      calculateConfidence(
        analysis
      ),
  };
}