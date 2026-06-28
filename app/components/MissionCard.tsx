import Link from "next/link";
import Badge from "./Badge";
import Card from "./ui/Card";
import type { Mission } from "../types/mission";

type MissionCardProps = {
  mission: Mission;
};

export default function MissionCard({ mission }: MissionCardProps) {
  return (
    <Card className="hover:-translate-y-1">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
        {mission.category}
      </p>

      <h2 className="mt-2 text-2xl font-bold">{mission.title}</h2>

      <p className="mt-3 text-zinc-400">{mission.description}</p>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="font-semibold text-emerald-400">
            Reward: {mission.reward}
          </p>

          <Badge
  label={mission.difficulty}
  variant={
    mission.difficulty === "Easy"
      ? "easy"
      : mission.difficulty === "Medium"
      ? "medium"
      : "hard"
  }
/>
        </div>

        <Link
          href={`/missions/${mission.slug}`}
          className="rounded-xl bg-emerald-500 px-5 py-2 font-bold text-zinc-950 hover:bg-emerald-400"
        >
          View Guide →
        </Link>
      </div>
    </Card>
  );
}