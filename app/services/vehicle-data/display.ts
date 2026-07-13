import type {
  ContentVerificationStatus,
  Vehicle,
  VehicleDataConfidence,
} from "@/app/types";

import {
  canDisplayVehicleAcceleration,
  canDisplayVehicleBraking,
  canDisplayVehicleDrivetrain,
  canDisplayVehicleHandling,
  canDisplayVehicleHorsepower,
  canDisplayVehicleLocation,
  canDisplayVehiclePrice,
  canDisplayVehicleSeats,
  canDisplayVehicleTopSpeed,
} from "./availability";


const UNCONFIRMED_LABEL =
  "Not yet confirmed";


export function getVehiclePriceLabel(
  vehicle: Vehicle
): string {
  if (
    !canDisplayVehiclePrice(
      vehicle
    )
  ) {
    return UNCONFIRMED_LABEL;
  }

  return `$${vehicle.price.toLocaleString(
    "en-US"
  )}`;
}


export function getVehicleTopSpeedLabel(
  vehicle: Vehicle
): string {
  if (
    !canDisplayVehicleTopSpeed(
      vehicle
    )
  ) {
    return UNCONFIRMED_LABEL;
  }

  return `${vehicle.topSpeed} mph`;
}


export function getVehicleAccelerationLabel(
  vehicle: Vehicle
): string {
  if (
    !canDisplayVehicleAcceleration(
      vehicle
    )
  ) {
    return UNCONFIRMED_LABEL;
  }

  return `${vehicle.acceleration}`;
}


export function getVehicleHandlingLabel(
  vehicle: Vehicle
): string {
  if (
    !canDisplayVehicleHandling(
      vehicle
    )
  ) {
    return UNCONFIRMED_LABEL;
  }

  return `${vehicle.handling}`;
}


export function getVehicleBrakingLabel(
  vehicle: Vehicle
): string {
  if (
    !canDisplayVehicleBraking(
      vehicle
    )
  ) {
    return UNCONFIRMED_LABEL;
  }

  return `${vehicle.braking}`;
}


export function getVehicleDrivetrainLabel(
  vehicle: Vehicle
): string {
  if (
    !canDisplayVehicleDrivetrain(
      vehicle
    )
  ) {
    return UNCONFIRMED_LABEL;
  }

  return vehicle.drivetrain;
}


export function getVehicleSeatsLabel(
  vehicle: Vehicle
): string {
  if (
    !canDisplayVehicleSeats(
      vehicle
    )
  ) {
    return UNCONFIRMED_LABEL;
  }

  return `${vehicle.seats} ${
    vehicle.seats === 1
      ? "seat"
      : "seats"
  }`;
}


export function getVehicleLocationLabel(
  vehicle: Vehicle
): string {
  if (
    !canDisplayVehicleLocation(
      vehicle
    )
  ) {
    return UNCONFIRMED_LABEL;
  }

  return vehicle.location;
}


export function getVehicleHorsepowerLabel(
  vehicle: Vehicle
): string {
  if (
    !canDisplayVehicleHorsepower(
      vehicle
    ) ||
    !vehicle.performance?.horsepower
  ) {
    return UNCONFIRMED_LABEL;
  }

  return `${vehicle.performance.horsepower} hp`;
}


export function getVehicleSourceGameLabel(
  vehicle: Vehicle
): string {
  return vehicle.sourceGame ===
    "Unknown"
    ? "Source game unknown"
    : vehicle.sourceGame ??
        "Source game unknown";
}


export function getVehicleVerificationStatus(
  vehicle: Vehicle
): ContentVerificationStatus {
  return (
    vehicle.verification?.status ??
    "Unknown"
  );
}


export function getVehicleVerificationLabel(
  vehicle: Vehicle
): string {
  const status =
    getVehicleVerificationStatus(
      vehicle
    );

  const labels:
    Record<
      ContentVerificationStatus,
      string
    > = {
      Official:
        "Officially confirmed",

      Observed:
        "Observed in official media",

      Legacy:
        "Legacy GTA content",

      Community:
        "Community documented",

      Unknown:
        "Verification unknown",
    };

  return labels[
    status
  ];
}


export function getVehicleDataConfidence(
  vehicle: Vehicle
): VehicleDataConfidence {
  return (
    vehicle.dataQuality?.confidence ??
    "Unknown"
  );
}


export function getVehicleDataConfidenceLabel(
  vehicle: Vehicle
): string {
  const confidence =
    getVehicleDataConfidence(
      vehicle
    );

  const labels:
    Record<
      VehicleDataConfidence,
      string
    > = {
      Confirmed:
        "Confirmed data",

      Estimated:
        "Estimated data",

      Legacy:
        "Legacy data",

      Unknown:
        "Data not confirmed",
    };

  return labels[
    confidence
  ];
}