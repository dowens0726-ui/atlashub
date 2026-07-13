export type RegistryFileStatus =
  | "existing"
  | "new"
  | "merge"
  | "duplicate"
  | "invalid";

export type RegistryVehicleRecord = {
  slug: string;
  name: string;
  manufacturer: string;
  filename: string;
  exportName: string;
};

export type RegistryManufacturerRecord = {
  name: string;
  slug: string;
  filename: string;
  exportName: string;
  vehicleSlugs: string[];
  vehicleCount: number;
};

export type RegistrySnapshot = {
  generatedAt: string;
  manufacturers: RegistryManufacturerRecord[];
  vehicles: RegistryVehicleRecord[];
  manufacturerCount: number;
  vehicleCount: number;
  files: string[];
};

export type RegistryDuplicateType =
  | "vehicle-slug"
  | "manufacturer-file"
  | "manufacturer-export"
  | "registry-entry";

export type RegistryDuplicate = {
  type: RegistryDuplicateType;
  key: string;
  count: number;
  files: string[];
  message: string;
};

export type RegistryFileClassification = {
  manufacturer: string;
  filename: string;
  exportName: string;
  status: RegistryFileStatus;
  existingVehicleCount: number;
  incomingVehicleCount: number;
  duplicateVehicleSlugs: string[];
  newVehicleSlugs: string[];
  message: string;
};

export type RegistryManifest = {
  generatedAt: string;
  registry: {
    manufacturerCount: number;
    vehicleCount: number;
    files: string[];
  };
  package: {
    manufacturerCount: number;
    vehicleCount: number;
    newFiles: number;
    mergeFiles: number;
    duplicateFiles: number;
    invalidFiles: number;
  };
  classifications: RegistryFileClassification[];
  duplicates: RegistryDuplicate[];
  warnings: string[];
  score: number;
};