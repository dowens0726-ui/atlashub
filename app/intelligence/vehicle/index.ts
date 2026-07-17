export {
  getVehicleAdvisorResult,
} from "./advisor.engine";

export type {
  VehicleAdvisorInput,
  VehicleAdvisorResult,
} from "./advisor.engine";

export {
  compareVehicles,
} from "./comparison.engine";

export {
  getGarageRecommendation,
} from "./garage.engine";

export {
  buildVehicleIntelligenceProfile,
} from "./profile.engine";

export {
  getTopVehicleRecommendation,
  getVehicleRecommendations,
  rankVehiclesForCategory,
} from "./recommendation.engine";

export {
  scoreVehicle,
} from "./score.engine";

export type {
  GarageGap,
  GarageRecommendation,
  VehicleComparisonResult,
  VehicleIntelligenceProfile,
  VehicleIntelligenceScore,
  VehicleRecommendation,
  VehicleRecommendationCategory,
  VehicleScoreBreakdown,
  VehicleUseCaseRatings,
} from "./types";