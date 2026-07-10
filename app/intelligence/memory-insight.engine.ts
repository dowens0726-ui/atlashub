import type {
  AtlasMemory,
} from "./memory.engine";

import type {
  AtlasLearningProfile,
} from "./learning.engine";


export type AtlasMemoryInsight = {
  title: string;

  insight: string;

  evidence: string[];

  confidence: number;
};


export function buildMemoryInsight(
  memory: AtlasMemory,
  learning: AtlasLearningProfile
): AtlasMemoryInsight {

  const evidence: string[] = [];


  if (
    memory.playerInsights.length > 0
  ) {
    evidence.push(
      ...memory.playerInsights
    );
  }


  if (
    learning.patterns.length > 0
  ) {
    evidence.push(
      ...learning.patterns
    );
  }


  const confidence =
    Math.min(
      95,
      60 +
        evidence.length * 5
    );


  return {
    title:
      "Atlas Memory Insight",

    insight:
      memory.learnedPattern,

    evidence,

    confidence,
  };
}