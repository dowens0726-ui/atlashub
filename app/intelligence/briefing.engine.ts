import type { PlayerProfile } from "@/app/types";
import type { AtlasImpact } from "./impact.engine";

export type AtlasBriefing = {
  title: string;
  summary: string;
  recommendedSessionMinutes: number;
  objective: string;
};

export function buildAtlasBriefing(
  profile: PlayerProfile,
  impact: AtlasImpact
): AtlasBriefing {
  const hasExpansionCash = profile.cash >= 2_000_000;
  const hasLowCash = profile.cash < 1_000_000;
  const businessCount = profile.ownedBusinesses.length;

  const recommendedSessionMinutes = hasExpansionCash ? 60 : hasLowCash ? 45 : 50;

  if (hasExpansionCash && businessCount <= 1) {
    return {
      title: "Today's Atlas Briefing",
      summary: `Atlas has detected a strong expansion window. Your cash reserve can support a major purchase with a projected Empire Score gain of +${impact.empireScoreGain}.`,
      recommendedSessionMinutes,
      objective: "Expand your empire with the highest-ROI opportunity.",
    };
  }

  if (hasLowCash) {
    return {
      title: "Today's Atlas Briefing",
      summary:
        "Atlas recommends building your cash reserve before making another major purchase. Focus on efficient income and low-risk progression.",
      recommendedSessionMinutes,
      objective: "Build cash before expanding.",
    };
  }

  if (businessCount >= 3) {
    return {
      title: "Today's Atlas Briefing",
      summary:
        "Your empire has multiple income sources. Atlas recommends optimizing existing businesses before adding another expensive asset.",
      recommendedSessionMinutes,
      objective: "Optimize current income streams.",
    };
  }

  return {
    title: "Today's Atlas Briefing",
    summary: `Atlas projects an Empire Score increase of +${impact.empireScoreGain} with ${impact.risk.toLowerCase()} operational risk.`,
    recommendedSessionMinutes,
    objective: "Follow the Next Best Action to maximize today's progression.",
  };
}