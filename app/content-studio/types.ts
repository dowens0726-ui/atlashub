export type AtlasContentType =
  | "vehicle"
  | "mission"
  | "business"
  | "weapon"
  | "property"
  | "character";

export type AtlasContentStatus =
  | "draft"
  | "review"
  | "verified"
  | "published";

export type AtlasContentSource =
  | "Rockstar Games"
  | "Official Trailer"
  | "Official Screenshot"
  | "Official Website"
  | "Gameplay"
  | "Community Research"
  | "Legacy GTA Data"
  | "Unknown";

export type AtlasSeoMetadata = {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
};

export type AtlasContentRelationship = {
  type:
    | "manufacturer"
    | "related"
    | "recommended"
    | "required"
    | "unlocks"
    | "located-at"
    | "owned-by"
    | "appears-in";
  targetType: AtlasContentType | "manufacturer" | "location";
  targetSlug: string;
  label: string;
  confidence: number;
};

export type AtlasContentMetadata = {
  contentType: AtlasContentType;
  status: AtlasContentStatus;
  source: AtlasContentSource;
  sourceUrl?: string;
  verified: boolean;
  confidence: number;
  createdAt: string;
  updatedAt: string;
};

export type AtlasContentInput = {
  slug?: string;
  name: string;
  description?: string;
  tags?: string[];
  image?: string;
  manufacturer?: string;
  class?: string;
  location?: string;
  featured?: boolean;
  relatedSlugs?: string[];
  recommendedMissionSlugs?: string[];
};

export type AtlasContentDocument<TInput extends AtlasContentInput> = {
  content: TInput & {
    slug: string;
    description: string;
    tags: string[];
  };
  metadata: AtlasContentMetadata;
  seo: AtlasSeoMetadata;
  relationships: AtlasContentRelationship[];
};

export type AtlasValidationSeverity = "error" | "warning" | "info";

export type AtlasValidationIssue = {
  field: string;
  severity: AtlasValidationSeverity;
  code: string;
  message: string;
};

export type AtlasValidationResult = {
  valid: boolean;
  score: number;
  issues: AtlasValidationIssue[];
  errors: AtlasValidationIssue[];
  warnings: AtlasValidationIssue[];
  information: AtlasValidationIssue[];
};

export type AtlasContentBuildOptions = {
  contentType: AtlasContentType;
  source?: AtlasContentSource;
  sourceUrl?: string;
  status?: AtlasContentStatus;
  verified?: boolean;
  confidence?: number;
  canonicalBasePath?: string;
  existingSlugs?: Iterable<string>;
};

export type AtlasContentBuildResult<
  TInput extends AtlasContentInput,
> = {
  document: AtlasContentDocument<TInput>;
  validation: AtlasValidationResult;
};