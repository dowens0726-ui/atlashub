import type { PlayerProfile } from "@/app/types";

export type AtlasGreeting = {
  greeting: string;
  subtitle: string;
};

export function buildAtlasGreeting(
  profile: PlayerProfile
): AtlasGreeting {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  let subtitle =
    "Atlas is monitoring your empire.";

  if (profile.cash >= 2_000_000) {
    subtitle =
      "Atlas has identified an expansion opportunity.";
  } else if (profile.ownedBusinesses.length === 0) {
    subtitle =
      "Let's establish your first income source.";
  }

  return {
    greeting,
    subtitle,
  };
}