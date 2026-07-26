import type {
  AtlasWorldState,
} from "@/app/world";


type AtlasLightingLayerProps = {
  worldState:
    AtlasWorldState;
};


export default function AtlasLightingLayer({
  worldState,
}: AtlasLightingLayerProps) {
  const systemGlowOpacity =
    Math.max(
      0.18,
      worldState.lighting.systemGlowIntensity /
        100
    );

  const skylineGlowOpacity =
    Math.max(
      0.12,
      worldState.lighting.skylineBrightness /
        120
    );

  const cautionGlowOpacity =
    Math.max(
      0.08,
      worldState.lighting.cautionGlowIntensity /
        120
    );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute left-[8%] top-[12%] h-[34rem] w-px rotate-[22deg] bg-gradient-to-b from-transparent via-cyan-200/25 to-transparent blur-[0.5px]"
        style={{
          opacity:
            systemGlowOpacity,
        }}
      />

      <div
        className="absolute right-[12%] top-[6%] h-[30rem] w-px -rotate-[18deg] bg-gradient-to-b from-transparent via-violet-200/20 to-transparent blur-[0.5px]"
        style={{
          opacity:
            skylineGlowOpacity,
        }}
      />

      <div
        className="absolute inset-x-[12%] top-[3%] h-28 bg-gradient-to-b from-cyan-100/10 to-transparent blur-3xl"
        style={{
          opacity:
            systemGlowOpacity,
        }}
      />

      <div
        className="absolute -left-[8%] bottom-[13%] h-40 w-[45%] rotate-[-5deg] bg-cyan-400 blur-[70px]"
        style={{
          opacity:
            worldState.lighting.systemGlowIntensity /
              1500,
        }}
      />

      <div
        className="absolute -right-[10%] bottom-[12%] h-44 w-[42%] rotate-[7deg] bg-violet-500 blur-[80px]"
        style={{
          opacity:
            worldState.lighting.skylineBrightness /
              1500,
        }}
      />

      {worldState.influence.shouldActNow ? (
        <div
          className="absolute right-[20%] top-[12%] h-72 w-72 rounded-full bg-amber-400 blur-[130px]"
          style={{
            opacity:
              cautionGlowOpacity /
              12,
          }}
        />
      ) : null}

      <div
        className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent"
        style={{
          opacity:
            systemGlowOpacity,
        }}
      />
    </div>
  );
}
