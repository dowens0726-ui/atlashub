"use client";

import { useState } from "react";

export function useExplorerSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  function updateSearchQuery(value: string) {
    setSearchQuery(value);
  }

  function clearSearchQuery() {
    setSearchQuery("");
  }

  return {
    searchQuery,
    updateSearchQuery,
    clearSearchQuery,
  };
}