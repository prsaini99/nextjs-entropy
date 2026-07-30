// Analytics utility functions for tracking events and conversions

export const ANALYTICS_EVENTS = {
  // Form Events
  FORM_START: 'form_start',
  FORM_PROGRESS: 'form_progress',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  
  // Contact Events
  CONTACT_FORM_VIEW: 'contact_form_view',
  CONTACT_FORM_START: 'contact_form_start',
  CONTACT_FORM_STEP_COMPLETE: 'contact_form_step_complete',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  
  // Career Events
  CAREER_VIEW: 'career_view',
  CAREER_APPLY_START: 'career_apply_start',
  CAREER_APPLY_SUBMIT: 'career_apply_submit',
  
  // Social Events
  SOCIAL_CLICK: 'social_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  TELEGRAM_CLICK: 'telegram_click',
  LINKEDIN_CLICK: 'linkedin_click',
  EMAIL_CLICK: 'email_click',
  
  // Navigation Events
  SERVICE_VIEW: 'service_view',
  CTA_CLICK: 'cta_click',
  CALENDLY_CLICK: 'calendly_click',

  // Mid-funnel engagement. At ~350 clicks/month the lead count is too small to
  // rank keywords on, so these are what the ad campaign actually optimises
  // toward — they fire on 10–30% of sessions instead of 1–2%.
  DEMO_OPEN: 'demo_open',
  DEMO_INTERACT: 'demo_interact',
  CASE_STUDY_OPEN: 'case_study_open',
  PILLAR_SELECT: 'pillar_select',

  // Intent intelligence. Which FAQ someone opens is their objection; which
  // product tab they click is their interest; where they abandon the form is
  // the field costing you the lead. None of this shows up in a conversion rate.
  FAQ_OPEN: 'faq_open',
  PRODUCT_TAB_VIEW: 'product_tab_view',
  FORM_ABANDON: 'form_abandon',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  CHAT_OPEN: 'chat_open',
  CHAT_MESSAGE: 'chat_message',
  
  // Conversion Events
  LEAD_GENERATED: 'generate_lead',
  QUALIFIED_LEAD: 'qualified_lead',
  CONVERSION: 'conversion'
};

/**
 * Guards against local hits reaching the live property.
 *
 * The build-time gate in Analytics.jsx stops the dev server loading GA4 at all,
 * but `next build && next start` runs with NODE_ENV=production — so a local
 * production build would otherwise send real hits from localhost. This catches
 * that case. Set NEXT_PUBLIC_ANALYTICS_DEBUG=true to deliberately override.
 */
export function isTrackableHost() {
  if (typeof window === 'undefined') return false;
  if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true') return true;

  const host = window.location.hostname;
  return !(
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '::1' ||
    host.endsWith('.local')
  );
}

/**
 * Microsoft Clarity session tags.
 *
 * GA4 answers "how many". Clarity answers "what did this person actually do" —
 * but only if you can find the session. Untagged recordings are an unsearchable
 * pile; tagged ones let you ask "show me sessions from the ai calling agent
 * keyword who opened a demo and then left without submitting".
 *
 * Clarity accumulates multiple values under one key, so every engagement event
 * lands under `action` and the session becomes filterable by behaviour.
 */
export function setClarityTag(key, value) {
  if (typeof window === 'undefined' || typeof window.clarity !== 'function') return;
  if (value === undefined || value === null || value === '') return;
  try {
    window.clarity('set', key, String(value).slice(0, 255));
  } catch {
    // Clarity blocked or not yet loaded. Tagging is best-effort.
  }
}

/**
 * Clarity has three distinct APIs and they do different jobs:
 *   set(key, value)   → session attribute, for filtering ("kw = ai calling agent")
 *   event(name)       → named action, appears in Clarity dashboards and funnels
 *   upgrade(reason)   → marks the session high-priority so the recording is
 *                       retained rather than sampled away
 *
 * `upgrade` matters most. Clarity samples recordings, and the sessions worth
 * watching are exactly the rare ones — someone who started the form and left.
 * Without upgrade, those are the recordings most likely to be discarded.
 */
export function clarityEvent(name) {
  if (typeof window === 'undefined' || typeof window.clarity !== 'function') return;
  try {
    window.clarity('event', name);
  } catch {}
}

export function clarityUpgrade(reason) {
  if (typeof window === 'undefined' || typeof window.clarity !== 'function') return;
  try {
    window.clarity('upgrade', reason);
  } catch {}
}

// High-intent actions. A session doing any of these is worth guaranteeing we can
// watch later, so it gets upgraded as well as tagged.
const CLARITY_UPGRADE = new Set([
  'contact_form_start',
  'form_abandon',
  'generate_lead',
  'demo_interact',
  'calendly_click',
  // Someone who types into the chat is asking a question out loud. Those
  // recordings are the cheapest source of real objections we have, and they are
  // rare enough to be sampled away without an upgrade.
  'chat_message',
]);

