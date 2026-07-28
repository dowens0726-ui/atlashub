export type AtlasCityDistrictId =
  | "west-coast"
  | "financial-core"
  | "marina"
  | "residential"
  | "port";


export type AtlasCityBuilding = {
  id:
    string;

  district:
    AtlasCityDistrictId;

  x:
    number;

  width:
    number;

  height:
    number;

  depth:
    "rear" | "middle" | "front";

  roof:
    "flat" | "step" | "spire" | "crown" | "antenna";

  windows:
    "grid" | "bands" | "columns" | "sparse";

  tone:
    "cool" | "neutral" | "warm";

  lean?:
    number;
};


export const atlasCityBuildings:
  readonly AtlasCityBuilding[] = [
    {
      id: "west-01",
      district: "west-coast",
      x: 1,
      width: 3.1,
      height: 24,
      depth: "rear",
      roof: "flat",
      windows: "sparse",
      tone: "cool",
    },
    {
      id: "west-02",
      district: "west-coast",
      x: 4.6,
      width: 3.8,
      height: 34,
      depth: "middle",
      roof: "step",
      windows: "bands",
      tone: "neutral",
    },
    {
      id: "west-03",
      district: "west-coast",
      x: 8.9,
      width: 2.6,
      height: 29,
      depth: "rear",
      roof: "antenna",
      windows: "grid",
      tone: "cool",
    },
    {
      id: "west-04",
      district: "west-coast",
      x: 12.2,
      width: 4.2,
      height: 42,
      depth: "front",
      roof: "crown",
      windows: "columns",
      tone: "warm",
    },
    {
      id: "west-05",
      district: "west-coast",
      x: 17.1,
      width: 3.3,
      height: 35,
      depth: "middle",
      roof: "flat",
      windows: "bands",
      tone: "neutral",
    },
    {
      id: "marina-01",
      district: "marina",
      x: 21.2,
      width: 2.8,
      height: 31,
      depth: "rear",
      roof: "flat",
      windows: "grid",
      tone: "cool",
    },
    {
      id: "marina-02",
      district: "marina",
      x: 24.6,
      width: 4.2,
      height: 47,
      depth: "front",
      roof: "step",
      windows: "columns",
      tone: "neutral",
    },
    {
      id: "marina-03",
      district: "marina",
      x: 29.4,
      width: 2.8,
      height: 38,
      depth: "middle",
      roof: "antenna",
      windows: "sparse",
      tone: "warm",
    },
    {
      id: "core-01",
      district: "financial-core",
      x: 33.1,
      width: 3.7,
      height: 52,
      depth: "middle",
      roof: "step",
      windows: "bands",
      tone: "cool",
      lean: -1.2,
    },
    {
      id: "core-02",
      district: "financial-core",
      x: 37.4,
      width: 4.5,
      height: 68,
      depth: "front",
      roof: "crown",
      windows: "columns",
      tone: "neutral",
    },
    {
      id: "core-03",
      district: "financial-core",
      x: 42.3,
      width: 3.2,
      height: 57,
      depth: "middle",
      roof: "spire",
      windows: "grid",
      tone: "warm",
    },
    {
      id: "core-04",
      district: "financial-core",
      x: 46.1,
      width: 5.2,
      height: 83,
      depth: "front",
      roof: "spire",
      windows: "columns",
      tone: "cool",
    },
    {
      id: "core-05",
      district: "financial-core",
      x: 51.8,
      width: 3.7,
      height: 63,
      depth: "front",
      roof: "crown",
      windows: "bands",
      tone: "neutral",
    },
    {
      id: "core-06",
      district: "financial-core",
      x: 56.1,
      width: 4.4,
      height: 72,
      depth: "middle",
      roof: "antenna",
      windows: "grid",
      tone: "warm",
      lean: 1,
    },
    {
      id: "core-07",
      district: "financial-core",
      x: 61.2,
      width: 3.5,
      height: 51,
      depth: "rear",
      roof: "step",
      windows: "sparse",
      tone: "cool",
    },
    {
      id: "residential-01",
      district: "residential",
      x: 65.2,
      width: 4.5,
      height: 46,
      depth: "front",
      roof: "flat",
      windows: "bands",
      tone: "neutral",
    },
    {
      id: "residential-02",
      district: "residential",
      x: 70.1,
      width: 3.2,
      height: 39,
      depth: "middle",
      roof: "step",
      windows: "grid",
      tone: "warm",
    },
    {
      id: "residential-03",
      district: "residential",
      x: 73.8,
      width: 4.4,
      height: 54,
      depth: "front",
      roof: "crown",
      windows: "columns",
      tone: "cool",
    },
    {
      id: "residential-04",
      district: "residential",
      x: 78.8,
      width: 3,
      height: 35,
      depth: "rear",
      roof: "antenna",
      windows: "sparse",
      tone: "neutral",
    },
    {
      id: "port-01",
      district: "port",
      x: 82.4,
      width: 4.8,
      height: 30,
      depth: "rear",
      roof: "flat",
      windows: "sparse",
      tone: "cool",
    },
    {
      id: "port-02",
      district: "port",
      x: 87.8,
      width: 3.2,
      height: 41,
      depth: "middle",
      roof: "step",
      windows: "bands",
      tone: "neutral",
    },
    {
      id: "port-03",
      district: "port",
      x: 91.6,
      width: 4.1,
      height: 35,
      depth: "front",
      roof: "flat",
      windows: "grid",
      tone: "warm",
    },
    {
      id: "port-04",
      district: "port",
      x: 96.2,
      width: 2.7,
      height: 27,
      depth: "rear",
      roof: "antenna",
      windows: "sparse",
      tone: "cool",
    },
  ] as const;
