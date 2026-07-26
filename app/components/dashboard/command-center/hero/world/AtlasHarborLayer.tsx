import type {
  CSSProperties,
} from "react";

import type {
  AtlasWorldIntensity,
  AtlasWorldState,
} from "@/app/world";


type AtlasHarborLayerProps = {
  worldState:
    AtlasWorldState;
};


type HarborVessel = {
  bottom:
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


type AtlasHarborStyles =
  CSSProperties & {
    "--atlas-harbor-bottom":
      string;

    "--atlas-harbor-delay":
      string;

    "--atlas-harbor-duration":
      string;

    "--atlas-harbor-scale":
      number;
  };


const harborVessels:
  HarborVessel[] = [
    {
      bottom: "20%",
      delay: -3,
      duration: 38,
      scale: 0.88,
    },
    {
      bottom: "14%",
      delay: -21,
      duration: 46,
      scale: 0.68,
      reverse: true,
    },
    {
      bottom: "27%",
      delay: -31,
      duration: 53,
      scale: 0.56,
    },
    {
      bottom: "9%",
      delay: -14,
      duration: 44,
      scale: 0.76,
      reverse: true,
    },
  ];


const visibleVesselCounts:
  Record<
    AtlasWorldIntensity,
    number
  > = {
    low: 1,
    moderate: 2,
    high: 3,
    maximum: 4,
  };


export default function AtlasHarborLayer({
  worldState,
}: AtlasHarborLayerProps) {
  const visibleVesselCount =
    visibleVesselCounts[
      worldState.traffic.harbor
    ];

  const motionMultiplier =
    Math.max(
      0.68,
      worldState.atmosphere.ambientMotion /
        64
    );

  const shimmerOpacity =
    Math.max(
      0.18,
      worldState.atmosphere.waterShimmer /
        140
    );

  return (
    <div
      aria-hidden="true"
      className="atlas-living-harbor pointer-events-none absolute inset-0 overflow-hidden"
      data-intensity={worldState.traffic.harbor}
    >
      <div
        className="atlas-living-harbor__water"
        style={{
          opacity:
            shimmerOpacity,
        }}
      >
        <span className="atlas-living-harbor__reflection atlas-living-harbor__reflection--cyan" />

        <span className="atlas-living-harbor__reflection atlas-living-harbor__reflection--violet" />

        <span className="atlas-living-harbor__reflection atlas-living-harbor__reflection--amber" />
      </div>

      {harborVessels
        .slice(
          0,
          visibleVesselCount
        )
        .map(
          (
            vessel,
            index
          ) => {
            const styles:
              AtlasHarborStyles = {
                "--atlas-harbor-bottom":
                  vessel.bottom,

                "--atlas-harbor-delay":
                  `${vessel.delay}s`,

                "--atlas-harbor-duration":
                  `${vessel.duration / motionMultiplier}s`,

                "--atlas-harbor-scale":
                  vessel.scale,
              };

            return (
              <span
                key={`${vessel.bottom}-${index}`}
                className={[
                  "atlas-living-harbor__route",
                  vessel.reverse
                    ? "atlas-living-harbor__route--reverse"
                    : "",
                ].join(" ")}
                style={styles}
              >
                <span className="atlas-living-harbor__vessel">
                  <span className="atlas-living-harbor__hull" />

                  <span className="atlas-living-harbor__cabin" />

                  <span className="atlas-living-harbor__navigation-light" />
                </span>

                <span className="atlas-living-harbor__wake" />
              </span>
            );
          }
        )}
    </div>
  );
}