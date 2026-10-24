/**
 * Standard USD currency formatter using Intl.NumberFormat with 'en-US' locale.
 * Ensures consistent output across all platforms, e.g. $19.99, $29.99
 */
export const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Format a numeric price value to a USD currency string.
 * @param price - numeric price (e.g. 19.99)
 * @returns formatted string (e.g. "$19.99")
 */
export function formatPriceUSD(price: number): string {
  return usdFormatter.format(price);
}
