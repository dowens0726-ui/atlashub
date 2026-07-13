import {
  businesses,
  missions,
  vehicles,
  weapons,
} from "@/app/data";

import type {
  BaseEntity,
} from "@/app/types";

import type {
  DatasetStatistic,
  EngineeringEntityType,
} from "./types";


type DatasetDefinition = {
  entity:
    EngineeringEntityType;

  records:
    readonly BaseEntity[];
};


const DATASETS:
  DatasetDefinition[] = [
    {
      entity:
        "vehicle",

      records:
        vehicles,
    },

    {
      entity:
        "mission",

      records:
        missions,
    },

    {
      entity:
        "business",

      records:
        businesses,
    },

    {
      entity:
        "weapon",

      records:
        weapons,
    },

    {
      entity:
        "property",

      records:
        [],
    },

    {
      entity:
        "character",

      records:
        [],
    },
  ];


function countFeatured(
  records:
    readonly BaseEntity[]
): number {
  return records.filter(
    (record) =>
      record.featured ===
      true
  ).length;
}


function countVerified(
  records:
    readonly BaseEntity[]
): number {
  return records.filter(
    (record) =>
      record.verified ===
      true
  ).length;
}


function buildDatasetStatistic(
  dataset:
    DatasetDefinition
): DatasetStatistic {
  return {
    entity:
      dataset.entity,

    total:
      dataset.records.length,

    featured:
      countFeatured(
        dataset.records
      ),

    verified:
      countVerified(
        dataset.records
      ),
  };
}


export function getDatasetStatistics():
  DatasetStatistic[] {
  return DATASETS.map(
    buildDatasetStatistic
  );
}


export function getDatasetStatistic(
  entity:
    EngineeringEntityType
): DatasetStatistic {
  const statistic =
    getDatasetStatistics().find(
      (dataset) =>
        dataset.entity ===
        entity
    );

  return (
    statistic ?? {
      entity,
      total:
        0,
      featured:
        0,
      verified:
        0,
    }
  );
}


export function getTotalContent(
  statistics:
    DatasetStatistic[] =
      getDatasetStatistics()
): number {
  return statistics.reduce(
    (
      total,
      dataset
    ) =>
      total +
      dataset.total,
    0
  );
}


export function getTotalFeatured(
  statistics:
    DatasetStatistic[] =
      getDatasetStatistics()
): number {
  return statistics.reduce(
    (
      total,
      dataset
    ) =>
      total +
      dataset.featured,
    0
  );
}


export function getTotalVerified(
  statistics:
    DatasetStatistic[] =
      getDatasetStatistics()
): number {
  return statistics.reduce(
    (
      total,
      dataset
    ) =>
      total +
      dataset.verified,
    0
  );
}