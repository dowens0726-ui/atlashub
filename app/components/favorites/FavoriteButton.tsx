"use client";

import type { FavoriteItem } from "@/app/hooks/useFavorites";
import { useFavorites } from "@/app/hooks/useFavorites";

type FavoriteButtonProps = {
  item: FavoriteItem;
};

export default function FavoriteButton({ item }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(item.id);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(item)}
      className={`rounded-full border px-3 py-1 text-sm font-semibold transition ${
        active
          ? "border-yellow-400 bg-yellow-400 text-zinc-950"
          : "border-zinc-700 text-zinc-300 hover:border-yellow-400 hover:text-yellow-300"
      }`}
    >
      {active ? "⭐ Saved" : "☆ Save"}
    </button>
  );
}