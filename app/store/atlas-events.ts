export type AtlasEventType =
  | "strategy-started"
  | "strategy-completed"
  | "strategy-abandoned"
  | "outcome-reported"
  | "outcome-validated"
  | "recommendation-updated"
  | "memory-updated"
  | "learning-updated"
  | "behavior-updated"
  | "forecast-updated";


export type AtlasEvent = {
  id: string;

  type: AtlasEventType;

  timestamp: string;

  payload?: unknown;
};


type AtlasListener = (
  event: AtlasEvent
) => void;


const listeners =
  new Set<AtlasListener>();


export function publishAtlasEvent(
  event: AtlasEvent
) {
  listeners.forEach(
    (listener) =>
      listener(event)
  );
}


export function subscribeAtlasEvents(
  listener: AtlasListener
) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}