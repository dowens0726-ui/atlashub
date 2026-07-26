import type {
  AtlasWorldState,
} from "@/app/world";


type AtlasSkylineLayerProps = {
  worldState:
    AtlasWorldState;
};


const skylineBlocks = [
  {
    left: "2%",
    width: "7%",
    height: "27%",
  },
  {
    left: "10%",
    width: "5%",
    height: "41%",
  },
  {
    left: "16%",
    width: "8%",
    height: "31%",
  },
  {
    left: "25%",
    width: "4%",
    height: "49%",
  },
  {
    left: "30%",
    width: "9%",
    height: "37%",
  },
  {
    left: "40%",
    width: "5%",
    height: "61%",
  },
  {
    left: "46%",
    width: "8%",
    height: "43%",
  },
  {
    left: "55%",
    width: "4%",
    height: "70%",
  },
  {
    left: "60%",
    width: "9%",
    height: "48%",
  },
  {
    left: "70%",
    width: "5%",
    height: "58%",
  },
  {
    left: "76%",
    width: "8%",
    height: "35%",
  },
  {
    left: "85%",
    width: "5%",
    height: "45%",
  },
  {
    left: "91%",
    width: "7%",
    height: "29%",
  },
];


export default function AtlasSkylineLayer({
  worldState,
}: AtlasSkylineLayerProps) {
  const skylineOpacity =
    Math.max(
      0.38,
      worldState.lighting.skylineBrightness /
        100
    );

  const buildingLightOpacity =
    Math.max(
      0.12,
      worldState.lighting.buildingLightIntensity /
        100
    );

  const systemGlowOpacity =
    Math.max(
      0.12,
      worldState.lighting.systemGlowIntensity /
        100
    );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[31%] h-[31%] overflow-hidden"
      style={{
        opacity:
          skylineOpacity,
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent"
        style={{
          opacity:
            systemGlowOpacity,
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(180deg,transparent,rgba(4,11,25,0.4)_24%,rgba(2,6,18,0.86)_100%)]" />

      {skylineBlocks.map(
        (
          block,
          index
        ) => (
          <div
            key={`${block.left}-${block.height}`}
            className="absolute bottom-0 overflow-hidden border-x border-t border-cyan-200/[0.045] bg-[linear-gradient(180deg,rgba(13,31,55,0.58),rgba(3,9,22,0.94))]"
            style={{
              left:
                block.left,

              width:
                block.width,

              height:
                block.height,
            }}
          >
            <div
              className="absolute inset-x-[18%] top-[14%] grid grid-cols-2 gap-x-1 gap-y-2"
              style={{
                opacity:
                  buildingLightOpacity,
              }}
            >
              {Array.from({
                length:
                  index % 3 === 0
                    ? 6
                    : 4,
              }).map(
                (
                  _,
                  lightIndex
                ) => (
                  <span
                    key={lightIndex}
                    className={[
                      "h-px",
                      worldState.timeOfDay ===
                        "night" ||
                      worldState.timeOfDay ===
                        "sunset"
                        ? "bg-amber-100/60 shadow-[0_0_6px_rgba(254,243,199,0.35)]"
                        : "bg-cyan-100/40",
                    ].join(" ")}
                  />
                )
              )}
            </div>
          </div>
        )
      )}

      <div
        className="absolute bottom-[2%] left-[39%] h-[82%] w-px bg-cyan-200/20"
        style={{
          opacity:
            systemGlowOpacity,
        }}
      />

      <div
        className="absolute bottom-[84%] left-[39%] h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-200/20 bg-cyan-200/10 shadow-[0_0_20px_rgba(103,232,249,0.35)]"
        style={{
          opacity:
            systemGlowOpacity,
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#020612] to-transparent" />
    </div>
  );
}
