import type {
  Business,
  Mission,
  Vehicle,
  Weapon,
} from "@/app/types";

import {
  getAllBusinesses,
  getAllMissions,
  getAllVehicles,
  getAllWeapons,
  getBusinessBySlug,
  getMissionBySlug,
  getVehicleBySlug,
  getWeaponBySlug,
} from "@/app/data/content-registry";

export type RelationshipEntityType =
  | "vehicle"
  | "mission"
  | "weapon"
  | "business";

export type RelationshipStrength =
  | "direct"
  | "reverse"
  | "inferred";

export type RelationshipReason = {
  sourceType: RelationshipEntityType;
  sourceSlug: string;
  targetType: RelationshipEntityType;
  targetSlug: string;
  strength: RelationshipStrength;
  score: number;
  reason: string;
};

export type AtlasRelationships = {
  source:
    | Vehicle
    | Mission
    | Weapon
    | Business;

  sourceType: RelationshipEntityType;

  vehicles: Vehicle[];

  missions: Mission[];

  weapons: Weapon[];

  businesses: Business[];

  reasons: RelationshipReason[];
};

export type RelationshipQuery = {
  type: RelationshipEntityType;
  slug: string;
};

type ScoredEntity<T> = {
  entity: T;
  score: number;
};

const DIRECT_RELATIONSHIP_SCORE = 100;
const REVERSE_RELATIONSHIP_SCORE = 80;
const INFERRED_RELATIONSHIP_SCORE = 40;

function normalizeValue(
  value: string
): string {
  return value
    .trim()
    .toLowerCase();
}

function valuesMatch(
  firstValue: string,
  secondValue: string
): boolean {
  return (
    normalizeValue(firstValue) ===
    normalizeValue(secondValue)
  );
}

function referencesEntity(
  references: readonly string[] | undefined,
  entity: {
    id: string;
    slug: string;
    name?: string;
    title?: string;
  }
): boolean {
  if (!references?.length) {
    return false;
  }

  const possibleValues = [
    entity.id,
    entity.slug,
    entity.name,
    entity.title,
  ].filter(
    (value): value is string =>
      Boolean(value)
  );

  return references.some(
    (reference) =>
      possibleValues.some(
        (possibleValue) =>
          valuesMatch(
            reference,
            possibleValue
          )
      )
  );
}

function referenceMatchesEntity(
  reference: string | undefined,
  entity: {
    id: string;
    slug: string;
    name?: string;
    title?: string;
  }
): boolean {
  if (!reference) {
    return false;
  }

  return referencesEntity(
    [reference],
    entity
  );
}

function hasSharedTags(
  firstTags: readonly string[] | undefined,
  secondTags: readonly string[] | undefined
): boolean {
  if (
    !firstTags?.length ||
    !secondTags?.length
  ) {
    return false;
  }

  const normalizedFirstTags =
    new Set(
      firstTags.map(
        normalizeValue
      )
    );

  return secondTags.some(
    (tag) =>
      normalizedFirstTags.has(
        normalizeValue(tag)
      )
  );
}

function addScoredEntity<T extends {
  slug: string;
}>(
  collection: Map<string, ScoredEntity<T>>,
  entity: T,
  score: number
): void {
  const existing =
    collection.get(
      entity.slug
    );

  if (
    !existing ||
    score > existing.score
  ) {
    collection.set(
      entity.slug,
      {
        entity,
        score,
      }
    );
  }
}

function sortScoredEntities<T>(
  collection: Map<string, ScoredEntity<T>>
): T[] {
  return Array.from(
    collection.values()
  )
    .sort(
      (
        firstItem,
        secondItem
      ) =>
        secondItem.score -
        firstItem.score
    )
    .map(
      (item) =>
        item.entity
    );
}

