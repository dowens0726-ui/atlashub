// Core Intelligence
export * from "./atlas-brain-copilot.engine";
export * from "./atlas-brain-snapshot.engine";
export * from "./atlas-brain-change-detection.engine";
export * from "./atlas-reactive-timeline.engine";
export * from "./atlas-persistent-memory.engine";
export * from "./atlas-memory-storage.adapter";
export * from "./atlas-event-bus.engine";
export * from "./atlas-session-persistence.engine";
export {
  buildAtlasIntelligenceDiagnostics,
} from "./atlas-intelligence-diagnostics.engine";

export type {
  AtlasIntelligenceDiagnostics,
  AtlasIntelligenceHealth,
} from "./atlas-intelligence-diagnostics.engine";
export * from "./dashboard-composer.engine";
export * from "./dashboard-intelligence.engine";
export * from "./planning.engine";
export * from "./reasoning.engine";
export * from "./session.engine";
export * from "./session-reasoning.engine";
export * from "./atlas-behavior-profile.engine";
export * from "./atlas-strategy-evolution.engine";
export * from "./atlas-adaptive-recommendation.engine";

// Recommendation System
export * from "./recommendation.engine";
export * from "./recommendation-weighting.engine";
export * from "./relationship.engine";
export * from "./advisor.service";
export * from "./identity-advisor.engine";
export * from "./personal-picks.engine";
export * from "./match.engine";
export * from "./ranking.engine";

// Strategic Intelligence
export * from "./strategic-command.engine";
export * from "./strategic-roadmap.engine";
export * from "./opportunity.engine";
export * from "./strategy-feedback.engine";
export * from "./strategy-report.engine";
export * from "./adaptive-strategy.engine";
export * from "./situation-analysis.engine";
export * from "./atlas-situation-briefing.engine";

// Economy & ROI
export * from "./economy.engine";
export * from "./roi.engine";
export * from "./forecast.engine";
export * from "./impact.engine";
export * from "./prediction.engine";

// Player Intelligence
export * from "./player-identity.engine";
export * from "./behavioral-intelligence.engine";
export * from "./property-intelligence.engine";
export * from "./property-recommendation.engine";
export * from "./learning.engine";
export * from "./decision-history.engine";
export * from "./action-tracker.engine";
export * from "./outcome.engine";
export * from "./outcome-validation.engine";

// Mission Intelligence
export * from "./mission-strategy.engine";
export * from "./mission-learning.engine";
export * from "./mission-learning-update.engine";
export * from "./mission-feedback.engine";
export * from "./mission-outcome.engine";

// Memory
export * from "./memory.engine";
export * from "./memory-history.engine";
export * from "./memory-insight.engine";

// Empire
export * from "./empire.engine";
export * from "./empire-simulator.engine";

// Timeline & Feed
export * from "./timeline.engine";
export * from "./intelligence-timeline.engine";
export * from "./intelligence-feed.engine";
export * from "./daily-objectives.engine";
export * from "./next-action.engine";

// Coach
export * from "./coach.engine";
export * from "./briefing.engine";
export * from "./greeting.engine";

// Vehicle Intelligence
export * from "./garage-copilot.engine";
export * from "./vehicle";