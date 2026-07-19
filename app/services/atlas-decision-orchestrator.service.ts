import {
  buildAtlasDecision,
  type AtlasAdaptiveRecommendationResult,
  type AtlasDecision,
  type AtlasDecisionContext,
} from "@/app/intelligence";


export const ATLAS_DECISION_ORCHESTRATOR_VERSION = 1;


export type AtlasDecisionOrchestrationStatus =
  | "completed"
  | "completed-with-warnings"
  | "failed";


export type AtlasDecisionOrchestrationStage =
  | "behavior-profile"
  | "strategy-evolution"
  | "adaptive-recommendations"
  | "decision";


export type AtlasDecisionOrchestrationWarningCode =
  | "missing-activity"
  | "missing-candidates"
  | "empty-recommendations"
  | "low-decision-confidence"
  | "decision-reassessment-required"
  | "stage-duration-threshold"
  | "custom";


export type AtlasDecisionOrchestrationWarning = {
  code: AtlasDecisionOrchestrationWarningCode;

  stage: AtlasDecisionOrchestrationStage | null;

  message: string;

  metadata?: Record<string, unknown>;
};


export type AtlasDecisionOrchestrationError = {
  stage: AtlasDecisionOrchestrationStage;

  name: string;

  message: string;

  cause: unknown;
};


export type AtlasDecisionOrchestrationStageResult<TValue> = {
  stage: AtlasDecisionOrchestrationStage;

  startedAt: string;

  completedAt: string;

  durationMilliseconds: number;

  value: TValue;
};


export type AtlasDecisionOrchestrationMetadata = {
  version: number;

  executionId: string;

  startedAt: string;

  completedAt: string;

  durationMilliseconds: number;

  stageDurations: Record<
    AtlasDecisionOrchestrationStage,
    number
  >;

  source: string | null;

  requestMetadata: Record<string, unknown>;
};


export type AtlasDecisionOrchestrationInput<
  TActivity,
  TCandidate,
  TPreviousBehaviorProfile = unknown,
  TPreviousStrategyEvolution = unknown,
> = {
  activity: TActivity;

  candidates: TCandidate[];

  previousBehaviorProfile?: TPreviousBehaviorProfile | null;

  previousStrategyEvolution?: TPreviousStrategyEvolution | null;

  decisionContext?: AtlasDecisionContext;

  generatedAt?: string;

  source?: string;

  metadata?: Record<string, unknown>;
};


export type AtlasBehaviorProfileStageInput<
  TActivity,
  TPreviousBehaviorProfile,
> = {
  activity: TActivity;

  previousBehaviorProfile:
    TPreviousBehaviorProfile | null;

  generatedAt: string;

  metadata: Record<string, unknown>;
};


export type AtlasStrategyEvolutionStageInput<
  TBehaviorProfile,
  TPreviousStrategyEvolution,
> = {
  behaviorProfile: TBehaviorProfile;

  previousStrategyEvolution:
    TPreviousStrategyEvolution | null;

  generatedAt: string;

  metadata: Record<string, unknown>;
};


export type AtlasAdaptiveRecommendationStageInput<
  TBehaviorProfile,
  TStrategyEvolution,
  TCandidate,
> = {
  behaviorProfile: TBehaviorProfile;

  strategyEvolution: TStrategyEvolution;

  candidates: TCandidate[];

  generatedAt: string;

  metadata: Record<string, unknown>;
};


export type AtlasDecisionStageInput = {
  adaptiveRecommendations:
    AtlasAdaptiveRecommendationResult;

  context: AtlasDecisionContext;

  generatedAt: string;
};


export type AtlasDecisionOrchestratorDependencies<
  TActivity,
  TCandidate,
  TBehaviorProfile,
  TStrategyEvolution,
  TPreviousBehaviorProfile = TBehaviorProfile,
  TPreviousStrategyEvolution = TStrategyEvolution,
