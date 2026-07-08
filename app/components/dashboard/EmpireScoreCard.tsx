import type { EmpireModel } from "@/app/types";

import {
  AnimatedNumber,
  ProgressBar,
} from "@/app/components/ui";

import {
  GlassPanel,
  HeroMetrics,
} from "@/app/components/design-system";

type EmpireScoreCardProps = {
  empire: EmpireModel;
};

export default function EmpireScoreCard({
  empire,
}: EmpireScoreCardProps) {
  const metrics = [
    {
      label: empire.financialStrength.label,
      value: `${empire.financialStrength.score} • ${empire.financialStrength.grade}`,
    },
    {
      label: empire.businessPortfolio.label,
      value: `${empire.businessPortfolio.score} • ${empire.businessPortfolio.grade}`,
    },
    {
      label: empire.growthPotential.label,
      value: `${empire.growthPotential.score} • ${empire.growthPotential.grade}`,
    },
    {
      label: empire.efficiency.label,
      value: `${empire.efficiency.score} • ${empire.efficiency.grade}`,
    },
  ];

  return (
    <GlassPanel
      title="Empire Score"
      subtitle="Atlas evaluates the overall strength of your criminal empire based on financial health, business growth, efficiency, and long-term potential."
      className="border-amber-400/20 bg-amber-400/[0.03]"
    >
      <div className="space-y-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-end gap-4">
              <p className="text-7xl font-black text-white">
                <AnimatedNumber value={empire.overallScore} />
              </p>

              <div className="pb-2">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Grade
                </p>

                <p className="text-2xl font-black text-amber-400">
                  {empire.overallGrade}
                </p>
              </div>
            </div>

            <div className="mt-6 max-w-xl">
              <ProgressBar
                value={empire.overallScore}
                label="Overall Empire Health"
              />
            </div>
          </div>
        </div>

        <HeroMetrics metrics={metrics} columns={2} />
      </div>
    </GlassPanel>
  );
}