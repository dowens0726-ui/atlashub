import type { PlayerProfile } from "@/app/types";
import type { EmpireForecast, NextAction } from "@/app/intelligence";

export type DailyObjective = {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

export function buildDailyObjectives(
  profile: PlayerProfile,
  nextAction: NextAction,
  forecast: EmpireForecast
): DailyObjective[] {
  return [
    {
      id: "next-action",
      title: nextAction.title,
      description: nextAction.reason,
      priority: "High",
    },
    {
      id: "earn-income",
      title: `Generate ${forecast.incomeGain.toLocaleString()} in income`,
      description: "Follow the recommended session strategy to grow cash reserves.",
      priority: "Medium",
    },
    {
      id: "protect-cash",
      title:
        profile.cash < 1_000_000
          ? "Build cash reserve"
          : "Maintain expansion capital",
      description:
        profile.cash < 1_000_000
          ? "Avoid major purchases until your reserve improves."
          : "Keep enough available cash before your next major investment.",
      priority: "Medium",
    },
  ];
}