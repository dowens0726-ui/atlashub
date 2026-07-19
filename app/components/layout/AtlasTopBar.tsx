"use client";

import Link from "next/link";

import AtlasUserMenu from "./AtlasUserMenu";

export default function AtlasTopBar() {
  return (
    <header className="sticky top-0 z-40 flex min-h-20 items-center justify-between gap-6 border-b border-white/10 bg-zinc-950/80 px-6 py-4 backdrop-blur-xl lg:px-8">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]"
          />

          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Atlas AI
          </p>
        </div>

        <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-white sm:text-2xl">
          Welcome back.
        </h1>
      </div>

      <div className="flex min-w-0 items-center justify-end gap-3">
        <div className="relative hidden xl:block">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-zinc-600"
          >
            ⌕
          </span>

          <input
            type="search"
            aria-label="Search Atlas"
            placeholder="Search Atlas..."
            autoComplete="off"
            className={[
              "h-11 w-64 rounded-2xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-4",
              "text-sm text-white placeholder:text-zinc-600",
              "outline-none transition-all duration-200",
              "hover:border-white/15 hover:bg-white/[0.06]",
              "focus:w-72 focus:border-cyan-400/30 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-400/10",
            ].join(" ")}
          />
        </div>

        <Link
          href="/copilot"
          className={[
            "hidden h-11 items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4",
            "text-sm font-semibold text-cyan-100 transition-all duration-200 sm:flex",
            "hover:border-cyan-300/30 hover:bg-cyan-400/15 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
          ].join(" ")}
        >
          <span
            aria-hidden="true"
            className="text-cyan-300"
          >
            ✦
          </span>

          AI Copilot
        </Link>

        <AtlasUserMenu />
      </div>
    </header>
  );
}