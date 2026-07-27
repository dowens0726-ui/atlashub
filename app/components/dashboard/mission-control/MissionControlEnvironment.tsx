"use client";

import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  AtlasWorldRenderer,
  defaultAtlasWorldConfiguration,
  type AtlasWorldConfiguration,
} from "./world";


type MissionControlEnvironmentProps = {
  children:
    ReactNode;

  worldConfiguration?:
    AtlasWorldConfiguration;
};


type AtlasLightingScenario = {
  id:
    string;

  label:
    string;

  description:
    string;

  configuration:
    Partial<AtlasWorldConfiguration>;
};


const lightingScenarios:
  readonly AtlasLightingScenario[] = [
    {
      id:
        "live",

      label:
        "Live",

      description:
        "World Context Engine",

      configuration:
        {},
    },

    {
      id:
        "dawn-clear",

      label:
        "Dawn",

      description:
        "Clear · Cold · Low",

      configuration: {
        state:
          "ready",

        intensity:
          "low",

        heat:
          "cold",

        timeOfDay:
          "dawn",

        weather:
          "clear",
      },
    },

    {
      id:
        "day-overcast",

      label:
        "Day",

      description:
        "Overcast · Guarded · Medium",

      configuration: {
        state:
          "ready",

        intensity:
          "medium",

        heat:
          "guarded",

        timeOfDay:
          "day",

        weather:
          "overcast",
      },
    },

    {
      id:
        "dusk-haze",

      label:
        "Dusk",

      description:
        "Haze · Elevated · High",

      configuration: {
        state:
          "warning",

        intensity:
          "high",

        heat:
          "elevated",

        timeOfDay:
          "dusk",

        weather:
          "haze",
      },
    },

    {
      id:
        "night-storm",

      label:
        "Storm",

      description:
        "Night · Critical · High",

      configuration: {
        state:
          "warning",

        intensity:
          "high",

        heat:
          "critical",

        timeOfDay:
          "night",

        weather:
          "storm",
      },
    },

    {
      id:
        "loading",

      label:
        "Loading",

      description:
        "Night · Scan sequence",

      configuration: {
        state:
          "loading",

        intensity:
          "high",

        heat:
          "guarded",

        timeOfDay:
          "night",

        weather:
          "clear",
      },
    },

    {
      id:
        "failed",

      label:
        "Failure",

      description:
        "Emergency renderer state",

      configuration: {
        state:
          "failed",

        intensity:
          "high",

        heat:
          "critical",

        timeOfDay:
          "night",

        weather:
          "storm",
      },
    },
  ];


function getWorldDataValue(
  value:
    string | null
) {
  return value ??
    undefined;
}


