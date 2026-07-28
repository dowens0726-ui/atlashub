import type {
  CSSProperties,
} from "react";

import {
  atlasCityBuildings,
  type AtlasCityBuilding,
} from "./atlas-city.definition";


type AtlasBuildingStyle =
  CSSProperties & {
    "--atlas-coastal-building-x":
      string;

    "--atlas-coastal-building-width":
      string;

    "--atlas-coastal-building-height":
      string;

    "--atlas-coastal-building-delay":
      string;

    "--atlas-coastal-building-lean":
      string;
  };


function buildBuildingStyle(
  building:
    AtlasCityBuilding,
  index:
    number
): AtlasBuildingStyle {
  return {
    "--atlas-coastal-building-x":
      `${building.x}%`,

    "--atlas-coastal-building-width":
      `${building.width}%`,

    "--atlas-coastal-building-height":
      `${building.height}%`,

    "--atlas-coastal-building-delay":
      `${index * -0.37}s`,

    "--atlas-coastal-building-lean":
      `${building.lean ?? 0}deg`,
  };
}


export default function AtlasSkyline() {
  return (
    <div
      aria-hidden="true"
      className="atlas-coastal-city"
    >
      <div className="atlas-coastal-city__district-glow atlas-coastal-city__district-glow--west" />
      <div className="atlas-coastal-city__district-glow atlas-coastal-city__district-glow--core" />
      <div className="atlas-coastal-city__district-glow atlas-coastal-city__district-glow--east" />

      <div className="atlas-coastal-city__rear-silhouette" />

      <div className="atlas-coastal-city__buildings">
        {atlasCityBuildings.map(
          (
            building,
            index
          ) => (
            <span
              className={`
                atlas-coastal-building
                atlas-coastal-building--${building.depth}
                atlas-coastal-building--roof-${building.roof}
                atlas-coastal-building--windows-${building.windows}
                atlas-coastal-building--tone-${building.tone}
              `}
              data-city-district={
                building.district
              }
              key={
                building.id
              }
              style={
                buildBuildingStyle(
                  building,
                  index
                )
              }
            >
              <span className="atlas-coastal-building__roof" />
              <span className="atlas-coastal-building__face">
                <span className="atlas-coastal-building__windows" />
                <span className="atlas-coastal-building__edge" />
              </span>
            </span>
          )
        )}
      </div>

      <div className="atlas-coastal-city__street-grid" />

      <div className="atlas-coastal-city__beacons">
        {Array.from({
          length:
            7,
        }).map(
          (
            _,
            index
          ) => (
            <span
              className={`
                atlas-coastal-city__beacon
                atlas-coastal-city__beacon--${index + 1}
              `}
              key={
                index
              }
              style={{
                animationDelay:
                  `${index * -0.64}s`,
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
