import type { AtlasSessionPlan } from "./session.engine";

export type SessionReasoning = {
  objective: string;
  confidence: number;
  explanation: string;
  expectedOutcome: string;
};

export function buildSessionReasoning(
  plan: AtlasSessionPlan
): SessionReasoning {
  return {
    objective:
      "Complete the highest-value actions available for your current empire stage.",

    confidence: 90,

    explanation:
      "Atlas prioritized this route based on progression value, estimated profit, and efficiency.",

    expectedOutcome:
      `Complete this session plan to generate approximately $${plan.estimatedProfit.toLocaleString()} and improve empire progression.`,
  };
}