// Central lead-conversion tracking. Fired on every successful lead form
// submission, for three consumers:
//   1. dataLayer `lead_submit`  → GTM (marketing team's tags can trigger on it)
//   2. GA4 `generate_lead`      → analytics + importable as an Ads conversion
//   3. Google Ads conversion    → direct gtag AW hit (option B), active once
//      AW_CONVERSION is filled with the ID/label from the Ads UI.

// Format: 'AW-XXXXXXXXX/AbCdEfGhIj' — from Google Ads → Tools → Conversions.
const AW_CONVERSION = '';

export function trackLeadSubmit({ form = 'unknown', service = '', budget = '' } = {}) {
  if (typeof window === 'undefined') return;

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
