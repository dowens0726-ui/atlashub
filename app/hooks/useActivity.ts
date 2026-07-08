"use client";

import { useActivityStore } from "@/app/activity/activity.store";

export function useActivity() {
  const activities = useActivityStore((state) => state.activities);
  const addActivity = useActivityStore((state) => state.addActivity);
  const clearActivities = useActivityStore((state) => state.clearActivities);

  return {
    activities,
    addActivity,
    clearActivities,
  };
}