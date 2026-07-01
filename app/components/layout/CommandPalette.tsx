"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { search } from "../../lib/search";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => search(query), [query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:border-emerald-400 hover:text-white"
      >
        🔍 Search Atlas...
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-32">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Atlas..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-lg outline-none focus:border-emerald-400"
            />

            <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="block border-b border-zinc-800 px-4 py-3 transition last:border-b-0 hover:bg-zinc-800"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium text-white">
                        <span className="mr-2">{item.icon}</span>
                        {item.title}
                      </span>

                      <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                        {item.category}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="px-4 py-5 text-zinc-500">
                  {query.trim()
                    ? "No results found."
                    : "Start typing to search Atlas."}
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="mt-6 text-sm text-emerald-400 hover:text-emerald-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}