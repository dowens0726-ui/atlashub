export {
  formatVehicleCandidate,
} from "./formatter";

export {
  generateManufacturerModules,
  generateVehiclePackage,
} from "./generator";

export {
  generateVehicleRegistry,
} from "./registry";

export {
  buildGeneratorSummary,
} from "./templates";

export {
  validateVehicleGeneration,
} from "./validator";

export type {
  GeneratedManufacturerModule,
  GeneratedVehicleRegistry,
  VehicleGeneratorInput,
  VehicleGeneratorIssue,
  VehicleGeneratorIssueSeverity,
  VehicleGeneratorResult,
  VehicleGeneratorValidation,
  VehicleGeneratorVehicle,
  VehicleRegistryEntry,
} from "./types";