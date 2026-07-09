"use client";

import { create } from "zustand";

import type { PlayerProfile } from "@/app/types";

import { defaultPlayerProfile } from "@/app/services/profile.service";

import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/app/lib/storage";

const PLAYER_PROFILE_STORAGE_KEY = "atlas:player-profile";

type PlayerStore = {
  profile: PlayerProfile;
  hydrated: boolean;

  hydrateProfile: () => PlayerProfile;

  setProfile: (profile: PlayerProfile) => PlayerProfile;
  updateProfile: (partialProfile: Partial<PlayerProfile>) => PlayerProfile;
  resetProfile: () => PlayerProfile;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  profile: defaultPlayerProfile,

  hydrated: false,

  hydrateProfile: () => {
    const storedProfile = loadFromStorage<PlayerProfile>(
      PLAYER_PROFILE_STORAGE_KEY,
      defaultPlayerProfile
    );

    set({
      profile: storedProfile,
      hydrated: true,
    });

    return storedProfile;
  },

  setProfile: (profile) => {
    saveToStorage(PLAYER_PROFILE_STORAGE_KEY, profile);

    set({
      profile,
    });

    return profile;
  },

  updateProfile: (partialProfile) => {
    const nextProfile = {
      ...get().profile,
      ...partialProfile,
    };

    saveToStorage(
      PLAYER_PROFILE_STORAGE_KEY,
      nextProfile
    );

    set({
      profile: nextProfile,
    });

    return nextProfile;
  },

  resetProfile: () => {
    removeFromStorage(PLAYER_PROFILE_STORAGE_KEY);

    set({
      profile: defaultPlayerProfile,
    });

    return defaultPlayerProfile;
  },
}));

export function getPlayerProfile(): PlayerProfile {
  return usePlayerStore.getState().profile;
}

export function setPlayerProfile(
  profile: PlayerProfile
): PlayerProfile {
  return usePlayerStore.getState().setProfile(profile);
}

export function updatePlayerProfile(
  partialProfile: Partial<PlayerProfile>
): PlayerProfile {
  return usePlayerStore
    .getState()
    .updateProfile(partialProfile);
}

export function resetPlayerProfile(): PlayerProfile {
  return usePlayerStore.getState().resetProfile();
}