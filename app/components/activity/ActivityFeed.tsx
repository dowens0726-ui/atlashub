"use client";

import { useActivity } from "@/app/hooks/useActivity";
import { Badge, Card } from "@/app/components/ui";
import ActivityItem from "./ActivityItem";

export default function ActivityFeed() {
  const { activities, clearActivities } = useActivity();

  return (
    <Card padding="lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge className="border-amber-400/40 text-amber-400">
            Activity
          </Badge>

          <h2 className="mt-4 text-3xl font-black text-white">
            Empire Activity
          </h2>
        </div>

        {activities.length > 0 ? (
          <button
            type="button"
            onClick={clearActivities}
            className="text-sm font-bold text-zinc-500 transition hover:text-amber-400"
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="mt-6 space-y-3">
        {activities.length === 0 ? (
          <p className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-400">
            No activity yet. Update your profile to start building your empire history.
          </p>
        ) : (
          activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        )}
      </div>
    </Card>
  );
}