function getVehicleRelationships(
  vehicle: Vehicle
): AtlasRelationships {
  const relatedVehicles =
    new Map<
      string,
      ScoredEntity<Vehicle>
    >();

  const relatedMissions =
    new Map<
      string,
      ScoredEntity<Mission>
    >();

  const relatedWeapons =
    new Map<
      string,
      ScoredEntity<Weapon>
    >();

  const relatedBusinesses =
    new Map<
      string,
      ScoredEntity<Business>
    >();

  const reasons:
    RelationshipReason[] = [];

  for (
    const relatedVehicleReference
    of vehicle.relatedVehicles ?? []
  ) {
    const relatedVehicle =
      getVehicleBySlug(
        relatedVehicleReference
      ) ??
      getAllVehicles().find(
        (candidate) =>
          referenceMatchesEntity(
            relatedVehicleReference,
            candidate
          )
      );

    if (
      !relatedVehicle ||
      relatedVehicle.slug ===
        vehicle.slug
    ) {
      continue;
    }

    addScoredEntity(
      relatedVehicles,
      relatedVehicle,
      DIRECT_RELATIONSHIP_SCORE
    );

    reasons.push({
      sourceType: "vehicle",
      sourceSlug: vehicle.slug,
      targetType: "vehicle",
      targetSlug:
        relatedVehicle.slug,
      strength: "direct",
      score:
        DIRECT_RELATIONSHIP_SCORE,
      reason:
        `${relatedVehicle.name} is explicitly linked as a related vehicle.`,
    });
  }

  for (
    const missionReference
    of vehicle.recommendedMissions ?? []
  ) {
    const mission =
      getMissionBySlug(
        missionReference
      ) ??
      getAllMissions().find(
        (candidate) =>
          referenceMatchesEntity(
            missionReference,
            candidate
          )
      );

    if (!mission) {
      continue;
    }

    addScoredEntity(
      relatedMissions,
      mission,
      DIRECT_RELATIONSHIP_SCORE
    );

    reasons.push({
      sourceType: "vehicle",
      sourceSlug: vehicle.slug,
      targetType: "mission",
      targetSlug: mission.slug,
      strength: "direct",
      score:
        DIRECT_RELATIONSHIP_SCORE,
      reason:
        `${mission.title} is explicitly recommended for this vehicle.`,
    });
  }

  for (
    const candidateVehicle
    of getAllVehicles()
  ) {
    if (
      candidateVehicle.slug ===
      vehicle.slug
    ) {
      continue;
    }

    if (
      referencesEntity(
        candidateVehicle.relatedVehicles,
        vehicle
      )
    ) {
      addScoredEntity(
        relatedVehicles,
        candidateVehicle,
        REVERSE_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "vehicle",
        sourceSlug: vehicle.slug,
        targetType: "vehicle",
        targetSlug:
          candidateVehicle.slug,
        strength: "reverse",
        score:
          REVERSE_RELATIONSHIP_SCORE,
        reason:
          `${candidateVehicle.name} links back to this vehicle.`,
      });

      continue;
    }

    if (
      candidateVehicle.manufacturer ===
        vehicle.manufacturer ||
      candidateVehicle.class ===
        vehicle.class ||
      hasSharedTags(
        candidateVehicle.tags,
        vehicle.tags
      )
    ) {
      addScoredEntity(
        relatedVehicles,
        candidateVehicle,
        INFERRED_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "vehicle",
        sourceSlug: vehicle.slug,
        targetType: "vehicle",
        targetSlug:
          candidateVehicle.slug,
        strength: "inferred",
        score:
          INFERRED_RELATIONSHIP_SCORE,
        reason:
          `${candidateVehicle.name} shares a manufacturer, class, or content tag with this vehicle.`,
      });
    }
  }

  for (
    const mission
    of getAllMissions()
  ) {
    if (
      referenceMatchesEntity(
        mission.recommendedVehicle,
        vehicle
      )
    ) {
      addScoredEntity(
        relatedMissions,
        mission,
        REVERSE_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "vehicle",
        sourceSlug: vehicle.slug,
        targetType: "mission",
        targetSlug: mission.slug,
        strength: "reverse",
        score:
          REVERSE_RELATIONSHIP_SCORE,
        reason:
          `${mission.title} recommends this vehicle.`,
      });
    }
  }

  for (
    const business
    of getAllBusinesses()
  ) {
    if (
      referencesEntity(
        business.relatedVehicles,
        vehicle
      )
    ) {
      addScoredEntity(
        relatedBusinesses,
        business,
        REVERSE_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "vehicle",
        sourceSlug: vehicle.slug,
        targetType: "business",
        targetSlug: business.slug,
        strength: "reverse",
        score:
          REVERSE_RELATIONSHIP_SCORE,
        reason:
          `${business.name} lists this vehicle as related.`,
      });
    }
  }

  return {
    source: vehicle,
    sourceType: "vehicle",
    vehicles:
      sortScoredEntities(
        relatedVehicles
      ),
    missions:
      sortScoredEntities(
        relatedMissions
      ),
    weapons:
      sortScoredEntities(
        relatedWeapons
      ),
    businesses:
      sortScoredEntities(
        relatedBusinesses
      ),
    reasons,
  };
}

