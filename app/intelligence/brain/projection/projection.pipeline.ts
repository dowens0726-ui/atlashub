import {
  buildEmpireSimulation,
} from "../../empire-simulator.engine";

import {
  buildEmpireForecast,
} from "../../forecast.engine";

import {
  buildEmpireTimeline,
} from "../../timeline.engine";


type EmpireForecastArguments =
  Parameters<
    typeof buildEmpireForecast
  >;

type EmpireSimulationArguments =
  Parameters<
    typeof buildEmpireSimulation
  >;


export type AtlasProjectionPipelineInput = {
  profile:
    EmpireForecastArguments[0];

  empire:
    EmpireForecastArguments[1];

  impact:
    EmpireForecastArguments[2];

  recommendation:
    EmpireSimulationArguments[1];
};


export function buildAtlasProjectionPipeline({
  profile,
  empire,
  impact,
  recommendation,
}: AtlasProjectionPipelineInput) {
  const empireForecast =
    buildEmpireForecast(
      profile,
      empire,
      impact
    );

  const empireSimulation =
    buildEmpireSimulation(
      profile,
      recommendation
    );

  const empireTimeline =
    buildEmpireTimeline(
      empireForecast
    );

  return {
    empireForecast,

    empireSimulation,

    empireTimeline,
  };
}


export type AtlasProjectionPipelineModel =
  ReturnType<
    typeof buildAtlasProjectionPipeline
  >;
