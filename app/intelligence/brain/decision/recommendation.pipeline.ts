import {
  buildRecommendationPrediction,
} from "../../prediction.engine";

import {
  buildRecommendationWeight,
} from "../../recommendation-weighting.engine";


type RecommendationPredictionInput =
  Parameters<
    typeof buildRecommendationPrediction
  >;

type RecommendationWeightingInput =
  Parameters<
    typeof buildRecommendationWeight
  >[0];


export type AtlasRecommendationPipelineInput =
  Omit<
    RecommendationWeightingInput,
    "recommendation" | "learning"
  > & {
    recommendation:
      RecommendationPredictionInput[0];

    learning:
      RecommendationPredictionInput[1];
  };


export function buildAtlasRecommendationPipeline({
  recommendation,
  learning,
  ...weightingContext
}: AtlasRecommendationPipelineInput) {
  const recommendationPrediction =
    buildRecommendationPrediction(
      recommendation,
      learning
    );

  const predictedRecommendation = {
    ...recommendation,

    confidence:
      Math.min(
        100,
        recommendation.confidence +
          recommendationPrediction.confidenceBoost
      ),

    prediction:
      recommendationPrediction,
  };

  const recommendationWeighting =
    buildRecommendationWeight({
      ...weightingContext,

      recommendation:
        predictedRecommendation,

      learning,
    });

  const weightedRecommendation = {
    ...predictedRecommendation,

    confidence:
      recommendationWeighting.confidence,
  };

  return {
    recommendationPrediction,

    recommendationWeighting,

    weightedRecommendation,
  };
}


export type AtlasRecommendationPipelineModel =
  ReturnType<
    typeof buildAtlasRecommendationPipeline
  >;
