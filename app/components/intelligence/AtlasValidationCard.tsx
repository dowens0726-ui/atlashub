import type {
  AtlasValidatedOutcome,
} from "@/app/intelligence";

type AtlasValidationCardProps = {
  validation: AtlasValidatedOutcome;
};

const statusStyles = {
  confirmed: "text-emerald-400",
  pending: "text-amber-400",
  failed: "text-red-400",
};

export default function AtlasValidationCard({
  validation,
}: AtlasValidationCardProps) {
  return (
    <section className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">
        Outcome Validation
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        Reality Check
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Atlas compares your completed actions against expected outcomes
        to improve future recommendations.
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
          Validation Status
        </p>

        <p
          className={`mt-3 text-2xl font-black ${
            statusStyles[validation.status]
          }`}
        >
          {validation.status.toUpperCase()}
        </p>

        <p className="mt-4 text-sm leading-6 text-zinc-300">
          {validation.summary}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
          Success Score
        </p>

        <p className="mt-2 text-3xl font-black text-white">
          {validation.successScore}
        </p>
      </div>
    </section>
  );
}