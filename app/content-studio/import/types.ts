import type {
  AtlasContentBuildResult,
  AtlasContentInput,
  AtlasContentSource,
  AtlasContentStatus,
} from "@/app/content-studio";

import type {
  ContentVerificationStatus,
  VehicleDataAvailability,
  VehicleDataConfidence,
  VehicleDrivetrain,
  VehicleSourceGame,
} from "@/app/types";


export type ImportFormat =
  | "csv"
  | "json"
  | "unknown";


export type ImportRecord =
  Record<string, unknown>;


export type VehicleImportCandidate =
  AtlasContentInput & {
    slug:
      string;

    name:
      string;

    manufacturer:
      string;

    class:
      string;

    image:
      string;

    price:
      number;

    topSpeed:
      number;

    acceleration:
      number;

    handling:
      number;

    braking:
      number;

    drivetrain:
      VehicleDrivetrain;

    seats:
      number;

    location:
      string;

    description:
      string;

    featured:
      boolean;

    tags:
      string[];

    source:
      AtlasContentSource;

    sourceUrl?:
      string;

    status:
      AtlasContentStatus;

    verified:
      boolean;

    confidence:
      number;

    sourceGame:
      VehicleSourceGame;

    verificationStatus:
      ContentVerificationStatus;

    confirmedBy?:
      string;

    lastVerifiedAt?:
      string;

    verificationNotes:
      string[];

    dataConfidence:
      VehicleDataConfidence;

    availability:
      VehicleDataAvailability;

    relatedSlugs:
      string[];

    recommendedMissionSlugs:
      string[];
  };


export type VehicleContentBuild =
  AtlasContentBuildResult<VehicleImportCandidate>;


export type VehicleImportRow = {
  rowNumber:
    number;

  vehicle:
    VehicleImportCandidate | null;

  content:
    VehicleContentBuild | null;

  errors:
    string[];

  warnings:
    string[];

  validationScore:
    number;
};


export type ParsedImport = {
  format:
    ImportFormat;

  rows:
    VehicleImportRow[];

  fatalError:
    string | null;
};


export type GeneratedVehicleFile = {
  filename:
    string;

  exportName:
    string;

  manufacturer:
    string;

  code:
    string;

  vehicleCount:
    number;
};


export type ImportPackageReport = {
  importedAt:
    string;

  totalRows:
    number;

  validRows:
    number;

  invalidRows:
    number;

  manufacturerCount:
    number;

  vehicleCount:
    number;

  averageValidationScore:
    number;

  warnings:
    string[];

  generatedFiles:
    string[];
};


export type VehicleImportContext = {
  existingSlugs:
    Set<string>;
};


export type VehicleImportParseOptions = {
  existingSlugs:
    Set<string>;
};


export type BuildVehicleCandidateOptions = {
  source?:
    AtlasContentSource;

  status?:
    AtlasContentStatus;

  verified?:
    boolean;

  confidence?:
    number;

  sourceGame?:
    VehicleSourceGame;

  verificationStatus?:
    ContentVerificationStatus;

  confirmedBy?:
    string;

  lastVerifiedAt?:
    string;

  verificationNotes?:
    string[];

  dataConfidence?:
    VehicleDataConfidence;

  availability?:
    Partial<VehicleDataAvailability>;
};