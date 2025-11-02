/**
 * Color contrast utilities for ensuring WCAG AA compliance
 */

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 * Formula from WCAG 2.0
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 * WCAG AA requires:
 * - 4.5:1 for normal text
 * - 3:1 for large text (18pt+)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return 0;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if two colors meet WCAG AA standards
 */
export function meetsWCAGAA(
  foreground: string,
  background: string,
  largeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return largeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Get a safe text color (black or white) for a given background
 */
export function getSafeTextColor(backgroundColor: string): string {
  const whiteContrast = getContrastRatio('#ffffff', backgroundColor);
  const blackContrast = getContrastRatio('#000000', backgroundColor);

  // Return white if it has better contrast, otherwise black
  return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}

/**
 * Validate and fix a color scheme to ensure proper contrast
 */
export function validateAndFixColorScheme(scheme: {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  font_heading?: string;
  font_body?: string;
}): typeof scheme {
  const fixed = { ...scheme };

  // CRITICAL: Ensure background_color is always light
  const bgRgb = hexToRgb(fixed.background_color);
  if (bgRgb) {
    const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    if (bgLum < 0.85) {
      console.warn(`Background color ${fixed.background_color} is too dark (${bgLum.toFixed(2)}). Fixing to white.`);
      fixed.background_color = '#ffffff';
    }
  }

  // CRITICAL: Ensure text_color is always dark
  const textRgb = hexToRgb(fixed.text_color);
  if (textRgb) {
    const textLum = getLuminance(textRgb.r, textRgb.g, textRgb.b);
    if (textLum > 0.3) {
      console.warn(`Text color ${fixed.text_color} is too light (${textLum.toFixed(2)}). Fixing to dark.`);
      fixed.text_color = '#1f2937';
    }
  }

  // Fix text color if it doesn't have enough contrast with background
  const textContrast = getContrastRatio(fixed.text_color, fixed.background_color);
  if (textContrast < 4.5) {
    console.warn(`Poor text contrast detected: ${textContrast.toFixed(2)}:1. Fixing...`);
    fixed.text_color = '#1f2937'; // Force dark text
  }

  // CRITICAL: Ensure secondary_color is also light (used as background in templates)
  // Secondary should have good contrast with text_color since it's used as a background
  const secondaryTextContrast = getContrastRatio(fixed.text_color, fixed.secondary_color);
  const secRgb = hexToRgb(fixed.secondary_color);
  if (secRgb) {
    const secLum = getLuminance(secRgb.r, secRgb.g, secRgb.b);
    if (secLum < 0.8 || secondaryTextContrast < 4.5) {
      console.warn(`Secondary color ${fixed.secondary_color} is too dark or has poor contrast. Fixing...`);
      fixed.secondary_color = '#f3f4f6'; // Light gray suitable for backgrounds
    }
  }

  // Fix primary color if it doesn't have enough contrast with background (for large text)
  const primaryContrast = getContrastRatio(fixed.primary_color, fixed.background_color);
  if (primaryContrast < 3) {
    console.warn(`Poor primary color contrast detected: ${primaryContrast.toFixed(2)}:1. Fixing...`);
    fixed.primary_color = '#2563eb'; // Safe blue that works on light backgrounds
  }

  // Ensure primary also has good contrast with secondary (since headings appear on secondary backgrounds)
  const primarySecondaryContrast = getContrastRatio(fixed.primary_color, fixed.secondary_color);
  if (primarySecondaryContrast < 3) {
    console.warn(`Poor primary/secondary contrast detected: ${primarySecondaryContrast.toFixed(2)}:1. Fixing primary...`);
    fixed.primary_color = '#2563eb'; // Safe blue
  }

  return fixed;
}
