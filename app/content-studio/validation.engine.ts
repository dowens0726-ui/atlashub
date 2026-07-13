import type {
  AtlasContentInput,
  AtlasContentType,
  AtlasValidationIssue,
  AtlasValidationResult,
} from "./types";

type ValidateContentInput = {
  content: AtlasContentInput & {
    slug: string;
    description: string;
    tags: string[];
  };
  contentType: AtlasContentType;
  existingSlugs?: Iterable<string>;
};

function createIssue(
  field: string,
  severity: AtlasValidationIssue["severity"],
  code: string,
  message: string
): AtlasValidationIssue {
  return {
    field,
    severity,
    code,
    message,
  };
}

function calculateScore(
  issues: AtlasValidationIssue[]
): number {
  const deductions = issues.reduce((total, issue) => {
    if (issue.severity === "error") {
      return total + 30;
    }

    if (issue.severity === "warning") {
      return total + 10;
    }

    return total + 2;
  }, 0);

  return Math.max(0, 100 - deductions);
}

export function validateContent({
  content,
  contentType,
  existingSlugs = [],
}: ValidateContentInput): AtlasValidationResult {
  const issues: AtlasValidationIssue[] = [];
  const existingSlugSet = new Set(existingSlugs);

  if (!content.name.trim()) {
    issues.push(
      createIssue(
        "name",
        "error",
        "CONTENT_NAME_REQUIRED",
        "A content name is required."
      )
    );
  }

  if (!content.slug.trim()) {
    issues.push(
      createIssue(
        "slug",
        "error",
        "CONTENT_SLUG_REQUIRED",
        "A valid slug could not be generated."
      )
    );
  }

  if (existingSlugSet.has(content.slug)) {
    issues.push(
      createIssue(
        "slug",
        "error",
        "CONTENT_SLUG_DUPLICATE",
        `Atlas already contains content with slug "${content.slug}".`
      )
    );
  }

  if (content.description.trim().length < 40) {
    issues.push(
      createIssue(
        "description",
        "warning",
        "CONTENT_DESCRIPTION_SHORT",
        "The description should contain at least 40 characters."
      )
    );
  }

  if (content.tags.length < 3) {
    issues.push(
      createIssue(
        "tags",
        "warning",
        "CONTENT_TAGS_INCOMPLETE",
        "At least three searchable tags are recommended."
      )
    );
  }

  if (!content.image?.trim()) {
    issues.push(
      createIssue(
        "image",
        "warning",
        "CONTENT_IMAGE_MISSING",
        "No primary image was supplied."
      )
    );
  }

  if (
    contentType === "vehicle" &&
    !content.manufacturer?.trim()
  ) {
    issues.push(
      createIssue(
        "manufacturer",
        "error",
        "VEHICLE_MANUFACTURER_REQUIRED",
        "Vehicles require a manufacturer."
      )
    );
  }

  if (contentType === "vehicle" && !content.class?.trim()) {
    issues.push(
      createIssue(
        "class",
        "warning",
        "VEHICLE_CLASS_MISSING",
        "A vehicle class is recommended."
      )
    );
  }

  const errors = issues.filter(
    (issue) => issue.severity === "error"
  );

  const warnings = issues.filter(
    (issue) => issue.severity === "warning"
  );

  const information = issues.filter(
    (issue) => issue.severity === "info"
  );

  return {
    valid: errors.length === 0,
    score: calculateScore(issues),
    issues,
    errors,
    warnings,
    information,
  };
}