function getMissionRelationships(
  mission: Mission
): AtlasRelationships {
  const relatedVehicles =
    new Map<
      string,
      ScoredEntity<Vehicle>
    >();

  const relatedMissions =
    new Map<
      string,
      ScoredEntity<Mission>
    >();

  const relatedWeapons =
    new Map<
      string,
      ScoredEntity<Weapon>
    >();

  const relatedBusinesses =
    new Map<
      string,
      ScoredEntity<Business>
    >();

  const reasons:
    RelationshipReason[] = [];

  if (
    mission.recommendedVehicle
  ) {
    const vehicle =
      getVehicleBySlug(
        mission.recommendedVehicle
      ) ??
      getAllVehicles().find(
        (candidate) =>
          referenceMatchesEntity(
            mission.recommendedVehicle,
            candidate
          )
      );

    if (vehicle) {
      addScoredEntity(
        relatedVehicles,
        vehicle,
        DIRECT_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "mission",
        sourceSlug: mission.slug,
        targetType: "vehicle",
        targetSlug: vehicle.slug,
        strength: "direct",
        score:
          DIRECT_RELATIONSHIP_SCORE,
        reason:
          `${vehicle.name} is the mission's recommended vehicle.`,
      });
    }
  }

  if (
    mission.recommendedWeapon
  ) {
    const weapon =
      getWeaponBySlug(
        mission.recommendedWeapon
      ) ??
      getAllWeapons().find(
        (candidate) =>
          referenceMatchesEntity(
            mission.recommendedWeapon,
            candidate
          )
      );

    if (weapon) {
      addScoredEntity(
        relatedWeapons,
        weapon,
        DIRECT_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "mission",
        sourceSlug: mission.slug,
        targetType: "weapon",
        targetSlug: weapon.slug,
        strength: "direct",
        score:
          DIRECT_RELATIONSHIP_SCORE,
        reason:
          `${weapon.name} is the mission's recommended weapon.`,
      });
    }
  }

  for (
    const relatedMissionReference
    of mission.relatedMissions ?? []
  ) {
    const relatedMission =
      getMissionBySlug(
        relatedMissionReference
      ) ??
      getAllMissions().find(
        (candidate) =>
          referenceMatchesEntity(
            relatedMissionReference,
            candidate
          )
      );

    if (
      !relatedMission ||
      relatedMission.slug ===
        mission.slug
    ) {
      continue;
    }

    addScoredEntity(
      relatedMissions,
      relatedMission,
      DIRECT_RELATIONSHIP_SCORE
    );

    reasons.push({
      sourceType: "mission",
      sourceSlug: mission.slug,
      targetType: "mission",
      targetSlug:
        relatedMission.slug,
      strength: "direct",
      score:
        DIRECT_RELATIONSHIP_SCORE,
      reason:
        `${relatedMission.title} is explicitly linked as a related mission.`,
    });
  }

  for (
    const candidateMission
    of getAllMissions()
  ) {
    if (
      candidateMission.slug ===
      mission.slug
    ) {
      continue;
    }

    if (
      referencesEntity(
        candidateMission.relatedMissions,
        mission
      )
    ) {
      addScoredEntity(
        relatedMissions,
        candidateMission,
        REVERSE_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "mission",
        sourceSlug: mission.slug,
        targetType: "mission",
        targetSlug:
          candidateMission.slug,
        strength: "reverse",
        score:
          REVERSE_RELATIONSHIP_SCORE,
        reason:
          `${candidateMission.title} links back to this mission.`,
      });

      continue;
    }

    if (
      candidateMission.category ===
        mission.category ||
      candidateMission.difficulty ===
        mission.difficulty ||
      hasSharedTags(
        candidateMission.tags,
        mission.tags
      )
    ) {
      addScoredEntity(
        relatedMissions,
        candidateMission,
        INFERRED_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "mission",
        sourceSlug: mission.slug,
        targetType: "mission",
        targetSlug:
          candidateMission.slug,
        strength: "inferred",
        score:
          INFERRED_RELATIONSHIP_SCORE,
        reason:
          `${candidateMission.title} shares a category, difficulty, or content tag with this mission.`,
      });
    }
  }

  for (
    const vehicle
    of getAllVehicles()
  ) {
    if (
      referencesEntity(
        vehicle.recommendedMissions,
        mission
      )
    ) {
      addScoredEntity(
        relatedVehicles,
        vehicle,
        REVERSE_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "mission",
        sourceSlug: mission.slug,
        targetType: "vehicle",
        targetSlug: vehicle.slug,
        strength: "reverse",
        score:
          REVERSE_RELATIONSHIP_SCORE,
        reason:
          `${vehicle.name} recommends this mission.`,
      });
    }
  }

  for (
    const business
    of getAllBusinesses()
  ) {
    if (
      referencesEntity(
        business.relatedMissions,
        mission
      )
    ) {
      addScoredEntity(
        relatedBusinesses,
        business,
        REVERSE_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "mission",
        sourceSlug: mission.slug,
        targetType: "business",
        targetSlug: business.slug,
        strength: "reverse",
        score:
          REVERSE_RELATIONSHIP_SCORE,
        reason:
          `${business.name} lists this mission as related.`,
      });
    }
  }

  return {
    source: mission,
    sourceType: "mission",
    vehicles:
      sortScoredEntities(
        relatedVehicles
      ),
    missions:
      sortScoredEntities(
        relatedMissions
      ),
    weapons:
      sortScoredEntities(
        relatedWeapons
      ),
    businesses:
      sortScoredEntities(
        relatedBusinesses
      ),
    reasons,
  };
}

