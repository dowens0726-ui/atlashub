/**
 * ============================================================
 * Atlas Design System (ADS)
 * ------------------------------------------------------------
 * Shared gradient definitions.
 * All gradients reference AtlasColors to keep branding
 * centralized and consistent.
 * ============================================================
 */

import { AtlasColors } from "./colors";

export const AtlasGradients = {
  viceSunset: `linear-gradient(
    135deg,
    ${AtlasColors.nightPurple} 0%,
    ${AtlasColors.vicePink} 45%,
    ${AtlasColors.sunsetOrange} 100%
  )`,

  oceanGlow: `linear-gradient(
    135deg,
    ${AtlasColors.oceanTeal} 0%,
    ${AtlasColors.info} 100%
  )`,

  empire: `linear-gradient(
    135deg,
    ${AtlasColors.deepNavy} 0%,
    ${AtlasColors.panelElevated} 100%
  )`,

  heroOverlay: `linear-gradient(
    180deg,
    rgba(11, 15, 25, 0.10) 0%,
    rgba(11, 15, 25, 0.70) 70%,
    rgba(11, 15, 25, 0.95) 100%
  )`,
} as const;

export type AtlasGradient = keyof typeof AtlasGradients;