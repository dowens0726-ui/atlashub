"use client";

import {
  useMemo,
} from "react";

import {
  evaluateEmpire,
} from "@/app/intelligence/empire.engine";

import {
  buildAtlasWorldContext,
  type AtlasWorldContext,
} from "@/app/intelligence/world";

import {
  usePlayerProfile,
} from "./usePlayerProfile";


export type UseAtlasWorldContextResult = {
  worldContext:
    AtlasWorldContext | null;

  hydrated:
    boolean;
};


export function useAtlasWorldContext():
  UseAtlasWorldContextResult {
  const {
    profile,
    hydrated,
  } =
    usePlayerProfile();


  const worldContext =
    useMemo<
      AtlasWorldContext | null
    >(
      () => {
        if (
          !hydrated
        ) {
          return null;
        }

        const empire =
          evaluateEmpire(
            profile
          );

        return buildAtlasWorldContext({
          cash:
            profile.cash,

          ownedBusinessCount:
            profile
              .ownedBusinesses
              .length,

          playstyle:
            profile.playstyle,

          empireScore:
            empire.overall,

          cashScore:
            empire.cashScore,

          diversityScore:
            empire.diversityScore,

          expansionScore:
            empire.expansionScore,
        });
      },
      [
        hydrated,
        profile,
      ]
    );


  return {
    worldContext,
    hydrated,
  };
}
