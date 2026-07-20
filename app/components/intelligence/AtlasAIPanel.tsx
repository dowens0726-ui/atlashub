import AtlasActionTrackerCard from "./AtlasActionTrackerCard";
import AtlasAdvisorCard from "./AtlasAdvisorCard";
import AtlasBehaviorCard from "./AtlasBehaviorCard";
import AtlasCoachCard from "./AtlasCoachCard";
import AtlasCoreCard from "./AtlasCoreCard";
import AtlasDailyObjectivesCard from "./AtlasDailyObjectivesCard";
import AtlasEvolutionCard from "./AtlasEvolutionCard";
import AtlasIdentityCard from "./AtlasIdentityCard";
import AtlasIntelligenceFeed from "./AtlasIntelligenceFeed";
import AtlasIntelligenceTimelineCard from "./AtlasIntelligenceTimelineCard";
import AtlasMemoryCard from "./AtlasMemoryCard";
import AtlasMemoryInsightCard from "./AtlasMemoryInsightCard";
import AtlasMissionEvolutionCard from "./AtlasMissionEvolutionCard";
import AtlasMissionStrategyCard from "./AtlasMissionStrategyCard";
import AtlasOutcomeCard from "./AtlasOutcomeCard";
import AtlasRecommendationAnalysisCard from "./AtlasRecommendationAnalysisCard";
import AtlasSection from "./AtlasSection";
import AtlasStatusCard from "./AtlasStatusCard";
import AtlasStrategicPlanCard from "./AtlasStrategicPlanCard";
import AtlasStrategyFeedbackCard from "./AtlasStrategyFeedbackCard";
import AtlasStrategyInsightCard from "./AtlasStrategyInsightCard";
import AtlasStrategyReportCard from "./AtlasStrategyReportCard";
import AtlasValidationCard from "./AtlasValidationCard";
import EmpireForecastCard from "./EmpireForecastCard";
import EmpireSimulatorCard from "./EmpireSimulatorCard";
import EmpireTimelineCard from "./EmpireTimelineCard";
import PersonalPicksCard from "./PersonalPicksCard";

import { AtlasFeatureGate } from "@/app/components/platform";
import { GlowCard } from "@/app/components/ui";

import type {
  AtlasAdaptiveStrategy,
  AtlasBehaviorProfile,
  AtlasCoachBriefing,
  AtlasImpact,
  AtlasIntelligenceTimeline,
  AtlasLearningProfile,
  AtlasMemory,
  AtlasMemoryInsight,
  AtlasMissionLearning,
  AtlasMissionLearningUpdate,
  AtlasMissionOutcome,
  AtlasMissionStrategy,
  AtlasOutcome,
  AtlasPlayerAction,
  AtlasPlayerIdentity,
  AtlasRecommendation,
  AtlasRecommendationWeight,
  AtlasReasoning,
  AtlasStrategicPlan,
  AtlasStrategyFeedback,
  AtlasStrategyReport,
  AtlasValidatedOutcome,
  DailyObjective,
  EmpireForecast,
  EmpireSimulation,
  EmpireTimelinePoint,
  IdentityAdvisorResult,
  IntelligenceInsight,
  MemoryHistoryItem,
  NextAction,
} from "@/app/intelligence";

type AtlasAIPanelProps = {
  coachBriefing: AtlasCoachBriefing;
  recommendation: AtlasRecommendation;
  recommendationWeighting: AtlasRecommendationWeight;
  intelligenceTimeline: AtlasIntelligenceTimeline;
  personalPicks: AtlasRecommendation[];
  reasoning: AtlasReasoning;
  nextAction: NextAction;
  impact: AtlasImpact;
  forecast: EmpireForecast;
  simulation: EmpireSimulation;
  strategyReport: AtlasStrategyReport;
  adaptiveStrategy: AtlasAdaptiveStrategy;
  strategyFeedback: AtlasStrategyFeedback;
  strategicPlan: AtlasStrategicPlan;
  missionStrategy: AtlasMissionStrategy;
  missionLearning: AtlasMissionLearning | null;
  missionOutcome: AtlasMissionOutcome | null;
  missionLearningUpdate: AtlasMissionLearningUpdate | null;
  learningProfile: AtlasLearningProfile;
  behaviorProfile: AtlasBehaviorProfile;
  outcome: AtlasOutcome;
  playerAction: AtlasPlayerAction;
  outcomeValidation: AtlasValidatedOutcome;
  playerIdentity: AtlasPlayerIdentity;
  identityAdvisor: IdentityAdvisorResult;
  timeline: EmpireTimelinePoint[];
  memory: AtlasMemory;
  memoryHistory: MemoryHistoryItem[];
  memoryInsight: AtlasMemoryInsight;
  dailyObjectives: DailyObjective[];
  insights: IntelligenceInsight[];
};

