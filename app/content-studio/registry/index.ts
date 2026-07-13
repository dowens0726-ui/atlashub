export {
  classifyGeneratedFiles,
} from "./classification";

export {
  findIncomingPackageDuplicates,
  findRegistryDuplicates,
  mergeRegistryDuplicates,
} from "./duplicates";

export {
  buildRegistryManifest,
} from "./manifest";

export {
  getRegistryManufacturer,
  getRegistryVehicle,
  hasRegistryManufacturer,
  hasRegistryVehicle,
  scanVehicleRegistry,
} from "./scanner";

export type {
  RegistryDuplicate,
  RegistryDuplicateType,
  RegistryFileClassification,
  RegistryFileStatus,
  RegistryManifest,
  RegistryManufacturerRecord,
  RegistrySnapshot,
  RegistryVehicleRecord,
} from "./types";