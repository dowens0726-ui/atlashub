"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  VEHICLE_CSV_TEMPLATE,
  VEHICLE_JSON_TEMPLATE,
} from "@/app/content-studio/import";

import type {
  VehicleImportRow,
} from "@/app/content-studio/import";

import type {
  RegistryFileClassification,
} from "@/app/content-studio/registry";

import {
  buildImportPackage,
} from "@/app/content-studio/services";

import GeneratedFile from "./GeneratedFile";
import GeneratedPackage from "./GeneratedPackage";


export default function BulkImport() {
  const [
    input,
    setInput,
  ] = useState(
    ""
  );


  const packageResult =
    useMemo(
      () =>
        buildImportPackage(
          input
        ),
      [
        input,
      ]
    );


  const {
    parsedImport,
    validRows,
    invalidRows,
    generatedFiles,
    indexCode,
    manifest,
    packageReport,
  } =
    packageResult;


  const classificationByFilename =
    useMemo(
      () =>
        new Map(
          manifest.classifications.map(
            (
              classification
            ) => [
              classification.filename,
              classification,
            ]
          )
        ),
      [
        manifest.classifications,
      ]
    );


  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
              Content Studio v2.5
            </p>

            <h2 className="mt-3 text-2xl font-black text-white">
              Import Vehicle Content
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Paste vehicle CSV or JSON. Atlas validates the records,
              generates content metadata, inspects the existing manufacturer
              registry, classifies every output file, and builds a reviewable
              production package.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-emerald-400 hover:text-white"
              onClick={() =>
                setInput(
                  VEHICLE_CSV_TEMPLATE
                )
              }
            >
              Load CSV Example
            </button>

            <button
              type="button"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-emerald-400 hover:text-white"
              onClick={() =>
                setInput(
                  VEHICLE_JSON_TEMPLATE
                )
              }
            >
              Load JSON Example
            </button>

            <button
              type="button"
              className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-bold text-red-300 transition hover:border-red-400 hover:text-red-200"
              onClick={() =>
                setInput(
                  ""
                )
              }
            >
              Clear
            </button>
          </div>
        </div>


        <textarea
          className="mt-6 min-h-[340px] w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-emerald-400"
          placeholder="Paste CSV or JSON vehicle data here..."
          spellCheck={false}
          value={
            input
          }
          onChange={(
            event
          ) =>
            setInput(
              event.target.value
            )
          }
        />


        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-7">
          <Metric
            label="Format"
            value={
              parsedImport.format.toUpperCase()
            }
          />

          <Metric
            label="Total Rows"
            value={
              parsedImport.rows.length.toString()
            }
          />

          <Metric
            label="Valid Rows"
            value={
              validRows.length.toString()
            }
            tone="positive"
          />

          <Metric
            label="Invalid Rows"
            value={
              invalidRows.length.toString()
            }
            tone={
              invalidRows.length >
              0
                ? "negative"
                : "default"
            }
          />

          <Metric
            label="Generated Files"
            value={
              generatedFiles.length.toString()
            }
          />

          <Metric
            label="Quality Score"
            value={
              parsedImport.rows.length >
              0
                ? `${packageReport.averageValidationScore}/100`
                : "—"
            }
            tone={
              getScoreTone(
                packageReport.averageValidationScore,
                parsedImport.rows.length
              )
            }
          />

          <Metric
            label="Registry Score"
            value={
              parsedImport.rows.length >
              0
                ? `${manifest.score}/100`
                : "—"
            }
            tone={
              getScoreTone(
                manifest.score,
                parsedImport.rows.length
              )
            }
          />
        </div>


        {parsedImport.fatalError ? (
          <div className="mt-5 rounded-2xl border border-red-400/30 bg-red-400/10 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
              Import Error
            </p>

            <p className="mt-2 text-sm leading-6 text-red-100">
              {parsedImport.fatalError}
            </p>
          </div>
        ) : null}
      </section>


      {manifest.classifications.length >
      0 ? (
        <RegistryReview
          classifications={
            manifest.classifications
          }
          registryScore={
            manifest.score
          }
        />
      ) : null}


      {parsedImport.rows.length >
      0 ? (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            Validation Results
          </p>

          <h2 className="mt-3 text-2xl font-black text-white">
            Imported Vehicles
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Content Studio combines vehicle-specific validation with reusable
            Atlas content checks. Rows containing errors are excluded from
            generated manufacturer files.
          </p>

          <div className="mt-6 space-y-4">
            {parsedImport.rows.map(
              (
                row
              ) => (
                <ImportRowCard
                  key={`${row.rowNumber}-${row.vehicle?.slug ?? "invalid"}`}
                  row={
                    row
                  }
                />
              )
            )}
          </div>
        </section>
      ) : null}


      {generatedFiles.length >
      0 ? (
        <>
          <GeneratedPackage
            files={
              generatedFiles
            }
            indexCode={
              indexCode
            }
            report={
              packageReport
            }
            manifest={
              manifest
            }
          />

          <section className="space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-violet-400">
                Individual Files
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                Manufacturer Exports
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Review each generated module and its registry classification
                before merging it into the production vehicle database.
              </p>
            </div>

            {generatedFiles.map(
              (
                file
              ) => {
                const classification =
                  classificationByFilename.get(
                    file.filename
                  );

                return (
                  <GeneratedFile
                    key={
                      file.filename
                    }
                    filename={
                      file.filename
                    }
                    code={
                      file.code
                    }
                    description={buildGeneratedFileDescription(
                      file.manufacturer,
                      file.vehicleCount,
                      classification
                    )}
                  />
                );
              }
            )}

            <GeneratedFile
              filename="vehicles-index-snippet.ts"
              code={
                indexCode
              }
              description="Suggested imports and array entries for manufacturer modules. Review the registry manifest before merging this code into app/data/vehicles/index.ts."
            />
          </section>
        </>
      ) : null}
    </div>
  );
}


