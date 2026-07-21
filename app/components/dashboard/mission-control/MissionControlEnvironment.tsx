import type {
  ReactNode,
} from "react";


type MissionControlEnvironmentProps = {
  children:
    ReactNode;
};


const skylineTowers = [
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--01",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--02",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--03",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--04",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--05",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--06",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--07",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--08",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--09",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--10",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--11",
  },
  {
    className:
      "atlas-world-skyline__tower atlas-world-skyline__tower--12",
  },
] as const;


const cityBeacons = [
  {
    className:
      "atlas-world-beacon atlas-world-beacon--01",
  },
  {
    className:
      "atlas-world-beacon atlas-world-beacon--02",
  },
  {
    className:
      "atlas-world-beacon atlas-world-beacon--03",
  },
  {
    className:
      "atlas-world-beacon atlas-world-beacon--04",
  },
  {
    className:
      "atlas-world-beacon atlas-world-beacon--05",
  },
] as const;


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
        className="atlas-world-sunset"
      />

      <div
        aria-hidden="true"
        className="atlas-world-clouds atlas-world-clouds--far"
      />

      <div
        aria-hidden="true"
        className="atlas-world-clouds atlas-world-clouds--near"
      />

      <div
        aria-hidden="true"
        className="atlas-world-skyline"
      >
        <div className="atlas-world-skyline__district atlas-world-skyline__district--rear" />

        <div className="atlas-world-skyline__district atlas-world-skyline__district--front">
          {skylineTowers.map(
            (
              tower,
              index
            ) => (
              <span
                key={tower.className}
                className={tower.className}
                style={{
                  animationDelay:
                    `${index * -0.45}s`,
                }}
              />
            )
          )}
        </div>

        {cityBeacons.map(
          (
            beacon,
            index
          ) => (
            <span
              key={beacon.className}
              className={beacon.className}
              style={{
                animationDelay:
                  `${index * -0.8}s`,
              }}
            />
          )
        )}
      </div>

      <div
        aria-hidden="true"
        className="atlas-world-water"
      >
        <div className="atlas-world-water__reflection atlas-world-water__reflection--cyan" />

        <div className="atlas-world-water__reflection atlas-world-water__reflection--violet" />

        <div className="atlas-world-water__reflection atlas-world-water__reflection--sunset" />
      </div>

      <div
        aria-hidden="true"
        className="atlas-mission-environment__horizon"
      />

      <div
        aria-hidden="true"
        className="atlas-world-haze atlas-world-haze--rear"
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
        className="atlas-world-aircraft atlas-world-aircraft--primary"
      >
        <span />
      </div>

      <div
        aria-hidden="true"
        className="atlas-world-aircraft atlas-world-aircraft--secondary"
      >
        <span />
      </div>

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
        className="atlas-world-particles"
      />

      <div
        aria-hidden="true"
        className="atlas-world-haze atlas-world-haze--front"
      />

      <div
        aria-hidden="true"
        className="atlas-world-glass-reflection"
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
