import type { EmpireModel } from "@/app/types";
import { AnimatedNumber, Card, MetricRow, ProgressBar } from "@/app/components/ui";

type EmpireScoreCardProps = {
  empire: EmpireModel;
};

export default function EmpireScoreCard({ empire }: EmpireScoreCardProps) {
  return (
    <Card
      padding="lg"
      accent="amber"
      className="bg-gradient-to-br from-zinc-900 to-zinc-950"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Empire Score
          </p>

          <div className="mt-5 flex items-end gap-4">
            <p className="text-7xl font-black text-white">
              <AnimatedNumber value={empire.overallScore} />
            </p>

            <p className="pb-2 text-xl font-black text-amber-400">
              Grade {empire.overallGrade}
            </p>
          </div>

          <div className="mt-6 max-w-xl">
            <ProgressBar
              value={empire.overallScore}
              label="Overall Empire Health"
            />
          </div>
        </div>

        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/40 px-5 lg:max-w-md">
          <MetricRow
            label={empire.financialStrength.label}
            value={`${empire.financialStrength.score} / ${empire.financialStrength.grade}`}
          />

          <MetricRow
            label={empire.businessPortfolio.label}
            value={`${empire.businessPortfolio.score} / ${empire.businessPortfolio.grade}`}
          />

          <MetricRow
            label={empire.growthPotential.label}
            value={`${empire.growthPotential.score} / ${empire.growthPotential.grade}`}
          />

          <MetricRow
            label={empire.efficiency.label}
            value={`${empire.efficiency.score} / ${empire.efficiency.grade}`}
          />
        </div>
      </div>
    </Card>
  );
}