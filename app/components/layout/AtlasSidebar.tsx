import Link from "next/link";

import AtlasNavigation from "./AtlasNavigation";

export default function AtlasSidebar() {
  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-zinc-950/95 backdrop-blur-xl">
      <div className="border-b border-white/10 px-6 py-7">
        <Link
          href="/"
          aria-label="Atlas dashboard"
          className={[
            "group block rounded-2xl",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_65%)]"
              />

              <span className="relative text-lg font-black text-cyan-200">
                A
              </span>
            </span>

            <span>
              <span className="block text-2xl font-black tracking-tight text-white">
                ATLAS
              </span>

              <span className="mt-0.5 block text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                Gaming Intelligence
              </span>
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <AtlasNavigation />
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-cyan-400/[0.06] p-4">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl"
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Atlas AI
              </p>

              <span className="flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-wider text-emerald-300">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                />

                Online
              </span>
            </div>

            <p className="mt-3 text-sm font-medium text-white">
              Your empire is ready.
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Intelligence engines are synchronized and monitoring your next move.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}