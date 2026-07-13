import {
  businesses,
  missions,
  vehicles,
  weapons,
} from "@/app/data";

import type {
  BaseEntity,
} from "@/app/types";

import {
  getBrokenRelationships,
  getOrphanedMissions,
  getOrphanedVehicles,
} from "./relationships.engine";

import type {
  DatasetHealth,
  EngineeringEntityType,
  HealthIssue,
  HealthIssueSeverity,
} from "./types";


type EngineeringRecord = BaseEntity & {
  name?: string;
  title?: string;
  manufacturer?: string;
  relatedVehicles?: string[];
  recommendedMissions?: string[];
  relatedMissions?: string[];
  relatedBusinesses?: string[];
};


type DatasetDefinition = {
  entityType:
    EngineeringEntityType;

  records:
    readonly EngineeringRecord[];
};


const DATASETS:
  DatasetDefinition[] = [
    {
      entityType:
        "vehicle",

      records:
        vehicles,
    },

    {
      entityType:
        "mission",

      records:
        missions,
    },

    {
      entityType:
        "business",

      records:
        businesses,
    },

    {
      entityType:
        "weapon",

      records:
        weapons,
    },

    {
      entityType:
        "property",

      records:
        [],
    },

    {
      entityType:
        "character",

      records:
        [],
    },
  ];


function createIssue(
  severity:
    HealthIssueSeverity,
  entityType:
    EngineeringEntityType,
  slug:
    string,
  message:
    string
): HealthIssue {
  return {
    severity,
    entityType,
    slug,
    message,
  };
}


function getRecordLabel(
  record:
    EngineeringRecord
): string {
  return (
    record.name ??
    record.title ??
    record.slug
  );
}


function findDuplicateSlugs(
  dataset:
    DatasetDefinition
): HealthIssue[] {
  const slugCounts =
    new Map<
      string,
      number
    >();


  dataset.records.forEach(
    (record) => {
      const slug =
        record.slug
          .trim()
          .toLowerCase();

      slugCounts.set(
        slug,
        (
          slugCounts.get(
            slug
          ) ??
          0
        ) +
          1
      );
    }
  );


  return Array.from(
    slugCounts.entries()
  )
    .filter(
      (
        [
          ,
          count,
        ]
      ) =>
        count >
        1
    )
    .map(
      (
        [
          slug,
          count,
        ]
      ) =>
        createIssue(
          "error",
          dataset.entityType,
          slug,
          `Duplicate slug detected ${count} times.`
        )
    );
}


function validateRecordFields(
  dataset:
    DatasetDefinition
): HealthIssue[] {
  return dataset.records.flatMap(
    (record) => {
      const issues:
        HealthIssue[] = [];

      const label =
        getRecordLabel(
          record
        );


      if (
        !record.slug.trim()
      ) {
        issues.push(
          createIssue(
            "error",
            dataset.entityType,
            record.id,
            `${label} is missing a slug.`
          )
        );
      }


      if (
        !record.description.trim()
      ) {
        issues.push(
          createIssue(
            "error",
            dataset.entityType,
            record.slug,
            `${label} is missing a description.`
          )
        );
      } else if (
        record.description.trim().length <
        40
      ) {
        issues.push(
          createIssue(
            "warning",
            dataset.entityType,
            record.slug,
            `${label} has a short description.`
          )
        );
      }


      if (
        !record.image?.trim()
      ) {
        issues.push(
          createIssue(
            "warning",
            dataset.entityType,
            record.slug,
            `${label} is missing a primary image.`
          )
        );
      }


      if (
        !record.tags ||
        record.tags.length ===
          0
      ) {
        issues.push(
          createIssue(
            "warning",
            dataset.entityType,
            record.slug,
            `${label} has no searchable tags.`
          )
        );
      }


      if (
        record.verified !==
        true
      ) {
        issues.push(
          createIssue(
            "info",
            dataset.entityType,
            record.slug,
            `${label} has not been verified.`
          )
        );
      }


      if (
        dataset.entityType ===
          "vehicle" &&
        !record.manufacturer?.trim()
      ) {
        issues.push(
          createIssue(
            "error",
            dataset.entityType,
            record.slug,
            `${label} is missing a manufacturer.`
          )
        );
      }


      return issues;
    }
  );
}


function buildBrokenRelationshipIssues():
  HealthIssue[] {
  return getBrokenRelationships().map(
    (relationship) =>
      createIssue(
        "error",
        relationship.sourceType,
        relationship.sourceSlug,
        `Broken ${relationship.targetType} relationship: "${relationship.targetSlug}".`
      )
  );
}


function buildOrphanedEntityIssues():
  HealthIssue[] {
  const vehicleIssues =
    getOrphanedVehicles().map(
      (vehicle) =>
        createIssue(
          "warning",
          "vehicle",
          vehicle.slug,
          `${vehicle.name} is not connected to another tracked entity.`
        )
    );

  const missionIssues =
    getOrphanedMissions().map(
      (mission) =>
        createIssue(
          "warning",
          "mission",
          mission.slug,
          `${mission.title} is not connected to another tracked entity.`
        )
    );


  return [
    ...vehicleIssues,
    ...missionIssues,
  ];
}


function calculateHealthScore(
  issues:
    HealthIssue[]
): number {
  const deductions =
    issues.reduce(
      (
        total,
        issue
      ) => {
        if (
          issue.severity ===
          "error"
        ) {
          return total +
            8;
        }

        if (
          issue.severity ===
          "warning"
        ) {
          return total +
            3;
        }

        return total +
          0.25;
      },
      0
    );


  return Math.max(
    0,
    Math.round(
      100 -
      deductions
    )
  );
}


function sortIssues(
  issues:
    HealthIssue[]
): HealthIssue[] {
  const severityOrder:
    Record<
      HealthIssueSeverity,
      number
    > = {
      error:
        0,

      warning:
        1,

      info:
        2,
    };


  return [...issues].sort(
    (
      firstIssue,
      secondIssue
    ) => {
      const severityDifference =
        severityOrder[
          firstIssue.severity
        ] -
        severityOrder[
          secondIssue.severity
        ];

      if (
        severityDifference !==
        0
      ) {
        return severityDifference;
      }

      const typeDifference =
        firstIssue.entityType.localeCompare(
          secondIssue.entityType
        );

      if (
        typeDifference !==
        0
      ) {
        return typeDifference;
      }

      return firstIssue.slug.localeCompare(
        secondIssue.slug
      );
    }
  );
}


export function getHealthIssues():
  HealthIssue[] {
  const datasetIssues =
    DATASETS.flatMap(
      (dataset) => [
        ...findDuplicateSlugs(
          dataset
        ),

        ...validateRecordFields(
          dataset
        ),
      ]
    );


  return sortIssues([
    ...datasetIssues,
    ...buildBrokenRelationshipIssues(),
    ...buildOrphanedEntityIssues(),
  ]);
}


export function getDatasetHealth():
  DatasetHealth {
  const issues =
    getHealthIssues();

  const errors =
    issues.filter(
      (issue) =>
        issue.severity ===
        "error"
    ).length;

  const warnings =
    issues.filter(
      (issue) =>
        issue.severity ===
        "warning"
    ).length;

  const information =
    issues.filter(
      (issue) =>
        issue.severity ===
        "info"
    ).length;


  return {
    score:
      calculateHealthScore(
        issues
      ),

    errors,

    warnings,

    information,

    issues,
  };
}