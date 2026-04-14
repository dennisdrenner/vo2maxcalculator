/**
 * GA4 event helper. Safe to import from client components — no-ops if
 * NEXT_PUBLIC_GA_ID is not configured or if window.gtag isn't available yet.
 */

type GtagFn = (command: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, params ?? {});
  } catch {
    // never block UI on analytics failures
  }
}

export const analytics = {
  calculatorSubmit(method: string) {
    trackEvent('calculator_submit', { method });
  },
  calculatorResult(method: string, vo2max: number, percentile: number) {
    trackEvent('calculator_result', {
      method,
      vo2max: Math.round(vo2max * 10) / 10,
      percentile,
    });
  },
  unitToggle(units: 'imperial' | 'metric') {
    trackEvent('unit_toggle', { units });
  },
  emailSubscribe(source: string) {
    trackEvent('email_subscribe', { source });
  },
  affiliateClick(productKey: string) {
    trackEvent('affiliate_click', { product: productKey });
  },
  outboundClick(href: string) {
    trackEvent('outbound_click', { href });
  },
};
