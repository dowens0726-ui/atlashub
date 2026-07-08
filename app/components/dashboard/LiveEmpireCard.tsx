import type { PlayerProfile } from "@/app/types";
import { Card, MetricRow } from "@/app/components/ui";

type LiveEmpireCardProps = {
  profile: PlayerProfile;
};

export default function LiveEmpireCard({
  profile,
}: LiveEmpireCardProps) {
  return (
    <Card
      padding="lg"
      accent="amber"
      className="bg-gradient-to-br from-zinc-900 to-zinc-950"
    >
      <p className="text-sm font-black uppercase tracking-[0.3em] text-amber-400">
        Live Empire
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        Current Profile
      </h2>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 px-5">
        <MetricRow
          label="Cash"
          value={`$${profile.cash.toLocaleString()}`}
        />

        <MetricRow
          label="Businesses"
          value={profile.ownedBusinesses.length.toString()}
        />

        <MetricRow
          label="Playstyle"
          value={profile.playstyle}
        />

        <MetricRow
          label="Empire Status"
          value="Active"
        />
      </div>
    </Card>
  );
}