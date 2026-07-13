"use client";

import {
  useState,
} from "react";


type GeneratedFileProps = {
  filename: string;

  code: string;

  description?: string;
};


export default function GeneratedFile({
  filename,
  code,
  description,
}: GeneratedFileProps) {
  const [
    copied,
    setCopied,
  ] = useState(
    false
  );


  async function handleCopy() {
    await navigator.clipboard.writeText(
      code
    );

    setCopied(
      true
    );

    window.setTimeout(
      () => {
        setCopied(
          false
        );
      },
      2000
    );
  }


  function handleDownload() {
    const blob =
      new Blob(
        [
          code,
        ],
        {
          type:
            "text/typescript;charset=utf-8",
        }
      );

    const downloadUrl =
      URL.createObjectURL(
        blob
      );

    const anchor =
      document.createElement(
        "a"
      );

    anchor.href =
      downloadUrl;

    anchor.download =
      filename;

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
  }


  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800 p-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">
            Generated File
          </p>

          <h3 className="mt-2 font-mono text-lg font-black text-white">
            {filename}
          </h3>

          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={
              handleCopy
            }
            className="rounded-lg border border-zinc-700 px-4 py-2 text-xs font-black uppercase tracking-wider text-zinc-300 transition hover:border-emerald-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {copied
              ? "Copied"
              : "Copy"}
          </button>

          <button
            type="button"
            onClick={
              handleDownload
            }
            className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-zinc-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            Download
          </button>
        </div>
      </header>

      <pre className="max-h-[560px] overflow-auto p-5 text-sm leading-6 text-zinc-300">
        <code>
          {code}
        </code>
      </pre>
    </article>
  );
}