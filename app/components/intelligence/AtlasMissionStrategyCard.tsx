import type {
  AtlasMissionStrategy,
} from "@/app/intelligence";


type AtlasMissionStrategyCardProps = {
  strategy: AtlasMissionStrategy;
};


export default function AtlasMissionStrategyCard({
  strategy,
}: AtlasMissionStrategyCardProps) {
  return (
    <section className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6">

      <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">
        Mission Intelligence
      </p>


      <h3 className="mt-3 text-2xl font-black text-white">
        {strategy.title}
      </h3>


      {strategy.mission ? (
        <>

          <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-black uppercase tracking-wider text-zinc-500">
              Recommended Mission
            </p>

            <h4 className="mt-2 text-xl font-black text-white">
              {strategy.mission.title}
            </h4>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {strategy.mission.description}
            </p>

          </div>


          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <Stat
              label="Mission Score"
              value={`${strategy.rankingScore}/100`}
            />

            <Stat
              label="Confidence"
              value={`${strategy.confidence}%`}
            />

            <Stat
              label="Difficulty"
              value={strategy.mission.difficulty}
            />

            <Stat
              label="Time"
              value={strategy.mission.estimatedTime}
            />

          </div>


          <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-black uppercase tracking-wider text-cyan-400">
              Why Atlas Chose This
            </p>


            <div className="mt-3 space-y-2">

              {strategy.rankingReasons.map(
                (reason) => (
                  <p
                    key={reason}
                    className="text-sm text-zinc-300"
                  >
                    • {reason}
                  </p>
                )
              )}

            </div>

          </div>


          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <Score
              label="Reward"
              value={strategy.rankingBreakdown.rewardFit}
            />

            <Score
              label="Progression"
              value={strategy.rankingBreakdown.progressionFit}
            />

            <Score
              label="Equipment"
              value={strategy.rankingBreakdown.equipmentFit}
            />

            <Score
              label="Playstyle"
              value={strategy.rankingBreakdown.playstyleFit}
            />

          </div>


          <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-black uppercase tracking-wider text-cyan-400">
              Atlas Reasoning
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              {strategy.reason}
            </p>

          </div>

        </>
      ) : (
        <p className="mt-4 text-sm text-zinc-400">
          Atlas is waiting for additional mission data.
        </p>
      )}

    </section>
  );
}


function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-white">
        {value}
      </p>

    </div>
  );
}


function Score({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-black text-amber-400">
        {value}%
      </p>

    </div>
  );
}