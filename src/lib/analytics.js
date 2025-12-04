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
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  CHAT_OPEN: 'chat_open',
  
  // Conversion Events
  LEAD_GENERATED: 'generate_lead',
  QUALIFIED_LEAD: 'qualified_lead',
  CONVERSION: 'conversion'
};

// Track custom events with UTM data
export function trackEvent(eventName, parameters = {}) {
  if (typeof window === 'undefined') return;
  
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
  
  // Send to Google Tag Manager dataLayer only
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData
    });
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, eventData);
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
  
  // Google Ads conversions will be handled through GTM
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
    
    const session = sessionData ? JSON.parse(sessionData) : {};
    const local = localData ? JSON.parse(localData) : {};
    
    // Prefer session (last-touch) over local (first-touch)
    return {
      ...local.first_touch,
      ...session,
      attribution_model: session ? 'last_touch' : 'first_touch'
    };
  } catch {
    return {};
  }
}

// Initialize analytics on page load (GTM only now)
export function initializeAnalytics(measurementId) {
  if (typeof window === 'undefined') return;
  
  // Initialize dataLayer for GTM
  window.dataLayer = window.dataLayer || [];
  
  // GA4 will be configured through GTM instead of directly
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