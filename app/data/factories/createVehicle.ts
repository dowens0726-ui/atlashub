import type { Vehicle } from "@/app/types";

type CreateVehicleInput = Omit<Vehicle, "id" | "verified"> & {
  id?: string;
  verified?: boolean;
};

function createVehicleId(slug: string) {
  return `veh:${slug}`;
}

export function createVehicle(input: CreateVehicleInput): Vehicle {
  return {
    ...input,
    id: input.id ?? createVehicleId(input.slug),
    verified: input.verified ?? false,
  };
}