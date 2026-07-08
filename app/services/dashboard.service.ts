import type {
  EmpireModel,
  PlayerProfile,
  ProgressionPlan,
} from "@/app/types";
import type { AdvisorRecommendation } from "./advisor.service";
import { getAdvisorRecommendation } from "./advisor.service";
import { getEmpireModel } from "./empire.service";
import { getProgressionPlan } from "./progression.service";

export type DashboardObjective = {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

export type DashboardModel = {
  profile: PlayerProfile;
  progression: ProgressionPlan;
  recommendation: AdvisorRecommendation | null;
  empire: EmpireModel;
  objectives: DashboardObjective[];
  summary: {
    stage: ProgressionPlan["stage"];
    completion: number;
    cash: number;
    remainingInvestment: number;
  };
};

export function getDashboard(profile: PlayerProfile): DashboardModel {
  const progression = getProgressionPlan(profile);
  const recommendation = getAdvisorRecommendation(profile);
  const empire = getEmpireModel(profile);
  const nextStep = progression.nextStep;

  const objectives: DashboardObjective[] = [
    nextStep
      ? {
          id: "next-step",
          title: `Complete next step: ${nextStep.title}`,
          description: nextStep.reason,
          priority: "High",
        }
      : {
          id: "review-planner",
          title: "Review your planner",
          description: "Open your roadmap and identify your next opportunity.",
          priority: "Medium",
        },
    {
      id: "cash-reserve",
      title: "Increase available cash reserve",
      description:
        "Keep enough cash available before making your next major purchase.",
      priority: "Medium",
    },
    {
      id: "roi-review",
      title: "Review highest ROI opportunities",
      description:
        "Prioritize businesses and upgrades that improve long-term income.",
      priority: "Low",
    },
  ];

  return {
    profile,
    progression,
    recommendation,
    empire,
    objectives,
    summary: {
      stage: progression.stage,
      completion: progression.completion,
      cash: profile.cash,
      remainingInvestment: progression.totalInvestment,
    },
  };
}