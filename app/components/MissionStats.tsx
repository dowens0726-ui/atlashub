import type { Mission } from "@/app/types/mission";

type MissionStatsProps = {
  mission: Mission;
};

export default function MissionStats({ mission }: MissionStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-500">Reward</p>
        <p className="mt-1 font-semibold text-white">{mission.reward}</p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-500">Difficulty</p>
        <p className="mt-1 font-semibold text-white">{mission.difficulty}</p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-500">Estimated Time</p>
        <p className="mt-1 font-semibold text-white">
          {mission.estimatedTime}
        </p>
      </div>
    </div>
  );
}