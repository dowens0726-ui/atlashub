import type {
  AtlasPlayerIdentity,
} from "@/app/intelligence";

type AtlasIdentityCardProps = {
  identity: AtlasPlayerIdentity;
};

export default function AtlasIdentityCard({
  identity,
}: AtlasIdentityCardProps) {
  return (
    <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
        Atlas Identity
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        {identity.archetype}
      </h2>

      <p className="mt-3 text-zinc-400">
        {identity.summary}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Strategy
          </p>

          <p className="mt-2 text-xl font-black text-white">
            {identity.strategy}
          </p>
        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Risk Profile
          </p>

          <p className="mt-2 text-xl font-black text-white">
            {identity.riskProfile}
          </p>
        </div>

      </div>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
          Atlas Strengths
        </p>

        <div className="mt-4 space-y-2">
          {identity.strengths.map((strength) => (
            <p
              key={strength}
              className="text-sm text-zinc-300"
            >
              ✓ {strength}
            </p>
          ))}
        </div>
      </div>


      <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
          Atlas Confidence
        </p>

        <p className="mt-2 text-3xl font-black text-white">
          {identity.confidence}%
        </p>

        <p className="mt-2 text-sm text-zinc-400">
          Atlas is refining your player identity from your actions,
          assets, and progression choices.
        </p>
      </div>

    </section>
  );
}