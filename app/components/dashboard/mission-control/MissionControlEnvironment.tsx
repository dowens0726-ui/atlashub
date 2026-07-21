import type {
  ReactNode,
} from "react";


type MissionControlEnvironmentProps = {
  children:
    ReactNode;
};


export default function MissionControlEnvironment({
  children,
}: MissionControlEnvironmentProps) {
  return (
    <div className="atlas-mission-environment">
      <div
        aria-hidden="true"
        className="atlas-mission-environment__sky"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__horizon"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__grid"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__radar atlas-mission-environment__radar--primary"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__radar atlas-mission-environment__radar--secondary"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__signal atlas-mission-environment__signal--left"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__signal atlas-mission-environment__signal--right"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__vignette"
      />

      <div className="atlas-mission-environment__content">
        {children}
      </div>
    </div>
  );
}
