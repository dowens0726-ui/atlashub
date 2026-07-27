export type AtlasActionId =
  | "open-copilot"
  | "open-planner"
  | "open-businesses"
  | "open-properties"
  | "open-vehicles"
  | "open-missions"
  | "open-garage-builder"
  | "review-dashboard";


export type AtlasActionCategory =
  | "intelligence"
  | "planning"
  | "economy"
  | "progression"
  | "mobility"
  | "mission"
  | "system";


export type AtlasAction = {
  id:
    AtlasActionId;

  label:
    string;

  description:
    string;

  href:
    string;

  category:
    AtlasActionCategory;
};


export type AtlasStrategicActionInput = {
  empireScore:
    number;

  cash:
    number;

  shouldActNow:
    boolean;

  pipelineStatus:
    string;
};
