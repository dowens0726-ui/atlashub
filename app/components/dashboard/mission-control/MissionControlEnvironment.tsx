import type {
  ReactNode,
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


export default function MissionControlEnvironment({
  children,
  worldConfiguration =
    defaultAtlasWorldConfiguration,
}: MissionControlEnvironmentProps) {
  return (
    <div
      className="atlas-mission-environment"
      data-world-intensity={
        worldConfiguration.intensity
      }
      data-world-state={
        worldConfiguration.state
      }
    >
      <AtlasWorldRenderer
        configuration={
          worldConfiguration
        }
      />

      <div className="atlas-mission-environment__content">
        {children}
      </div>
    </div>
  );
}
