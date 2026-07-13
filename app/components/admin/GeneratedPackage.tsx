"use client";

import {
  useMemo,
  useState,
} from "react";

import JSZip from "jszip";

import type {
  RegistryManifest,
} from "@/app/content-studio/registry";

import type {
  ProductionPackageReport,
} from "@/app/content-studio/services";


export type GeneratedPackageFile = {
  filename:
    string;

  code:
    string;
};


export type GeneratedPackageReport =
  ProductionPackageReport;


type GeneratedPackageProps = {
  files:
    GeneratedPackageFile[];

  indexCode:
    string;

  report:
    GeneratedPackageReport;

  manifest:
    RegistryManifest;

  disabled?:
    boolean;
};


export default function GeneratedPackage({
  files,
  indexCode,
  report,
  manifest,
  disabled = false,
}: GeneratedPackageProps) {
  const [
    isGenerating,
    setIsGenerating,
  ] = useState(
    false
  );

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(
    null
  );


  const approvedFiles =
    useMemo(
      () => {
        const allowedFilenames =
          new Set(
            manifest.classifications
              .filter(
                (
                  classification
                ) =>
                  (
                    classification.status ===
                      "new" ||
                    classification.status ===
                      "merge"
                  ) &&
                  classification.newVehicleSlugs.length >
                    0
              )
              .map(
                (
                  classification
                ) =>
                  classification.filename
              )
          );

        return files.filter(
          (
            file
          ) =>
            allowedFilenames.has(
              file.filename
            )
        );
      },
      [
        files,
        manifest.classifications,
      ]
    );


  const canDownload =
    !disabled &&
    approvedFiles.length >
      0 &&
    manifest.package.invalidFiles ===
      0 &&
    !isGenerating;


  async function handleDownload() {
    if (!canDownload) {
      return;
    }

    setIsGenerating(
      true
    );

    setError(
      null
    );


    try {
      const zip =
        new JSZip();

      const rootFolder =
        zip.folder(
          "atlas-vehicle-import"
        );

      if (!rootFolder) {
        throw new Error(
          "Atlas could not create the ZIP package."
        );
      }


      const vehiclesFolder =
        rootFolder.folder(
          "vehicles"
        );

      if (!vehiclesFolder) {
        throw new Error(
          "Atlas could not create the vehicles folder."
        );
      }


      approvedFiles.forEach(
        (
          file
        ) => {
          vehiclesFolder.file(
            file.filename,
            file.code
          );
        }
      );


      vehiclesFolder.file(
        "vehicles-index-snippet.ts",
        indexCode
      );


      rootFolder.file(
        "import-report.json",
        JSON.stringify(
          report,
          null,
          2
        )
      );


      rootFolder.file(
        "registry-manifest.json",
        JSON.stringify(
          manifest,
          null,
          2
        )
      );


      rootFolder.file(
        "README.txt",
        buildReadme(
          report,
          manifest,
          approvedFiles
        )
      );


      const blob =
        await zip.generateAsync({
          type:
            "blob",

          compression:
            "DEFLATE",

          compressionOptions: {
            level:
              6,
          },
        });


      const downloadUrl =
        URL.createObjectURL(
          blob
        );

      const anchor =
        document.createElement(
          "a"
        );

      const dateStamp =
        new Date()
          .toISOString()
          .slice(
            0,
            10
          );

      anchor.href =
        downloadUrl;

      anchor.download =
        `atlas-vehicle-import-${dateStamp}.zip`;

      document.body.appendChild(
        anchor
      );

      anchor.click();

      document.body.removeChild(
        anchor
      );

      URL.revokeObjectURL(
        downloadUrl
      );
    } catch (
      caughtError
    ) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Atlas could not generate the vehicle package."
      );
    } finally {
      setIsGenerating(
        false
      );
    }
  }


  return (
    <section className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-zinc-950 to-cyan-500/10 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">
            Production Package
          </p>

          <h2 className="mt-3 text-3xl font-black text-white">
            Download Approved Vehicle Package
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            The ZIP includes approved manufacturer modules, a registry
            manifest, an import report, the registry snippet, and installation
            instructions. Duplicate-only and invalid files are excluded.
          </p>
        </div>

        <button
          type="button"
          disabled={
            !canDownload
          }
          onClick={
            handleDownload
          }
          className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
        >
          {isGenerating
            ? "Building Package..."
            : "Download ZIP"}
        </button>
      </div>


      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <Metric
          label="Vehicles"
          value={
            report.vehicleCount.toString()
          }
        />

        <Metric
          label="Approved Files"
          value={
            approvedFiles.length.toString()
          }
        />

        <Metric
          label="New Files"
          value={
            report.newFiles.toString()
          }
        />

        <Metric
          label="Merge Files"
          value={
            report.mergeFiles.toString()
          }
          tone={
            report.mergeFiles >
            0
              ? "warning"
              : "default"
          }
        />

        <Metric
          label="Duplicates"
          value={
            report.duplicateFiles.toString()
          }
          tone={
            report.duplicateFiles >
            0
              ? "warning"
              : "default"
          }
        />

        <Metric
          label="Registry Score"
          value={`${report.registryScore}/100`}
          tone={
            getScoreTone(
              report.registryScore
            )
          }
        />
      </div>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
          Package Contents
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {approvedFiles.map(
            (
              file
            ) => (
              <p
                key={
                  file.filename
                }
                className="font-mono text-sm text-zinc-300"
              >
                vehicles/{file.filename}
              </p>
            )
          )}

          <p className="font-mono text-sm text-zinc-300">
            vehicles/vehicles-index-snippet.ts
          </p>

          <p className="font-mono text-sm text-zinc-300">
            import-report.json
          </p>

          <p className="font-mono text-sm text-zinc-300">
            registry-manifest.json
          </p>

          <p className="font-mono text-sm text-zinc-300">
            README.txt
          </p>
        </div>
      </div>


      {manifest.classifications.length >
      0 ? (
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            File Classifications
          </p>

          <div className="mt-4 space-y-3">
            {manifest.classifications.map(
              (
                classification
              ) => (
                <div
                  key={`${classification.filename}-${classification.status}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
                >
                  <div>
                    <p className="font-mono text-sm font-bold text-white">
                      {classification.filename}
                    </p>

                    <p className="mt-1 text-sm text-zinc-400">
                      {classification.message}
                    </p>
                  </div>

                  <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-black uppercase tracking-wider text-zinc-300">
                    {classification.status}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      ) : null}


      {report.warnings.length >
      0 ? (
        <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">
            Package Warnings
          </p>

          <div className="mt-3 space-y-2">
            {report.warnings.map(
              (
                warning,
                index
              ) => (
                <p
                  key={`${warning}-${index}`}
                  className="text-sm leading-6 text-amber-200"
                >
                  ! {warning}
                </p>
              )
            )}
          </div>
        </div>
      ) : null}


      {!canDownload &&
      approvedFiles.length ===
        0 ? (
        <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
          <p className="text-sm font-bold text-amber-200">
            No approved manufacturer files are available for export.
          </p>
        </div>
      ) : null}


      {error ? (
        <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-5">
          <p className="text-sm font-bold text-red-200">
            {error}
          </p>
        </div>
      ) : null}
    </section>
  );
}


function buildReadme(
  report:
    GeneratedPackageReport,
  manifest:
    RegistryManifest,
  approvedFiles:
    GeneratedPackageFile[]
): string {
  const newFiles =
    manifest.classifications
      .filter(
        (
          classification
        ) =>
          classification.status ===
          "new"
      )
      .map(
        (
          classification
        ) =>
          classification.filename
      );

  const mergeFiles =
    manifest.classifications
      .filter(
        (
          classification
        ) =>
          classification.status ===
          "merge"
      )
      .map(
        (
          classification
        ) =>
          classification.filename
      );


  return `Atlas Vehicle Import Package

Generated:
${report.importedAt}

Registry readiness:
${report.registryScore}/100

Vehicles generated:
${report.vehicleCount}

Approved manufacturer files:
${approvedFiles.length}

New manufacturer files:
${newFiles.length > 0 ? newFiles.join(", ") : "None"}

Existing manufacturer files requiring review and merge:
${mergeFiles.length > 0 ? mergeFiles.join(", ") : "None"}

Invalid rows excluded:
${report.invalidRows}

Duplicate-only files excluded:
${report.duplicateFiles}

Installation:
1. Review import-report.json and registry-manifest.json.
2. For files classified NEW, move the approved module into app/data/vehicles.
3. For files classified MERGE, manually merge only the approved new vehicle objects into the existing manufacturer module.
4. Review vehicles-index-snippet.ts and add only missing imports and registry entries.
5. Add the corresponding vehicle images to public/vehicles.
6. Run the duplicate-slug check.
7. Run npm run build.
8. Review /engineering.
9. Commit only after the production build passes.

Important:
Atlas does not automatically overwrite source files.
Generated MERGE files are review artifacts and must not blindly replace existing manufacturer modules.
`;
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
    | "warning"
    | "negative"
    | "positive";
}) {
  const valueClassName = {
    default:
      "text-white",

    warning:
      "text-amber-400",

    negative:
      "text-red-400",

    positive:
      "text-emerald-400",
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
    number
):
  | "positive"
  | "warning"
  | "negative" {
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