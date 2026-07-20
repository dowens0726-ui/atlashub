import {
  classifyAtlasIntent,
} from "./atlas-intent.matcher";

import {
  routeAtlasIntent,
} from "./atlas-intent.router";

import type {
  AtlasIntentEngineResult,
} from "./atlas-intent.types";


export type BuildAtlasIntentInput = {
  prompt:
    string;

  generatedAt?:
    string;
};


export function buildAtlasIntent({
  prompt,
  generatedAt =
    new Date()
      .toISOString(),
}: BuildAtlasIntentInput):
  AtlasIntentEngineResult {
  const classification =
    classifyAtlasIntent(
      prompt,
      generatedAt
    );

  const route =
    routeAtlasIntent(
      classification
    );

  return {
    version:
      1,

    generatedAt,

    classification,

    route,
  };
}
