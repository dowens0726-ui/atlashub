"use client";

import {
  useState,
} from "react";

import JSZip from "jszip";


export type GeneratedPackageFile = {
  filename: string;

  code: string;
};


export type GeneratedPackageReport = {
  importedAt: string;

  totalRows: number;

  validRows: number;

  invalidRows: number;

  manufacturerCount: number;

  vehicleCount: number;

  warnings: string[];

  generatedFiles: string[];
};


type GeneratedPackageProps = {
  files:
    GeneratedPackageFile[];

  indexCode: string;

  report:
    GeneratedPackageReport;

  disabled?: boolean;
};


export default function GeneratedPackage({
  files,
  indexCode,
  report,
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


  async function handleDownload() {
    if (
      disabled ||
      files.length === 0 ||
      isGenerating
    ) {
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


      files.forEach(
        (file) => {
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


      const readme = `Atlas Vehicle Import Package

Generated:
${report.importedAt}

Vehicles:
${report.vehicleCount}

Manufacturers:
${report.manufacturerCount}

Valid rows:
${report.validRows}

Invalid rows excluded:
${report.invalidRows}

Installation:
1. Review every generated manufacturer file.
2. Move the approved files into app/data/vehicles.
3. Merge the contents of vehicles-index-snippet.ts into app/data/vehicles/index.ts.
4. Add the corresponding vehicle images to public/vehicles.
5. Run npm run build.
6. Commit only after the production build passes.

Atlas does not automatically overwrite source files.
`;

      rootFolder.file(
        "README.txt",
        readme
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
            Package Export
          </p>

          <h2 className="mt-3 text-3xl font-black text-white">
            Download Vehicle Package
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            Download all generated manufacturer files, the vehicle-index
            suggestion, an import report, and installation instructions in one
            ZIP archive.
          </p>
        </div>

        <button
          type="button"
          disabled={
            disabled ||
            files.length === 0 ||
            isGenerating
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


      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Vehicles"
          value={
            report.vehicleCount.toString()
          }
        />

        <Metric
          label="Manufacturers"
          value={
            report.manufacturerCount.toString()
          }
        />

        <Metric
          label="Generated Files"
          value={
            report.generatedFiles.length.toString()
          }
        />

        <Metric
          label="Rows Excluded"
          value={
            report.invalidRows.toString()
          }
          tone={
            report.invalidRows > 0
              ? "warning"
              : "default"
          }
        />
      </div>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
          Package Contents
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {report.generatedFiles.map(
            (filename) => (
              <p
                key={
                  filename
                }
                className="font-mono text-sm text-zinc-300"
              >
                vehicles/{filename}
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
            README.txt
          </p>
        </div>
      </div>


      {report.warnings.length > 0 ? (
        <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">
            Import Warnings
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


function Metric({
  label,
  value,
  tone = "default",
}: {
  label: string;

  value: string;

  tone?:
    | "default"
    | "warning";
}) {
  const valueClassName =
    tone === "warning"
      ? "text-amber-400"
      : "text-white";

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