function RegistryReview({
  classifications,
  registryScore,
}: {
  classifications:
    RegistryFileClassification[];

  registryScore:
    number;
}) {
  const statusTotals =
    classifications.reduce(
      (
        totals,
        classification
      ) => {
        totals[
          classification.status
        ] +=
          1;

        return totals;
      },
      {
        existing:
          0,

        new:
          0,

        merge:
          0,

        duplicate:
          0,

        invalid:
          0,
      }
    );


  return (
    <section className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.04] p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-violet-400">
            Registry Intelligence
          </p>

          <h2 className="mt-3 text-2xl font-black text-white">
            Production Classification
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Atlas compared the generated package against the current
            manufacturer registry.
          </p>
        </div>

        <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm font-black text-violet-200">
          Readiness {registryScore}/100
        </span>
      </div>


      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="New Files"
          value={
            statusTotals.new.toString()
          }
          tone="positive"
        />

        <Metric
          label="Merge Files"
          value={
            statusTotals.merge.toString()
          }
          tone={
            statusTotals.merge >
            0
              ? "warning"
              : "default"
          }
        />

        <Metric
          label="Duplicate Files"
          value={
            statusTotals.duplicate.toString()
          }
          tone={
            statusTotals.duplicate >
            0
              ? "negative"
              : "default"
          }
        />

        <Metric
          label="Invalid Files"
          value={
            statusTotals.invalid.toString()
          }
          tone={
            statusTotals.invalid >
            0
              ? "negative"
              : "default"
          }
        />
      </div>


      <div className="mt-6 space-y-3">
        {classifications.map(
          (
            classification
          ) => (
            <article
              key={`${classification.filename}-${classification.status}`}
              className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-sm font-bold text-white">
                    {classification.filename}
                  </p>

                  <p className="mt-1 text-sm text-zinc-400">
                    {classification.message}
                  </p>
                </div>

                <ClassificationBadge
                  status={
                    classification.status
                  }
                />
              </div>

              <div className="mt-4 grid gap-3 text-sm text-zinc-400 sm:grid-cols-3">
                <p>
                  Existing:{" "}
                  <span className="font-bold text-white">
                    {classification.existingVehicleCount}
                  </span>
                </p>

                <p>
                  Incoming:{" "}
                  <span className="font-bold text-white">
                    {classification.incomingVehicleCount}
                  </span>
                </p>

                <p>
                  New:{" "}
                  <span className="font-bold text-white">
                    {classification.newVehicleSlugs.length}
                  </span>
                </p>
              </div>


              {classification.duplicateVehicleSlugs.length >
              0 ? (
                <p className="mt-3 text-sm text-amber-300">
                  Duplicate slugs:{" "}
                  {classification.duplicateVehicleSlugs.join(
                    ", "
                  )}
                </p>
              ) : null}
            </article>
          )
        )}
      </div>
    </section>
  );
}


