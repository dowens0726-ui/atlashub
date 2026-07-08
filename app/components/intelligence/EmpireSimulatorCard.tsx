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
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Empire Simulator
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          What happens if you choose this?
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Atlas is projecting the impact of:{" "}
          <span className="font-semibold text-white">
            {simulation.targetName}
          </span>
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Cost
          </p>
          <p className="mt-2 text-lg font-bold text-white">
            {formatMoney(simulation.purchaseCost)}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Cash After
          </p>
          <p className="mt-2 text-lg font-bold text-white">
            {formatMoney(simulation.cashAfterPurchase)}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Score Impact
          </p>
          <p className="mt-2 text-lg font-bold text-white">
            {simulation.scoreDelta > 0 ? "+" : ""}
            {simulation.scoreDelta}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Risk Level
        </p>

        <p className="mt-2 text-sm font-semibold text-white">
          {simulation.risk}
        </p>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {simulation.projectedOutcome}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-cyan-300">
        {simulation.recommendation}
      </p>
    </section>
  );
}