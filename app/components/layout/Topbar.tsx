"use client";

import { useState } from "react";
import AtlasSearchDialog from "@/app/components/search/AtlasSearchDialog";
import SearchBar from "./SearchBar";

export default function Topbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/85 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div className="lg:hidden">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-white">
              AtlasHub
            </p>
          </div>

          <div onClick={() => setSearchOpen(true)} className="w-full">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-2xl border border-zinc-800 px-3 py-2 text-sm font-bold text-zinc-400 transition hover:border-amber-400/50 hover:text-amber-400"
            >
              Alerts
            </button>

            <button
              type="button"
              className="rounded-2xl bg-amber-400 px-3 py-2 text-sm font-black text-zinc-950 transition hover:bg-amber-300"
            >
              Pro
            </button>
          </div>
        </div>
      </header>

      <AtlasSearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}