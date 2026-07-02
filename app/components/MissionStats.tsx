import type { Mission } from "@/app/types/mission";
import { Badge, StatCard } from "@/app/components/ui";

type MissionStatsProps = {
  mission: Mission;
};

export default function MissionStats({ mission }: MissionStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="Reward" value={mission.reward} />

      <StatCard label="Difficulty" value={mission.difficulty} />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-500">Category</p>
        <div className="mt-2">
          <Badge>{mission.category}</Badge>
        </div>
      </div>
    </div>
  );
}