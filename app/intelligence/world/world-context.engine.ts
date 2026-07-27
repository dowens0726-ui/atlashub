import type {
  AtlasDistrict,
  AtlasDistrictId,
  AtlasEconomyState,
  AtlasHeatLevel,
  AtlasOperatingStatus,
  AtlasTimeOfDay,
  AtlasWeather,
  AtlasWorldContext,
  AtlasWorldDestination,
  AtlasWorldOpportunity,
  BuildAtlasWorldContextInput,
} from "./world.types";


const districts: Record<
  AtlasDistrictId,
  AtlasDistrict
> = {
  downtown: {
    id: "downtown",
    name: "Downtown Vice City",
    category: "commercial",
    description:
      "The center of high-value commerce, investment, and executive operations.",
  },

  "vice-beach": {
    id: "vice-beach",
    name: "Vice Beach",
    category: "entertainment",
    description:
      "A high-visibility entertainment corridor built around nightlife, tourism, and status.",
  },

  port: {
    id: "port",
    name: "Vice City Port",
    category: "logistics",
    description:
      "A logistics and distribution hub suited to cargo, movement, and scalable operations.",
  },

  industrial: {
    id: "industrial",
    name: "Industrial District",
    category: "industrial",
    description:
      "A production-focused district suited to operational growth and asset expansion.",
  },

  suburbs: {
    id: "suburbs",
    name: "Greater Vice City",
    category: "residential",
    description:
      "A lower-pressure operating area with steady access to properties and local opportunities.",
  },

  everglades: {
    id: "everglades",
    name: "Leonida Wetlands",
    category: "wilderness",
    description:
      "A remote operating zone suited to exploration, recovery, and lower-profile activity.",
  },

  "open-road": {
    id: "open-road",
    name: "Leonida Open Road",
    category: "transit",
    description:
      "A mobile operating corridor connecting distant opportunities across the state.",
  },
};


function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(
    maximum,
    Math.max(
      minimum,
      value
    )
  );
}


function deriveTimeOfDay(
  now: Date
): AtlasTimeOfDay {
  const hour =
    now.getHours();

  if (
    hour >= 5 &&
    hour < 9
  ) {
    return "dawn";
  }

  if (
    hour >= 9 &&
    hour < 18
  ) {
    return "day";
  }

  if (
    hour >= 18 &&
    hour < 21
  ) {
    return "dusk";
  }

  return "night";
}


function deriveWeather(
  timeOfDay: AtlasTimeOfDay,
  suppliedWeather?: AtlasWeather
): AtlasWeather {
  if (
    suppliedWeather
  ) {
    return suppliedWeather;
  }

  if (
    timeOfDay === "dawn"
  ) {
    return "haze";
  }

  if (
    timeOfDay === "day"
  ) {
    return "humid";
  }

  return "clear";
}


function deriveEconomy(
  input: BuildAtlasWorldContextInput
): AtlasEconomyState {
  const momentum =
    (
      input.cashScore +
      input.diversityScore +
      input.expansionScore
    ) / 3;

  if (
    momentum >= 82
  ) {
    return "surging";
  }

  if (
    momentum >= 62
  ) {
    return "growing";
  }

  if (
    momentum >= 38
  ) {
    return "stable";
  }

  return "contracting";
}


function deriveHeat(
  input: BuildAtlasWorldContextInput
): AtlasHeatLevel {
  const playstyle =
    input.playstyle
      ?.trim()
      .toLowerCase() ?? "";

  let pressure =
    0;

  if (
    playstyle.includes("aggressive") ||
    playstyle.includes("combat") ||
    playstyle.includes("competitive")
  ) {
    pressure +=
      2;
  }

  if (
    input.cash >= 5_000_000
  ) {
    pressure +=
      1;
  }

  if (
    input.ownedBusinessCount >= 5
  ) {
    pressure +=
      1;
  }

  if (
    pressure >= 4
  ) {
    return "critical";
  }

  if (
    pressure === 3
  ) {
    return "elevated";
  }

  if (
    pressure >= 1
  ) {
    return "guarded";
  }

  return "cold";
}


function deriveOperatingStatus(
  input: BuildAtlasWorldContextInput
): AtlasOperatingStatus {
  if (
    input.empireScore >= 85 &&
    input.ownedBusinessCount >= 5
  ) {
    return "dominate";
  }

  if (
    input.empireScore >= 65 &&
    input.cash >= 1_000_000
  ) {
    return "expand";
  }

  if (
    input.empireScore >= 40
  ) {
    return "operate";
  }

  return "stabilize";
}


function deriveDistrict(
  input: BuildAtlasWorldContextInput,
  operatingStatus: AtlasOperatingStatus
): AtlasDistrict {
  const playstyle =
    input.playstyle
      ?.trim()
      .toLowerCase() ?? "";

  if (
    operatingStatus === "dominate"
  ) {
    return districts.downtown;
  }

  if (
    playstyle.includes("explor") ||
    playstyle.includes("off-road")
  ) {
    return districts.everglades;
  }

  if (
    playstyle.includes("vehicle") ||
    playstyle.includes("driver") ||
    playstyle.includes("racing")
  ) {
    return districts["open-road"];
  }

  if (
    input.ownedBusinessCount >= 4
  ) {
    return districts.port;
  }

  if (
    input.ownedBusinessCount >= 2
  ) {
    return districts.industrial;
  }

  if (
    input.cash >= 1_000_000
  ) {
    return districts["vice-beach"];
  }

  return districts.suburbs;
}


