'use client';

// Advertising click identifiers.
//
// These MUST be captured on the first ad click — they appear once, in the URL,
// and are not recoverable afterwards. Without a stored gclid you cannot upload
// offline conversions back to Google Ads, which is what eventually teaches it
// which *clicks* produced revenue rather than which produced form fills.
//
// gclid  — Google Ads (the one that matters)
// gbraid — Google, iOS web-to-app, privacy-safe replacement for gclid
// wbraid — Google, iOS app-to-web, same
// fbclid — Meta
// msclkid — Microsoft Ads
const CLICK_ID_PARAMS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'];

const STORAGE_KEY = 'ad_click_ids';

// Google Ads permits a click-through conversion window of up to 90 days, so a
// click ID older than that can no longer be used for an offline import.
const MAX_AGE_DAYS = 90;

/**
 * Reads click IDs off the current URL and stores them. Safe to call on every
 * route change — it no-ops when the URL carries none.
 */
export function captureClickIds() {
  if (typeof window === 'undefined') return;

  try {
    const params = new URLSearchParams(window.location.search);
    const found = {};

    CLICK_ID_PARAMS.forEach((param) => {
      const value = params.get(param);
      if (value) found[param] = value;
    });

    if (Object.keys(found).length === 0) return;

    // Last click wins — Google attributes a conversion to the most recent click,
    // so a newer ad click should overwrite an older one rather than be ignored.
    found.captured_at = new Date().toISOString();
    found.landing_page = window.location.pathname;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Storage blocked (Safari private mode, cookie settings). Attribution is
    // best-effort — never break a page over it.
  }
}

/**
 * Returns the stored click IDs, or {} if none are stored or they have expired.
 */
export function getClickIds() {
  if (typeof window === 'undefined') return {};

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const data = JSON.parse(raw);
    const age = Date.now() - new Date(data.captured_at).getTime();

    // NaN age means a corrupt timestamp — treat as absent rather than trust it.
    if (!(age >= 0) || age > MAX_AGE_DAYS * 24 * 60 * 60 * 1000) return {};

    return data;
  } catch {
    return {};
  }
}

/**
 * The click-ID fields every lead form should send, flattened and null-filled so
 * the API and database always receive a consistent shape.
 */
export function clickIdPayload() {
  const ids = getClickIds();
  return {
    gclid: ids.gclid || null,
    gbraid: ids.gbraid || null,
    wbraid: ids.wbraid || null,
    fbclid: ids.fbclid || null,
    msclkid: ids.msclkid || null,
    click_id_captured_at: ids.captured_at || null,
  };
}
