import AtlasAdvisorCard from "./AtlasAdvisorCard";
import AtlasCoreCard from "./AtlasCoreCard";
import AtlasDailyObjectivesCard from "./AtlasDailyObjectivesCard";
import AtlasIntelligenceFeed from "./AtlasIntelligenceFeed";
import AtlasMemoryCard from "./AtlasMemoryCard";
import AtlasStatusCard from "./AtlasStatusCard";
import EmpireForecastCard from "./EmpireForecastCard";
import EmpireTimelineCard from "./EmpireTimelineCard";

import { GlowCard } from "@/app/components/ui";

import type {
  AtlasImpact,
  AtlasMemory,
  AtlasRecommendation,
  AtlasReasoning,
  DailyObjective,
  EmpireForecast,
  EmpireTimelinePoint,
  IntelligenceInsight,
  MemoryHistoryItem,
  NextAction,
} from "@/app/intelligence";

type AtlasAIPanelProps = {
  recommendation: AtlasRecommendation;
  reasoning: AtlasReasoning;
  nextAction: NextAction;
  impact: AtlasImpact;
  forecast: EmpireForecast;
  timeline: EmpireTimelinePoint[];
  memory: AtlasMemory;
  memoryHistory: MemoryHistoryItem[];
  dailyObjectives: DailyObjective[];
  insights: IntelligenceInsight[];
};

export default function AtlasAIPanel({
  recommendation,
  reasoning,
  nextAction,
  impact,
  forecast,
  timeline,
  memory,
  memoryHistory,
  dailyObjectives,
  insights,
}: AtlasAIPanelProps) {
  return (
    <GlowCard accent="cyan">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
          Atlas Intelligence
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          AI Command Module
        </h2>

        <p className="mt-2 text-zinc-400">
          Atlas is analyzing your empire and optimizing your next move.
        </p>
      </div>

      <div className="space-y-6">
        <AtlasCoreCard action={nextAction} impact={impact} />

        <AtlasMemoryCard memory={memory} history={memoryHistory} />

        <AtlasDailyObjectivesCard objectives={dailyObjectives} />

        <EmpireForecastCard forecast={forecast} />

        <EmpireTimelineCard points={timeline} />

        <AtlasStatusCard />

        <AtlasAdvisorCard
          recommendation={recommendation}
          reasoning={reasoning}
        />

        <AtlasIntelligenceFeed insights={insights} />
      </div>
    </GlowCard>
  );
}