"use client";

import { useEffect, useState } from "react";

export type FavoriteItem = {
  id: string;
  type: "mission" | "vehicle" | "weapon";
  title: string;
  href: string;
};

const STORAGE_KEY = "atlas:favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  function save(nextFavorites: FavoriteItem[]) {
    setFavorites(nextFavorites);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));
  }

  function isFavorite(id: string) {
    return favorites.some((item) => item.id === id);
  }

  function toggleFavorite(item: FavoriteItem) {
    if (isFavorite(item.id)) {
      save(favorites.filter((favorite) => favorite.id !== item.id));
      return;
    }

    save([...favorites, item]);
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}