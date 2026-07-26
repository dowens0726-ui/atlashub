import type {
  CSSProperties,
} from "react";

import type {
  AtlasWorldIntensity,
  AtlasWorldState,
} from "@/app/world";


type AtlasAircraftLayerProps = {
  worldState:
    AtlasWorldState;
};


type AircraftRoute = {
  top:
    string;

  delay:
    number;

  duration:
    number;

  scale:
    number;

  reverse?:
    boolean;
};


type AtlasAircraftStyles =
  CSSProperties & {
    "--atlas-aircraft-delay":
      string;

    "--atlas-aircraft-duration":
      string;

    "--atlas-aircraft-scale":
      number;

    "--atlas-aircraft-top":
      string;
  };


const aircraftRoutes:
  AircraftRoute[] = [
    {
      top: "15%",
      delay: -4,
      duration: 34,
      scale: 0.72,
    },
    {
      top: "23%",
      delay: -19,
      duration: 42,
      scale: 0.58,
      reverse: true,
    },
    {
      top: "10%",
      delay: -28,
      duration: 48,
      scale: 0.48,
    },
    {
      top: "31%",
      delay: -11,
      duration: 38,
      scale: 0.64,
      reverse: true,
    },
  ];


const visibleAircraftCounts:
  Record<
    AtlasWorldIntensity,
    number
  > = {
    low: 1,
    moderate: 2,
    high: 3,
    maximum: 4,
  };


export default function AtlasAircraftLayer({
  worldState,
}: AtlasAircraftLayerProps) {
  const visibleAircraftCount =
    visibleAircraftCounts[
      worldState.traffic.air
    ];

  const weatherRestricted =
    worldState.weather === "storm";

  const renderedAircraftCount =
    weatherRestricted
      ? Math.min(
          1,
          visibleAircraftCount
        )
      : visibleAircraftCount;

  const motionMultiplier =
    Math.max(
      0.7,
      worldState.atmosphere.windStrength /
        52
    );

  return (
    <div
      aria-hidden="true"
      className="atlas-living-aircraft pointer-events-none absolute inset-0 overflow-hidden"
      data-intensity={worldState.traffic.air}
      data-weather={worldState.weather}
    >
      {aircraftRoutes
        .slice(
          0,
          renderedAircraftCount
        )
        .map(
          (
            route,
            index
          ) => {
            const styles:
              AtlasAircraftStyles = {
                "--atlas-aircraft-delay":
                  `${route.delay}s`,

                "--atlas-aircraft-duration":
                  `${route.duration / motionMultiplier}s`,

                "--atlas-aircraft-scale":
                  route.scale,

                "--atlas-aircraft-top":
                  route.top,
              };

            return (
              <span
                key={`${route.top}-${index}`}
                className={[
                  "atlas-living-aircraft__route",
                  route.reverse
                    ? "atlas-living-aircraft__route--reverse"
                    : "",
                ].join(" ")}
                style={styles}
              >
                <span className="atlas-living-aircraft__craft">
                  <span className="atlas-living-aircraft__body" />

                  <span className="atlas-living-aircraft__wing" />

                  <span className="atlas-living-aircraft__beacon" />
                </span>

                <span className="atlas-living-aircraft__trail" />
              </span>
            );
          }
        )}
    </div>
  );
}