// Events worth being able to filter recordings by. Deliberately not everything —
// tagging every event makes the filters as noisy as no filters at all.
const CLARITY_TAGGED = new Set([
  'demo_open',
  'demo_interact',
  'contact_form_start',
  'contact_form_submit',
  'generate_lead',
  'calendly_click',
  'whatsapp_click',
  'faq_open',
  'case_study_open',
  'form_abandon',
  'chat_open',
  'chat_message',
]);

// Track custom events with UTM data
export function trackEvent(eventName, parameters = {}) {
  if (typeof window === 'undefined') return;

  // Log locally even though nothing is sent, so events remain debuggable in dev.
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 [not sent — dev]', eventName, parameters);
  }

  if (!isTrackableHost()) return;
  
  // Get UTM data from storage
  const utmData = getUTMDataFromStorage();
  
  // Combine event parameters with UTM data
  const eventData = {
    ...utmData,
    ...parameters,
    timestamp: new Date().toISOString(),
    page_location: window.location.href,
    page_title: document.title
  };
  
  // Two consumers, two formats. gtag.js and GTM share window.dataLayer but
  // not its protocol: gtag.js only reads its own `arguments`-shaped pushes, so
  // a GTM-style object push is invisible to GA4. Every event goes out twice.

  // 1. GTM (marketing team's tags trigger on these)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventData
  });

  // 2. GA4 — loaded directly via gtag.js, not through GTM
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventData);
  }

  // 3. Clarity — tag for filtering, emit as an event, and upgrade the session
  //    if this is high-intent so the recording survives sampling.
  if (CLARITY_TAGGED.has(eventName)) {
    setClarityTag('action', eventName);
    clarityEvent(eventName);
  }
  if (CLARITY_UPGRADE.has(eventName)) {
    clarityUpgrade(eventName);
  }

}

// Track form interactions
export function trackFormInteraction(formName, action, additionalData = {}) {
  const eventName = `${formName}_${action}`;
  trackEvent(eventName, {
    form_name: formName,
    form_action: action,
    ...additionalData
  });
}

// Track conversions with value
export function trackConversion(conversionType, value = null, currency = 'INR', additionalData = {}) {
  const eventData = {
    conversion_type: conversionType,
    ...additionalData
  };
  
  if (value) {
    eventData.value = value;
    eventData.currency = currency;
  }
  
  trackEvent(ANALYTICS_EVENTS.CONVERSION, eventData);

  // Google Ads conversion hits are fired separately by trackLeadSubmit()
  // in lib/trackLead.js, which owns the AW-/label send_to.
}

// Track social media clicks
export function trackSocialClick(platform, destination) {
  trackEvent(ANALYTICS_EVENTS.SOCIAL_CLICK, {
    social_platform: platform,
    click_destination: destination,
    interaction_type: 'click'
  });
  
  // Also track specific platform event
  const platformEvent = `${platform.toLowerCase()}_click`;
  if (ANALYTICS_EVENTS[platformEvent.toUpperCase()]) {
    trackEvent(ANALYTICS_EVENTS[platformEvent.toUpperCase()], {
      destination
    });
  }
}

// Track service page views
export function trackServiceView(serviceName, serviceSlug) {
  trackEvent(ANALYTICS_EVENTS.SERVICE_VIEW, {
    service_name: serviceName,
    service_slug: serviceSlug,
    content_type: 'service_page'
  });
}

// Track CTA clicks
export function trackCTAClick(ctaName, ctaLocation, destination) {
  trackEvent(ANALYTICS_EVENTS.CTA_CLICK, {
    cta_name: ctaName,
    cta_location: ctaLocation,
    click_destination: destination
  });
}

// Get UTM data from storage
function getUTMDataFromStorage() {
  try {
    const sessionData = sessionStorage.getItem('utm_session_data');
    const localData = localStorage.getItem('utm_tracking_data');
    
    // null, not {} — an empty object is truthy and made the model below
    // always report 'last_touch'.
    const session = sessionData ? JSON.parse(sessionData) : null;
    const local = localData ? JSON.parse(localData) : {};

    // Prefer session (last-touch) over local (first-touch)
    return {
      ...(local.first_touch || {}),
      ...(session || {}),
      attribution_model: session ? 'last_touch' : 'first_touch'
    };
  } catch {
    return {};
  }
}

// Ensures the dataLayer queue exists. GA4 and Clarity are loaded and
// configured in components/Analytics.jsx — nothing to initialize here.
export function initializeAnalytics() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
}

// Enhanced ecommerce tracking for lead value
export function trackLeadValue(leadSource, estimatedValue, leadQuality = 'standard') {
  trackEvent(ANALYTICS_EVENTS.LEAD_GENERATED, {
    lead_source: leadSource,
    lead_quality: leadQuality,
    estimated_value: estimatedValue,
    currency: 'INR',
    items: [{
      item_name: 'Lead',
      item_category: leadSource,
      price: estimatedValue,
      quantity: 1
    }]
  });
}

// Track scroll depth
export function trackScrollDepth(percentage) {
  trackEvent('scroll', {
    percent_scrolled: percentage,
    engagement_type: 'scroll_depth'
  });
}

// Track time on page
export function trackTimeOnPage(seconds) {
  trackEvent('engagement_time', {
    engagement_time_sec: seconds,
    engagement_type: 'time_on_page'
  });
}