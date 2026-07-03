"use client";

import { useEffect, useState } from "react";

export type RecentItem = {
  id: string;
  type: "mission" | "vehicle" | "weapon";
  title: string;
  href: string;
};

const STORAGE_KEY = "atlas:recent";

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<RecentItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setRecent(JSON.parse(saved));
    }
  }, []);

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