export default function MissionControlEnvironment({
  children,
  worldConfiguration =
    defaultAtlasWorldConfiguration,
}: MissionControlEnvironmentProps) {
  const [
    selectedScenarioId,
    setSelectedScenarioId,
  ] =
    useState(
      "live"
    );


  const selectedScenario =
    useMemo(
      () =>
        lightingScenarios.find(
          (
            scenario
          ) =>
            scenario.id ===
            selectedScenarioId
        ) ??
        lightingScenarios[0],
      [
        selectedScenarioId,
      ]
    );


  const activeWorldConfiguration =
    useMemo<
      AtlasWorldConfiguration
    >(
      () => {
        if (
          selectedScenario.id ===
          "live"
        ) {
          return worldConfiguration;
        }

        return {
          ...worldConfiguration,
          ...selectedScenario.configuration,

          active:
            true,
        };
      },
      [
        selectedScenario,
        worldConfiguration,
      ]
    );


  const showValidationControls =
    process.env.NODE_ENV !==
    "production";


  return (
    <div
      className="atlas-mission-environment"
      data-world-district={
        getWorldDataValue(
          activeWorldConfiguration
            .district
        )
      }
      data-world-district-category={
        getWorldDataValue(
          activeWorldConfiguration
            .districtCategory
        )
      }
      data-world-economy={
        getWorldDataValue(
          activeWorldConfiguration
            .economy
        )
      }
      data-world-heat={
        getWorldDataValue(
          activeWorldConfiguration
            .heat
        )
      }
      data-world-intensity={
        activeWorldConfiguration
          .intensity
      }
      data-world-operating-status={
        getWorldDataValue(
          activeWorldConfiguration
            .operatingStatus
        )
      }
      data-world-state={
        activeWorldConfiguration
          .state
      }
      data-world-time-of-day={
        getWorldDataValue(
          activeWorldConfiguration
            .timeOfDay
        )
      }
      data-world-weather={
        getWorldDataValue(
          activeWorldConfiguration
            .weather
        )
      }
    >
      <AtlasWorldRenderer
        configuration={
          activeWorldConfiguration
        }
      />

      <div className="atlas-mission-environment__content">
        {children}
      </div>

      {showValidationControls ? (
        <aside
          aria-label="Atlas lighting validation"
          className="
            fixed
            bottom-5
            right-5
            z-[100]
            w-[min(22rem,calc(100vw-2rem))]
            rounded-2xl
            border
            border-cyan-300/20
            bg-slate-950/88
            p-3
            shadow-2xl
            shadow-cyan-950/50
          "
        >
          <div
            className="
              mb-3
              flex
              items-start
              justify-between
              gap-3
            "
          >
            <div>
              <p
                className="
                  text-[0.64rem]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-cyan-300
                "
              >
                Lighting validation
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                {selectedScenario.description}
              </p>
            </div>

            <span
              className="
                rounded-full
                border
                border-emerald-300/20
                bg-emerald-400/10
                px-2
                py-1
                text-[0.58rem]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-emerald-300
              "
            >
              Dev only
            </span>
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-2
            "
          >
            {lightingScenarios.map(
              (
                scenario
              ) => {
                const selected =
                  scenario.id ===
                  selectedScenario.id;

                return (
                  <button
                    key={
                      scenario.id
                    }
                    aria-pressed={
                      selected
                    }
                    className={`
                      rounded-xl
                      border
                      px-3
                      py-2.5
                      text-left
                      transition
                      ${
                        selected
                          ? `
                            border-cyan-300/45
                            bg-cyan-300/12
                            text-cyan-100
                            shadow-lg
                            shadow-cyan-950/30
                          `
                          : `
                            border-white/8
                            bg-white/[0.035]
                            text-slate-300
                            hover:border-white/15
                            hover:bg-white/[0.065]
                          `
                      }
                    `}
                    type="button"
                    onClick={
                      () => {
                        setSelectedScenarioId(
                          scenario.id
                        );
                      }
                    }
                  >
                    <span
                      className="
                        block
                        text-xs
                        font-semibold
                      "
                    >
                      {scenario.label}
                    </span>

                    <span
                      className="
                        mt-0.5
                        block
                        text-[0.62rem]
                        leading-4
                        text-slate-500
                      "
                    >
                      {scenario.description}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          <div
            className="
              mt-3
              grid
              grid-cols-4
              gap-1.5
              border-t
              border-white/8
              pt-3
            "
          >
            <WorldMetric
              label="Time"
              value={
                activeWorldConfiguration
                  .timeOfDay ??
                "none"
              }
            />

            <WorldMetric
              label="Weather"
              value={
                activeWorldConfiguration
                  .weather ??
                "none"
              }
            />

            <WorldMetric
              label="Heat"
              value={
                activeWorldConfiguration
                  .heat ??
                "none"
              }
            />

            <WorldMetric
              label="Power"
              value={
                activeWorldConfiguration
                  .intensity
              }
            />
          </div>
        </aside>
      ) : null}
    </div>
  );
}


type WorldMetricProps = {
  label:
    string;

  value:
    string;
};


function WorldMetric({
  label,
  value,
}: WorldMetricProps) {
  return (
    <div
      className="
        min-w-0
        rounded-lg
        bg-white/[0.035]
        px-2
        py-1.5
      "
    >
      <span
        className="
          block
          text-[0.5rem]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-slate-600
        "
      >
        {label}
      </span>

      <span
        className="
          mt-0.5
          block
          truncate
          text-[0.58rem]
          capitalize
          text-slate-300
        "
      >
        {value}
      </span>
    </div>
  );
}

