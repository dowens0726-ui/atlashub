import type { Property } from "@/app/data/properties";

function serializeProperty(property: Property): string {
  return JSON.stringify(property, null, 2);
}

export function generatePropertyModule(
  exportName: string,
  properties: Property[]
): string {
  const serialized = properties
    .map((property) => serializeProperty(property))
    .join(",\n\n");

  return `import type { Property } from "./property.types";

export const ${exportName}: Property[] = [
${serialized}
];
`;
}