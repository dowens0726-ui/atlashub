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
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-xl">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
          Atlas Memory
        </p>

        <h3 className="mt-2 text-xl font-black text-white">
          {memory.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {memory.summary}
        </p>
      </div>


      <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Learned Pattern
        </p>

        <p className="mt-2 text-sm leading-6 text-zinc-200">
          {memory.learnedPattern}
        </p>
      </div>


      {memory.playerInsights.length > 0 ? (
        <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] p-4">
          <p className="text-xs font-black uppercase tracking-wide text-cyan-400">
            Player Understanding
          </p>

          <div className="mt-3 space-y-2">
            {memory.playerInsights.map((insight) => (
              <p
                key={insight}
                className="text-sm text-zinc-300"
              >
                ✓ {insight}
              </p>
            ))}
          </div>
        </div>
      ) : null}


      <div className="mt-5">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Memory Timeline
        </p>

        <div className="mt-3 space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">
                  {item.title}
                </p>

                <p className="shrink-0 text-xs text-zinc-500">
                  {item.timestamp}
                </p>
              </div>

              <p className="mt-1 text-xs leading-5 text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}