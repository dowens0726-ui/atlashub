import type { Property } from "@/app/data/properties";

export type PropertyValidationIssue = {
  field: string;
  message: string;
};

export type PropertyValidationResult = {
  valid: boolean;
  issues: PropertyValidationIssue[];
};

export function validateProperty(
  property: Property
): PropertyValidationResult {
  const issues: PropertyValidationIssue[] = [];

  if (!property.id.trim()) {
    issues.push({
      field: "id",
      message: "Property id is required.",
    });
  }

  if (!property.slug.trim()) {
    issues.push({
      field: "slug",
      message: "Property slug is required.",
    });
  }

  if (!property.name.trim()) {
    issues.push({
      field: "name",
      message: "Property name is required.",
    });
  }

  if (!property.description.trim()) {
    issues.push({
      field: "description",
      message: "Property description is required.",
    });
  }

  if (!property.location.region.trim()) {
    issues.push({
      field: "location.region",
      message: "Property region is required.",
    });
  }

  if (property.basePrice < 0) {
    issues.push({
      field: "basePrice",
      message: "Base price cannot be negative.",
    });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

export function validateProperties(
  properties: Property[]
): PropertyValidationResult[] {
  return properties.map(validateProperty);
}