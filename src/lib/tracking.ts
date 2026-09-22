// Centralized Google Ads / GA4 tracking for all contact points.
const ADS_ID = 'AW-831126588';
const CONVERSION_LABELS = [
  `${ADS_ID}/JspbCO2CrYQcELz4p4wD`,
  `${ADS_ID}/sXwqCLqgxt4BELz4p4wD`,
] as const;

type Gtag = (...args: unknown[]) => void;

const getGtag = (): Gtag | null => {
  if (typeof window === 'undefined') return null;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof g === 'function' ? g : null;
};

/** Fires the Google Ads conversion + a readable GA4 event for any contact point. */
export const trackContact = (
  method: 'whatsapp' | 'form',
  source: string,
) => {
  const gtag = getGtag();
  if (!gtag) return;

  CONVERSION_LABELS.forEach((sendTo) => {
    gtag('event', 'conversion', {
      send_to: sendTo,
      value: 1.0,
      currency: 'CLP',
    });
  });

  gtag('event', 'generate_lead', {
    contact_method: method,
    form_source: source,
    value: 1.0,
    currency: 'CLP',
  });
};

export const trackWhatsApp = (source: string) => trackContact('whatsapp', source);
export const trackFormSubmit = (source: string) => trackContact('form', source);
