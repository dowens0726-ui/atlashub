import type {
  AtlasIntentDomain,
  AtlasIntentStrategy,
} from "./atlas-intent.types";


export const ATLAS_ROUTE_SECTIONS = [
  "home",
  "dashboard",
  "copilot",
  "profile",
  "planner",
  "advisor",
  "businesses",
  "vehicles",
  "properties",
  "weapons",
  "missions",
  "collections",
  "manufacturers",
  "explorer",
  "map",
  "rankings",
  "compare",
  "garage_builder",
  "onboarding",
  "admin",
  "engineering",
  "design_system",
  "data",
  "about",
  "roadmap",
  "changelog",
  "legal",
  "unknown",
] as const;


export type AtlasRouteSection =
  (
    typeof ATLAS_ROUTE_SECTIONS
  )[number];


export const ATLAS_ROUTE_DEPTHS = [
  "root",
  "collection",
  "detail",
  "workflow",
  "utility",
  "system",
  "unknown",
] as const;


export type AtlasRouteDepth =
  (
    typeof ATLAS_ROUTE_DEPTHS
  )[number];


export const ATLAS_ROUTE_SOURCES = [
  "application",
  "content",
  "intelligence",
  "administration",
  "system",
  "unknown",
] as const;


export type AtlasRouteSource =
  (
    typeof ATLAS_ROUTE_SOURCES
  )[number];


export type AtlasRouteContextMetadata = {
  routePattern:
    string | null;

  segmentCount:
    number;

  parentSection:
    AtlasRouteSection | null;

  supportsEntityContext:
    boolean;

  isDynamicRoute:
    boolean;
};


export type AtlasRouteContext = {
  version:
    number;

  generatedAt:
    string;

  pathname:
    string;

  normalizedPathname:
    string;

  segments:
    string[];

  section:
    AtlasRouteSection;

  domain:
    AtlasIntentDomain;

  depth:
    AtlasRouteDepth;

  source:
    AtlasRouteSource;

  entitySlug:
    string | null;

  title:
    string;

  strategicFocus:
    AtlasIntentStrategy;

  isKnownRoute:
    boolean;

  metadata:
    AtlasRouteContextMetadata;
};


export type BuildAtlasRouteContextInput = {
  pathname:
    string;

  generatedAt?:
    string;
};