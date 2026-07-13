import {
  getDatasetHealth,
} from "./health.engine";

import {
  getLargestManufacturer,
  getManufacturerStatistics,
  getSmallestManufacturer,
} from "./manufacturers.engine";

import {
  getRelationshipStatistics,
} from "./relationships.engine";

import {
  getDatasetStatistics,
  getTotalContent,
  getTotalFeatured,
  getTotalVerified,
} from "./statistics.engine";

import type {
  EngineeringDashboardModel,
} from "./types";


export function buildEngineeringDashboard():
  EngineeringDashboardModel {
  const datasets =
    getDatasetStatistics();

  const manufacturers =
    getManufacturerStatistics();

  const relationships =
    getRelationshipStatistics();

  const health =
    getDatasetHealth();


  return {
    generatedAt:
      new Date().toISOString(),

    statistics: {
      datasets,

      totalContent:
        getTotalContent(
          datasets
        ),

      totalFeatured:
        getTotalFeatured(
          datasets
        ),

      totalVerified:
        getTotalVerified(
          datasets
        ),

      manufacturers,

      largestManufacturer:
        getLargestManufacturer(
          manufacturers
        ),

      smallestManufacturer:
        getSmallestManufacturer(
          manufacturers
        ),

      relationships,

      health,
    },
  };
}