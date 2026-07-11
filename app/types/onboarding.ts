export const ATLAS_PLAYSTYLE_IDS = [
  "entrepreneur",
  "collector",
  "racer",
  "explorer",
  "completionist",
  "solo-operator",
] as const;

export type AtlasPlaystyleId = (typeof ATLAS_PLAYSTYLE_IDS)[number];

export type AtlasPlaystyleOption = {
  id: AtlasPlaystyleId;
  title: string;
  description: string;
  focus: string;
  icon: string;
};

export const ATLAS_ONBOARDING_GOAL_IDS = [
  "build-biggest-empire",
  "own-everything",
  "complete-everything",
  "become-wealthy",
  "explore-everything",
  "dominate-online",
] as const;

export type AtlasOnboardingGoalId =
  (typeof ATLAS_ONBOARDING_GOAL_IDS)[number];

export type AtlasOnboardingGoalOption = {
  id: AtlasOnboardingGoalId;
  title: string;
  description: string;
  focus: string;
  icon: string;
};

export type AtlasOnboardingAnswers = {
  playstyles: AtlasPlaystyleId[];
  goals: AtlasOnboardingGoalId[];
};

export type AtlasIdentityResult = {
  identity: string;
  playstyle: string;
  primaryFocus: string;
  secondaryFocus: string;
  confidence: number;
  explanation: string;
};