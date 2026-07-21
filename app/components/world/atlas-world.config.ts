import type {
  AtlasBuildingDefinition,
  AtlasRoofType,
  AtlasWindowPattern,
  AtlasWorldLayer,
} from "./atlas-world.types";

type AtlasLayerConfiguration = {
  count: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
};

export const ATLAS_WORLD_SEED = 6106;

export const ATLAS_LAYER_CONFIGURATION: Record<
  AtlasWorldLayer,
  AtlasLayerConfiguration
> = {
  far: {
    count: 46,
    minWidth: 22,
    maxWidth: 58,
    minHeight: 72,
    maxHeight: 210,
  },

  mid: {
    count: 34,
    minWidth: 28,
    maxWidth: 72,
    minHeight: 110,
    maxHeight: 330,
  },

  near: {
    count: 24,
    minWidth: 38,
    maxWidth: 96,
    minHeight: 150,
    maxHeight: 470,
  },
};

const roofTypes: AtlasRoofType[] = [
  "flat",
  "stepped",
  "spire",
  "antenna",
  "crown",
];

const windowPatterns: AtlasWindowPattern[] = [
  "grid",
  "columns",
  "sparse",
  "bands",
];

function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;

    let value = state;

    value = Math.imul(
      value ^ (value >>> 15),
      value | 1
    );

    value ^= value +
      Math.imul(
        value ^ (value >>> 7),
        value | 61
      );

    return (
      (value ^ (value >>> 14)) >>> 0
    ) / 4294967296;
  };
}

function randomBetween(
  random: () => number,
  minimum: number,
  maximum: number
) {
  return minimum +
    random() * (maximum - minimum);
}

function pickFromArray<T>(
  random: () => number,
  values: T[]
) {
  const index = Math.floor(
    random() * values.length
  );

  return values[index];
}

export function generateAtlasSkyline(
  layer: AtlasWorldLayer,
  seedOffset = 0
): AtlasBuildingDefinition[] {
  const configuration =
    ATLAS_LAYER_CONFIGURATION[layer];

  const layerSeed = {
    far: 101,
    mid: 307,
    near: 701,
  }[layer];

  const random = createSeededRandom(
    ATLAS_WORLD_SEED +
      layerSeed +
      seedOffset
  );

  return Array.from(
    {
      length: configuration.count,
    },
    (_, index) => {
      const normalizedPosition =
        configuration.count <= 1
          ? 0
          : index / (configuration.count - 1);

      const centralTowerInfluence =
        1 -
        Math.min(
          1,
          Math.abs(normalizedPosition - 0.58) * 3
        );

      const baseHeight = randomBetween(
        random,
        configuration.minHeight,
        configuration.maxHeight
      );

      const skylinePeak =
        centralTowerInfluence *
        randomBetween(
          random,
          24,
          configuration.maxHeight * 0.34
        );

      return {
        id: `${layer}-${index}`,
        layer,
        width: Math.round(
          randomBetween(
            random,
            configuration.minWidth,
            configuration.maxWidth
          )
        ),
        height: Math.round(
          Math.min(
            configuration.maxHeight,
            baseHeight + skylinePeak
          )
        ),
        offset: Math.round(
          randomBetween(random, -8, 10)
        ),
        roofType: pickFromArray(
          random,
          roofTypes
        ),
        windowPattern: pickFromArray(
          random,
          windowPatterns
        ),
        windowDensity: Number(
          randomBetween(random, 0.28, 0.82).toFixed(2)
        ),
        lightPhase: Math.round(
          randomBetween(random, 0, 18)
        ),
        lean: Number(
          randomBetween(random, -0.7, 0.7).toFixed(2)
        ),
      };
    }
  );
}
