"use client";

import { Card, Badge } from "@/app/components/ui";
import { useAchievements } from "@/app/hooks/useAchievements";
import AchievementCard from "./AchievementCard";

export default function AchievementList() {
  const achievements = useAchievements();

  return (
    <Card padding="lg">
      <Badge className="border-amber-400/40 text-amber-400">
        Achievements
      </Badge>

      <h2 className="mt-4 text-3xl font-black text-white">
        Empire Progress
      </h2>

      <div className="mt-6 space-y-4">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>
    </Card>
  );
}