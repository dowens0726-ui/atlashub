import type {
  DashboardModel,
} from "@/app/services";

import type {
  AtlasBrainModel,
} from "./dashboard-intelligence.engine";

import type {
  AtlasDashboardDerivedState,
  AtlasDashboardIntelligence,
} from "./dashboard-composer.engine";

import type {
  StrategicRoadmap,
} from "./strategic-roadmap.engine";

export type DashboardHeroViewModel = {
  dashboard: DashboardModel;
};

export type DashboardRoadmapViewModel = {
  roadmap: StrategicRoadmap;

  actionLabel:
    AtlasDashboardIntelligence["command"]["actionLabel"];

  href:
    AtlasDashboardIntelligence["command"]["href"];
};

export type DashboardAtlasViewModel = {
  intelligence: AtlasBrainModel;
};

export type DashboardMissionControlViewModel = {
  plan: AtlasBrainModel["sessionPlan"];

  reasoning: AtlasBrainModel["sessionReasoning"];

  roadmap: StrategicRoadmap;

  derived: AtlasDashboardDerivedState;
};

export type DashboardOverviewViewModel = {
  dashboard: DashboardModel;
};

export type DashboardInsightsViewModel = {
  insights: DashboardModel["empire"]["insights"];
};

export type DashboardObjectivesViewModel = {
  objectives: DashboardModel["objectives"];
};

export type DashboardViewModel = {
  dashboard: DashboardModel;

  intelligence: AtlasDashboardIntelligence;

  hero: DashboardHeroViewModel;

  roadmap: DashboardRoadmapViewModel;

  atlas: DashboardAtlasViewModel;

  missionControl: DashboardMissionControlViewModel;

  overview: DashboardOverviewViewModel;

  insights: DashboardInsightsViewModel;

  objectives: DashboardObjectivesViewModel;
};

export type BuildDashboardViewModelInput = {
  dashboard: DashboardModel;

  intelligence: AtlasDashboardIntelligence;
};

export function buildDashboardViewModel({
  dashboard,
  intelligence,
}: BuildDashboardViewModelInput): DashboardViewModel {
  return {
    dashboard,

    intelligence,

    hero: {
      dashboard,
    },

    roadmap: {
      roadmap:
        intelligence.roadmap,

      actionLabel:
        intelligence.command.actionLabel,

      href:
        intelligence.command.href,
    },

    atlas: {
      intelligence:
        intelligence.brain,
    },

    missionControl: {
      plan:
        intelligence.brain.sessionPlan,

      reasoning:
        intelligence.brain.sessionReasoning,

      roadmap:
        intelligence.roadmap,

      derived:
        intelligence.derived,
    },

    overview: {
      dashboard,
    },

    insights: {
      insights:
        dashboard.empire.insights,
    },

    objectives: {
      objectives:
        dashboard.objectives,
    },
  };
}