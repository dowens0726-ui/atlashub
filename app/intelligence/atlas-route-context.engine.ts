import type {
  AtlasIntentDomain,
  AtlasIntentStrategy,
} from "./atlas-intent.types";

import type {
  AtlasRouteContext,
  AtlasRouteDepth,
  AtlasRouteSection,
  AtlasRouteSource,
  BuildAtlasRouteContextInput,
} from "./atlas-route-context.types";


type AtlasRouteDefinition = {
  section:
    AtlasRouteSection;

  domain:
    AtlasIntentDomain;

  title:
    string;

  strategicFocus:
    AtlasIntentStrategy;

  source:
    AtlasRouteSource;

  collectionDepth?:
    AtlasRouteDepth;

  detailDepth?:
    AtlasRouteDepth;

  supportsEntityContext?:
    boolean;
};


const ROUTE_DEFINITIONS:
  Record<
    string,
    AtlasRouteDefinition
  > =
  {
    dashboard: {
      section:
        "dashboard",

      domain:
        "progression",

      title:
        "Atlas Command Center",

      strategicFocus:
        "select_next_action",

      source:
        "intelligence",
    },

    copilot: {
      section:
        "copilot",

      domain:
        "general",

      title:
        "Atlas Copilot",

      strategicFocus:
        "general_advisor",

      source:
        "intelligence",
    },

    profile: {
      section:
        "profile",

      domain:
        "progression",

      title:
        "Player Profile",

      strategicFocus:
        "diagnose_empire",

      source:
        "application",
    },

    planner: {
      section:
        "planner",

      domain:
        "planning",

      title:
        "Strategic Planner",

      strategicFocus:
        "build_session_plan",

      source:
        "intelligence",
    },

    advisor: {
      section:
        "advisor",

      domain:
        "general",

      title:
        "Atlas Advisor",

      strategicFocus:
        "general_advisor",

      source:
        "intelligence",
    },

    businesses: {
      section:
        "businesses",

      domain:
        "business",

      title:
        "Business Intelligence",

      strategicFocus:
        "evaluate_business",

      source:
        "content",

      supportsEntityContext:
        true,
    },

    vehicles: {
      section:
        "vehicles",

      domain:
        "vehicle",

      title:
        "Vehicle Intelligence",

      strategicFocus:
        "evaluate_vehicle",

      source:
        "content",

      supportsEntityContext:
        true,
    },

    properties: {
      section:
        "properties",

      domain:
        "property",

      title:
        "Property Intelligence",

      strategicFocus:
        "evaluate_property",

      source:
        "content",

      supportsEntityContext:
        true,
    },

    weapons: {
      section:
        "weapons",

      domain:
        "combat",

      title:
        "Weapon Intelligence",

      strategicFocus:
        "optimize_loadout",

      source:
        "content",

      supportsEntityContext:
        true,
    },

    missions: {
      section:
        "missions",

      domain:
        "mission",

      title:
        "Mission Intelligence",

      strategicFocus:
        "optimize_missions",

      source:
        "content",

      supportsEntityContext:
        true,
    },

    collections: {
      section:
        "collections",

      domain:
        "exploration",

      title:
        "Collection Intelligence",

      strategicFocus:
        "surface_discoveries",

      source:
        "content",

      supportsEntityContext:
        true,
    },

    manufacturers: {
      section:
        "manufacturers",

      domain:
        "vehicle",

      title:
        "Manufacturer Intelligence",

      strategicFocus:
        "evaluate_vehicle",

      source:
        "content",

      supportsEntityContext:
        true,
    },

    explorer: {
      section:
        "explorer",

      domain:
        "exploration",

      title:
        "Atlas Explorer",

      strategicFocus:
        "surface_discoveries",

      source:
        "application",
    },

    map: {
      section:
        "map",

      domain:
        "exploration",

      title:
        "Atlas Map",

      strategicFocus:
        "surface_discoveries",

      source:
        "application",
    },

    rankings: {
      section:
        "rankings",

      domain:
        "progression",

      title:
        "Atlas Rankings",

      strategicFocus:
        "compare_options",

      source:
        "intelligence",
    },

    compare: {
      section:
        "compare",

      domain:
        "progression",

      title:
        "Strategic Comparison",

      strategicFocus:
        "compare_options",

      source:
        "intelligence",
    },

    "garage-builder": {
      section:
        "garage_builder",

      domain:
        "vehicle",

      title:
        "Garage Builder",

      strategicFocus:
        "evaluate_vehicle",

      source:
        "intelligence",

      collectionDepth:
        "workflow",

      detailDepth:
        "workflow",
    },

    onboarding: {
      section:
        "onboarding",

      domain:
        "progression",

      title:
        "Atlas Onboarding",

      strategicFocus:
        "diagnose_empire",

      source:
        "application",

      collectionDepth:
        "workflow",

      detailDepth:
        "workflow",
    },

    admin: {
      section:
        "admin",

      domain:
        "general",

      title:
        "Atlas Administration",

      strategicFocus:
        "general_advisor",

      source:
        "administration",

      collectionDepth:
        "system",

      detailDepth:
        "system",
    },

    engineering: {
      section:
        "engineering",

      domain:
        "general",

      title:
        "Engineering Dashboard",

      strategicFocus:
        "general_advisor",

      source:
        "administration",

      collectionDepth:
        "system",
    },

    "design-system": {
      section:
        "design_system",

      domain:
        "general",

      title:
        "Atlas Design System",

      strategicFocus:
        "general_advisor",

      source:
        "system",

      collectionDepth:
        "system",
    },

    data: {
      section:
        "data",

      domain:
        "general",

      title:
        "Atlas Data",

      strategicFocus:
        "general_advisor",

      source:
        "administration",

      collectionDepth:
        "system",

      detailDepth:
        "system",
    },

    about: {
      section:
        "about",

      domain:
        "general",

      title:
        "About Atlas",

      strategicFocus:
        "general_advisor",

      source:
        "system",

      collectionDepth:
        "utility",
    },

    roadmap: {
      section:
        "roadmap",

      domain:
        "general",

      title:
        "Atlas Roadmap",

      strategicFocus:
        "general_advisor",

      source:
        "system",

      collectionDepth:
        "utility",
    },

    changelog: {
      section:
        "changelog",

      domain:
        "general",

      title:
        "Atlas Changelog",

      strategicFocus:
        "general_advisor",

      source:
        "system",

      collectionDepth:
        "utility",
    },

    privacy: {
      section:
        "legal",

      domain:
        "general",

      title:
        "Privacy Policy",

      strategicFocus:
        "general_advisor",

      source:
        "system",

      collectionDepth:
        "utility",
    },

    terms: {
      section:
        "legal",

      domain:
        "general",

      title:
        "Terms of Service",

      strategicFocus:
        "general_advisor",

      source:
        "system",

      collectionDepth:
        "utility",
    },

    disclaimer: {
      section:
        "legal",

      domain:
        "general",

      title:
        "Atlas Disclaimer",

      strategicFocus:
        "general_advisor",

      source:
        "system",

      collectionDepth:
        "utility",
    },

    "data-policy": {
      section:
        "legal",

      domain:
        "general",

      title:
        "Atlas Data Policy",

      strategicFocus:
        "general_advisor",

      source:
        "system",

      collectionDepth:
        "utility",
    },
  };


