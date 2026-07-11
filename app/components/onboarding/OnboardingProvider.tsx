"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  AtlasIdentityResult,
  AtlasOnboardingAnswers,
  AtlasOnboardingGoalId,
  AtlasPlaystyleId,
} from "@/app/types/onboarding";

const ONBOARDING_STORAGE_KEY = "atlas:onboarding";

type OnboardingState = {
  answers: AtlasOnboardingAnswers;
  identity: AtlasIdentityResult | null;
  completed: boolean;
};

type OnboardingContextValue = OnboardingState & {
  hydrated: boolean;
  setPlaystyles: (playstyles: AtlasPlaystyleId[]) => void;
  setGoals: (goals: AtlasOnboardingGoalId[]) => void;
  setIdentity: (identity: AtlasIdentityResult | null) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

type OnboardingProviderProps = {
  children: ReactNode;
};

const DEFAULT_ONBOARDING_STATE: OnboardingState = {
  answers: {
    playstyles: [],
    goals: [],
  },
  identity: null,
  completed: false,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

function isStoredOnboardingState(
  value: unknown,
): value is OnboardingState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<OnboardingState>;

  if (!candidate.answers || typeof candidate.answers !== "object") {
    return false;
  }

  return (
    isStringArray(candidate.answers.playstyles) &&
    isStringArray(candidate.answers.goals) &&
    typeof candidate.completed === "boolean" &&
    (candidate.identity === null ||
      candidate.identity === undefined ||
      typeof candidate.identity === "object")
  );
}

function loadOnboardingState(): OnboardingState {
  try {
    const storedValue = window.localStorage.getItem(
      ONBOARDING_STORAGE_KEY,
    );

    if (!storedValue) {
      return DEFAULT_ONBOARDING_STATE;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!isStoredOnboardingState(parsedValue)) {
      window.localStorage.removeItem(ONBOARDING_STORAGE_KEY);
      return DEFAULT_ONBOARDING_STATE;
    }

    return {
      answers: {
        playstyles: parsedValue.answers.playstyles,
        goals: parsedValue.answers.goals,
      },
      identity: parsedValue.identity ?? null,
      completed: parsedValue.completed,
    };
  } catch (error) {
    console.error("Atlas could not load onboarding state.", error);

    return DEFAULT_ONBOARDING_STATE;
  }
}

function persistOnboardingState(state: OnboardingState) {
  try {
    window.localStorage.setItem(
      ONBOARDING_STORAGE_KEY,
      JSON.stringify(state),
    );
  } catch (error) {
    console.error("Atlas could not save onboarding state.", error);
  }
}

export default function OnboardingProvider({
  children,
}: OnboardingProviderProps) {
  const [state, setState] = useState<OnboardingState>(
    DEFAULT_ONBOARDING_STATE,
  );

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedState = loadOnboardingState();

    setState(storedState);
    setHydrated(true);
  }, []);

  const updateAndPersist = useCallback(
    (
      createNextState: (
        currentState: OnboardingState,
      ) => OnboardingState,
    ) => {
      setState((currentState) => {
        const nextState = createNextState(currentState);

        persistOnboardingState(nextState);

        return nextState;
      });
    },
    [],
  );

  const setPlaystyles = useCallback(
    (playstyles: AtlasPlaystyleId[]) => {
      updateAndPersist((currentState) => ({
        ...currentState,
        answers: {
          ...currentState.answers,
          playstyles,
        },
        identity: null,
        completed: false,
      }));
    },
    [updateAndPersist],
  );

  const setGoals = useCallback(
    (goals: AtlasOnboardingGoalId[]) => {
      updateAndPersist((currentState) => ({
        ...currentState,
        answers: {
          ...currentState.answers,
          goals,
        },
        identity: null,
        completed: false,
      }));
    },
    [updateAndPersist],
  );

  const setIdentity = useCallback(
    (identity: AtlasIdentityResult | null) => {
      updateAndPersist((currentState) => ({
        ...currentState,
        identity,
      }));
    },
    [updateAndPersist],
  );

  const completeOnboarding = useCallback(() => {
    updateAndPersist((currentState) => ({
      ...currentState,
      completed: true,
    }));
  }, [updateAndPersist]);

  const resetOnboarding = useCallback(() => {
    try {
      window.localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    } catch (error) {
      console.error("Atlas could not clear onboarding state.", error);
    }

    setState(DEFAULT_ONBOARDING_STATE);
  }, []);

  const contextValue = useMemo<OnboardingContextValue>(
    () => ({
      answers: state.answers,
      identity: state.identity,
      completed: state.completed,
      hydrated,
      setPlaystyles,
      setGoals,
      setIdentity,
      completeOnboarding,
      resetOnboarding,
    }),
    [
      completeOnboarding,
      hydrated,
      resetOnboarding,
      setGoals,
      setIdentity,
      setPlaystyles,
      state,
    ],
  );

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboarding must be used within an OnboardingProvider.",
    );
  }

  return context;
}