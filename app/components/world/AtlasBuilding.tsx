import type {
  CSSProperties,
} from "react";

import type {
  AtlasBuildingDefinition,
} from "./atlas-world.types";

type AtlasBuildingProps = {
  building: AtlasBuildingDefinition;
};

type AtlasBuildingStyle =
  CSSProperties & {
    "--atlas-building-width": string;
    "--atlas-building-height": string;
    "--atlas-building-offset": string;
    "--atlas-building-density": number;
    "--atlas-building-phase": string;
    "--atlas-building-lean": string;
  };

export default function AtlasBuilding({
  building,
}: AtlasBuildingProps) {
  const style: AtlasBuildingStyle = {
    "--atlas-building-width":
      `${building.width}px`,
    "--atlas-building-height":
      `${building.height}px`,
    "--atlas-building-offset":
      `${building.offset}px`,
    "--atlas-building-density":
      building.windowDensity,
    "--atlas-building-phase":
      `${building.lightPhase}s`,
    "--atlas-building-lean":
      `${building.lean}deg`,
  };

  return (
    <span
      className={[
        "atlas-v2-building",
        `atlas-v2-building--${building.layer}`,
        `atlas-v2-building--roof-${building.roofType}`,
        `atlas-v2-building--windows-${building.windowPattern}`,
      ].join(" ")}
      style={style}
    >
      <span className="atlas-v2-building__face" />
      <span className="atlas-v2-building__windows" />
      <span className="atlas-v2-building__edge" />
      <span className="atlas-v2-building__roof" />
    </span>
  );
}