function getWeaponRelationships(
  weapon: Weapon
): AtlasRelationships {
  const relatedVehicles =
    new Map<
      string,
      ScoredEntity<Vehicle>
    >();

  const relatedMissions =
    new Map<
      string,
      ScoredEntity<Mission>
    >();

  const relatedWeapons =
    new Map<
      string,
      ScoredEntity<Weapon>
    >();

  const relatedBusinesses =
    new Map<
      string,
      ScoredEntity<Business>
    >();

  const reasons:
    RelationshipReason[] = [];

  for (
    const candidateWeapon
    of getAllWeapons()
  ) {
    if (
      candidateWeapon.slug ===
      weapon.slug
    ) {
      continue;
    }

    if (
      candidateWeapon.category ===
        weapon.category ||
      hasSharedTags(
        candidateWeapon.tags,
        weapon.tags
      )
    ) {
      addScoredEntity(
        relatedWeapons,
        candidateWeapon,
        INFERRED_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "weapon",
        sourceSlug: weapon.slug,
        targetType: "weapon",
        targetSlug:
          candidateWeapon.slug,
        strength: "inferred",
        score:
          INFERRED_RELATIONSHIP_SCORE,
        reason:
          `${candidateWeapon.name} shares a category or content tag with this weapon.`,
      });
    }
  }

  for (
    const mission
    of getAllMissions()
  ) {
    if (
      referenceMatchesEntity(
        mission.recommendedWeapon,
        weapon
      )
    ) {
      addScoredEntity(
        relatedMissions,
        mission,
        REVERSE_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "weapon",
        sourceSlug: weapon.slug,
        targetType: "mission",
        targetSlug: mission.slug,
        strength: "reverse",
        score:
          REVERSE_RELATIONSHIP_SCORE,
        reason:
          `${mission.title} recommends this weapon.`,
      });
    }
  }

  return {
    source: weapon,
    sourceType: "weapon",
    vehicles:
      sortScoredEntities(
        relatedVehicles
      ),
    missions:
      sortScoredEntities(
        relatedMissions
      ),
    weapons:
      sortScoredEntities(
        relatedWeapons
      ),
    businesses:
      sortScoredEntities(
        relatedBusinesses
      ),
    reasons,
  };
}

