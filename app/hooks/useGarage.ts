"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Vehicle } from "@/app/types";

const GARAGE_STORAGE_KEY = "atlas:garage";

type StoredGarage = {
  vehicleSlugs: string[];
};

type UseGarageResult = {
  ownedVehicles: Vehicle[];
  ownedVehicleSlugs: Set<string>;
  vehicleCount: number;
  isHydrated: boolean;
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (vehicleSlug: string) => void;
  clearGarage: () => void;
  ownsVehicle: (vehicleSlug: string) => boolean;
};

function parseStoredGarage(value: string | null): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as Partial<StoredGarage>;

    if (!Array.isArray(parsed.vehicleSlugs)) {
      return [];
    }

    return Array.from(
      new Set(
        parsed.vehicleSlugs.filter(
          (slug): slug is string =>
            typeof slug === "string" &&
            slug.trim().length > 0
        )
      )
    );
  } catch {
    return [];
  }
}

export default function useGarage(
  availableVehicles: Vehicle[]
): UseGarageResult {
  const [ownedSlugs, setOwnedSlugs] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const availableVehicleSlugs = useMemo(
    () =>
      new Set(
        availableVehicles.map(
          (vehicle) => vehicle.slug
        )
      ),
    [availableVehicles]
  );

  useEffect(() => {
    const storedSlugs = parseStoredGarage(
      window.localStorage.getItem(
        GARAGE_STORAGE_KEY
      )
    );

    setOwnedSlugs(
      storedSlugs.filter(
        (slug) =>
          availableVehicleSlugs.has(slug)
      )
    );

    setIsHydrated(true);
  }, [availableVehicleSlugs]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const storedGarage: StoredGarage = {
      vehicleSlugs: ownedSlugs,
    };

    window.localStorage.setItem(
      GARAGE_STORAGE_KEY,
      JSON.stringify(storedGarage)
    );
  }, [isHydrated, ownedSlugs]);

  const ownedVehicleSlugs = useMemo(
    () => new Set(ownedSlugs),
    [ownedSlugs]
  );

  const ownedVehicles = useMemo(
    () =>
      ownedSlugs
        .map((slug) =>
          availableVehicles.find(
            (vehicle) =>
              vehicle.slug === slug
          )
        )
        .filter(
          (vehicle): vehicle is Vehicle =>
            Boolean(vehicle)
        ),
    [availableVehicles, ownedSlugs]
  );

  const addVehicle = useCallback(
    (vehicle: Vehicle) => {
      setOwnedSlugs((currentSlugs) => {
        if (
          currentSlugs.includes(
            vehicle.slug
          )
        ) {
          return currentSlugs;
        }

        return [
          ...currentSlugs,
          vehicle.slug,
        ];
      });
    },
    []
  );

  const removeVehicle = useCallback(
    (vehicleSlug: string) => {
      setOwnedSlugs((currentSlugs) =>
        currentSlugs.filter(
          (slug) =>
            slug !== vehicleSlug
        )
      );
    },
    []
  );

  const clearGarage = useCallback(() => {
    setOwnedSlugs([]);
  }, []);

  const ownsVehicle = useCallback(
    (vehicleSlug: string) =>
      ownedVehicleSlugs.has(
        vehicleSlug
      ),
    [ownedVehicleSlugs]
  );

  return {
    ownedVehicles,
    ownedVehicleSlugs,
    vehicleCount:
      ownedVehicles.length,
    isHydrated,
    addVehicle,
    removeVehicle,
    clearGarage,
    ownsVehicle,
  };
}