> = {
  buildBehaviorProfile: (
    input: AtlasBehaviorProfileStageInput<
      TActivity,
      TPreviousBehaviorProfile
    >
  ) =>
    | TBehaviorProfile
    | Promise<TBehaviorProfile>;

  buildStrategyEvolution: (
    input: AtlasStrategyEvolutionStageInput<
      TBehaviorProfile,
      TPreviousStrategyEvolution
    >
  ) =>
    | TStrategyEvolution
    | Promise<TStrategyEvolution>;

  buildAdaptiveRecommendations: (
    input: AtlasAdaptiveRecommendationStageInput<
      TBehaviorProfile,
      TStrategyEvolution,
      TCandidate
    >
  ) =>
    | AtlasAdaptiveRecommendationResult
    | Promise<AtlasAdaptiveRecommendationResult>;

  buildDecision?: (
    input: AtlasDecisionStageInput
  ) =>
    | AtlasDecision
    | Promise<AtlasDecision>;
};


export type AtlasDecisionOrchestrationSuccess<
  TBehaviorProfile,
  TStrategyEvolution,
> = {
  status:
    | "completed"
    | "completed-with-warnings";

  behaviorProfile: TBehaviorProfile;

  strategyEvolution: TStrategyEvolution;

  adaptiveRecommendations:
    AtlasAdaptiveRecommendationResult;

  decision: AtlasDecision;

  stages: {
    behaviorProfile:
      AtlasDecisionOrchestrationStageResult<TBehaviorProfile>;

    strategyEvolution:
      AtlasDecisionOrchestrationStageResult<TStrategyEvolution>;

    adaptiveRecommendations:
      AtlasDecisionOrchestrationStageResult<AtlasAdaptiveRecommendationResult>;

    decision:
      AtlasDecisionOrchestrationStageResult<AtlasDecision>;
  };

  warnings:
    AtlasDecisionOrchestrationWarning[];

  error: null;

  metadata:
    AtlasDecisionOrchestrationMetadata;
};


export type AtlasDecisionOrchestrationFailure = {
  status: "failed";

  behaviorProfile: null;

  strategyEvolution: null;

  adaptiveRecommendations: null;

  decision: null;

  stages: {
    behaviorProfile: null;

    strategyEvolution: null;

    adaptiveRecommendations: null;

    decision: null;
  };

  warnings:
    AtlasDecisionOrchestrationWarning[];

  error:
    AtlasDecisionOrchestrationError;

  metadata:
    AtlasDecisionOrchestrationMetadata;
};


export type AtlasDecisionOrchestrationResult<
  TBehaviorProfile,
  TStrategyEvolution,
> =
  | AtlasDecisionOrchestrationSuccess<
      TBehaviorProfile,
      TStrategyEvolution
    >
  | AtlasDecisionOrchestrationFailure;


type StageExecution<TValue> = {
  result:
    AtlasDecisionOrchestrationStageResult<TValue>;

  completedAtMilliseconds: number;
};


function resolveTimestamp(
  value?: string
): string {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed =
    new Date(value);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}


function createExecutionId(): string {
  const timestamp =
    Date.now().toString(36);

  const randomSegment =
    Math.random()
      .toString(36)
      .slice(2, 10);

  return [
    "atlas-decision",
    timestamp,
    randomSegment,
  ].join("-");
}


function getErrorName(
  error: unknown
): string {
  if (
    error instanceof Error
  ) {
    return error.name;
  }

  return "UnknownError";
}


function getErrorMessage(
  error: unknown
): string {
  if (
    error instanceof Error
  ) {
    return error.message;
  }

  if (
    typeof error === "string"
  ) {
    return error;
  }

  return "An unknown orchestration error occurred.";
}


function buildOrchestrationError(
  stage: AtlasDecisionOrchestrationStage,
  error: unknown
): AtlasDecisionOrchestrationError {
  return {
    stage,

    name:
      getErrorName(
        error
      ),

    message:
      getErrorMessage(
        error
      ),

    cause:
      error,
  };
}


function buildStageDurationRecord(
  behaviorProfileMilliseconds = 0,
  strategyEvolutionMilliseconds = 0,
  adaptiveRecommendationsMilliseconds = 0,
  decisionMilliseconds = 0
): Record<
  AtlasDecisionOrchestrationStage,
  number
> {
  return {
    "behavior-profile":
      behaviorProfileMilliseconds,

    "strategy-evolution":
      strategyEvolutionMilliseconds,

    "adaptive-recommendations":
      adaptiveRecommendationsMilliseconds,

    decision:
      decisionMilliseconds,
  };
}


