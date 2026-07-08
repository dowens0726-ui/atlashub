"use client";

import { create } from "zustand";
import type { ActivityItem } from "./types";

type ActivityStore = {
  activities: ActivityItem[];
  addActivity: (activity: Omit<ActivityItem, "id" | "createdAt">) => void;
  clearActivities: () => void;
};

function createActivityId() {
  return `activity:${Date.now()}:${Math.random().toString(36).slice(2)}`;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],

  addActivity: (activity) =>
    set((state) => ({
      activities: [
        {
          ...activity,
          id: createActivityId(),
          createdAt: new Date().toISOString(),
        },
        ...state.activities,
      ].slice(0, 20),
    })),

  clearActivities: () => set({ activities: [] }),
}));