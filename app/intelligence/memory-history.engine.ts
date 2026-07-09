import type { AtlasMemory } from "./memory.engine";

export type MemoryHistoryItem = {
  id: string;
  timestamp: string;
  title: string;
  description: string;
};

export function buildMemoryHistory(
  memory: AtlasMemory
): MemoryHistoryItem[] {
  return [
    ...memory.rememberedEvents.map(
      (event, index) => ({
        id: `event-${index}`,
        timestamp: "Today",
        title: "Empire Update",
        description: event,
      })
    ),

    ...memory.playerInsights.map(
      (insight, index) => ({
        id: `insight-${index}`,
        timestamp: "Learned",
        title: "Player Pattern",
        description: insight,
      })
    ),
  ];
}