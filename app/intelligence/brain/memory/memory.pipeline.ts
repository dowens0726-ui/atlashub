import {
  buildAtlasMemory,
} from "../../memory.engine";

import {
  buildMemoryHistory,
} from "../../memory-history.engine";

import {
  buildMemoryInsight,
} from "../../memory-insight.engine";


type AtlasMemoryArguments =
  Parameters<
    typeof buildAtlasMemory
  >;

type MemoryInsightArguments =
  Parameters<
    typeof buildMemoryInsight
  >;


export type AtlasMemoryPipelineInput = {
  profile:
    AtlasMemoryArguments[0];

  nextAction:
    AtlasMemoryArguments[1];

  forecast:
    AtlasMemoryArguments[2];

  learning:
    MemoryInsightArguments[1];
};


export function buildAtlasMemoryPipeline({
  profile,
  nextAction,
  forecast,
  learning,
}: AtlasMemoryPipelineInput) {
  const atlasMemory =
    buildAtlasMemory(
      profile,
      nextAction,
      forecast
    );

  const memoryHistory =
    buildMemoryHistory(
      atlasMemory
    );

  const memoryInsight =
    buildMemoryInsight(
      atlasMemory,
      learning
    );

  return {
    atlasMemory,

    memoryHistory,

    memoryInsight,
  };
}


export type AtlasMemoryPipelineModel =
  ReturnType<
    typeof buildAtlasMemoryPipeline
  >;