function getBusinessRelationships(
  business: Business
): AtlasRelationships {
  const relatedVehicles =
    new Map<
      string,
      ScoredEntity<Vehicle>
    >();

  const relatedMissions =
    new Map<
      string,
      ScoredEntity<Mission>
    >();

  const relatedWeapons =
    new Map<
      string,
      ScoredEntity<Weapon>
    >();

  const relatedBusinesses =
    new Map<
      string,
      ScoredEntity<Business>
    >();

  const reasons:
    RelationshipReason[] = [];

  for (
    const vehicleReference
    of business.relatedVehicles ?? []
  ) {
    const vehicle =
      getVehicleBySlug(
        vehicleReference
      ) ??
      getAllVehicles().find(
        (candidate) =>
          referenceMatchesEntity(
            vehicleReference,
            candidate
          )
      );

    if (!vehicle) {
      continue;
    }

    addScoredEntity(
      relatedVehicles,
      vehicle,
      DIRECT_RELATIONSHIP_SCORE
    );

    reasons.push({
      sourceType: "business",
      sourceSlug: business.slug,
      targetType: "vehicle",
      targetSlug: vehicle.slug,
      strength: "direct",
      score:
        DIRECT_RELATIONSHIP_SCORE,
      reason:
        `${vehicle.name} is explicitly linked to this business.`,
    });
  }

  for (
    const missionReference
    of business.relatedMissions ?? []
  ) {
    const mission =
      getMissionBySlug(
        missionReference
      ) ??
      getAllMissions().find(
        (candidate) =>
          referenceMatchesEntity(
            missionReference,
            candidate
          )
      );

    if (!mission) {
      continue;
    }

    addScoredEntity(
      relatedMissions,
      mission,
      DIRECT_RELATIONSHIP_SCORE
    );

    reasons.push({
      sourceType: "business",
      sourceSlug: business.slug,
      targetType: "mission",
      targetSlug: mission.slug,
      strength: "direct",
      score:
        DIRECT_RELATIONSHIP_SCORE,
      reason:
        `${mission.title} is explicitly linked to this business.`,
    });
  }

  for (
    const relatedBusinessReference
    of business.relatedBusinesses ?? []
  ) {
    const relatedBusiness =
      getBusinessBySlug(
        relatedBusinessReference
      ) ??
      getAllBusinesses().find(
        (candidate) =>
          referenceMatchesEntity(
            relatedBusinessReference,
            candidate
          )
      );

    if (
      !relatedBusiness ||
      relatedBusiness.slug ===
        business.slug
    ) {
      continue;
    }

    addScoredEntity(
      relatedBusinesses,
      relatedBusiness,
      DIRECT_RELATIONSHIP_SCORE
    );

    reasons.push({
      sourceType: "business",
      sourceSlug: business.slug,
      targetType: "business",
      targetSlug:
        relatedBusiness.slug,
      strength: "direct",
      score:
        DIRECT_RELATIONSHIP_SCORE,
      reason:
        `${relatedBusiness.name} is explicitly linked as a related business.`,
    });
  }

  for (
    const candidateBusiness
    of getAllBusinesses()
  ) {
    if (
      candidateBusiness.slug ===
      business.slug
    ) {
      continue;
    }

    if (
      referencesEntity(
        candidateBusiness.relatedBusinesses,
        business
      )
    ) {
      addScoredEntity(
        relatedBusinesses,
        candidateBusiness,
        REVERSE_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "business",
        sourceSlug: business.slug,
        targetType: "business",
        targetSlug:
          candidateBusiness.slug,
        strength: "reverse",
        score:
          REVERSE_RELATIONSHIP_SCORE,
        reason:
          `${candidateBusiness.name} links back to this business.`,
      });

      continue;
    }

    if (
      candidateBusiness.category ===
        business.category ||
      hasSharedTags(
        candidateBusiness.tags,
        business.tags
      )
    ) {
      addScoredEntity(
        relatedBusinesses,
        candidateBusiness,
        INFERRED_RELATIONSHIP_SCORE
      );

      reasons.push({
        sourceType: "business",
        sourceSlug: business.slug,
        targetType: "business",
        targetSlug:
          candidateBusiness.slug,
        strength: "inferred",
        score:
          INFERRED_RELATIONSHIP_SCORE,
        reason:
          `${candidateBusiness.name} shares a category or content tag with this business.`,
      });
    }
  }

  return {
    source: business,
    sourceType: "business",
    vehicles:
      sortScoredEntities(
        relatedVehicles
      ),
    missions:
      sortScoredEntities(
        relatedMissions
      ),
    weapons:
      sortScoredEntities(
        relatedWeapons
      ),
    businesses:
      sortScoredEntities(
        relatedBusinesses
      ),
    reasons,
  };
}

export function getRelationships({
  type,
  slug,
}: RelationshipQuery):
  | AtlasRelationships
  | undefined {
  switch (type) {
    case "vehicle": {
      const vehicle =
        getVehicleBySlug(slug);

      return vehicle
        ? getVehicleRelationships(
            vehicle
          )
        : undefined;
    }

    case "mission": {
      const mission =
        getMissionBySlug(slug);

      return mission
        ? getMissionRelationships(
            mission
          )
        : undefined;
    }

    case "weapon": {
      const weapon =
        getWeaponBySlug(slug);

      return weapon
        ? getWeaponRelationships(
            weapon
          )
        : undefined;
    }

    case "business": {
      const business =
        getBusinessBySlug(slug);

      return business
        ? getBusinessRelationships(
            business
          )
        : undefined;
    }

    default: {
      const exhaustiveCheck:
        never = type;

      return exhaustiveCheck;
    }
  }
}