"use client";

import { useMemo } from "react";
import { getAchievements } from "@/app/achievements/achievement.service";
import { usePlayerProfile } from "@/app/hooks/usePlayerProfile";

export function useAchievements() {
  const { profile } = usePlayerProfile();

  return useMemo(() => getAchievements(profile), [profile]);
}