import type { ActivityItem as ActivityItemType } from "@/app/activity/types";

type ActivityItemProps = {
  activity: ActivityItemType;
};

export default function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
      <p className="text-sm font-bold text-white">{activity.title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {activity.description}
      </p>
    </div>
  );
}