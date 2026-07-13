import type {
  GeneratedVehicleFile,
} from "@/app/content-studio/import";

import type {
  RegistryDuplicate,
  RegistryDuplicateType,
  RegistrySnapshot,
} from "./types";


type DuplicateCandidate = {
  type:
    RegistryDuplicateType;

  key:
    string;

  file:
    string;
};


function buildDuplicate(
  type:
    RegistryDuplicateType,
  key:
    string,
  files:
    string[]
): RegistryDuplicate {
  const uniqueFiles =
    Array.from(
      new Set(
        files
      )
    ).sort(
      (
        firstFile,
        secondFile
      ) =>
        firstFile.localeCompare(
          secondFile
        )
    );

  const messages:
    Record<
      RegistryDuplicateType,
      string
    > = {
      "vehicle-slug":
        `Vehicle slug "${key}" appears more than once.`,

      "manufacturer-file":
        `Manufacturer filename "${key}" is generated more than once.`,

      "manufacturer-export":
        `Manufacturer export "${key}" is generated more than once.`,

      "registry-entry":
        `Registry entry "${key}" appears more than once.`,
    };


  return {
    type,

    key,

    count:
      files.length,

    files:
      uniqueFiles,

    message:
      messages[
        type
      ],
  };
}


function groupDuplicateCandidates(
  candidates:
    DuplicateCandidate[]
): RegistryDuplicate[] {
  const grouped =
    new Map<
      string,
      DuplicateCandidate[]
    >();


  candidates.forEach(
    (
      candidate
    ) => {
      const groupKey =
        `${candidate.type}:${candidate.key}`;

      const currentGroup =
        grouped.get(
          groupKey
        ) ??
        [];

      grouped.set(
        groupKey,
        [
          ...currentGroup,
          candidate,
        ]
      );
    }
  );


  return Array.from(
    grouped.values()
  )
    .filter(
      (
        group
      ) =>
        group.length >
        1
    )
    .map(
      (
        group
      ) =>
        buildDuplicate(
          group[0].type,
          group[0].key,
          group.map(
            (
              candidate
            ) =>
              candidate.file
          )
        )
    )
    .sort(
      (
        firstDuplicate,
        secondDuplicate
      ) => {
        const typeDifference =
          firstDuplicate.type.localeCompare(
            secondDuplicate.type
          );

        if (
          typeDifference !==
          0
        ) {
          return typeDifference;
        }

        return firstDuplicate.key.localeCompare(
          secondDuplicate.key
        );
      }
    );
}


export function findRegistryDuplicates(
  snapshot:
    RegistrySnapshot
): RegistryDuplicate[] {
  const candidates:
    DuplicateCandidate[] = [];


  snapshot.vehicles.forEach(
    (
      vehicle
    ) => {
      candidates.push({
        type:
          "vehicle-slug",

        key:
          vehicle.slug,

        file:
          vehicle.filename,
      });
    }
  );


  snapshot.manufacturers.forEach(
    (
      manufacturer
    ) => {
      candidates.push({
        type:
          "manufacturer-file",

        key:
          manufacturer.filename,

        file:
          manufacturer.filename,
      });

      candidates.push({
        type:
          "manufacturer-export",

        key:
          manufacturer.exportName,

        file:
          manufacturer.filename,
      });

      candidates.push({
        type:
          "registry-entry",

        key:
          manufacturer.slug,

        file:
          manufacturer.filename,
      });
    }
  );


  return groupDuplicateCandidates(
    candidates
  );
}


export function findIncomingPackageDuplicates(
  generatedFiles:
    GeneratedVehicleFile[]
): RegistryDuplicate[] {
  const candidates:
    DuplicateCandidate[] = [];


  generatedFiles.forEach(
    (
      file
    ) => {
      candidates.push({
        type:
          "manufacturer-file",

        key:
          file.filename,

        file:
          file.filename,
      });

      candidates.push({
        type:
          "manufacturer-export",

        key:
          file.exportName,

        file:
          file.filename,
      });
    }
  );


  return groupDuplicateCandidates(
    candidates
  );
}


export function mergeRegistryDuplicates(
  ...duplicateGroups:
    RegistryDuplicate[][]
): RegistryDuplicate[] {
  const merged =
    new Map<
      string,
      RegistryDuplicate
    >();


  duplicateGroups
    .flat()
    .forEach(
      (
        duplicate
      ) => {
        const key =
          `${duplicate.type}:${duplicate.key}`;

        const existing =
          merged.get(
            key
          );

        if (!existing) {
          merged.set(
            key,
            duplicate
          );

          return;
        }


        const files =
          Array.from(
            new Set([
              ...existing.files,
              ...duplicate.files,
            ])
          ).sort(
            (
              firstFile,
              secondFile
            ) =>
              firstFile.localeCompare(
                secondFile
              )
          );


        merged.set(
          key,
          {
            ...existing,

            count:
              Math.max(
                existing.count,
                duplicate.count
              ),

            files,
          }
        );
      }
    );


  return Array.from(
    merged.values()
  ).sort(
    (
      firstDuplicate,
      secondDuplicate
    ) => {
      const typeDifference =
        firstDuplicate.type.localeCompare(
          secondDuplicate.type
        );

      if (
        typeDifference !==
        0
      ) {
        return typeDifference;
      }

      return firstDuplicate.key.localeCompare(
        secondDuplicate.key
      );
    }
  );
}