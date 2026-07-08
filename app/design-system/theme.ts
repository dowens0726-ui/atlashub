/**
 * ============================================================
 * Atlas Design System (ADS)
 * ------------------------------------------------------------
 * Atlas Theme
 *
 * This file composes the entire design system into a single
 * object that can be consumed throughout AtlasHub.
 *
 * Future:
 * - Light/Dark themes
 * - Seasonal themes
 * - Multi-game themes
 * ============================================================
 */

import { AtlasColors } from "./colors";
import { AtlasGradients } from "./gradients";

export const AtlasTheme = {
  name: "Atlas Dark",

  colors: AtlasColors,

  gradients: AtlasGradients,

  layout: {
    maxWidth: "1440px",
    contentWidth: "1280px",
    sidebarWidth: "320px",
    navbarHeight: "72px",
    borderRadius: "1.5rem",
  },

  animation: {
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
  },
} as const;

export type AtlasThemeType = typeof AtlasTheme;