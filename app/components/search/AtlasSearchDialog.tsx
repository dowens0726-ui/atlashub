"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AtlasSearchInput from "./AtlasSearchInput";
import AtlasSearchResults from "./AtlasSearchResults";
import { useAtlasSearch } from "@/app/hooks/useAtlasSearch";

type AtlasSearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function AtlasSearchDialog({
  open,
  onClose,
}: AtlasSearchDialogProps) {
  const router = useRouter();
  const { query, setQuery, results, clearSearch } = useAtlasSearch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleClose() {
    clearSearch();
    setSelectedIndex(0);
    onClose();
  }

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) =>
          results.length === 0 ? 0 : Math.min(current + 1, results.length - 1)
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) => Math.max(current - 1, 0));
      }

      if (event.key === "Enter" && results[selectedIndex]) {
        event.preventDefault();
        const selectedResult = results[selectedIndex];
        handleClose();
        router.push(selectedResult.href);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, results, selectedIndex]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 p-4 backdrop-blur-xl">
      <button
        type="button"
        aria-label="Close search"
        onClick={handleClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />

      <div className="relative mx-auto mt-20 max-w-3xl">
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-4 shadow-2xl">
          <AtlasSearchInput query={query} onChange={setQuery} />

          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            <AtlasSearchResults
              query={query}
              results={results}
              selectedIndex={selectedIndex}
              onSelect={handleClose}
            />
          </div>

          <div className="mt-4 flex items-center justify-between px-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
            <span>Atlas Search</span>
            <span>↑ ↓ Navigate · Enter Open · Esc Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}