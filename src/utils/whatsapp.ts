import { formatPriceUSD } from './currency';

// Internal purchasing destination (not exposed in public UI text)
const PURCHASING_DESTINATION = '919735929985';

/**
 * Builds the dynamic WhatsApp purchase URL with product name, USD price, and URL.
 * URL is properly encoded with encodeURIComponent and directs to wa.me without exposing
 * the number in the user-facing text.
 */
export function buildWhatsAppPurchaseUrl(product: {
  id: string;
  name: string;
  price: number;
}): string {
  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : 'https://webnexa.app';

  const productUrl = `${baseUrl}?product=${encodeURIComponent(product.id)}`;
  const formattedPrice = formatPriceUSD(product.price);

  const message = `Hello Webnexa! I want to purchase this static website template.

Product: ${product.name}
Price: ${formattedPrice}
Product Link: ${productUrl}

Please provide the purchase instructions and delivery details.`;

  return `https://wa.me/${PURCHASING_DESTINATION}?text=${encodeURIComponent(message)}`;
}
