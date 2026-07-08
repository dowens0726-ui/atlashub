export type AtlasImpact = {
  empireScoreGain: number;
  estimatedIncomeGain: number;
  estimatedUnlocks: number;
  risk: "Low" | "Medium" | "High";
};

export function buildAtlasImpact(
  confidence: number
): AtlasImpact {
  const empireScoreGain =
    confidence >= 90 ? 8 : confidence >= 75 ? 5 : 3;

  const estimatedIncomeGain =
    confidence >= 90 ? 250000 : confidence >= 75 ? 150000 : 75000;

  const estimatedUnlocks =
    confidence >= 90 ? 3 : confidence >= 75 ? 2 : 1;

  const risk =
    confidence >= 90
      ? "Low"
      : confidence >= 75
      ? "Medium"
      : "High";

  return {
    empireScoreGain,
    estimatedIncomeGain,
    estimatedUnlocks,
    risk,
  };
}