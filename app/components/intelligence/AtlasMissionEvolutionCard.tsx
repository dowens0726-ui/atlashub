import type {
  AtlasMissionLearning,
  AtlasMissionOutcome,
  AtlasMissionLearningUpdate,
} from "@/app/intelligence";


type AtlasMissionEvolutionCardProps = {
  learning: AtlasMissionLearning;

  outcome: AtlasMissionOutcome | null;

  update: AtlasMissionLearningUpdate | null;
};


export default function AtlasMissionEvolutionCard({
  learning,
  outcome,
  update,
}: AtlasMissionEvolutionCardProps) {
  return (
    <section className="rounded-3xl border border-violet-400/20 bg-violet-400/5 p-6">

      <p className="text-xs font-black uppercase tracking-[0.3em] text-violet-400">
        Mission Evolution
      </p>


      <h3 className="mt-3 text-2xl font-black text-white">
        {learning.title}
      </h3>


      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

        <p className="text-xs font-black uppercase tracking-wider text-zinc-500">
          Learning Confidence
        </p>

        <p className="mt-2 text-4xl font-black text-white">
          {learning.confidence}%
        </p>

      </div>


      <div className="mt-5 grid gap-4 md:grid-cols-2">

        <InfoCard
          title="Mission Preference"
          items={learning.preferredMissionTypes}
        />

        <InfoCard
          title="Successful Patterns"
          items={learning.successfulPatterns}
        />

        <InfoCard
          title="Avoided Patterns"
          items={learning.avoidedPatterns}
        />

        <InfoCard
          title="Difficulty Preference"
          items={[
            learning.difficultyPreference,
          ]}
        />

      </div>


      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

        <p className="text-xs font-black uppercase tracking-wider text-cyan-400">
          Atlas Efficiency Profile
        </p>

        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {learning.efficiencyProfile}
        </p>

      </div>


      {outcome && (
        <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">

          <p className="text-xs font-black uppercase tracking-wider text-emerald-400">
            Mission Outcome
          </p>


          <p className="mt-3 text-xl font-black text-white">
            {outcome.missionTitle}
          </p>


          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            <Score
              label="Efficiency"
              value={outcome.efficiencyScore}
            />

            <Score
              label="Reward"
              value={outcome.rewardEfficiency}
            />

            <Score
              label="Equipment"
              value={outcome.equipmentEffectiveness}
            />

            <Score
              label="Difficulty Accuracy"
              value={outcome.difficultyAccuracy}
            />

          </div>


          <p className="mt-4 text-sm text-zinc-300">
            {outcome.summary}
          </p>

        </div>
      )}


      {update && (
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

          <p className="text-xs font-black uppercase tracking-wider text-amber-400">
            Atlas Adjustment
          </p>


          <p className="mt-3 text-sm leading-6 text-zinc-300">
            {update.recommendationAdjustment}
          </p>


          <p className="mt-3 text-sm font-bold text-white">
            Updated Confidence: {update.updatedConfidence}%
          </p>


          {update.addedPatterns.length > 0 && (
            <div className="mt-4 space-y-2">

              {update.addedPatterns.map(
                (pattern) => (
                  <p
                    key={pattern}
                    className="text-sm text-zinc-300"
                  >
                    • {pattern}
                  </p>
                )
              )}

            </div>
          )}

        </div>
      )}

    </section>
  );
}


function InfoCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

      <p className="text-xs font-black uppercase tracking-wider text-zinc-500">
        {title}
      </p>


      <div className="mt-3 space-y-2">

        {items.length > 0 ? (
          items.map(
            (item) => (
              <p
                key={item}
                className="text-sm text-zinc-300"
              >
                • {item}
              </p>
            )
          )
        ) : (
          <p className="text-sm text-zinc-500">
            No data yet.
          </p>
        )}

      </div>

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


      <p className="mt-2 text-lg font-black text-emerald-400">
        {value}%
      </p>

    </div>
  );
}