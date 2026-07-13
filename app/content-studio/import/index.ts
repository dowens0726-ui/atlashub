export {
  buildManufacturerFiles,
  buildVehicleIndexCode,
  getValidImportedVehicles,
} from "./generator";

export {
  buildVehicleCandidate,
  csvRowsToRecords,
  detectImportFormat,
  jsonToRecords,
  parseCsv,
  parseImportRecords,
  parseVehicleImport,
} from "./parser";

export {
  buildImportPackageReport,
} from "./package";

export {
  validateVehicleCandidate,
} from "./validator";

export {
  VEHICLE_CSV_TEMPLATE,
  VEHICLE_JSON_TEMPLATE,
} from "./templates";

export {
  VALID_DRIVETRAINS,
  getValue,
  isRecord,
  normalizeHeader,
  normalizeRecord,
  parseBoolean,
  parseConfidence,
  parseContentSource,
  parseContentStatus,
  parseDrivetrain,
  parseInteger,
  parseNumber,
  parseOptionalString,
  parseString,
  parseStringArray,
  parseTags,
  slugify,
  toIdentifier,
} from "./helpers";

export type {
  BuildVehicleCandidateOptions,
  GeneratedVehicleFile,
  ImportFormat,
  ImportPackageReport,
  ImportRecord,
  ParsedImport,
  VehicleContentBuild,
  VehicleImportCandidate,
  VehicleImportContext,
  VehicleImportParseOptions,
  VehicleImportRow,
} from "./types";