"use client";

import { useState } from "react";

export type RecentItem = {
  id: string;
  type: "mission" | "vehicle" | "weapon";
  title: string;
  href: string;
};

const STORAGE_KEY = "atlas:recent";

function getSavedRecent(): RecentItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved) as RecentItem[];
  } catch {
    return [];
  }
}

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<RecentItem[]>(getSavedRecent);

  function addRecent(item: RecentItem) {
    const filtered = recent.filter((entry) => entry.id !== item.id);
    const next = [item, ...filtered].slice(0, 10);

    setRecent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return {
    recent,
    addRecent,
  };
}