function buildMetadata(
  executionId: string,
  startedAtMilliseconds: number,
  completedAtMilliseconds: number,
  stageDurations: Record<
    AtlasDecisionOrchestrationStage,
    number
  >,
  source: string | undefined,
  requestMetadata:
    Record<string, unknown>
): AtlasDecisionOrchestrationMetadata {
  return {
    version:
      ATLAS_DECISION_ORCHESTRATOR_VERSION,

    executionId,

    startedAt:
      new Date(
        startedAtMilliseconds
      ).toISOString(),

    completedAt:
      new Date(
        completedAtMilliseconds
      ).toISOString(),

    durationMilliseconds:
      Math.max(
        0,
        completedAtMilliseconds -
        startedAtMilliseconds
      ),

    stageDurations,

    source:
      source?.trim() ||
      null,

    requestMetadata:
      requestMetadata,
  };
}


async function executeStage<TValue>(
  stage: AtlasDecisionOrchestrationStage,
  operation: () =>
    | TValue
    | Promise<TValue>
): Promise<
  StageExecution<TValue>
> {
  const startedAtMilliseconds =
    Date.now();

  const value =
    await operation();

  const completedAtMilliseconds =
    Date.now();

  return {
    result: {
      stage,

      startedAt:
        new Date(
          startedAtMilliseconds
        ).toISOString(),

      completedAt:
        new Date(
          completedAtMilliseconds
        ).toISOString(),

      durationMilliseconds:
        Math.max(
          0,
          completedAtMilliseconds -
          startedAtMilliseconds
        ),

      value,
    },

    completedAtMilliseconds,
  };
}


function addInputWarnings<
  TActivity,
  TCandidate,
>(
  input: AtlasDecisionOrchestrationInput<
    TActivity,
    TCandidate,
    unknown,
    unknown
  >,
  warnings:
    AtlasDecisionOrchestrationWarning[]
): void {
  if (
    input.activity === null ||
    input.activity === undefined
  ) {
    warnings.push({
      code:
        "missing-activity",

      stage:
        "behavior-profile",

      message:
        "The orchestration request did not include player activity.",
    });
  }

  if (
    input.candidates.length === 0
  ) {
    warnings.push({
      code:
        "missing-candidates",

      stage:
        "adaptive-recommendations",

      message:
        "The orchestration request did not include recommendation candidates.",
    });
  }
}


function addRecommendationWarnings(
  adaptiveRecommendations:
    AtlasAdaptiveRecommendationResult,
  warnings:
    AtlasDecisionOrchestrationWarning[]
): void {
  if (
    adaptiveRecommendations
      .recommendations.length ===
    0
  ) {
    warnings.push({
      code:
        "empty-recommendations",

      stage:
        "adaptive-recommendations",

      message:
        "The adaptive recommendation engine returned no recommendations.",
    });
  }
}


function addDecisionWarnings(
  decision: AtlasDecision,
  warnings:
    AtlasDecisionOrchestrationWarning[]
): void {
  if (
    decision.confidence < 50
  ) {
    warnings.push({
      code:
        "low-decision-confidence",

      stage:
        "decision",

      message:
        `Atlas produced a decision with ${decision.confidence}% confidence.`,

      metadata: {
        confidence:
          decision.confidence,

        confidenceLevel:
          decision.confidenceLevel,
      },
    });
  }

  if (
    decision.shouldReassess
  ) {
    warnings.push({
      code:
        "decision-reassessment-required",

      stage:
        "decision",

      message:
        "The final Atlas decision requires reassessment before strong execution.",
    });
  }
}


function addDurationWarnings(
  stageDurations: Record<
    AtlasDecisionOrchestrationStage,
    number
  >,
  warnings:
    AtlasDecisionOrchestrationWarning[],
  thresholdMilliseconds = 1000
): void {
  const stages =
    Object.entries(
      stageDurations
    ) as Array<
      [
        AtlasDecisionOrchestrationStage,
        number,
      ]
    >;

  for (
    const [
      stage,
      durationMilliseconds,
    ] of stages
  ) {
    if (
      durationMilliseconds <=
      thresholdMilliseconds
    ) {
      continue;
    }

    warnings.push({
      code:
        "stage-duration-threshold",

      stage,

      message:
        `${stage} took ${durationMilliseconds} milliseconds to complete.`,

      metadata: {
        durationMilliseconds,

        thresholdMilliseconds,
      },
    });
  }
}


