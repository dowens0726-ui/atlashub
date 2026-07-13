import type {
  Vehicle,
  VehicleDataAvailability,
} from "@/app/types";


const DEFAULT_AVAILABILITY:
  VehicleDataAvailability = {
    price: false,
    topSpeed: false,
    acceleration: false,
    handling: false,
    braking: false,
    drivetrain: false,
    seats: false,
    location: false,
    horsepower: false,
  };


export function getVehicleDataAvailability(
  vehicle: Vehicle
): VehicleDataAvailability {
  return (
    vehicle.dataQuality?.availability ??
    DEFAULT_AVAILABILITY
  );
}


export function canDisplayVehiclePrice(
  vehicle: Vehicle
): boolean {
  return getVehicleDataAvailability(
    vehicle
  ).price;
}


export function canDisplayVehicleTopSpeed(
  vehicle: Vehicle
): boolean {
  return getVehicleDataAvailability(
    vehicle
  ).topSpeed;
}


export function canDisplayVehicleAcceleration(
  vehicle: Vehicle
): boolean {
  return getVehicleDataAvailability(
    vehicle
  ).acceleration;
}


export function canDisplayVehicleHandling(
  vehicle: Vehicle
): boolean {
  return getVehicleDataAvailability(
    vehicle
  ).handling;
}


export function canDisplayVehicleBraking(
  vehicle: Vehicle
): boolean {
  return getVehicleDataAvailability(
    vehicle
  ).braking;
}


export function canDisplayVehicleDrivetrain(
  vehicle: Vehicle
): boolean {
  return getVehicleDataAvailability(
    vehicle
  ).drivetrain;
}


export function canDisplayVehicleSeats(
  vehicle: Vehicle
): boolean {
  return getVehicleDataAvailability(
    vehicle
  ).seats;
}


export function canDisplayVehicleLocation(
  vehicle: Vehicle
): boolean {
  return getVehicleDataAvailability(
    vehicle
  ).location;
}


export function canDisplayVehicleHorsepower(
  vehicle: Vehicle
): boolean {
  return getVehicleDataAvailability(
    vehicle
  ).horsepower;
}


export function canScoreVehiclePerformance(
  vehicle: Vehicle
): boolean {
  const availability =
    getVehicleDataAvailability(
      vehicle
    );

  return (
    availability.topSpeed &&
    availability.acceleration &&
    availability.handling &&
    availability.braking
  );
}


export function canScoreVehicleValue(
  vehicle: Vehicle
): boolean {
  return (
    canScoreVehiclePerformance(
      vehicle
    ) &&
    canDisplayVehiclePrice(
      vehicle
    )
  );
}


export function canScoreVehicleDailyDriver(
  vehicle: Vehicle
): boolean {
  const availability =
    getVehicleDataAvailability(
      vehicle
    );

  return (
    availability.handling &&
    availability.braking &&
    availability.drivetrain &&
    availability.seats
  );
}


export function canScoreVehicleBeginner(
  vehicle: Vehicle
): boolean {
  const availability =
    getVehicleDataAvailability(
      vehicle
    );

  return (
    availability.price &&
    availability.handling &&
    availability.braking &&
    availability.drivetrain
  );
}


export function canScoreVehicleCompletely(
  vehicle: Vehicle
): boolean {
  return (
    canScoreVehiclePerformance(
      vehicle
    ) &&
    canScoreVehicleValue(
      vehicle
    ) &&
    canScoreVehicleDailyDriver(
      vehicle
    ) &&
    canScoreVehicleBeginner(
      vehicle
    )
  );
}


export function getVehicleAvailableFieldCount(
  vehicle: Vehicle
): number {
  return Object.values(
    getVehicleDataAvailability(
      vehicle
    )
  ).filter(Boolean).length;
}


export function getVehicleTotalTrackedFieldCount():
  number {
  return Object.keys(
    DEFAULT_AVAILABILITY
  ).length;
}


export function getVehicleDataCompleteness(
  vehicle: Vehicle
): number {
  const totalFields =
    getVehicleTotalTrackedFieldCount();

  if (
    totalFields ===
    0
  ) {
    return 0;
  }

  return Math.round(
    (
      getVehicleAvailableFieldCount(
        vehicle
      ) /
      totalFields
    ) *
      100
  );
}