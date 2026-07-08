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
  return memory.rememberedEvents.map((event, index) => ({
    id: `memory-${index}`,
    timestamp: "Today",
    title: event,
    description: memory.summary,
  }));
}