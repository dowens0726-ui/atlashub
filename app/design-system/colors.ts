/**
 * ============================================================
 * Atlas Design System (ADS)
 * ------------------------------------------------------------
 * Central color palette used throughout AtlasHub.
 *
 * Design Goals:
 * - GTA VI inspired
 * - Premium SaaS quality
 * - Dark-first interface
 * - Consistent branding
 * - Future multi-game support
 * ============================================================
 */

export const AtlasColors = {
  // Brand
  vicePink: "#FF4D9D",
  oceanTeal: "#00E5D8",
  sunsetOrange: "#FF9E4D",
  nightPurple: "#6B30F5",

  // Base
  deepNavy: "#0B0F19",
  midnight: "#111827",
  panel: "#161B26",
  panelElevated: "#1B2230",

  // Text
  white: "#FFFFFF",
  slate: "#9CA3AF",
  muted: "#6B7280",

  // Status
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#38BDF8",

  // Borders
  border: "#2A3444",
  borderLight: "#3A4557",
} as const;

export type AtlasColor = keyof typeof AtlasColors;