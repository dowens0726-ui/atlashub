import type {
  ReactNode,
} from "react";

import AtlasExecutiveDeckSurface from "./AtlasExecutiveDeckSurface";
import ExecutiveStatusBar from "./ExecutiveStatusBar";
import MissionFocusPanel from "./MissionFocusPanel";

import type {
  ExecutiveMetric,
} from "./ExecutiveMetrics";


type ExecutiveCommandDeckProps = {
  greeting:
    string;

  pipelineStatusLabel:
    string;

  pipelineIndicatorClasses:
    string;

  pipelineStatusClasses:
    string;

  urgencyLabel:
    string;

  urgencyClasses:
    string;

  title:
    string;

  summary:
    string;

  immediateNextStep:
    string;

  rationale:
    string;

  longTermDirection:
    string;

  coachingResponse:
    string;

  shouldActNow:
    boolean;

  confidence:
    number;

  metrics:
    ExecutiveMetric[];

  pipelineError?:
    string | null;

  missionDisplay:
    ReactNode;
};


export default function ExecutiveCommandDeck({
  greeting,
  pipelineStatusLabel,
  pipelineIndicatorClasses,
  pipelineStatusClasses,
  urgencyLabel,
  urgencyClasses,
  title,
  summary,
  immediateNextStep,
  rationale,
  longTermDirection,
  coachingResponse,
  shouldActNow,
  confidence,
  metrics,
  pipelineError,
  missionDisplay,
}: ExecutiveCommandDeckProps) {
  return (
    <AtlasExecutiveDeckSurface>
      <div className="relative min-h-[760px]">
        <div className="relative z-20">
          <ExecutiveStatusBar
            greeting={greeting}
            pipelineStatusLabel={pipelineStatusLabel}
            pipelineIndicatorClasses={pipelineIndicatorClasses}
            pipelineStatusClasses={pipelineStatusClasses}
            urgencyLabel={urgencyLabel}
            urgencyClasses={urgencyClasses}
          />
        </div>

        <div className="relative z-10 grid min-w-0 items-stretch gap-6 px-5 pb-6 pt-5 sm:px-7 lg:px-8 lg:pb-8 2xl:grid-cols-[minmax(0,1.62fr)_minmax(340px,0.78fr)] 2xl:gap-8">
          <main className="flex min-w-0 flex-col">
            <MissionFocusPanel
              title={title}
              summary={summary}
              immediateNextStep={immediateNextStep}
              rationale={rationale}
              longTermDirection={longTermDirection}
              coachingResponse={coachingResponse}
              urgencyLabel={urgencyLabel}
              urgencyClasses={urgencyClasses}
              shouldActNow={shouldActNow}
              confidence={confidence}
              metrics={metrics}
              pipelineError={pipelineError}
            />
          </main>

          <aside className="min-w-0 2xl:sticky 2xl:top-6 2xl:self-start">
            {missionDisplay}
          </aside>
        </div>
      </div>
    </AtlasExecutiveDeckSurface>
  );
}
