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

type BrainModuleProps = {
  index: string;
  label: string;
  description: string;
  children: React.ReactNode;
};

function clampPercentage(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function BrainModule({
  index,
  label,
  description,
  children,
}: BrainModuleProps) {
  return (
    <section className="relative">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] text-[0.65rem] font-black tracking-[0.16em] text-cyan-200">
          {index}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white">
            {label}
          </p>

          <p className="mt-1 text-sm leading-6 text-zinc-500">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-6">{children}</div>
    </section>
  );
}

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
  const confidence = clampPercentage(
    recommendation.confidence
  );

  const confidenceLabel =
    confidence >= 85
      ? "High confidence"
      : confidence >= 65
        ? "Moderate confidence"
        : "Review recommended";

  const recommendationTitle =
    recommendation.title || "Strategic recommendation ready";

  return (
    <GlowCard accent="cyan">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-cyan-400/15 bg-zinc-950/70">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.13),transparent_30%),radial-gradient(circle_at_100%_18%,rgba(139,92,246,0.1),transparent_28%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
        />

        <div className="relative p-5 sm:p-6 lg:p-8">
          <header className="border-b border-white/[0.07] pb-7">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">
                    Atlas
                  </p>

                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.18em] text-emerald-200">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]"
                    />
                    Online
                  </div>
                </div>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                  Atlas Intelligence Core
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                  Atlas is interpreting your identity, recent decisions,
                  strategic patterns, empire trajectory, and available next
                  actions in one coordinated intelligence system.
                </p>
              </div>

              <div className="min-w-[220px] rounded-2xl border border-white/[0.07] bg-black/25 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-zinc-500">
                      Decision Confidence
                    </p>

                    <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-white">
                      {confidence}%
                    </p>
                  </div>

                  <div className="pb-1 text-right">
                    <p className="text-xs font-bold text-emerald-300">
                      {confidenceLabel}
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 transition-[width] duration-700"
                    style={{
                      width: `${confidence}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-violet-400/15 bg-violet-400/[0.04] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-violet-300">
                    Primary Analysis
                  </p>

                  <p className="mt-2 text-lg font-black leading-7 text-white">
                    {recommendationTitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  Live recommendation model
                </div>
              </div>
            </div>
          </header>

          <div className="relative mt-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-[17px] top-2 hidden w-px bg-gradient-to-b from-cyan-400/35 via-violet-400/20 to-transparent sm:block"
            />

            <div className="space-y-12">
              <BrainModule
                index="01"
                label="Live Analysis"
                description="Current coaching signal and the latest intelligence changes detected by Atlas."
              >
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
              </BrainModule>

              <BrainModule
                index="02"
                label="Player Model"
                description="The identity, behavior, and persistent learning signals Atlas uses to personalize its decisions."
              >
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
              </BrainModule>

              <BrainModule
                index="03"
                label="Strategic Reasoning"
                description="How Atlas converts learned behavior and current conditions into a coordinated plan."
              >
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
              </BrainModule>

              <BrainModule
                index="04"
                label="Decision Engine"
                description="The active recommendation, supporting logic, expected impact, and immediate next action."
              >
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
              </BrainModule>

              <BrainModule
                index="05"
                label="Empire Projection"
                description="Personalized opportunities, scenario modeling, future impact, and long-range progression."
              >
                <AtlasSection
                  title="Empire Strategy"
                  accent="emerald"
                >
                  <PersonalPicksCard
                    picks={personalPicks}
                  />

                  <AtlasFeatureGate
                    capability="empire-simulator"
                    upgradeHref="/pro"
                    previewEyebrow="Atlas Pro Preview"
                    previewTitle="Empire Simulator"
                    previewDescription="Unlock scenario planning to compare hypothetical purchases, progression paths, and strategic decisions before committing your resources."
                  >
                    <EmpireSimulatorCard
                      simulation={simulation}
                    />
                  </AtlasFeatureGate>

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
              </BrainModule>

              <BrainModule
                index="06"
                label="Persistent Intelligence"
                description="Memory, objectives, advisor logic, and intelligence signals that continue improving Atlas over time."
              >
                <AtlasSection
                  title="Player Intelligence"
                  accent="amber"
                >
                  <AtlasFeatureGate
                    capability="atlas-memory"
                    upgradeHref="/pro"
                    previewEyebrow="Atlas Pro Preview"
                    previewTitle="Atlas Memory"
                    previewDescription="Atlas Pro remembers your gameplay history, strategic decisions, milestones, and long-term progression to provide increasingly personalized recommendations."
                  >
                    <AtlasMemoryCard
                      memory={memory}
                      history={memoryHistory}
                    />
                  </AtlasFeatureGate>

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
              </BrainModule>
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}