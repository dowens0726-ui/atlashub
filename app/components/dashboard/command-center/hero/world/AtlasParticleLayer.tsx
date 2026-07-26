import type {
  AtlasWorldState,
} from "@/app/world";


type AtlasParticleLayerProps = {
  worldState:
    AtlasWorldState;
};


const particles = [
  {
    left: "7%",
    top: "21%",
    delay: "0s",
    duration: 8,
  },
  {
    left: "14%",
    top: "68%",
    delay: "1.4s",
    duration: 11,
  },
  {
    left: "24%",
    top: "37%",
    delay: "2.2s",
    duration: 9,
  },
  {
    left: "36%",
    top: "16%",
    delay: "0.8s",
    duration: 12,
  },
  {
    left: "47%",
    top: "74%",
    delay: "3s",
    duration: 10,
  },
  {
    left: "58%",
    top: "31%",
    delay: "1.8s",
    duration: 13,
  },
  {
    left: "69%",
    top: "62%",
    delay: "0.4s",
    duration: 9,
  },
  {
    left: "79%",
    top: "19%",
    delay: "2.6s",
    duration: 12,
  },
  {
    left: "88%",
    top: "49%",
    delay: "1.1s",
    duration: 10,
  },
  {
    left: "94%",
    top: "73%",
    delay: "3.4s",
    duration: 11,
  },
];


export default function AtlasParticleLayer({
  worldState,
}: AtlasParticleLayerProps) {
  const motionMultiplier =
    Math.max(
      0.65,
      worldState.atmosphere.ambientMotion /
        70
    );

  const particleOpacity =
    Math.max(
      0.3,
      worldState.atmosphere.ambientMotion /
        100
    );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        opacity:
          particleOpacity,
      }}
    >
      {particles.map(
        (
          particle,
          index
        ) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className={[
              "absolute h-1 w-1 animate-pulse rounded-full",
              index % 3 === 0
                ? "bg-violet-200/50 shadow-[0_0_10px_rgba(196,181,253,0.5)]"
                : index % 3 === 1
                  ? "bg-emerald-200/45 shadow-[0_0_10px_rgba(110,231,183,0.45)]"
                  : "bg-cyan-200/50 shadow-[0_0_10px_rgba(103,232,249,0.5)]",
            ].join(" ")}
            style={{
              left:
                particle.left,

              top:
                particle.top,

              animationDelay:
                particle.delay,

              animationDuration:
                `${particle.duration / motionMultiplier}s`,
            }}
          />
        )
      )}

      <div
        className="absolute left-[18%] top-[42%] h-px w-20 bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent"
        style={{
          opacity:
            worldState.lighting.systemGlowIntensity /
              100,
        }}
      />

      <div
        className="absolute right-[21%] top-[64%] h-px w-28 bg-gradient-to-r from-transparent via-violet-200/20 to-transparent"
        style={{
          opacity:
            worldState.lighting.skylineBrightness /
              100,
        }}
      />
    </div>
  );
}
