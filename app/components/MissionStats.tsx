import type { Mission } from "@/app/types/mission";
import { StatCard } from "@/app/components/ui";

type MissionStatsProps = {
  mission: Mission;
};

export default function MissionStats({ mission }: MissionStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="Reward" value={mission.reward} />
      <StatCard label="Difficulty" value={mission.difficulty} />
      <StatCard label="Estimated Time" value={mission.estimatedTime} />
    </div>
  );
}