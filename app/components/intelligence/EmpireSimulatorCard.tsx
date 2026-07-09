import type { EmpireSimulation } from "@/app/intelligence";

type EmpireSimulatorCardProps = {
  simulation: EmpireSimulation;
};

export default function EmpireSimulatorCard({
  simulation,
}: EmpireSimulatorCardProps) {
  const formatMoney = (value: number) =>
    value < 0
      ? `-$${Math.abs(value).toLocaleString()}`
      : `$${value.toLocaleString()}`;

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-xl">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
        Empire Simulator
      </p>

      <h3 className="mt-3 text-2xl font-black text-white">
        Simulated Decision
      </h3>

      <p className="mt-2 text-sm text-zinc-400">
        Atlas projected the impact of:
      </p>

      <p className="mt-2 text-xl font-black text-white">
        {simulation.targetName}
      </p>


      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Stat
          label="Current Cash"
          value={formatMoney(simulation.currentCash)}
        />

        <Stat
          label="Investment"
          value={formatMoney(simulation.purchaseCost)}
        />

        <Stat
          label="After Purchase"
          value={formatMoney(simulation.cashAfterPurchase)}
        />
      </div>


      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <Stat
          label="Empire Score"
          value={`+${simulation.scoreDelta}`}
        />

        <Stat
          label="Risk"
          value={simulation.risk}
        />
      </div>


      <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Liquidity Impact
        </p>

        <p className="mt-2 text-sm leading-6 text-zinc-300">
          {simulation.liquidityImpact}
        </p>
      </div>


      <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] p-4">
        <p className="text-xs font-black uppercase tracking-wide text-cyan-400">
          Atlas Verdict
        </p>

        <p className="mt-3 text-sm leading-6 text-zinc-200">
          {simulation.recommendation}
        </p>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {simulation.projectedOutcome}
        </p>
      </div>
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
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-white">
        {value}
      </p>
    </div>
  );
}