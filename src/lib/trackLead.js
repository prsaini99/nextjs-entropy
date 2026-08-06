// Central lead-conversion tracking. Fired on every successful lead form
// submission, for three consumers:
//   1. dataLayer `lead_submit`  → GTM (marketing team's tags can trigger on it)
//   2. GA4 `generate_lead`      → analytics + importable as an Ads conversion
//   3. Google Ads conversion    → direct gtag AW hit (option B), active once
//      AW_CONVERSION is filled with the ID/label from the Ads UI.

// Format: 'AW-XXXXXXXXX/AbCdEfGhIj' — from Google Ads → Tools → Conversions.
const AW_CONVERSION = '';

const META_EVENT_ID_KEY = 'sb_meta_event_id';

/**
 * The id shared by the two copies of one Lead conversion: the pixel's, fired
 * here in the browser, and the server's, sent by /api/contact which holds the
 * real email and phone. Meta deduplicates on it and keeps whichever matched
 * better — without a shared id the same lead would be counted twice.
 *
 * Forms call this when building the request body; trackLeadSubmit reads the
 * same value afterwards, then clears it so a second submission gets its own.
 */
export function getLeadEventId() {
  if (typeof window === 'undefined') return undefined;
  const fresh = `lead.${Date.now()}.${Math.random().toString(36).slice(2, 10)}`;
  try {
    const existing = window.sessionStorage.getItem(META_EVENT_ID_KEY);
    if (existing) return existing;
    window.sessionStorage.setItem(META_EVENT_ID_KEY, fresh);
  } catch {
    /* private mode: both copies just get their own ids */
  }
  return fresh;
}

export function trackLeadSubmit({ form = 'unknown', service = '', budget = '' } = {}) {
  if (typeof window === 'undefined') return;

  // 4. Meta pixel Lead, paired with the server copy by event id.
  const eventId = getLeadEventId();
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: form, content_category: service }, { eventID: eventId });
  }
  try {
    window.sessionStorage.removeItem(META_EVENT_ID_KEY);
  } catch {
    /* nothing to clear */
  }

  // 1. GTM-consumable event
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'lead_submit',
    lead_form: form,
    lead_service: service,
    lead_budget: budget,
  });

  // 2 + 3. gtag events (GA4 + Google Ads)
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      lead_form: form,
      lead_service: service,
      lead_budget: budget,
    });
    if (AW_CONVERSION) {
      window.gtag('event', 'conversion', { send_to: AW_CONVERSION });
    }
  }
}
