import type { PlayerProfile } from "@/app/types";
import { GlassPanel, HeroMetrics } from "@/app/components/design-system";

type LiveEmpireCardProps = {
  profile: PlayerProfile;
};

export default function LiveEmpireCard({ profile }: LiveEmpireCardProps) {
  const metrics = [
    {
      label: "Cash",
      value: `$${profile.cash.toLocaleString()}`,
    },
    {
      label: "Businesses",
      value: profile.ownedBusinesses.length.toString(),
    },
    {
      label: "Playstyle",
      value: profile.playstyle,
    },
    {
      label: "Empire Status",
      value: "Active",
    },
  ];

  return (
    <GlassPanel
      title="Live Empire"
      subtitle="Your current profile, resources, and active progression state."
      className="border-amber-400/20 bg-amber-400/[0.03]"
    >
      <HeroMetrics metrics={metrics} columns={2} />
    </GlassPanel>
  );
}