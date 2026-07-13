import type {
  AtlasContentMetadata,
  AtlasContentSource,
  AtlasContentStatus,
  AtlasContentType,
} from "./types";

type BuildMetadataInput = {
  contentType: AtlasContentType;
  source?: AtlasContentSource;
  sourceUrl?: string;
  status?: AtlasContentStatus;
  verified?: boolean;
  confidence?: number;
  timestamp?: string;
};

function clampConfidence(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function buildContentMetadata({
  contentType,
  source = "Unknown",
  sourceUrl,
  status = "draft",
  verified = false,
  confidence = verified ? 100 : 50,
  timestamp = new Date().toISOString(),
}: BuildMetadataInput): AtlasContentMetadata {
  return {
    contentType,
    status,
    source,
    sourceUrl: sourceUrl?.trim() || undefined,
    verified,
    confidence: clampConfidence(confidence),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}