function deriveDestination(
  input: BuildAtlasWorldContextInput,
  operatingStatus: AtlasOperatingStatus
): AtlasWorldDestination {
  if (
    operatingStatus === "dominate"
  ) {
    return {
      district:
        districts.downtown,

      label:
        "Executive Commerce District",

      reason:
        "Your empire is strong enough to prioritize premium acquisitions and high-value expansion.",
    };
  }

  if (
    input.diversityScore < 45
  ) {
    return {
      district:
        districts.industrial,

      label:
        "Industrial Opportunity Zone",

      reason:
        "Your portfolio needs additional business categories to reduce concentration risk.",
    };
  }

  if (
    input.cashScore < 45
  ) {
    return {
      district:
        districts.port,

      label:
        "Port Operations Corridor",

      reason:
        "Atlas recommends focusing on repeatable cash-flow activity before making another major acquisition.",
    };
  }

  if (
    input.expansionScore >= 80
  ) {
    return {
      district:
        districts["vice-beach"],

      label:
        "Vice Beach Growth Corridor",

      reason:
        "Your available capital supports a higher-visibility expansion opportunity.",
    };
  }

  return {
    district:
      districts.suburbs,

    label:
      "Greater Vice City Operations",

    reason:
      "Continue strengthening current operations while preparing the next expansion move.",
  };
}


function deriveOpportunity(
  input: BuildAtlasWorldContextInput
): AtlasWorldOpportunity {
  if (
    input.cashScore < 40
  ) {
    return {
      type:
        "cash-flow",

      title:
        "Rebuild operating liquidity",

      summary:
        "Prioritize reliable income activity and delay optional purchases until cash reserves improve.",

      priority:
        100 - input.cashScore,
    };
  }

  if (
    input.diversityScore < 50
  ) {
    return {
      type:
        "portfolio-diversification",

      title:
        "Diversify the empire",

      summary:
        "Add a business category that complements your current holdings and reduces dependence on one income source.",

      priority:
        100 - input.diversityScore,
    };
  }

  if (
    input.expansionScore >= 80
  ) {
    return {
      type:
        "business-expansion",

      title:
        "Convert capital into growth",

      summary:
        "Your financial position supports evaluating the next meaningful business or property acquisition.",

      priority:
        input.expansionScore,
    };
  }

  return {
    type:
      "mission-progression",

    title:
      "Advance the active strategy",

    summary:
      "Complete the highest-value available objective and use the outcome to refine the next Atlas recommendation.",

    priority:
      clamp(
        input.empireScore,
        50,
        90
      ),
  };
}


function deriveRecommendedActivity(
  operatingStatus: AtlasOperatingStatus,
  heat: AtlasHeatLevel
): string {
  if (
    heat === "critical"
  ) {
    return "Reduce exposure, secure assets, and allow operational pressure to fall.";
  }

  if (
    heat === "elevated"
  ) {
    return "Run a controlled objective with a low-risk exit plan.";
  }

  if (
    operatingStatus === "dominate"
  ) {
    return "Evaluate a premium acquisition or complete a high-impact strategic objective.";
  }

  if (
    operatingStatus === "expand"
  ) {
    return "Review the strongest expansion candidate and preserve enough liquidity for follow-up operations.";
  }

  if (
    operatingStatus === "operate"
  ) {
    return "Complete the best repeatable income activity available to the current empire.";
  }

  return "Build cash reserves and complete a low-risk progression objective.";
}


function deriveConfidence(
  input: BuildAtlasWorldContextInput
): number {
  const businessSignal =
    Math.min(
      20,
      input.ownedBusinessCount * 4
    );

  const scoreSignal =
    input.empireScore * 0.55;

  const diversitySignal =
    input.diversityScore * 0.2;

  return clamp(
    Math.round(
      20 +
      businessSignal +
      scoreSignal +
      diversitySignal
    ),
    45,
    96
  );
}


export function buildAtlasWorldContext(
  input: BuildAtlasWorldContextInput
): AtlasWorldContext {
  const now =
    input.now ?? new Date();

  const timeOfDay =
    deriveTimeOfDay(
      now
    );

  const operatingStatus =
    deriveOperatingStatus(
      input
    );

  const heat =
    deriveHeat(
      input
    );

  return {
    district:
      deriveDistrict(
        input,
        operatingStatus
      ),

    economy:
      deriveEconomy(
        input
      ),

    heat,

    timeOfDay,

    weather:
      deriveWeather(
        timeOfDay,
        input.weather
      ),

    operatingStatus,

    recommendedDestination:
      deriveDestination(
        input,
        operatingStatus
      ),

    recommendedActivity:
      deriveRecommendedActivity(
        operatingStatus,
        heat
      ),

    strategicOpportunity:
      deriveOpportunity(
        input
      ),

    empireScore:
      clamp(
        Math.round(
          input.empireScore
        ),
        0,
        100
      ),

    confidence:
      deriveConfidence(
        input
      ),

    generatedAt:
      now.toISOString(),
  };
}
