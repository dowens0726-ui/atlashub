import type { AtlasMemory, MemoryHistoryItem } from "@/app/intelligence";

type AtlasMemoryCardProps = {
  memory: AtlasMemory;
  history: MemoryHistoryItem[];
};

export default function AtlasMemoryCard({
  memory,
  history,
}: AtlasMemoryCardProps) {
  return (
    <section className="rounded-[2rem] border border-fuchsia-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-fuchsia-400">
        Atlas Memory
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">{memory.title}</h2>

      <p className="mt-3 leading-7 text-zinc-400">{memory.summary}</p>

      <div className="mt-6 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/5 p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-fuchsia-400">
          Pattern Detected
        </p>

        <p className="mt-3 leading-7 text-zinc-300">
          {memory.learnedPattern}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              {item.timestamp}
            </p>

            <h3 className="mt-2 font-black text-white">{item.title}</h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}