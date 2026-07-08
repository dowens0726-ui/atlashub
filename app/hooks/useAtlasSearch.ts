"use client";

import { useMemo, useState } from "react";
import { searchAtlas } from "@/app/services";

export function useAtlasSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    return searchAtlas(query).slice(0, 8);
  }, [query]);

  function clearSearch() {
    setQuery("");
  }

  return {
    query,
    setQuery,
    results,
    clearSearch,
    hasQuery: query.trim().length > 0,
    hasResults: results.length > 0,
  };
}