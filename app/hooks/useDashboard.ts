"use client";

import { useMemo } from "react";
import { getDashboard } from "@/app/services";
import { usePlayerProfile } from "./usePlayerProfile";

export function useDashboard() {
  const { profile } = usePlayerProfile();

  return useMemo(() => {
    return getDashboard(profile);
  }, [profile]);
}