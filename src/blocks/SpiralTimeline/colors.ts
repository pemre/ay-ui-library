import {
  interpolateCool,
  interpolateRainbow,
  interpolateRgb,
  interpolateSpectral,
  interpolateWarm,
} from "d3";
import type { ColorScale, FogConfig } from "./types.ts";

/**
 * Returns the D3 color interpolator function for the given scale name.
 * Falls back to spectral if the scale is unrecognized.
 */
export function getColorInterpolator(scale: ColorScale): (t: number) => string {
  switch (scale) {
    case "spectral":
      return interpolateSpectral;
    case "rainbow":
      return interpolateRainbow;
    case "cool":
      return interpolateCool;
    case "warm":
      return interpolateWarm;
    default:
      return interpolateSpectral;
  }
}

/**
 * Returns a color for a ring at the given offset using the interpolator.
 * Offset is mapped to a 0–1 range via `(offset % 10) / 10`.
 */
export function getYearColor(offset: number, interpolator: (t: number) => string): string {
  return interpolator((((offset % 10) + 10) % 10) / 10);
}

/**
 * Returns a season-appropriate color for the given month index (0–11).
 *
 * - Winter (Dec=11, Jan=0, Feb=1): blue shades
 * - Spring (Mar=2, Apr=3, May=4): yellow/green shades
 * - Summer (Jun=5, Jul=6, Aug=7): green/teal shades
 * - Autumn (Sep=8, Oct=9, Nov=10): orange/brown shades
 */
export function getSeasonColor(monthIndex: number): string {
  const m = ((monthIndex % 12) + 12) % 12;

  if (m === 11 || m === 0 || m === 1) {
    // Winter — blue
    const progress = m === 11 ? 0 : m === 0 ? 0.33 : 0.67;
    return interpolateRgb("#1e3a8a", "#3b82f6")(progress);
  }
  if (m >= 2 && m <= 4) {
    // Spring — yellow/green
    const progress = (m - 2) / 2;
    return interpolateRgb("#fbbf24", "#84cc16")(progress);
  }
  if (m >= 5 && m <= 7) {
    // Summer — green/teal
    const progress = (m - 5) / 2;
    return interpolateRgb("#22c55e", "#14b8a6")(progress);
  }
  // Autumn — orange/brown
  const progress = (m - 8) / 2;
  return interpolateRgb("#f97316", "#92400e")(progress);
}

/**
 * Computes the opacity for a spiral ring based on fog configuration.
 *
 * - When fog is disabled, returns 1 (full opacity) for all rings.
 * - Rings at or before `fog.startRing` have opacity 1.
 * - Rings beyond `fog.startRing` fade proportionally, clamped to a minimum of 0.1.
 *
 * @param ringIndex - The ring index (0 = innermost/most recent).
 * @param fogConfig - The fog configuration object.
 * @param totalRings - Total number of rings in the visible range.
 */
export function computeFogOpacity(
  ringIndex: number,
  fogConfig: FogConfig,
  totalRings: number,
): number {
  if (!fogConfig.enabled || ringIndex <= fogConfig.startRing) {
    return 1;
  }
  const yearRange = Math.max(totalRings, 1);
  const opacity = 1 - ((ringIndex - fogConfig.startRing) / yearRange) * fogConfig.intensity;
  return Math.max(0.1, opacity);
}
