import type {
  AtlasIntentClassification,
  AtlasIntentConfidenceLevel,
  AtlasIntentDefinition,
  AtlasIntentMatch,
  AtlasIntentType,
} from "./atlas-intent.types";


const INTENT_DEFINITIONS:
  AtlasIntentDefinition[] =
  [
    {
      intent:
        "make_money",

      domain:
        "economy",

      keywords: [
        "make money",
        "earn money",
        "fastest money",
        "best money",
        "more money",
        "cash",
        "income",
        "profit",
        "grind money",
        "farm money",
        "highest roi",
        "return on investment",
      ],

      patterns: [
        /\bhow\b.*\bmake\b.*\bmoney\b/i,
        /\bfastest\b.*\b(?:money|cash|income)\b/i,
        /\bbest\b.*\b(?:money|cash|income)\b/i,
        /\bhighest\b.*\b(?:profit|roi|return)\b/i,
      ],

      explanation:
        "The prompt asks Atlas to improve income, profit, or return on investment.",
    },

    {
      intent:
        "buy_business",

      domain:
        "business",

      keywords: [
        "buy business",
        "business should i buy",
        "best business",
        "next business",
        "invest in a business",
        "purchase business",
        "business investment",
        "passive income business",
      ],

      patterns: [
        /\bwhich\b.*\bbusiness\b.*\bbuy\b/i,
        /\bwhat\b.*\bbusiness\b.*\b(?:buy|purchase|get)\b/i,
        /\bbest\b.*\bbusiness\b/i,
        /\bnext\b.*\bbusiness\b/i,
      ],

      explanation:
        "The prompt asks Atlas to evaluate or recommend a business purchase.",
    },

    {
      intent:
        "buy_property",

      domain:
        "property",

      keywords: [
        "buy property",
        "property should i buy",
        "best property",
        "next property",
        "purchase property",
        "apartment",
        "agency",
        "facility",
        "hangar",
        "bunker",
        "nightclub",
        "office",
        "warehouse",
      ],

      patterns: [
        /\bwhich\b.*\bproperty\b.*\bbuy\b/i,
        /\bwhat\b.*\bproperty\b.*\b(?:buy|purchase|get)\b/i,
        /\bshould\b.*\bbuy\b.*\b(?:agency|facility|hangar|bunker|nightclub|office|warehouse)\b/i,
      ],

      explanation:
        "The prompt asks Atlas to evaluate a property purchase or property progression decision.",
    },

    {
      intent:
        "buy_vehicle",

      domain:
        "vehicle",

      keywords: [
        "buy vehicle",
        "vehicle should i buy",
        "best vehicle",
        "next vehicle",
        "buy car",
        "car should i buy",
        "best car",
        "purchase vehicle",
        "garage",
        "supercar",
        "sports car",
        "motorcycle",
      ],

      patterns: [
        /\bwhich\b.*\b(?:vehicle|car|bike|motorcycle)\b.*\bbuy\b/i,
        /\bwhat\b.*\b(?:vehicle|car|bike|motorcycle)\b.*\b(?:buy|purchase|get)\b/i,
        /\bbest\b.*\b(?:vehicle|car|bike|motorcycle)\b/i,
      ],

      explanation:
        "The prompt asks Atlas to evaluate or recommend a vehicle purchase.",
    },

    {
      intent:
        "compare",

      domain:
        "progression",

      keywords: [
        "compare",
        "versus",
        " vs ",
        "which is better",
        "better option",
        "difference between",
        "should i buy this or",
        "business or property",
        "property or vehicle",
      ],

      patterns: [
        /\bcompare\b/i,
        /\bversus\b/i,
        /\bvs\.?\b/i,
        /\bwhich\b.*\bbetter\b/i,
        /\bdifference\b.*\bbetween\b/i,
        /\bshould\b.*\b(?:choose|buy|get)\b.*\bor\b/i,
      ],

      explanation:
        "The prompt asks Atlas to compare multiple options or competing investments.",
    },

    {
      intent:
        "plan_session",

      domain:
        "planning",

      keywords: [
        "plan my session",
        "plan session",
        "next session",
        "playing for",
        "minutes",
        "hour",
        "tonight",
        "session plan",
        "game plan",
      ],

      patterns: [
        /\bplan\b.*\b(?:session|hour|minutes|tonight)\b/i,
        /\bplaying\b.*\b(?:minutes|hour|hours)\b/i,
        /\bwhat\b.*\bdo\b.*\bnext\b.*\b(?:minutes|hour)\b/i,
      ],

      explanation:
        "The prompt asks Atlas to organize activities within a gameplay session or time limit.",
    },

    {
      intent:
        "next_action",

      domain:
        "progression",

      keywords: [
        "what should i do next",
        "next action",
        "next step",
        "what next",
        "do next",
        "best move",
        "current priority",
        "priority right now",
      ],

      patterns: [
        /\bwhat\b.*\bdo\b.*\bnext\b/i,
        /\bnext\b.*\b(?:action|step|move|priority)\b/i,
        /\bwhat\b.*\bpriority\b/i,
      ],

      explanation:
        "The prompt asks Atlas to select the strongest immediate action.",
    },

    {
      intent:
        "empire_analysis",

      domain:
        "progression",

      keywords: [
        "analyze empire",
        "empire analysis",
        "slowing me down",
        "holding me back",
        "bottleneck",
        "weakness",
        "progression issue",
        "why am i stuck",
        "improve my empire",
      ],

      patterns: [
        /\bwhat\b.*\bslowing\b.*\bdown\b/i,
        /\bwhat\b.*\bholding\b.*\bback\b/i,
        /\b(?:find|identify)\b.*\bbottleneck\b/i,
        /\bwhy\b.*\bstuck\b/i,
        /\banaly[sz]e\b.*\bempire\b/i,
      ],

      explanation:
        "The prompt asks Atlas to diagnose a weakness, bottleneck, or progression problem.",
    },

    {
      intent:
        "missions",

      domain:
        "mission",

      keywords: [
        "mission",
        "missions",
        "heist",
        "heists",
        "objective",
        "objectives",
        "mission strategy",
        "best mission",
        "mission payout",
      ],

      patterns: [
        /\bbest\b.*\bmission\b/i,
        /\bwhich\b.*\bmission\b/i,
        /\bmission\b.*\bstrategy\b/i,
        /\bhow\b.*\bcomplete\b.*\bmission\b/i,
      ],

      explanation:
        "The prompt asks Atlas for mission selection, mission strategy, or objective guidance.",
    },

    {
      intent:
        "weapons",

      domain:
        "combat",

      keywords: [
        "weapon",
        "weapons",
        "loadout",
        "gun",
        "guns",
        "combat",
        "pvp",
        "armor",
        "best weapon",
        "best loadout",
      ],

      patterns: [
        /\bbest\b.*\b(?:weapon|gun|loadout)\b/i,
        /\bwhich\b.*\b(?:weapon|gun)\b/i,
        /\bcombat\b.*\bloadout\b/i,
        /\bpvp\b.*\b(?:weapon|loadout)\b/i,
      ],

      explanation:
        "The prompt asks Atlas for combat, weapon, or loadout guidance.",
    },

    {
      intent:
        "exploration",

      domain:
        "exploration",

      keywords: [
        "explore",
        "exploration",
        "discover",
        "discovery",
        "collectible",
        "collectibles",
        "hidden",
        "secret",
        "map",
        "anything i missed",
      ],

      patterns: [
        /\banything\b.*\bmissed\b/i,
        /\bfind\b.*\b(?:collectible|secret|hidden)\b/i,
        /\bwhat\b.*\bdiscover\b/i,
        /\bwhere\b.*\b(?:collectible|secret)\b/i,
      ],

      explanation:
        "The prompt asks Atlas to surface discoveries, collectibles, or unexplored content.",
    },

    {
      intent:
        "general",

      domain:
        "general",

      keywords: [],

      patterns: [],

      explanation:
        "The prompt does not strongly match a specialized Atlas strategy.",
    },
  ];


