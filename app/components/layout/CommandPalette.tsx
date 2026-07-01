"use client";

import { useState } from "react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:border-emerald-400 hover:text-white"
      >
        ⌘ / Ctrl + K
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-32">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <input
              autoFocus
              type="text"
              placeholder="Search Atlas..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-lg outline-none focus:border-emerald-400"
            />

            <p className="mt-6 text-zinc-500">
              Search results coming soon...
            </p>

            <button
              onClick={() => setOpen(false)}
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