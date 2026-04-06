/**
 * Number & Currency Formatting Utilities
 */

/**
 * Formats a raw number with standard locale abbreviations (e.g., 1.2k, 1M).
 * Fallbacks to basic comma separation for standard bounds.
 */
export function formatCompactNumber(number: number, locales: string = "en-US"): string {
  return new Intl.NumberFormat(locales, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

/**
 * Formats standard area calculations (Hectares or Acres securely).
 */
export function formatArea(area: number, unit: "ha" | "ac" = "ha", maxDecimals: number = 2): string {
  return `${Number(area.toFixed(maxDecimals)).toLocaleString()} ${unit}`;
}


/**
 * Percentage Calculation Utilities
 */

/**
 * Calculates a strict percentage between two values without breaking constraints.
 */
export function calculatePercentage(part: number, total: number, maxDecimals: number = 1): number {
  if (total === 0) return 0;
  const percentage = (part / total) * 100;
  return Number(percentage.toFixed(maxDecimals));
}

/**
 * Calculates the growth or decline delta automatically.
 */
export function calculateDelta(current: number, previous: number): { delta: number; isPositive: boolean } {
  if (previous === 0) return { delta: 100, isPositive: current > 0 };
  const delta = calculatePercentage(current - previous, Math.abs(previous));
  return { delta: Math.abs(delta), isPositive: delta >= 0 };
}


/**
 * Data Transformation Utilities
 */

/**
 * Capitalizes string inputs robustly. Useful for IDs or statuses.
 */
export function capitalizeFirstLetter(string: string): string {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/**
 * Groups an array of objects generically by a specified key.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupBy<T extends Record<string, any>>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, current) => {
    const groupKey = String(current[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(current);
    return acc;
  }, {} as Record<string, T[]>);
}
