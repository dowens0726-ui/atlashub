import type { AtlasPlayerAction } from "@/app/intelligence";

type AtlasActionTrackerCardProps = {
  action: AtlasPlayerAction;
};

const statusStyles = {
  started: "text-cyan-400",
  completed: "text-emerald-400",
  abandoned: "text-red-400",
};

export default function AtlasActionTrackerCard({
  action,
}: AtlasActionTrackerCardProps) {
  return (
    <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
        Action Tracking
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        Atlas Monitoring
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Atlas is tracking this strategic action and will use the result
        to improve future recommendations.
      </p>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
          Current Action
        </p>

        <h3 className="mt-2 text-xl font-black text-white">
          {action.title}
        </h3>


        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
            Status
          </p>

          <p
            className={`mt-2 text-lg font-black ${
              statusStyles[action.status]
            }`}
          >
            {action.status.toUpperCase()}
          </p>
        </div>


        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
            Started
          </p>

          <p className="mt-2 text-sm text-zinc-300">
            {action.startedAt}
          </p>
        </div>
      </div>


      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
          Atlas Note
        </p>

        <p className="mt-2 text-sm leading-6 text-zinc-300">
          {action.notes}
        </p>
      </div>
    </section>
  );
}
