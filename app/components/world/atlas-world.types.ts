export type AtlasWorldLayer =
  | "far"
  | "mid"
  | "near";

export type AtlasRoofType =
  | "flat"
  | "stepped"
  | "spire"
  | "antenna"
  | "crown";

export type AtlasWindowPattern =
  | "grid"
  | "columns"
  | "sparse"
  | "bands";

export type AtlasBuildingDefinition = {
  id: string;
  layer: AtlasWorldLayer;
  width: number;
  height: number;
  offset: number;
  roofType: AtlasRoofType;
  windowPattern: AtlasWindowPattern;
  windowDensity: number;
  lightPhase: number;
  lean: number;
};
