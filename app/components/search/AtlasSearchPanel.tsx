"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchAtlas } from "@/app/services";

export default function AtlasSearchPanel() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    return searchAtlas(query).slice(0, 5);
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search vehicles, missions, weapons..."
        className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-lg text-white outline-none transition focus:border-emerald-400"
      />

      {!isSearching && (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
          Start typing to search Atlas...
        </div>
      )}

      {isSearching && results.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 p-8 text-center">
          <p className="text-lg font-semibold text-white">
            No results found
          </p>

          <p className="mt-2 text-zinc-500">
            Try another vehicle, mission, or weapon.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-5 space-y-3">
          {results.map((result) => (
            <Link
              key={result.id}
              href={result.href}
              className="group block rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-400">
                  {result.type}
                </span>

                <span className="text-zinc-600 transition group-hover:text-emerald-400">
                  →
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">
                {result.label}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {result.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}