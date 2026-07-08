export type ProgressionStage = "Early" | "Mid" | "Late";

export type ProgressionEntityType = "business" | "vehicle" | "property";

export type ProgressionStep = {
  id: string;
  title: string;
  entityType: ProgressionEntityType;
  slug: string;
  estimatedCost: number;
  estimatedROI: number;
  reason: string;
};

export type ProgressionPlan = {
  stage: ProgressionStage;
  completion: number;
  totalInvestment: number;
  nextStep: ProgressionStep | null;
  steps: ProgressionStep[];
};