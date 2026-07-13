import AtlasActionTrackerCard from "./AtlasActionTrackerCard";
import AtlasAdvisorCard from "./AtlasAdvisorCard";
import AtlasBehaviorCard from "./AtlasBehaviorCard";
import AtlasCoreCard from "./AtlasCoreCard";
import AtlasDailyObjectivesCard from "./AtlasDailyObjectivesCard";
import AtlasEvolutionCard from "./AtlasEvolutionCard";
import AtlasIdentityCard from "./AtlasIdentityCard";
import AtlasIntelligenceFeed from "./AtlasIntelligenceFeed";
import AtlasMemoryCard from "./AtlasMemoryCard";
import AtlasMemoryInsightCard from "./AtlasMemoryInsightCard";
import AtlasMissionEvolutionCard from "./AtlasMissionEvolutionCard";
import AtlasMissionStrategyCard from "./AtlasMissionStrategyCard";
import AtlasOutcomeCard from "./AtlasOutcomeCard";
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

import {
  GlowCard,
} from "@/app/components/ui";

import type {
  AtlasAdaptiveStrategy,
  AtlasBehaviorProfile,
  AtlasImpact,
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
  recommendation:
    AtlasRecommendation;

  personalPicks:
    AtlasRecommendation[];

  reasoning:
    AtlasReasoning;

  nextAction:
    NextAction;

  impact:
    AtlasImpact;

  forecast:
    EmpireForecast;

  simulation:
    EmpireSimulation;

  strategyReport:
    AtlasStrategyReport;

  adaptiveStrategy:
    AtlasAdaptiveStrategy;

  strategyFeedback:
    AtlasStrategyFeedback;

  strategicPlan:
    AtlasStrategicPlan;

  missionStrategy:
    AtlasMissionStrategy;

  missionLearning:
    AtlasMissionLearning | null;

  missionOutcome:
    AtlasMissionOutcome | null;

  missionLearningUpdate:
    AtlasMissionLearningUpdate | null;

  learningProfile:
    AtlasLearningProfile;

  behaviorProfile:
    AtlasBehaviorProfile;

  outcome:
    AtlasOutcome;

  playerAction:
    AtlasPlayerAction;

  outcomeValidation:
    AtlasValidatedOutcome;

  playerIdentity:
    AtlasPlayerIdentity;

  identityAdvisor:
    IdentityAdvisorResult;

  timeline:
    EmpireTimelinePoint[];

  memory:
    AtlasMemory;

  memoryHistory:
    MemoryHistoryItem[];

  memoryInsight:
    AtlasMemoryInsight;

  dailyObjectives:
    DailyObjective[];

  insights:
    IntelligenceInsight[];
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
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            Player Identity
          </p>

          <div className="space-y-6">
            <AtlasIdentityCard
              identity={
                playerIdentity
              }
            />

            <AtlasBehaviorCard
              behavior={
                behaviorProfile
              }
            />
          </div>
        </section>


        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
            Atlas Evolution
          </p>

          <div className="space-y-6">
            <AtlasEvolutionCard
              learning={
                learningProfile
              }
            />

            <AtlasActionTrackerCard
              action={
                playerAction
              }
            />

            <AtlasOutcomeCard
              outcome={
                outcome
              }
            />

            <AtlasValidationCard
              validation={
                outcomeValidation
              }
            />
          </div>
        </section>


        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-violet-400">
            Strategic Overview
          </p>

          <div className="space-y-6">
            <AtlasStrategyReportCard
              report={
                strategyReport
              }
            />

            <AtlasStrategyInsightCard
              strategy={
                adaptiveStrategy
              }
            />

            <AtlasStrategyFeedbackCard
              feedback={
                strategyFeedback
              }
            />

            <AtlasStrategicPlanCard
              plan={
                strategicPlan
              }
            />

            <AtlasMissionStrategyCard
              strategy={
                missionStrategy
              }
              missionLearning={
                missionLearning
              }
            />

            {missionLearning ? (
              <AtlasMissionEvolutionCard
                learning={
                  missionLearning
                }
                outcome={
                  missionOutcome
                }
                update={
                  missionLearningUpdate
                }
              />
            ) : null}
          </div>
        </section>


        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            Strategic Decision
          </p>

          <AtlasCoreCard
            action={
              nextAction
            }
            impact={
              impact
            }
            recommendation={
              recommendation
            }
            reasoning={
              reasoning
            }
          />
        </section>


        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
            Empire Strategy
          </p>

          <div className="space-y-6">
            <PersonalPicksCard
              picks={
                personalPicks
              }
            />

            <EmpireSimulatorCard
              simulation={
                simulation
              }
            />

            <EmpireForecastCard
              forecast={
                forecast
              }
            />

            <EmpireTimelineCard
              points={
                timeline
              }
            />
          </div>
        </section>


        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">
            Player Intelligence
          </p>

          <div className="space-y-6">
            <AtlasMemoryCard
              memory={
                memory
              }
              history={
                memoryHistory
              }
            />

            <AtlasMemoryInsightCard
              insight={
                memoryInsight
              }
            />

            <AtlasDailyObjectivesCard
              objectives={
                dailyObjectives
              }
            />

            <AtlasStatusCard />

            <AtlasAdvisorCard
              recommendation={
                recommendation
              }
              reasoning={
                reasoning
              }
              identityAdvisor={
                identityAdvisor
              }
            />

            <AtlasIntelligenceFeed
              insights={
                insights
              }
            />
          </div>
        </section>
      </div>
    </GlowCard>
  );
}