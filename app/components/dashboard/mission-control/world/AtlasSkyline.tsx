const skylineTowers = [
  "atlas-world-skyline__tower--01",
  "atlas-world-skyline__tower--02",
  "atlas-world-skyline__tower--03",
  "atlas-world-skyline__tower--04",
  "atlas-world-skyline__tower--05",
  "atlas-world-skyline__tower--06",
  "atlas-world-skyline__tower--07",
  "atlas-world-skyline__tower--08",
  "atlas-world-skyline__tower--09",
  "atlas-world-skyline__tower--10",
  "atlas-world-skyline__tower--11",
  "atlas-world-skyline__tower--12",
] as const;


const cityBeacons = [
  "atlas-world-beacon--01",
  "atlas-world-beacon--02",
  "atlas-world-beacon--03",
  "atlas-world-beacon--04",
  "atlas-world-beacon--05",
] as const;


export default function AtlasSkyline() {
  return (
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
              key={tower}
              className={
                `atlas-world-skyline__tower ${tower}`
              }
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
            key={beacon}
            className={
              `atlas-world-beacon ${beacon}`
            }
            style={{
              animationDelay:
                `${index * -0.8}s`,
            }}
          />
        )
      )}
    </div>
  );
}
