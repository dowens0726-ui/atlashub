import {
  businesses,
  missions,
  vehicles,
  weapons,
} from "@/app/data";

import type {
  Business,
  Mission,
  Vehicle,
} from "@/app/types";

import type {
  RelationshipStatistic,
} from "./types";


type RelationshipReference = {
  sourceType:
    | "vehicle"
    | "mission"
    | "business";

  sourceSlug:
    string;

  targetType:
    | "vehicle"
    | "mission"
    | "weapon"
    | "business";

  targetSlug:
    string;
};


function normalizeReference(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}


function buildSlugSet(
  records:
    readonly {
      slug: string;
    }[]
): Set<string> {
  return new Set(
    records.map(
      (record) =>
        normalizeReference(
          record.slug
        )
    )
  );
}


function getVehicleReferences(
  vehicle:
    Vehicle
): RelationshipReference[] {
  const references:
    RelationshipReference[] = [];


  for (
    const relatedVehicle of
      vehicle.relatedVehicles ??
      []
  ) {
    references.push({
      sourceType:
        "vehicle",

      sourceSlug:
        vehicle.slug,

      targetType:
        "vehicle",

      targetSlug:
        normalizeReference(
          relatedVehicle
        ),
    });
  }


  for (
    const mission of
      vehicle.recommendedMissions ??
      []
  ) {
    references.push({
      sourceType:
        "vehicle",

      sourceSlug:
        vehicle.slug,

      targetType:
        "mission",

      targetSlug:
        normalizeReference(
          mission
        ),
    });
  }


  return references;
}


function getMissionReferences(
  mission:
    Mission
): RelationshipReference[] {
  const references:
    RelationshipReference[] = [];


  if (
    mission.recommendedVehicle
  ) {
    references.push({
      sourceType:
        "mission",

      sourceSlug:
        mission.slug,

      targetType:
        "vehicle",

      targetSlug:
        normalizeReference(
          mission.recommendedVehicle
        ),
    });
  }


  if (
    mission.recommendedWeapon
  ) {
    references.push({
      sourceType:
        "mission",

      sourceSlug:
        mission.slug,

      targetType:
        "weapon",

      targetSlug:
        normalizeReference(
          mission.recommendedWeapon
        ),
    });
  }


  for (
    const relatedMission of
      mission.relatedMissions ??
      []
  ) {
    references.push({
      sourceType:
        "mission",

      sourceSlug:
        mission.slug,

      targetType:
        "mission",

      targetSlug:
        normalizeReference(
          relatedMission
        ),
    });
  }


  return references;
}


function getBusinessReferences(
  business:
    Business
): RelationshipReference[] {
  const references:
    RelationshipReference[] = [];


  for (
    const relatedVehicle of
      business.relatedVehicles ??
      []
  ) {
    references.push({
      sourceType:
        "business",

      sourceSlug:
        business.slug,

      targetType:
        "vehicle",

      targetSlug:
        normalizeReference(
          relatedVehicle
        ),
    });
  }


  for (
    const relatedMission of
      business.relatedMissions ??
      []
  ) {
    references.push({
      sourceType:
        "business",

      sourceSlug:
        business.slug,

      targetType:
        "mission",

      targetSlug:
        normalizeReference(
          relatedMission
        ),
    });
  }


  for (
    const relatedBusiness of
      business.relatedBusinesses ??
      []
  ) {
    references.push({
      sourceType:
        "business",

      sourceSlug:
        business.slug,

      targetType:
        "business",

      targetSlug:
        normalizeReference(
          relatedBusiness
        ),
    });
  }


  return references;
}


export function getRelationshipReferences():
  RelationshipReference[] {
  return [
    ...vehicles.flatMap(
      getVehicleReferences
    ),

    ...missions.flatMap(
      getMissionReferences
    ),

    ...businesses.flatMap(
      getBusinessReferences
    ),
  ];
}


function relationshipExists(
  reference:
    RelationshipReference,
  slugSets: {
    vehicles:
      Set<string>;

    missions:
      Set<string>;

    weapons:
      Set<string>;

    businesses:
      Set<string>;
  }
): boolean {
  if (
    reference.targetType ===
    "vehicle"
  ) {
    return slugSets.vehicles.has(
      reference.targetSlug
    );
  }

  if (
    reference.targetType ===
    "mission"
  ) {
    return slugSets.missions.has(
      reference.targetSlug
    );
  }

  if (
    reference.targetType ===
    "weapon"
  ) {
    return slugSets.weapons.has(
      reference.targetSlug
    );
  }

  return slugSets.businesses.has(
    reference.targetSlug
  );
}


export function getBrokenRelationships():
  RelationshipReference[] {
  const slugSets = {
    vehicles:
      buildSlugSet(
        vehicles
      ),

    missions:
      buildSlugSet(
        missions
      ),

    weapons:
      buildSlugSet(
        weapons
      ),

    businesses:
      buildSlugSet(
        businesses
      ),
  };


  return getRelationshipReferences().filter(
    (reference) =>
      !relationshipExists(
        reference,
        slugSets
      )
  );
}


export function getOrphanedVehicles():
  Vehicle[] {
  const referencedVehicleSlugs =
    new Set(
      getRelationshipReferences()
        .filter(
          (reference) =>
            reference.targetType ===
            "vehicle"
        )
        .map(
          (reference) =>
            reference.targetSlug
        )
    );


  return vehicles.filter(
    (vehicle) =>
      !referencedVehicleSlugs.has(
        normalizeReference(
          vehicle.slug
        )
      ) &&
      (
        vehicle.relatedVehicles ??
        []
      ).length ===
        0 &&
      (
        vehicle.recommendedMissions ??
        []
      ).length ===
        0
  );
}


export function getOrphanedMissions():
  Mission[] {
  const referencedMissionSlugs =
    new Set(
      getRelationshipReferences()
        .filter(
          (reference) =>
            reference.targetType ===
            "mission"
        )
        .map(
          (reference) =>
            reference.targetSlug
        )
    );


  return missions.filter(
    (mission) =>
      !referencedMissionSlugs.has(
        normalizeReference(
          mission.slug
        )
      ) &&
      (
        mission.relatedMissions ??
        []
      ).length ===
        0
  );
}


export function getRelationshipStatistics():
  RelationshipStatistic {
  const references =
    getRelationshipReferences();

  const brokenRelationships =
    getBrokenRelationships();

  const orphanedEntities =
    getOrphanedVehicles().length +
    getOrphanedMissions().length;


  return {
    totalRelationships:
      references.length,

    orphanedEntities,

    brokenRelationships:
      brokenRelationships.length,
  };
}