function buildFailedResult(
  error:
    AtlasDecisionOrchestrationError,
  warnings:
    AtlasDecisionOrchestrationWarning[],
  executionId: string,
  startedAtMilliseconds: number,
  stageDurations: Record<
    AtlasDecisionOrchestrationStage,
    number
  >,
  source: string | undefined,
  requestMetadata:
    Record<string, unknown>
): AtlasDecisionOrchestrationFailure {
  const completedAtMilliseconds =
    Date.now();

  return {
    status:
      "failed",

    behaviorProfile:
      null,

    strategyEvolution:
      null,

    adaptiveRecommendations:
      null,

    decision:
      null,

    stages: {
      behaviorProfile:
        null,

      strategyEvolution:
        null,

      adaptiveRecommendations:
        null,

      decision:
        null,
    },

    warnings,

    error,

    metadata:
      buildMetadata(
        executionId,
        startedAtMilliseconds,
        completedAtMilliseconds,
        stageDurations,
        source,
        requestMetadata
      ),
  };
}


export async function runAtlasDecisionOrchestration<
  TActivity,
  TCandidate,
  TBehaviorProfile,
  TStrategyEvolution,
  TPreviousBehaviorProfile =
    TBehaviorProfile,
  TPreviousStrategyEvolution =
    TStrategyEvolution,
>(
  input: AtlasDecisionOrchestrationInput<
    TActivity,
    TCandidate,
    TPreviousBehaviorProfile,
    TPreviousStrategyEvolution
  >,
  dependencies: AtlasDecisionOrchestratorDependencies<
    TActivity,
    TCandidate,
    TBehaviorProfile,
    TStrategyEvolution,
    TPreviousBehaviorProfile,
    TPreviousStrategyEvolution
  >
): Promise<
  AtlasDecisionOrchestrationResult<
    TBehaviorProfile,
    TStrategyEvolution
  >
