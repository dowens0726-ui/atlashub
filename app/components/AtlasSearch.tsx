"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { search } from "../lib/search";

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

  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((currentIndex) =>
        currentIndex === searchPlaceholders.length - 1 ? 0 : currentIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={searchPlaceholders[placeholderIndex]}
        className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-lg text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none"
      />

      {results.length > 0 && (
        <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          {results.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block border-b border-zinc-800 px-4 py-3 transition hover:bg-zinc-800 last:border-b-0"
            >
              <div className="font-medium text-white">
  <span className="mr-2">{item.icon}</span>
  {item.title}
</div>
              <div className="text-sm text-zinc-400">{item.category}</div>
            </Link>
          ))}
        </div>
      )}
        </div>
  );
}