function ClassificationBadge({
  status,
}: {
  status:
    RegistryFileClassification["status"];
}) {
  const className = {
    existing:
      "border-zinc-600 bg-zinc-800 text-zinc-300",

    new:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",

    merge:
      "border-amber-400/30 bg-amber-400/10 text-amber-300",

    duplicate:
      "border-red-400/30 bg-red-400/10 text-red-300",

    invalid:
      "border-red-400/30 bg-red-400/10 text-red-300",
  }[
    status
  ];


  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${className}`}
    >
      {status}
    </span>
  );
}


function ImportRowCard({
  row,
}: {
  row:
    VehicleImportRow;
}) {
  const isValid =
    row.errors.length ===
    0;

  const document =
    row.content?.document;

  const scoreTone =
    getScoreTextClass(
      row.validationScore
    );


  return (
    <article
      className={`rounded-2xl border p-5 ${
        isValid
          ? "border-emerald-400/20 bg-emerald-400/[0.04]"
          : "border-red-400/20 bg-red-400/[0.04]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Row {row.rowNumber}
          </p>

          <h3 className="mt-2 text-xl font-black text-white">
            {row.vehicle?.name ||
              "Unnamed Vehicle"}
          </h3>

          <p className="mt-1 font-mono text-sm text-zinc-400">
            {row.vehicle?.slug ||
              "No slug generated"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${
              isValid
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : "border-red-400/30 bg-red-400/10 text-red-300"
            }`}
          >
            {isValid
              ? "Valid"
              : "Invalid"}
          </span>

          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-black uppercase tracking-wider text-zinc-300">
            Quality{" "}
            <span
              className={
                scoreTone
              }
            >
              {row.validationScore}
            </span>
          </span>
        </div>
      </div>


      {row.vehicle ? (
        <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2 xl:grid-cols-4">
          <ContentValue
            label="Manufacturer"
            value={
              row.vehicle.manufacturer ||
              "Missing"
            }
          />

          <ContentValue
            label="Class"
            value={
              row.vehicle.class ||
              "Missing"
            }
          />

          <ContentValue
            label="Price"
            value={`$${row.vehicle.price.toLocaleString()}`}
          />

          <ContentValue
            label="Drivetrain"
            value={
              row.vehicle.drivetrain
            }
          />

          <ContentValue
            label="Source"
            value={
              row.vehicle.source
            }
          />

          <ContentValue
            label="Status"
            value={
              row.vehicle.status
            }
          />

          <ContentValue
            label="Confidence"
            value={`${row.vehicle.confidence}%`}
          />

          <ContentValue
            label="Verified"
            value={
              row.vehicle.verified
                ? "Yes"
                : "No"
            }
          />
        </div>
      ) : null}


      {document ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400">
              Generated Metadata
            </p>

            <div className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">
              <p>
                <span className="font-bold text-zinc-200">
                  SEO:
                </span>{" "}
                {document.seo.title}
              </p>

              <p>
                <span className="font-bold text-zinc-200">
                  Canonical:
                </span>{" "}
                <span className="font-mono text-xs">
                  {document.seo.canonicalPath}
                </span>
              </p>

              <p>
                <span className="font-bold text-zinc-200">
                  Tags:
                </span>{" "}
                {document.content.tags.join(
                  ", "
                )}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-400">
              Generated Relationships
            </p>

            {document.relationships.length >
            0 ? (
              <div className="mt-3 space-y-2">
                {document.relationships.map(
                  (
                    relationship
                  ) => (
                    <p
                      key={`${relationship.type}-${relationship.targetType}-${relationship.targetSlug}`}
                      className="text-sm leading-6 text-zinc-400"
                    >
                      <span className="font-bold text-zinc-200">
                        {relationship.type}:
                      </span>{" "}
                      {relationship.targetSlug}
                      <span className="text-zinc-600">
                        {" "}
                        ({relationship.confidence}%)
                      </span>
                    </p>
                  )
                )}
              </div>
            ) : (
              <p className="mt-3 text-sm text-zinc-500">
                No relationships were generated.
              </p>
            )}
          </div>
        </div>
      ) : null}


      {row.errors.length >
      0 ? (
        <div className="mt-5 space-y-2 rounded-xl border border-red-400/20 bg-red-400/[0.04] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-300">
            Errors
          </p>

          {row.errors.map(
            (
              error
            ) => (
              <p
                key={
                  error
                }
                className="text-sm font-semibold text-red-200"
              >
                ✕ {error}
              </p>
            )
          )}
        </div>
      ) : null}


      {row.warnings.length >
      0 ? (
        <div className="mt-5 space-y-2 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
            Warnings
          </p>

          {row.warnings.map(
            (
              warning
            ) => (
              <p
                key={
                  warning
                }
                className="text-sm font-semibold text-amber-200"
              >
                ! {warning}
              </p>
            )
          )}
        </div>
      ) : null}
    </article>
  );
}


function buildGeneratedFileDescription(
  manufacturer:
    string,
  vehicleCount:
    number,
  classification?:
    RegistryFileClassification
): string {
  const vehicleLabel =
    vehicleCount ===
    1
      ? "vehicle"
      : "vehicles";

  if (!classification) {
    return `${manufacturer} — ${vehicleCount} ${vehicleLabel}`;
  }

  return `${manufacturer} — ${vehicleCount} ${vehicleLabel} — ${classification.status.toUpperCase()}`;
}


function ContentValue({
  label,
  value,
}: {
  label:
    string;

  value:
    string;
}) {
  return (
    <p>
      {label}:{" "}
      <span className="font-bold text-white">
        {value}
      </span>
    </p>
  );
}


function Metric({
  label,
  value,
  tone = "default",
}: {
  label:
    string;

  value:
    string;

  tone?:
    | "default"
    | "positive"
    | "warning"
    | "negative";
}) {
  const valueClassName = {
    default:
      "text-white",

    positive:
      "text-emerald-400",

    warning:
      "text-amber-400",

    negative:
      "text-red-400",
  }[
    tone
  ];


  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-black ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}


function getScoreTone(
  score:
    number,
  rowCount:
    number
):
  | "default"
  | "positive"
  | "warning"
  | "negative" {
  if (
    rowCount ===
    0
  ) {
    return "default";
  }

  if (
    score >=
    80
  ) {
    return "positive";
  }

  if (
    score >=
    60
  ) {
    return "warning";
  }

  return "negative";
}


function getScoreTextClass(
  score:
    number
): string {
  if (
    score >=
    80
  ) {
    return "text-emerald-300";
  }

  if (
    score >=
    60
  ) {
    return "text-amber-300";
  }

  return "text-red-300";
}