export default function AtlasAIPanel({
  coachBriefing,
  recommendation,
  recommendationWeighting,
  intelligenceTimeline,
  personalPicks,
  reasoning,
  nextAction,
  impact,
  forecast,
  simulation,
  strategyReport,
  adaptiveStrategy,
  strategyFeedback,
  strategicPlan,
  missionStrategy,
  missionLearning,
  missionOutcome,
  missionLearningUpdate,
  learningProfile,
  behaviorProfile,
  outcome,
  playerAction,
  outcomeValidation,
  playerIdentity,
  identityAdvisor,
  timeline,
  memory,
  memoryHistory,
  memoryInsight,
  dailyObjectives,
  insights,
}: AtlasAIPanelProps) {

  return (
    <GlowCard accent="cyan">
      <header className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
          Atlas Intelligence
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          AI Command Module
        </h2>

        <p className="mt-2 text-zinc-400">
          Atlas is analyzing your empire and adapting to your decisions.
        </p>
      </header>

      <div className="space-y-10">
        <AtlasSection
          title="Atlas Coach"
          accent="cyan"
        >
          <AtlasCoachCard briefing={coachBriefing} />
        </AtlasSection>

        <AtlasSection
          title="Intelligence Timeline"
          accent="violet"
        >
          <AtlasIntelligenceTimelineCard
            timeline={intelligenceTimeline}
          />
        </AtlasSection>

        <AtlasSection
          title="Player Identity"
          accent="cyan"
        >
          <AtlasIdentityCard
            identity={playerIdentity}
          />

          <AtlasBehaviorCard
            behavior={behaviorProfile}
          />
        </AtlasSection>

        <AtlasSection
          title="Atlas Evolution"
          accent="emerald"
        >
          <AtlasEvolutionCard
            learning={learningProfile}
          />

          <AtlasActionTrackerCard
            action={playerAction}
          />

          <AtlasOutcomeCard
            outcome={outcome}
          />

          <AtlasValidationCard
            validation={outcomeValidation}
          />
        </AtlasSection>

        <AtlasSection
          title="Strategic Overview"
          accent="violet"
        >
          <AtlasStrategyReportCard
            report={strategyReport}
          />

          <AtlasStrategyInsightCard
            strategy={adaptiveStrategy}
          />

          <AtlasStrategyFeedbackCard
            feedback={strategyFeedback}
          />

          <AtlasStrategicPlanCard
            plan={strategicPlan}
          />

          <AtlasMissionStrategyCard
            strategy={missionStrategy}
            missionLearning={missionLearning}
          />

          {missionLearning ? (
            <AtlasMissionEvolutionCard
              learning={missionLearning}
              outcome={missionOutcome}
              update={missionLearningUpdate}
            />
          ) : null}
        </AtlasSection>

        <AtlasSection
          title="Strategic Decision"
          accent="cyan"
        >
          <AtlasRecommendationAnalysisCard
            weighting={recommendationWeighting}
          />

          <AtlasCoreCard
            action={nextAction}
            impact={impact}
            recommendation={recommendation}
            reasoning={reasoning}
          />
        </AtlasSection>

        <AtlasSection
          title="Empire Strategy"
          accent="emerald"
        >
          <PersonalPicksCard
            picks={personalPicks}
          />

          <EmpireSimulatorCard
            simulation={simulation}
          />

          <AtlasFeatureGate
            capability="empire-forecast"
            upgradeHref="/pro"
            previewEyebrow="Atlas Pro Preview"
            previewTitle="Empire Forecast"
            previewDescription="Unlock predictive empire forecasting to see how future purchases and strategic decisions can impact your progression."
          >
            <EmpireForecastCard
              forecast={forecast}
            />
          </AtlasFeatureGate>

          <EmpireTimelineCard
            points={timeline}
          />
        </AtlasSection>

        <AtlasSection
          title="Player Intelligence"
          accent="amber"
        >
          <AtlasMemoryCard
            memory={memory}
            history={memoryHistory}
          />

          <AtlasMemoryInsightCard
            insight={memoryInsight}
          />

          <AtlasDailyObjectivesCard
            objectives={dailyObjectives}
          />

          <AtlasStatusCard />

          <AtlasAdvisorCard
            recommendation={recommendation}
            reasoning={reasoning}
            identityAdvisor={identityAdvisor}
          />

          <AtlasIntelligenceFeed
            insights={insights}
          />
        </AtlasSection>
      </div>
    </GlowCard>
  );
}