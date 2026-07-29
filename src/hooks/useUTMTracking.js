'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const STORAGE_KEY = 'utm_tracking_data';
const SESSION_KEY = 'utm_session_data';

const EMPTY_STATE = { first_touch: {}, last_touch: {}, current: {} };

/**
 * Captures UTM parameters off the landing URL and persists them as
 * first-touch (localStorage, survives sessions) and last-touch
 * (sessionStorage, resets each session).
 *
 * Reads window.location.search rather than useSearchParams() on purpose:
 * useSearchParams() forces every consuming route out of static rendering and
 * must sit inside a <Suspense> boundary, and this hook runs in the root
 * layout via <Analytics />. Same approach as MartechLeadForm.
 *
 * Caveat: keyed on pathname, so a navigation that changes only the query
 * string won't re-capture. Ad clicks always arrive as a fresh document load,
 * which this does catch.
 */
export function useUTMTracking() {
  const pathname = usePathname();
  const [utmData, setUtmData] = useState(EMPTY_STATE);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const current = {};
    UTM_PARAMS.forEach((param) => {
      const value = params.get(param);
      if (value) current[param] = value;
    });

    const stored = getStoredUTMData();

    // No UTMs on this URL — surface whatever earlier touches recorded.
    if (Object.keys(current).length === 0) {
      setUtmData({
        first_touch: stored.first_touch || {},
        last_touch: getSessionUTMData() || {},
        current: {},
      });
      return;
    }

    current.timestamp = new Date().toISOString();
    current.landing_page = pathname;
    current.referrer = document.referrer || 'direct';

    // First touch is written once and never overwritten.
    const firstTouch = stored.first_touch || { ...current, attribution_type: 'first_touch' };
    if (!stored.first_touch) {
      safeWrite('local', STORAGE_KEY, { ...stored, first_touch: firstTouch });
    }

    // Last touch always updates.
    const lastTouch = { ...current, attribution_type: 'last_touch' };
    safeWrite('session', SESSION_KEY, lastTouch);

    setUtmData({ first_touch: firstTouch, last_touch: lastTouch, current });
  }, [pathname]);

  return {
    utmData,
    hasUTMParams: Object.keys(utmData.current || {}).length > 0,
    getAttributionData: () => ({
      first_touch: utmData.first_touch || {},
      last_touch: utmData.last_touch || utmData.current || {},
      multi_touch: getAllTouchPoints(),
    }),
    clearUTMData: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(SESSION_KEY);
      } catch {
        // storage unavailable (private mode / blocked cookies)
      }
      setUtmData(EMPTY_STATE);
    },
  };
}

// Helper functions
function safeWrite(kind, key, value) {
  try {
    const store = kind === 'local' ? localStorage : sessionStorage;
    store.setItem(key, JSON.stringify(value));
  } catch {
    // Safari private mode and blocked-storage settings throw on setItem.
    // Attribution is best-effort; never break a page over it.
  }
}

function getStoredUTMData() {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getSessionUTMData() {
  try {
    if (typeof window === 'undefined') return null;
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function getAllTouchPoints() {
  const touchPoints = [];
  const stored = getStoredUTMData();
  const session = getSessionUTMData();

  if (stored.first_touch) {
    touchPoints.push(stored.first_touch);
  }
  if (stored.touch_points) {
    touchPoints.push(...stored.touch_points);
  }
  if (session && session.timestamp !== stored.first_touch?.timestamp) {
    touchPoints.push(session);
  }

  return touchPoints;
}

// Export utility to get UTM data without hook (for server-side or non-component use)
export function getUTMData() {
  return {
    first_touch: getStoredUTMData().first_touch || {},
    last_touch: getSessionUTMData() || {},
    multi_touch: getAllTouchPoints(),
  };
}

// Utility to append UTM params to internal links
export function appendUTMParams(url, utmParams = {}) {
  try {
    const urlObj = new URL(url, window.location.origin);

    // Only append to internal links
    if (urlObj.origin !== window.location.origin) {
      return url;
    }

    // Append UTM params if they exist
    Object.entries(utmParams).forEach(([key, value]) => {
      if (value && UTM_PARAMS.includes(key)) {
        urlObj.searchParams.set(key, value);
      }
    });

    return urlObj.toString();
  } catch {
    return url;
  }
}
