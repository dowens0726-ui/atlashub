"use client";

import { usePlayerStore } from "@/app/store/player.store";

export function usePlayerProfile() {
  const profile = usePlayerStore((state) => state.profile);
  const updateProfile = usePlayerStore((state) => state.updateProfile);
  const resetProfile = usePlayerStore((state) => state.resetProfile);
  const setProfile = usePlayerStore((state) => state.setProfile);

  return {
    profile,
    setProfile,
    updateProfile,
    resetProfile,
  };
}