import type {
  AtlasMissionLearning,
  AtlasMissionStrategy,
} from "@/app/intelligence";


type AtlasMissionStrategyCardProps = {
  strategy: AtlasMissionStrategy;

  missionLearning: AtlasMissionLearning | null;
};


export default function AtlasMissionStrategyCard({
  strategy,
  missionLearning,
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


          {missionLearning && (
            <div className="mt-6 rounded-2xl border border-purple-400/20 bg-purple-400/5 p-5">

              <p className="text-xs font-black uppercase tracking-wider text-purple-400">
                Atlas Mission Learning
              </p>


              <p className="mt-3 text-2xl font-black text-white">
                {missionLearning.confidence}%
              </p>


              <div className="mt-4 space-y-3">

                <InfoCard
                  title="Difficulty Preference"
                  value={
                    missionLearning.difficultyPreference
                  }
                />


                <InfoCard
                  title="Efficiency Profile"
                  value={
                    missionLearning.efficiencyProfile
                  }
                />


                <InfoCard
                  title="Recommendation Adjustment"
                  value={
                    missionLearning.recommendationAdjustment
                  }
                />

              </div>

            </div>
          )}


          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">

            <p className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Mission Readiness
            </p>

            <p className="mt-3 text-3xl font-black text-white">
              {strategy.loadout.readinessScore}%
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Atlas confidence that your current equipment setup is prepared for this mission.
            </p>

          </div>


          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <LoadoutCard
              title="Recommended Vehicle"
              value={
                strategy.loadout.vehicle?.name ??
                "No vehicle found"
              }
              reason={
                strategy.loadout.vehicleReason
              }
            />


            <LoadoutCard
              title="Recommended Weapon"
              value={
                strategy.loadout.weapon?.name ??
                "No weapon found"
              }
              reason={
                strategy.loadout.weaponReason
              }
            />

          </div>


          <ExecutionSection
            title="Preparation"
            items={strategy.execution.preparationSteps}
          />


          <ExecutionSection
            title="Objectives"
            items={strategy.execution.objectives}
          />


          <ExecutionSection
            title="Risk Factors"
            items={strategy.execution.riskFactors}
          />


          <ExecutionSection
            title="Efficiency Tips"
            items={strategy.execution.efficiencyTips}
          />


          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <InfoCard
              title="Reward Optimization"
              value={
                strategy.execution.rewardOptimization
              }
            />


            <InfoCard
              title="Completion Strategy"
              value={
                strategy.execution.completionStrategy
              }
            />

          </div>


          <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-400/5 p-5">

            <p className="text-xs font-black uppercase tracking-wider text-violet-400">
              Empire Impact
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">

              <InfoCard
                title="Reward Value"
                value={strategy.impact.rewardValue}
              />

              <InfoCard
                title="Completion Priority"
                value={strategy.impact.completionPriority}
              />

              <InfoCard
                title="Financial Impact"
                value={strategy.impact.financialImpact}
              />

              <InfoCard
                title="Next Milestone"
                value={strategy.impact.nextMilestone}
              />

            </div>


            <p className="mt-4 text-sm text-zinc-300">
              {strategy.impact.recommendedAction}
            </p>

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


function ExecutionSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

      <p className="text-xs font-black uppercase tracking-wider text-amber-400">
        {title}
      </p>

      <div className="mt-3 space-y-2">

        {items.map(
          (item) => (
            <p
              key={item}
              className="text-sm text-zinc-300"
            >
              • {item}
            </p>
          )
        )}

      </div>

    </div>
  );
}


function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

      <p className="text-xs font-black uppercase tracking-wider text-zinc-500">
        {title}
      </p>

      <p className="mt-3 text-sm leading-6 text-zinc-300">
        {value}
      </p>

    </div>
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


function LoadoutCard({
  title,
  value,
  reason,
}: {
  title: string;
  value: string;
  reason: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc_950 p-5">

      <p className="text-xs font-black uppercase tracking-wider text-zinc-500">
        {title}
      </p>

      <p className="mt-2 text-lg font-black text-white">
        {value}
      </p>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {reason}
      </p>

    </div>
  );
}