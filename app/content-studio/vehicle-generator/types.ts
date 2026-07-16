import type {
  VehicleImportCandidate,
  VehicleImportRow,
} from "@/app/content-studio/import";

export type VehicleGeneratorIssueSeverity =
  | "error"
  | "warning";

export type VehicleGeneratorIssue = {
  severity: VehicleGeneratorIssueSeverity;
  code: string;
  message: string;
  vehicleSlug?: string;
};

export type VehicleGeneratorValidation = {
  valid: boolean;
  score: number;
  errors: VehicleGeneratorIssue[];
  warnings: VehicleGeneratorIssue[];
};

export type VehicleGeneratorInput = {
  rows: VehicleImportRow[];
};

export type VehicleGeneratorVehicle = {
  vehicle: VehicleImportCandidate;
  code: string;
};

export type GeneratedManufacturerModule = {
  manufacturer: string;
  filename: string;
  exportName: string;
  vehicleCount: number;
  vehicles: VehicleGeneratorVehicle[];
  code: string;
};

export type VehicleRegistryEntry = {
  manufacturer: string;
  filename: string;
  exportName: string;
};

export type GeneratedVehicleRegistry = {
  entries: VehicleRegistryEntry[];
  code: string;
};

export type VehicleGeneratorResult = {
  manufacturers: GeneratedManufacturerModule[];
  registry: GeneratedVehicleRegistry;
  validation: VehicleGeneratorValidation;
  totalVehicles: number;
  summary: string;
};