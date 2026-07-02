"use client";

import { useMemo, useState } from "react";
import { searchAtlas } from "@/app/services";
import CommandHeader from "./CommandHeader";
import CommandEmpty from "./CommandEmpty";
import CommandResults from "./CommandResults";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchAtlas(query), [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-4 backdrop-blur-sm">
      <div className="mx-auto mt-24 w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        <CommandHeader query={query} onChange={setQuery} />

        {query.trim() ? (
          <CommandResults results={results} onSelect={onClose} />
        ) : (
          <CommandEmpty />
        )}
      </div>
    </div>
  );
}