type ExplorerCanvasProps = {
  searchQuery: string;
};

export default function ExplorerCanvas({
  searchQuery,
}: ExplorerCanvasProps) {
  return (
    <div className="relative flex h-full min-h-[680px] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(63 63 70 / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(63 63 70 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Placeholder Marker */}
      <div className="absolute left-[35%] top-[45%] flex flex-col items-center">
        <div className="h-5 w-5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
        <span className="mt-2 rounded-full bg-zinc-900 px-3 py-1 text-xs font-bold text-white">
          Vice City
        </span>
      </div>

      {/* Center Content */}
      <div className="relative z-10 max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Atlas Explorer
        </p>

        <h2 className="mt-4 text-5xl font-black text-white">
          Interactive World
        </h2>

        <p className="mt-5 leading-8 text-zinc-400">
          Search, filter, and explore the GTA VI world. Vehicles,
          missions, collectibles, businesses, and properties will all
          appear here as Atlas grows.
        </p>

        {searchQuery && (
          <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-zinc-900 px-5 py-4">
            <p className="text-sm text-zinc-400">Searching for</p>

            <p className="mt-1 text-xl font-black text-emerald-400">
              {searchQuery}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}