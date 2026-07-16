import type {
  VehicleImportCandidate,
} from "@/app/content-studio/import";

function formatStringArray(
  values: string[]
): string {
  return JSON.stringify(values);
}

function formatBoolean(
  value: boolean
): string {
  return value
    ? "true"
    : "false";
}

function formatOptionalString(
  value?: string
): string | null {
  if (!value) {
    return null;
  }

  return JSON.stringify(value);
}

function buildVerificationCode(
  vehicle: VehicleImportCandidate
): string {
  const lines = [
    `      status: ${JSON.stringify(vehicle.verificationStatus)},`,
  ];

  const confirmedBy =
    formatOptionalString(
      vehicle.confirmedBy
    );

  if (confirmedBy) {
    lines.push(
      `      confirmedBy: ${confirmedBy},`
    );
  }

  const sourceUrl =
    formatOptionalString(
      vehicle.sourceUrl
    );

  if (sourceUrl) {
    lines.push(
      `      sourceUrl: ${sourceUrl},`
    );
  }

  const lastVerifiedAt =
    formatOptionalString(
      vehicle.lastVerifiedAt
    );

  if (lastVerifiedAt) {
    lines.push(
      `      lastVerifiedAt: ${lastVerifiedAt},`
    );
  }

  if (
    vehicle.verificationNotes.length >
    0
  ) {
    lines.push(
      `      notes: ${formatStringArray(
        vehicle.verificationNotes
      )},`
    );
  }

  return `    verification: {
${lines.join("\n")}
    },`;
}

function buildAvailabilityCode(
  vehicle: VehicleImportCandidate
): string {
  const {
    availability,
  } = vehicle;

  return `      availability: {
        price: ${formatBoolean(
          availability.price
        )},
        topSpeed: ${formatBoolean(
          availability.topSpeed
        )},
        acceleration: ${formatBoolean(
          availability.acceleration
        )},
        handling: ${formatBoolean(
          availability.handling
        )},
        braking: ${formatBoolean(
          availability.braking
        )},
        drivetrain: ${formatBoolean(
          availability.drivetrain
        )},
        seats: ${formatBoolean(
          availability.seats
        )},
        location: ${formatBoolean(
          availability.location
        )},
        horsepower: ${formatBoolean(
          availability.horsepower
        )},
      },`;
}

function buildAcquisitionMethod(
  vehicle: VehicleImportCandidate
): string {
  if (
    vehicle.price > 0 &&
    vehicle.location
  ) {
    return "Purchase";
  }

  return "Unknown";
}

function buildNotes(
  vehicle: VehicleImportCandidate
): string[] {
  const notes = [
    `Content status: ${vehicle.status}`,
    `Content source: ${vehicle.source}`,
    `Content confidence: ${vehicle.confidence}`,
    `Canonical path: /vehicles/${vehicle.slug}`,
  ];

  if (vehicle.sourceUrl) {
    notes.push(
      `Source URL: ${vehicle.sourceUrl}`
    );
  }

  return notes;
}

export function formatVehicleCandidate(
  vehicle: VehicleImportCandidate
): string {
  return `  createVehicle({
    slug: ${JSON.stringify(
      vehicle.slug
    )},
    name: ${JSON.stringify(
      vehicle.name
    )},
    manufacturer: ${JSON.stringify(
      vehicle.manufacturer
    )},
    class: ${JSON.stringify(
      vehicle.class
    )},
    image: ${JSON.stringify(
      vehicle.image
    )},
    price: ${vehicle.price},
    topSpeed: ${vehicle.topSpeed},
    acceleration: ${vehicle.acceleration},
    handling: ${vehicle.handling},
    braking: ${vehicle.braking},
    drivetrain: ${JSON.stringify(
      vehicle.drivetrain
    )},
    seats: ${vehicle.seats},
    location: ${JSON.stringify(
      vehicle.location
    )},
    description: ${JSON.stringify(
      vehicle.description
    )},
    featured: ${formatBoolean(
      vehicle.featured
    )},
    verified: ${formatBoolean(
      vehicle.verified
    )},
    sourceGame: ${JSON.stringify(
      vehicle.sourceGame
    )},
${buildVerificationCode(
  vehicle
)}
    dataQuality: {
      confidence: ${JSON.stringify(
        vehicle.dataConfidence
      )},
${buildAvailabilityCode(
  vehicle
)}
    },
    acquisition: {
      method: ${JSON.stringify(
        buildAcquisitionMethod(
          vehicle
        )
      )},
      source: ${JSON.stringify(
        vehicle.location
      )},
      price: ${vehicle.price},
    },
    performance: {
      topSpeed: ${vehicle.topSpeed},
      acceleration: ${vehicle.acceleration},
      handling: ${vehicle.handling},
      braking: ${vehicle.braking},
    },
    tags: ${formatStringArray(
      vehicle.tags
    )},
    relatedVehicles: ${formatStringArray(
      vehicle.relatedSlugs
    )},
    recommendedMissions: ${formatStringArray(
      vehicle.recommendedMissionSlugs
    )},
    notes: ${formatStringArray(
      buildNotes(
        vehicle
      )
    )},
  }),`;
}