import type {
  AtlasMemory,
  MemoryHistoryItem,
} from "@/app/intelligence";

type AtlasMemoryCardProps = {
  memory: AtlasMemory;
  history: MemoryHistoryItem[];
};

export default function AtlasMemoryCard({
  memory,
  history,
}: AtlasMemoryCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-zinc-950 shadow-2xl shadow-cyan-950/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

      <div className="relative p-5 sm:p-6 lg:p-8">
        <header className="border-b border-zinc-800/80 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">
              Atlas Memory
            </p>

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
              Persistent Learning
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-black text-white">
            {memory.title}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">
            {memory.summary}
          </p>
        </header>

        <div className="mt-7 grid gap-5 xl:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.04] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-300">
                Learned Pattern
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-300">
                {memory.learnedPattern}
              </p>
            </div>

            {memory.playerInsights.length > 0 && (
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                  Player Understanding
                </p>

                <ul className="mt-4 space-y-3">
                  {memory.playerInsights.map((insight) => (
                    <li
                      key={insight}
                      className="flex gap-3 text-sm leading-6 text-zinc-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />

                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
              Memory Timeline
            </p>

            <div className="mt-5 space-y-4">
              {history.map((item, index) => (
                <div
                  key={item.id}
                  className="relative rounded-xl border border-zinc-800 bg-zinc-950/70 p-4"
                >
                  {index !== history.length - 1 && (
                    <div className="absolute bottom-[-18px] left-6 h-4 w-px bg-zinc-700" />
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-bold text-white">
                      {item.title}
                    </h3>

                    <span className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}