function normalizePathname(
  pathname:
    string
): string {
  const pathnameWithoutQuery =
    pathname
      .split("?")[0]
      .split("#")[0];

  const normalized =
    `/${pathnameWithoutQuery
      .split("/")
      .filter(Boolean)
      .join("/")}`;

  return normalized === "/"
    ? "/"
    : normalized.replace(
        /\/+$/,
        ""
      );
}


function decodeSegment(
  segment:
    string
): string {
  try {
    return decodeURIComponent(
      segment
    );
  } catch {
    return segment;
  }
}


function resolveDepth(
  definition:
    AtlasRouteDefinition,

  segmentCount:
    number
): AtlasRouteDepth {
  if (
    segmentCount ===
    0
  ) {
    return "root";
  }

  if (
    segmentCount ===
    1
  ) {
    return definition.collectionDepth ??
      "collection";
  }

  return definition.detailDepth ??
    "detail";
}


function buildRoutePattern(
  sectionSegment:
    string,

  segmentCount:
    number,

  supportsEntityContext:
    boolean
): string {
  if (
    segmentCount <=
    1
  ) {
    return `/${sectionSegment}`;
  }

  if (
    supportsEntityContext
  ) {
    return `/${sectionSegment}/[slug]`;
  }

  return `/${sectionSegment}/${new Array(
    segmentCount - 1
  )
    .fill("[segment]")
    .join("/")}`;
}


