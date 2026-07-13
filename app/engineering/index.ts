export {
  buildEngineeringDashboard,
} from "./analytics.engine";

export {
  getDatasetHealth,
  getHealthIssues,
} from "./health.engine";

export {
  getAverageVehiclesPerManufacturer,
  getLargestManufacturer,
  getManufacturerStatistics,
  getSmallestManufacturer,
  getVehiclesMissingManufacturer,
} from "./manufacturers.engine";

export {
  getBrokenRelationships,
  getOrphanedMissions,
  getOrphanedVehicles,
  getRelationshipReferences,
  getRelationshipStatistics,
} from "./relationships.engine";

export {
  getDatasetStatistic,
  getDatasetStatistics,
  getTotalContent,
  getTotalFeatured,
  getTotalVerified,
} from "./statistics.engine";

export type {
  DatasetHealth,
  DatasetStatistic,
  EngineeringDashboardModel,
  EngineeringEntityType,
  EngineeringStatistics,
  HealthIssue,
  HealthIssueSeverity,
  ManufacturerStatistic,
  RelationshipStatistic,
} from "./types";