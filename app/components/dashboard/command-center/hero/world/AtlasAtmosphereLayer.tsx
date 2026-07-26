import type {
  AtlasWorldState,
} from "@/app/world";


type AtlasAtmosphereLayerProps = {
  worldState:
    AtlasWorldState;
};


export default function AtlasAtmosphereLayer({
  worldState,
}: AtlasAtmosphereLayerProps) {
  const hazeOpacity =
    Math.max(
      0.18,
      worldState.atmosphere.haze /
        100
    );

  const cloudOpacity =
    Math.max(
      0.08,
      worldState.atmosphere.cloudCover /
        130
    );

  const cyanGlowOpacity =
    Math.max(
      0.04,
      worldState.lighting.systemGlowIntensity /
        900
    );

  const cautionGlowOpacity =
    worldState.influence.shouldActNow
      ? Math.max(
          0.035,
          worldState.lighting.cautionGlowIntensity /
            950
        )
      : 0;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,28,0.34)_0%,rgba(11,19,41,0.2)_24%,rgba(4,10,24,0.62)_67%,rgba(2,6,18,0.94)_100%)]" />

      <div
        className="absolute inset-x-0 top-0 h-[42%] bg-[linear-gradient(180deg,rgba(226,232,240,0.08),transparent)] blur-3xl"
        style={{
          opacity:
            cloudOpacity,
        }}
      />

      <div
        className="absolute -left-[18%] top-[4%] h-[28rem] w-[34rem] rounded-full bg-cyan-400 blur-[120px]"
        style={{
          opacity:
            cyanGlowOpacity,
        }}
      />

      <div
        className="absolute -right-[15%] top-[8%] h-[26rem] w-[32rem] rounded-full bg-violet-500 blur-[130px]"
        style={{
          opacity:
            Math.max(
              0.04,
              worldState.lighting.skylineBrightness /
                950
            ),
        }}
      />

      <div
        className="absolute inset-x-0 top-[34%] h-52 bg-[linear-gradient(180deg,transparent,rgba(103,232,249,0.08),rgba(14,165,233,0.12),transparent)] blur-2xl"
        style={{
          opacity:
            hazeOpacity,
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.5)_30%,rgba(2,6,23,0.92)_100%)]"
        style={{
          opacity:
            Math.max(
              0.7,
              1 -
                worldState.lighting.skyBrightness /
                  260
            ),
        }}
      />

      {worldState.influence.shouldActNow ? (
        <div
          className="absolute inset-x-[18%] top-[8%] h-52 rounded-full bg-amber-400 blur-[110px]"
          style={{
            opacity:
              cautionGlowOpacity,
          }}
        />
      ) : null}
    </div>
  );
}
