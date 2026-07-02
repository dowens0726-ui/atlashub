"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { searchAtlas } from "@/app/services";

const searchPlaceholders = [
  "🔍 Search anything in GTA VI...",
  "🚗 Find the fastest car...",
  "💰 Best money methods...",
  "🔫 Weapon locations...",
  "⭐ Hidden collectibles...",
];

export default function AtlasSearch() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchAtlas(query), [query]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((currentIndex) =>
        currentIndex === searchPlaceholders.length - 1 ? 0 : currentIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={searchPlaceholders[placeholderIndex]}
        className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 pr-14 text-lg text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none"
      />

      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-5 top-5 text-zinc-500 transition hover:text-white"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}

      {query.trim() && (
        <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="block border-b border-zinc-800 px-4 py-3 transition hover:bg-zinc-800 last:border-b-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-emerald-400">
                      {item.type}
                    </p>
                    <p className="mt-1 font-medium text-white">
                      {item.label}
                    </p>
                  </div>

                  <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-400">
                    Open
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-5 text-center">
              <div className="text-sm font-semibold text-white">
                No results found
              </div>
              <div className="mt-1 text-sm text-zinc-400">
                Try another search.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}