import AtlasIntelligencePanel from "./AtlasIntelligencePanel";
import AtlasMetricCard from "./AtlasMetricCard";

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
        <AtlasMetricCard
          label="Current Cash"
          value={formatMoney(simulation.currentCash)}
          tone="zinc"
        />

        <AtlasMetricCard
          label="Investment"
          value={formatMoney(simulation.purchaseCost)}
          tone="amber"
        />

        <AtlasMetricCard
          label="After Purchase"
          value={formatMoney(
            simulation.cashAfterPurchase
          )}
          tone="cyan"
        />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <AtlasMetricCard
          label="Empire Score"
          value={`+${simulation.scoreDelta}`}
          tone="emerald"
        />

        <AtlasMetricCard
          label="Risk"
          value={simulation.risk}
          tone="amber"
        />
      </div>

      <div className="mt-5">
        <AtlasIntelligencePanel
          eyebrow="Liquidity Impact"
          tone="zinc"
        >
          <p className="text-sm leading-6 text-zinc-300">
            {simulation.liquidityImpact}
          </p>
        </AtlasIntelligencePanel>
      </div>

      <div className="mt-5">
        <AtlasIntelligencePanel
          eyebrow="Atlas Verdict"
          tone="cyan"
        >
          <p className="text-sm leading-6 text-zinc-200">
            {simulation.recommendation}
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {simulation.projectedOutcome}
          </p>
        </AtlasIntelligencePanel>
      </div>
    </section>
  );
}