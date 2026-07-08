import type { PlayerProfile } from "@/app/types";

export type IntelligenceInsight = {
  id: string;
  title: string;
  description: string;
  severity: "info" | "success" | "warning";
};

export function buildIntelligenceFeed(
  profile: PlayerProfile
): IntelligenceInsight[] {
  const insights: IntelligenceInsight[] = [];

  if (profile.cash >= 2_000_000) {
    insights.push({
      id: "agency-affordable",
      title: "Agency Purchase Available",
      description:
        "Your current cash reserve is enough to purchase an Agency.",
      severity: "success",
    });
  }

  if (profile.ownedBusinesses.length < 2) {
    insights.push({
      id: "expand-portfolio",
      title: "Expand Your Portfolio",
      description:
        "Adding another business will improve long-term income stability.",
      severity: "warning",
    });
  }

  insights.push({
    id: "atlas-monitoring",
    title: "Atlas Monitoring Active",
    description:
      "Atlas is continuously analyzing your empire for new opportunities.",
    severity: "info",
  });

  return insights;
}