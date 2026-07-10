import type {
  AtlasMemoryInsight,
} from "@/app/intelligence";

type AtlasMemoryInsightCardProps = {
  insight: AtlasMemoryInsight;
};

export default function AtlasMemoryInsightCard({
  insight,
}: AtlasMemoryInsightCardProps) {
  return (
    <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-zinc-950 to-zinc-950 p-6">

      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
        Atlas Memory
      </p>


      <h2 className="mt-4 text-3xl font-black text-white">
        {insight.title}
      </h2>


      <p className="mt-3 leading-7 text-zinc-400">
        {insight.insight}
      </p>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

        <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
          Evidence
        </p>


        <div className="mt-4 space-y-2">
          {insight.evidence.map((item) => (
            <p
              key={item}
              className="text-sm text-zinc-300"
            >
              ✓ {item}
            </p>
          ))}
        </div>

      </div>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

        <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
          Memory Confidence
        </p>


        <p className="mt-2 text-3xl font-black text-white">
          {insight.confidence}%
        </p>

      </div>

    </section>
  );
}