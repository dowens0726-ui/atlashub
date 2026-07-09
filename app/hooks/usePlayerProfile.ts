"use client";

import { useEffect } from "react";

import { usePlayerStore } from "@/app/store/player.store";

export function usePlayerProfile() {
  const profile = usePlayerStore((state) => state.profile);
  const hydrated = usePlayerStore((state) => state.hydrated);
  const hydrateProfile = usePlayerStore(
    (state) => state.hydrateProfile
  );

  const updateProfile = usePlayerStore(
    (state) => state.updateProfile
  );

  const resetProfile = usePlayerStore(
    (state) => state.resetProfile
  );

  const setProfile = usePlayerStore(
    (state) => state.setProfile
  );

  useEffect(() => {
    if (!hydrated) {
      hydrateProfile();
    }
  }, [hydrated, hydrateProfile]);

  return {
    profile,
    hydrated,
    setProfile,
    updateProfile,
    resetProfile,
  };
}