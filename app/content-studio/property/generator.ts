import type { Property } from "@/app/data/properties";

import {
  parseProperties,
  type PropertyImportInput,
} from "./parser";

import {
  validateProperties,
} from "./validator";

import {
  generatePropertyModule,
} from "./templates";

export type PropertyGenerationResult = {
  valid: boolean;
  output: string;
  properties: Property[];
  validation: ReturnType<typeof validateProperties>;
};

export function generatePropertyCategory(
  exportName: string,
  category: Property["category"],
  inputs: PropertyImportInput[]
): PropertyGenerationResult {
  const properties = parseProperties(
    inputs,
    category
  );

  const validation = validateProperties(
    properties
  );

  const valid = validation.every(
    (result) => result.valid
  );

  return {
    valid,
    output: generatePropertyModule(
      exportName,
      properties
    ),
    properties,
    validation,
  };
}