function normalizePrompt(
  prompt:
    string
): string {
  return prompt
    .trim()
    .toLowerCase()
    .replace(
      /[^\p{L}\p{N}\s$.'-]/gu,
      " "
    )
    .replace(
      /\s+/g,
      " "
    );
}


function resolveConfidenceLevel(
  confidence:
    number
): AtlasIntentConfidenceLevel {
  if (
    confidence >=
    0.9
  ) {
    return "very_high";
  }

  if (
    confidence >=
    0.72
  ) {
    return "high";
  }

  if (
    confidence >=
    0.48
  ) {
    return "medium";
  }

  return "low";
}


function calculateMatch(
  normalizedPrompt:
    string,

  definition:
    AtlasIntentDefinition
): AtlasIntentMatch {
  const matchedKeywords =
    definition.keywords.filter(
      (
        keyword
      ) =>
        normalizedPrompt.includes(
          keyword
        )
    );

  const matchedPatterns =
    definition.patterns
      .filter(
        (
          pattern
        ) =>
          pattern.test(
            normalizedPrompt
          )
      )
      .map(
        (
          pattern
        ) =>
          pattern.source
      );

  const keywordScore =
    matchedKeywords.reduce(
      (
        total,
        keyword
      ) =>
        total +
        Math.min(
          16,
          5 +
            keyword.split(" ")
              .length *
              3
        ),
      0
    );

  const patternScore =
    matchedPatterns.length *
    24;

  const score =
    Math.min(
      100,
      keywordScore +
        patternScore
    );

  const confidence =
    score ===
    0
      ? 0
      : Math.min(
          0.99,
          0.28 +
            score /
              100
        );

  return {
    intent:
      definition.intent,

    domain:
      definition.domain,

    score,

    confidence,

    confidenceLevel:
      resolveConfidenceLevel(
        confidence
      ),

    matchedKeywords,

    matchedPatterns,

    explanation:
      definition.explanation,
  };
}


function createGeneralMatch():
  AtlasIntentMatch {
  return {
    intent:
      "general",

    domain:
      "general",

    score:
      0,

    confidence:
      0.25,

    confidenceLevel:
      "low",

    matchedKeywords:
      [],

    matchedPatterns:
      [],

    explanation:
      "Atlas could not identify a specialized strategic intent, so the prompt will use general advisor routing.",
  };
}


function removeDuplicateIntents(
  matches:
    AtlasIntentMatch[]
): AtlasIntentMatch[] {
  const seen =
    new Set<
      AtlasIntentType
    >();

  return matches.filter(
    (
      match
    ) => {
      if (
        seen.has(
          match.intent
        )
      ) {
        return false;
      }

      seen.add(
        match.intent
      );

      return true;
    }
  );
}


export function classifyAtlasIntent(
  prompt:
    string,

  generatedAt =
    new Date()
      .toISOString()
): AtlasIntentClassification {
  const normalizedPrompt =
    normalizePrompt(
      prompt
    );

  const rankedMatches =
    INTENT_DEFINITIONS
      .filter(
        (
          definition
        ) =>
          definition.intent !==
          "general"
      )
      .map(
        (
          definition
        ) =>
          calculateMatch(
            normalizedPrompt,
            definition
          )
      )
      .filter(
        (
          match
        ) =>
          match.score >
          0
      )
      .sort(
        (
          first,
          second
        ) =>
          second.score -
          first.score
      );

  const uniqueMatches =
    removeDuplicateIntents(
      rankedMatches
    );

  const primary =
    uniqueMatches[0] ??
    createGeneralMatch();

  const alternatives =
    uniqueMatches.slice(
      1,
      4
    );

  const secondMatch =
    alternatives[0];

  const ambiguous =
    Boolean(
      secondMatch &&
        primary.score -
          secondMatch.score <=
          8
    );

  return {
    version:
      1,

    generatedAt,

    prompt,

    normalizedPrompt,

    primary,

    alternatives,

    ambiguous,
  };
}
