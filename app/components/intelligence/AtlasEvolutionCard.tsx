import type { AtlasLearningProfile } from "@/app/intelligence";

type AtlasEvolutionCardProps = {
  learning: AtlasLearningProfile;
};

export default function AtlasEvolutionCard({
  learning,
}: AtlasEvolutionCardProps) {
  return (
    <section className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">
        Atlas Evolution
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        {learning.title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {learning.summary}
      </p>


      <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
          Learned Patterns
        </p>

        <div className="mt-4 space-y-2">
          {learning.patterns.map((pattern) => (
            <p
              key={pattern}
              className="text-sm text-zinc-300"
            >
              ✓ {pattern}
            </p>
          ))}
        </div>
      </div>


      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Learning Confidence
        </p>

        <p className="mt-2 text-3xl font-black text-white">
          {learning.confidence}%
        </p>
      </div>
    </section>
  );
}