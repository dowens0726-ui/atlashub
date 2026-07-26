import type {
  CSSProperties,
} from "react";

import type {
  AtlasWorldIntensity,
  AtlasWorldState,
} from "@/app/world";


type AtlasTrafficLayerProps = {
  worldState:
    AtlasWorldState;
};


type TrafficVehicle = {
  lane:
    "near" |
    "far";

  direction:
    "east" |
    "west";

  delay:
    number;

  duration:
    number;

  scale:
    number;
};


type AtlasTrafficStyles =
  CSSProperties & {
    "--atlas-traffic-delay":
      string;

    "--atlas-traffic-duration":
      string;

    "--atlas-traffic-scale":
      number;
  };


const trafficVehicles:
  TrafficVehicle[] = [
    {
      lane: "far",
      direction: "east",
      delay: -2,
      duration: 17,
      scale: 0.72,
    },
    {
      lane: "far",
      direction: "west",
      delay: -11,
      duration: 20,
      scale: 0.66,
    },
    {
      lane: "far",
      direction: "east",
      delay: -15,
      duration: 23,
      scale: 0.58,
    },
    {
      lane: "near",
      direction: "west",
      delay: -4,
      duration: 15,
      scale: 0.9,
    },
    {
      lane: "near",
      direction: "east",
      delay: -10,
      duration: 18,
      scale: 0.82,
    },
    {
      lane: "near",
      direction: "west",
      delay: -17,
      duration: 21,
      scale: 0.76,
    },
    {
      lane: "near",
      direction: "east",
      delay: -21,
      duration: 24,
      scale: 0.68,
    },
    {
      lane: "near",
      direction: "west",
      delay: -8,
      duration: 27,
      scale: 0.62,
    },
  ];


const visibleVehicleCounts:
  Record<
    AtlasWorldIntensity,
    number
  > = {
    low: 2,
    moderate: 4,
    high: 6,
    maximum: 8,
  };


export default function AtlasTrafficLayer({
  worldState,
}: AtlasTrafficLayerProps) {
  const visibleVehicleCount =
    visibleVehicleCounts[
      worldState.traffic.road
    ];

  const motionMultiplier =
    Math.max(
      0.72,
      worldState.atmosphere.ambientMotion /
        68
    );

  return (
    <div
      aria-hidden="true"
      className="atlas-living-traffic pointer-events-none absolute inset-0 overflow-hidden"
      data-intensity={worldState.traffic.road}
    >
      <div className="atlas-living-traffic__bridge">
        <div className="atlas-living-traffic__deck" />

        <div className="atlas-living-traffic__rail atlas-living-traffic__rail--top" />

        <div className="atlas-living-traffic__rail atlas-living-traffic__rail--bottom" />

        {trafficVehicles
          .slice(
            0,
            visibleVehicleCount
          )
          .map(
            (
              vehicle,
              index
            ) => {
              const styles:
                AtlasTrafficStyles = {
                  "--atlas-traffic-delay":
                    `${vehicle.delay}s`,

                  "--atlas-traffic-duration":
                    `${vehicle.duration / motionMultiplier}s`,

                  "--atlas-traffic-scale":
                    vehicle.scale,
                };

              return (
                <span
                  key={`${vehicle.direction}-${vehicle.lane}-${index}`}
                  className={[
                    "atlas-living-traffic__vehicle",
                    `atlas-living-traffic__vehicle--${vehicle.direction}`,
                    `atlas-living-traffic__vehicle--${vehicle.lane}`,
                  ].join(" ")}
                  style={styles}
                >
                  <span className="atlas-living-traffic__light" />

                  <span className="atlas-living-traffic__trail" />
                </span>
              );
            }
          )}
      </div>
    </div>
  );
}