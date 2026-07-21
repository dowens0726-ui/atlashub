import AtlasBuilding from "./AtlasBuilding";

import {
  generateAtlasSkyline,
} from "./atlas-world.config";

import type {
  AtlasWorldLayer,
} from "./atlas-world.types";

type AtlasSkylineProps = {
  layer: AtlasWorldLayer;
};

export default function AtlasSkyline({
  layer,
}: AtlasSkylineProps) {
  const buildings =
    generateAtlasSkyline(layer);

  return (
    <div
      className={[
        "atlas-v2-skyline",
        `atlas-v2-skyline--${layer}`,
      ].join(" ")}
    >
      {buildings.map((building) => (
        <AtlasBuilding
          key={building.id}
          building={building}
        />
      ))}
    </div>
  );
}
