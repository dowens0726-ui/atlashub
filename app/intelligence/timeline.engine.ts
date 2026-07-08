import type { EmpireForecast } from "./forecast.engine";

export type EmpireTimelinePoint = {
  label: string;
  score: number;
  description: string;
};

export function buildEmpireTimeline(
  forecast: EmpireForecast
): EmpireTimelinePoint[] {
  return [
    {
      label: "Now",
      score: forecast.currentScore,
      description: "Your current empire position.",
    },
    {
      label: "After Today",
      score: forecast.projectedScore,
      description: "Projected result after following Atlas strategy.",
    },
    {
      label: "Next Goal",
      score: Math.min(100, forecast.projectedScore + 5),
      description: "Short-term growth target.",
    },
  ];
}