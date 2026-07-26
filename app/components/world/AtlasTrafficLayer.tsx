type AtlasTrafficVehicle = {
  id: string;
  lane: "shoreline" | "bridge";
  direction: "east" | "west";
  duration: number;
  delay: number;
  position: number;
  scale: number;
};

const trafficVehicles: AtlasTrafficVehicle[] = [
  {
    id: "shoreline-east-01",
    lane: "shoreline",
    direction: "east",
    duration: 18,
    delay: -3,
    position: 18,
    scale: 0.82,
  },
  {
    id: "shoreline-east-02",
    lane: "shoreline",
    direction: "east",
    duration: 24,
    delay: -14,
    position: 21,
    scale: 0.68,
  },
  {
    id: "shoreline-east-03",
    lane: "shoreline",
    direction: "east",
    duration: 21,
    delay: -9,
    position: 24,
    scale: 0.74,
  },
  {
    id: "shoreline-west-01",
    lane: "shoreline",
    direction: "west",
    duration: 23,
    delay: -6,
    position: 29,
    scale: 0.78,
  },
  {
    id: "shoreline-west-02",
    lane: "shoreline",
    direction: "west",
    duration: 19,
    delay: -15,
    position: 32,
    scale: 0.64,
  },
  {
    id: "bridge-east-01",
    lane: "bridge",
    direction: "east",
    duration: 16,
    delay: -4,
    position: 46,
    scale: 0.58,
  },
  {
    id: "bridge-east-02",
    lane: "bridge",
    direction: "east",
    duration: 20,
    delay: -12,
    position: 48,
    scale: 0.52,
  },
  {
    id: "bridge-west-01",
    lane: "bridge",
    direction: "west",
    duration: 18,
    delay: -8,
    position: 51,
    scale: 0.56,
  },
];

export default function AtlasTrafficLayer() {
  return (
    <div
      aria-hidden="true"
      className="atlas-v2-traffic pointer-events-none absolute inset-0"
    >
      <div className="atlas-v2-traffic__shoreline-road absolute" />

      <div className="atlas-v2-traffic__bridge absolute">
        <div className="atlas-v2-traffic__bridge-deck absolute inset-x-0 top-1/2" />
        <div className="atlas-v2-traffic__bridge-support atlas-v2-traffic__bridge-support--left absolute" />
        <div className="atlas-v2-traffic__bridge-support atlas-v2-traffic__bridge-support--right absolute" />
      </div>

      {trafficVehicles.map((vehicle) => (
        <span
          key={vehicle.id}
          className={[
            "atlas-v2-traffic__vehicle",
            `atlas-v2-traffic__vehicle--${vehicle.lane}`,
            `atlas-v2-traffic__vehicle--${vehicle.direction}`,
          ].join(" ")}
          style={
            {
              "--atlas-traffic-duration": `${vehicle.duration}s`,
              "--atlas-traffic-delay": `${vehicle.delay}s`,
              "--atlas-traffic-position": `${vehicle.position}%`,
              "--atlas-traffic-scale": vehicle.scale,
            } as React.CSSProperties
          }
        >
          <span className="atlas-v2-traffic__light" />
          <span className="atlas-v2-traffic__trail" />
        </span>
      ))}
    </div>
  );
}
