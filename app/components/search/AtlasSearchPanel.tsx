"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchAtlas } from "@/app/services";

export default function AtlasSearchPanel() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
  const searchResults = searchAtlas(query);

  console.log("Query:", query);
  console.log("Results:", searchResults);

  return searchResults;
}, [query]);
  
  console.log(results);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search missions, vehicles, weapons..."
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-400"
      />

      <div className="mt-4 space-y-3">
        {results.map((result) => (
          <Link
            key={result.id}
            href={result.href}
            className="block rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-emerald-400"
          >
            <p className="text-xs uppercase tracking-wide text-emerald-400">
              {result.type}
            </p>

            <h3 className="mt-1 font-bold text-white">{result.label}</h3>

            <p className="mt-1 text-sm text-zinc-400">
              {result.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}