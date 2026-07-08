export type EmpireGrade = "S" | "A" | "B" | "C" | "D";

export type EmpireMetric = {
  label: string;
  score: number;
  grade: EmpireGrade;
};

export type EmpireInsight = {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

export type EmpireModel = {
  overallScore: number;
  overallGrade: EmpireGrade;

  financialStrength: EmpireMetric;
  businessPortfolio: EmpireMetric;
  growthPotential: EmpireMetric;
  efficiency: EmpireMetric;

  insights: EmpireInsight[];
};