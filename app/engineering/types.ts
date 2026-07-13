export type EngineeringEntityType =
  | "vehicle"
  | "mission"
  | "business"
  | "weapon"
  | "property"
  | "character";

export type DatasetStatistic = {
  entity: EngineeringEntityType;
  total: number;
  featured: number;
  verified: number;
};

export type ManufacturerStatistic = {
  name: string;
  vehicleCount: number;
  featuredCount: number;
  verifiedCount: number;
  averageScore: number;
};

export type HealthIssueSeverity =
  | "error"
  | "warning"
  | "info";

export type HealthIssue = {
  severity: HealthIssueSeverity;
  entityType: EngineeringEntityType;
  slug: string;
  message: string;
};

export type DatasetHealth = {
  score: number;
  errors: number;
  warnings: number;
  information: number;
  issues: HealthIssue[];
};

export type RelationshipStatistic = {
  totalRelationships: number;
  orphanedEntities: number;
  brokenRelationships: number;
};

export type EngineeringStatistics = {
  datasets: DatasetStatistic[];

  totalContent: number;
  totalFeatured: number;
  totalVerified: number;

  manufacturers: ManufacturerStatistic[];

  largestManufacturer?: ManufacturerStatistic;
  smallestManufacturer?: ManufacturerStatistic;

  relationships: RelationshipStatistic;

  health: DatasetHealth;
};

export type EngineeringDashboardModel = {
  generatedAt: string;
  statistics: EngineeringStatistics;
};