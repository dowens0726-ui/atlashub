/**
 * ============================================================
 * Atlas Design System (ADS)
 * ------------------------------------------------------------
 * Semantic Icon Registry
 *
 * These are semantic identifiers, not icon components.
 * Components should reference meaning rather than a specific
 * icon library.
 *
 * Future:
 * - Lucide
 * - Heroicons
 * - Atlas custom SVG set
 * ============================================================
 */

export const AtlasIcons = {
  navigation: {
    dashboard: "layout-dashboard",
    explorer: "map",
    planner: "calendar",
    profile: "user",
    collections: "archive",
    search: "search",
  },

  empire: {
    cash: "wallet",
    score: "badge-percent",
    business: "building-2",
    growth: "trending-up",
    objective: "flag",
    achievement: "trophy",
  },

  intelligence: {
    advisor: "brain",
    memory: "database",
    forecast: "sparkles",
    timeline: "clock-3",
    simulator: "activity",
    briefing: "clipboard-list",
  },

  game: {
    vehicle: "car",
    weapon: "swords",
    mission: "target",
    property: "home",
    collectible: "gem",
  },
} as const;

export type AtlasIconRegistry = typeof AtlasIcons;