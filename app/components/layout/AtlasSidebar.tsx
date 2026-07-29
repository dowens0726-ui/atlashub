import Link from "next/link";

import AtlasNavigation from "./AtlasNavigation";


export default function AtlasSidebar() {
  return (
    <aside className="atlas-app-sidebar relative flex h-screen w-72 shrink-0 flex-col overflow-hidden border-r border-white/[0.08] bg-[#02060f]/92 backdrop-blur-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_4%,rgba(34,211,238,0.11),transparent_26%),radial-gradient(circle_at_100%_56%,rgba(139,92,246,0.08),transparent_30%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-cyan-300/36 via-white/[0.06] to-violet-300/18"
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <header className="border-b border-white/[0.07] px-4 pb-5 pt-5">
          <Link
            href="/dashboard"
            aria-label="Atlas dashboard"
            className={[
              "group relative block overflow-hidden rounded-[1.35rem] border border-white/[0.06]",
              "bg-white/[0.025] p-3.5 transition-all duration-200",
              "hover:border-cyan-300/16 hover:bg-cyan-300/[0.04]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
            ].join(
              " "
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(34,211,238,0.12),transparent_38%)]"
            />

            <div className="relative flex items-center gap-3">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-cyan-300/20 bg-cyan-300/[0.09]">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.23),transparent_66%)]"
                />

                <span className="relative text-base font-black text-cyan-100">
                  A
                </span>
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-[0.12em] text-white">
                    ATLAS
                  </span>

                  <span className="rounded-full border border-cyan-300/10 bg-cyan-300/[0.05] px-1.5 py-0.5 text-[0.42rem] font-black uppercase tracking-[0.14em] text-cyan-100/58">
                    OS
                  </span>
                </span>

                <span className="mt-0.5 block truncate text-[0.5rem] font-black uppercase tracking-[0.2em] text-white/25">
                  Gaming intelligence
                </span>
              </span>
            </div>
          </Link>

          <div className="mt-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-30" />

                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
              </span>

              <span className="text-[0.47rem] font-black uppercase tracking-[0.18em] text-emerald-200/54">
                Core synchronized
              </span>
            </div>

            <span className="text-[0.45rem] font-black uppercase tracking-[0.16em] text-white/18">
              v1.0
            </span>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
          <AtlasNavigation />
        </div>

        <footer className="relative border-t border-white/[0.07] p-3">
          <div className="relative overflow-hidden rounded-[1.35rem] border border-cyan-300/14 bg-[linear-gradient(145deg,rgba(34,211,238,0.075),rgba(139,92,246,0.04))] p-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/[0.08] blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/42 to-transparent"
            />

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.5rem] font-black uppercase tracking-[0.21em] text-cyan-100/52">
                    Atlas Core
                  </p>

                  <p className="mt-1 text-sm font-black text-white">
                    Systems online
                  </p>
                </div>

                <span className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-300/14 bg-emerald-300/[0.06]">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-300 opacity-20" />

                  <span className="relative h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]" />
                </span>
              </div>

              <p className="mt-2 text-[0.58rem] leading-4 text-white/34">
                Intelligence engines are synchronized and monitoring the active operating session.
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <SystemMetric
                  label="Neural"
                  value="Stable"
                />

                <SystemMetric
                  label="World"
                  value="Synced"
                />
              </div>
            </div>
          </div>

          <Link
            href="/"
            aria-label="Return to AtlasHub"
            className={[
              "mt-2 flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5",
              "text-[0.5rem] font-black uppercase tracking-[0.16em] text-white/24",
              "transition-all duration-200",
              "hover:border-white/[0.06] hover:bg-white/[0.025] hover:text-white/52",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
            ].join(
              " "
            )}
          >
            <span>
              Return to AtlasHub
            </span>

            <span
              aria-hidden="true"
              className="text-white/18"
            >
              ↗
            </span>
          </Link>
        </footer>
      </div>
    </aside>
  );
}


type SystemMetricProps = {
  label:
    string;

  value:
    string;
};


function SystemMetric({
  label,
  value,
}: SystemMetricProps) {
  return (
    <div className="rounded-xl border border-white/[0.055] bg-black/15 px-2.5 py-2">
      <p className="text-[0.42rem] font-black uppercase tracking-[0.15em] text-white/20">
        {label}
      </p>

      <p className="mt-0.5 text-[0.52rem] font-bold uppercase tracking-[0.1em] text-cyan-100/56">
        {value}
      </p>
    </div>
  );
}