> {
  const executionId =
    createExecutionId();

  const startedAtMilliseconds =
    Date.now();

  const generatedAt =
    resolveTimestamp(
      input.generatedAt
    );

  const requestMetadata =
    input.metadata ??
    {};

  const warnings:
    AtlasDecisionOrchestrationWarning[] =
      [];

  const stageDurations =
    buildStageDurationRecord();

  addInputWarnings(
    input as AtlasDecisionOrchestrationInput<
      TActivity,
      TCandidate,
      unknown,
      unknown
    >,
    warnings
  );

  let behaviorProfileStage:
    AtlasDecisionOrchestrationStageResult<TBehaviorProfile>;

  try {
    const execution =
      await executeStage(
        "behavior-profile",
        () =>
          dependencies
            .buildBehaviorProfile({
              activity:
                input.activity,

              previousBehaviorProfile:
                input.previousBehaviorProfile ??
                null,

              generatedAt,

              metadata:
                requestMetadata,
            })
      );

    behaviorProfileStage =
      execution.result;

    stageDurations[
      "behavior-profile"
    ] =
      behaviorProfileStage
        .durationMilliseconds;
  } catch (error) {
    return buildFailedResult(
      buildOrchestrationError(
        "behavior-profile",
        error
      ),
      warnings,
      executionId,
      startedAtMilliseconds,
      stageDurations,
      input.source,
      requestMetadata
    );
  }

  let strategyEvolutionStage:
    AtlasDecisionOrchestrationStageResult<TStrategyEvolution>;

  try {
    const execution =
      await executeStage(
        "strategy-evolution",
        () =>
          dependencies
            .buildStrategyEvolution({
              behaviorProfile:
                behaviorProfileStage
                  .value,

              previousStrategyEvolution:
                input.previousStrategyEvolution ??
                null,

              generatedAt,

              metadata:
                requestMetadata,
            })
      );

    strategyEvolutionStage =
      execution.result;

    stageDurations[
      "strategy-evolution"
    ] =
      strategyEvolutionStage
        .durationMilliseconds;
  } catch (error) {
    return buildFailedResult(
      buildOrchestrationError(
        "strategy-evolution",
        error
      ),
      warnings,
      executionId,
      startedAtMilliseconds,
      stageDurations,
      input.source,
      requestMetadata
    );
  }

  let adaptiveRecommendationsStage:
    AtlasDecisionOrchestrationStageResult<AtlasAdaptiveRecommendationResult>;

  try {
    const execution =
      await executeStage(
        "adaptive-recommendations",
        () =>
          dependencies
            .buildAdaptiveRecommendations({
              behaviorProfile:
                behaviorProfileStage
                  .value,

              strategyEvolution:
                strategyEvolutionStage
                  .value,

              candidates:
                input.candidates,

              generatedAt,

              metadata:
                requestMetadata,
            })
      );

    adaptiveRecommendationsStage =
      execution.result;

    stageDurations[
      "adaptive-recommendations"
    ] =
      adaptiveRecommendationsStage
        .durationMilliseconds;
  } catch (error) {
    return buildFailedResult(
      buildOrchestrationError(
        "adaptive-recommendations",
        error
      ),
      warnings,
      executionId,
      startedAtMilliseconds,
      stageDurations,
      input.source,
      requestMetadata
    );
  }

  addRecommendationWarnings(
    adaptiveRecommendationsStage
      .value,
    warnings
  );

  let decisionStage:
    AtlasDecisionOrchestrationStageResult<AtlasDecision>;

  try {
    const execution =
      await executeStage(
        "decision",
        () => {
          const decisionInput:
            AtlasDecisionStageInput = {
              adaptiveRecommendations:
                adaptiveRecommendationsStage
                  .value,

              context:
                input.decisionContext ??
                {},

              generatedAt,
            };

          if (
            dependencies
              .buildDecision
          ) {
            return dependencies
              .buildDecision(
                decisionInput
              );
          }

          return buildAtlasDecision(
            decisionInput
          );
        }
      );

    decisionStage =
      execution.result;

    stageDurations[
      "decision"
    ] =
      decisionStage
        .durationMilliseconds;
  } catch (error) {
    return buildFailedResult(
      buildOrchestrationError(
        "decision",
        error
      ),
      warnings,
      executionId,
      startedAtMilliseconds,
      stageDurations,
      input.source,
      requestMetadata
    );
  }

  addDecisionWarnings(
    decisionStage.value,
    warnings
  );

  addDurationWarnings(
    stageDurations,
    warnings
  );

  const completedAtMilliseconds =
    Date.now();

  return {
    status:
      warnings.length > 0
        ? "completed-with-warnings"
        : "completed",

    behaviorProfile:
      behaviorProfileStage.value,

    strategyEvolution:
      strategyEvolutionStage.value,

    adaptiveRecommendations:
      adaptiveRecommendationsStage
        .value,

    decision:
      decisionStage.value,

    stages: {
      behaviorProfile:
        behaviorProfileStage,

      strategyEvolution:
        strategyEvolutionStage,

      adaptiveRecommendations:
        adaptiveRecommendationsStage,

      decision:
        decisionStage,
    },

    warnings,

    error:
      null,

    metadata:
      buildMetadata(
        executionId,
        startedAtMilliseconds,
        completedAtMilliseconds,
        stageDurations,
        input.source,
        requestMetadata
      ),
  };
}


export function createAtlasDecisionOrchestrator<
  TActivity,
  TCandidate,
  TBehaviorProfile,
  TStrategyEvolution,
  TPreviousBehaviorProfile =
    TBehaviorProfile,
  TPreviousStrategyEvolution =
    TStrategyEvolution,
>(
  dependencies: AtlasDecisionOrchestratorDependencies<
    TActivity,
    TCandidate,
    TBehaviorProfile,
    TStrategyEvolution,
    TPreviousBehaviorProfile,
    TPreviousStrategyEvolution
  >
) {
  return {
    run(
      input: AtlasDecisionOrchestrationInput<
        TActivity,
        TCandidate,
        TPreviousBehaviorProfile,
        TPreviousStrategyEvolution
      >
    ): Promise<
      AtlasDecisionOrchestrationResult<
        TBehaviorProfile,
        TStrategyEvolution
      >
    > {
      return runAtlasDecisionOrchestration(
        input,
        dependencies
      );
    },
  };
}