function buildHomeContext(
  pathname:
    string,

  generatedAt:
    string
): AtlasRouteContext {
  return {
    version:
      1,

    generatedAt,

    pathname,

    normalizedPathname:
      "/",

    segments:
      [],

    section:
      "home",

    domain:
      "general",

    depth:
      "root",

    source:
      "application",

    entitySlug:
      null,

    title:
      "Atlas",

    strategicFocus:
      "general_advisor",

    isKnownRoute:
      true,

    metadata: {
      routePattern:
        "/",

      segmentCount:
        0,

      parentSection:
        null,

      supportsEntityContext:
        false,

      isDynamicRoute:
        false,
    },
  };
}


function buildUnknownContext(
  pathname:
    string,

  normalizedPathname:
    string,

  segments:
    string[],

  generatedAt:
    string
): AtlasRouteContext {
  return {
    version:
      1,

    generatedAt,

    pathname,

    normalizedPathname,

    segments,

    section:
      "unknown",

    domain:
      "general",

    depth:
      "unknown",

    source:
      "unknown",

    entitySlug:
      null,

    title:
      "Unknown Atlas Route",

    strategicFocus:
      "general_advisor",

    isKnownRoute:
      false,

    metadata: {
      routePattern:
        null,

      segmentCount:
        segments.length,

      parentSection:
        null,

      supportsEntityContext:
        false,

      isDynamicRoute:
        false,
    },
  };
}


export function buildAtlasRouteContext({
  pathname,
  generatedAt =
    new Date()
      .toISOString(),
}: BuildAtlasRouteContextInput):
  AtlasRouteContext {
  const normalizedPathname =
    normalizePathname(
      pathname
    );

  if (
    normalizedPathname ===
    "/"
  ) {
    return buildHomeContext(
      pathname,
      generatedAt
    );
  }

  const segments =
    normalizedPathname
      .split("/")
      .filter(Boolean)
      .map(
        decodeSegment
      );

  const sectionSegment =
    segments[0];

  const definition =
    ROUTE_DEFINITIONS[
      sectionSegment
    ];

  if (
    !definition
  ) {
    return buildUnknownContext(
      pathname,
      normalizedPathname,
      segments,
      generatedAt
    );
  }

  const supportsEntityContext =
    definition.supportsEntityContext ??
    false;

  const entitySlug =
    supportsEntityContext &&
    segments.length >= 2
      ? segments[
          segments.length - 1
        ]
      : null;

  const depth =
    resolveDepth(
      definition,
      segments.length
    );

  return {
    version:
      1,

    generatedAt,

    pathname,

    normalizedPathname,

    segments,

    section:
      definition.section,

    domain:
      definition.domain,

    depth,

    source:
      definition.source,

    entitySlug,

    title:
      definition.title,

    strategicFocus:
      definition.strategicFocus,

    isKnownRoute:
      true,

    metadata: {
      routePattern:
        buildRoutePattern(
          sectionSegment,
          segments.length,
          supportsEntityContext
        ),

      segmentCount:
        segments.length,

      parentSection:
        definition.section,

      supportsEntityContext,

      isDynamicRoute:
        entitySlug !==
        null,
    },
  };
}