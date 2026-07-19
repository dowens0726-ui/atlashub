"use client";

import AtlasButton from "@/app/components/design-system/AtlasButton";

export default function AtlasTopBar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-zinc-950/80 px-8 backdrop-blur-xl">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Atlas AI
        </p>

        <h1 className="mt-1 text-2xl font-bold text-white">
          Welcome back.
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search Atlas..."
          className="w-72 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none transition focus:border-cyan-400/40"
        />

        <AtlasButton variant="secondary">
          AI Copilot
        </AtlasButton>
      </div>
    </header>
  );
}