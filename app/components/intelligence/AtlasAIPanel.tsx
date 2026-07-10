import AtlasAdvisorCard from "./AtlasAdvisorCard";
import AtlasCoreCard from "./AtlasCoreCard";
import AtlasDailyObjectivesCard from "./AtlasDailyObjectivesCard";
import AtlasEvolutionCard from "./AtlasEvolutionCard";
import AtlasIntelligenceFeed from "./AtlasIntelligenceFeed";
import AtlasMemoryCard from "./AtlasMemoryCard";
import AtlasStatusCard from "./AtlasStatusCard";
import AtlasStrategyReportCard from "./AtlasStrategyReportCard";
import EmpireForecastCard from "./EmpireForecastCard";
import EmpireSimulatorCard from "./EmpireSimulatorCard";
import EmpireTimelineCard from "./EmpireTimelineCard";
import PersonalPicksCard from "./PersonalPicksCard";

import { GlowCard } from "@/app/components/ui";

import type {
  AtlasImpact,
  AtlasLearningProfile,
  AtlasMemory,
  AtlasRecommendation,
  AtlasReasoning,
  AtlasStrategyReport,
  DailyObjective,
  EmpireForecast,
  EmpireSimulation,
  EmpireTimelinePoint,
  IntelligenceInsight,
  MemoryHistoryItem,
  NextAction,
} from "@/app/intelligence";

type AtlasAIPanelProps = {
  recommendation: AtlasRecommendation;
  personalPicks: AtlasRecommendation[];

  reasoning: AtlasReasoning;

  nextAction: NextAction;
  impact: AtlasImpact;

  forecast: EmpireForecast;
  simulation: EmpireSimulation;
  strategyReport: AtlasStrategyReport;

  learningProfile: AtlasLearningProfile;

  timeline: EmpireTimelinePoint[];

  memory: AtlasMemory;
  memoryHistory: MemoryHistoryItem[];

  dailyObjectives: DailyObjective[];

  insights: IntelligenceInsight[];
};

export default function AtlasAIPanel({
  recommendation,
  personalPicks,
  reasoning,
  nextAction,
  impact,
  forecast,
  simulation,
  strategyReport,
  learningProfile,
  timeline,
  memory,
  memoryHistory,
  dailyObjectives,
  insights,
}: AtlasAIPanelProps) {
  return (
    <GlowCard accent="cyan">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
          Atlas Intelligence
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          AI Command Module
        </h2>

        <p className="mt-2 text-zinc-400">
          Atlas is analyzing your empire and adapting to your decisions.
        </p>
      </div>


      <div className="space-y-10">

        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
            Atlas Evolution
          </p>

          <AtlasEvolutionCard
            learning={learningProfile}
          />
        </section>


        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-violet-400">
            Strategic Overview
          </p>

          <AtlasStrategyReportCard
            report={strategyReport}
          />
        </section>


        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            Strategic Decision
          </p>

          <AtlasCoreCard
            action={nextAction}
            impact={impact}
            recommendation={recommendation}
            reasoning={reasoning}
          />
        </section>


        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
            Empire Strategy
          </p>

          <div className="space-y-6">
            <PersonalPicksCard
              picks={personalPicks}
            />

            <EmpireSimulatorCard
              simulation={simulation}
            />

            <EmpireForecastCard
              forecast={forecast}
            />

            <EmpireTimelineCard
              points={timeline}
            />
          </div>
        </section>


        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">
            Player Intelligence
          </p>

          <div className="space-y-6">
            <AtlasMemoryCard
              memory={memory}
              history={memoryHistory}
            />

            <AtlasDailyObjectivesCard
              objectives={dailyObjectives}
            />

            <AtlasStatusCard />

            <AtlasAdvisorCard
              recommendation={recommendation}
              reasoning={reasoning}
            />

            <AtlasIntelligenceFeed
              insights={insights}
            />
          </div>
        </section>

      </div>
    </GlowCard>
  );
}