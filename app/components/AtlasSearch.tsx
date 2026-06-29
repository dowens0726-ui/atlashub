"use client";

import { useEffect, useState } from "react";

const searchPlaceholders = [
  "🔍 Search anything in GTA VI...",
  "🚗 Find the fastest car...",
  "💰 Best money methods...",
  "🔫 Weapon locations...",
  "⭐ Hidden collectibles...",
];

export default function AtlasSearch() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

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
        placeholder={searchPlaceholders[placeholderIndex]}
        className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-lg text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none"
      />
    </div>
  );
}