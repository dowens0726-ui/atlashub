import type { Achievement } from "@/app/achievements/types";
import { Badge } from "@/app/components/ui";

type AchievementCardProps = {
  achievement: Achievement;
};

export default function AchievementCard({
  achievement,
}: AchievementCardProps) {
  const percentage = Math.min(
    100,
    Math.round((achievement.progress / achievement.target) * 100)
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white">
            {achievement.title}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {achievement.description}
          </p>
        </div>

        <Badge>{achievement.status}</Badge>
      </div>

      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-zinc-500">
          <span>
            {achievement.progress.toLocaleString()}
          </span>

          <span>
            {achievement.target.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}