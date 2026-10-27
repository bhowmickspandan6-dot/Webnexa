/**
 * Standard INR currency formatter using Intl.NumberFormat with 'en-IN' locale.
 * Formats whole rupee amounts cleanly without decimal places (e.g. ₹5,000, ₹18,500, ₹20,000).
 */
export const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/**
 * Format a numeric price value to an Indian Rupee (INR) currency string.
 * @param price - numeric price in INR (e.g. 5000)
 * @returns formatted string (e.g. "₹5,000")
 */
export function formatPriceINR(price: number): string {
  return inrFormatter.format(price);
}

/**
 * Default price formatter alias.
 */
export const formatPrice = formatPriceINR;
export const formatPriceUSD = formatPriceINR;
