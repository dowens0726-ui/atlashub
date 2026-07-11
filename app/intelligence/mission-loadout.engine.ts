import type {
  Mission,
  PlayerProfile,
  Vehicle,
  Weapon,
} from "@/app/types";


export type AtlasMissionLoadout = {
  vehicle: Vehicle | null;

  weapon: Weapon | null;

  vehicleReason: string;

  weaponReason: string;

  readinessScore: number;

  missingEquipment: string[];
};


function findRecommendedVehicle(
  mission: Mission,
  vehicles: Vehicle[]
): Vehicle | null {

  if (!mission.recommendedVehicle) {
    return null;
  }


  return (
    vehicles.find(
      (vehicle) =>
        vehicle.slug === mission.recommendedVehicle
    ) ?? null
  );
}


function findRecommendedWeapon(
  mission: Mission,
  weapons: Weapon[]
): Weapon | null {

  if (!mission.recommendedWeapon) {
    return null;
  }


  return (
    weapons.find(
      (weapon) =>
        weapon.slug === mission.recommendedWeapon
    ) ?? null
  );
}


function calculateVehicleScore(
  vehicle: Vehicle,
  profile: PlayerProfile
): number {

  let score = 50;


  if (
    profile.ownedVehicles.includes(
      vehicle.slug
    )
  ) {
    score += 30;
  }


  if (
    profile.cash >= vehicle.price
  ) {
    score += 10;
  }


  if (
    vehicle.handling >= 80
  ) {
    score += 10;
  }


  return Math.min(
    100,
    score
  );
}


function calculateWeaponScore(
  weapon: Weapon,
  profile: PlayerProfile
): number {

  let score = 50;


  if (
    profile.cash >= weapon.price
  ) {
    score += 15;
  }


  if (
    weapon.damage >= 80
  ) {
    score += 15;
  }


  if (
    weapon.accuracy >= 80
  ) {
    score += 20;
  }


  return Math.min(
    100,
    score
  );
}


export function buildMissionLoadout(
  mission: Mission,
  vehicles: Vehicle[],
  weapons: Weapon[],
  profile: PlayerProfile
): AtlasMissionLoadout {

  const vehicle =
    findRecommendedVehicle(
      mission,
      vehicles
    );


  const weapon =
    findRecommendedWeapon(
      mission,
      weapons
    );


  const missingEquipment: string[] = [];


  if (
    !vehicle
  ) {
    missingEquipment.push(
      "Recommended Vehicle"
    );
  }


  if (
    !weapon
  ) {
    missingEquipment.push(
      "Recommended Weapon"
    );
  }


  const vehicleScore =
    vehicle
      ? calculateVehicleScore(
          vehicle,
          profile
        )
      : 0;


  const weaponScore =
    weapon
      ? calculateWeaponScore(
          weapon,
          profile
        )
      : 0;


  const readinessScore =
    Math.round(
      (
        vehicleScore +
        weaponScore
      ) / 2
    );


  return {
    vehicle,

    weapon,


    vehicleReason:
      vehicle
        ? `${vehicle.name} matches this mission recommendation with ${vehicle.handling}% handling and ${vehicle.drivetrain} drivetrain.`
        : "Atlas could not identify a recommended vehicle for this mission.",


    weaponReason:
      weapon
        ? `${weapon.name} provides ${weapon.damage}% damage, ${weapon.accuracy}% accuracy, and supports this mission combat profile.`
        : "Atlas could not identify a recommended weapon for this mission.",


    readinessScore,


    missingEquipment,
  };
}