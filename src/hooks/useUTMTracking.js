'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const STORAGE_KEY = 'utm_tracking_data';
const SESSION_KEY = 'utm_session_data';

export function useUTMTracking() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [utmData, setUtmData] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Capture UTM parameters from URL
    const currentUTMData = {};
    let hasUTM = false;

    UTM_PARAMS.forEach(param => {
      const value = searchParams.get(param);
      if (value) {
        currentUTMData[param] = value;
        hasUTM = true;
      }
    });

    // Add additional tracking data
    if (hasUTM) {
      currentUTMData.timestamp = new Date().toISOString();
      currentUTMData.landing_page = pathname;
      currentUTMData.referrer = document.referrer || 'direct';
      
      // Store as both first-touch (persistent) and last-touch (session)
      const existingData = getStoredUTMData();
      
      // First-touch attribution (only set if not exists)
      if (!existingData.first_touch) {
        const firstTouchData = {
          ...currentUTMData,
          attribution_type: 'first_touch'
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          ...existingData,
          first_touch: firstTouchData
        }));
      }
      
      // Last-touch attribution (always update)
      const lastTouchData = {
        ...currentUTMData,
        attribution_type: 'last_touch'
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(lastTouchData));
      
      // Update state
      setUtmData({
        first_touch: existingData.first_touch || currentUTMData,
        last_touch: lastTouchData,
        current: currentUTMData
      });
    } else {
      // No UTM params in URL, load from storage
      const storedData = getStoredUTMData();
      const sessionData = getSessionUTMData();
      setUtmData({
        first_touch: storedData.first_touch,
        last_touch: sessionData,
        current: {}
      });
    }
    
    setIsInitialized(true);
  }, [searchParams, pathname]);

  // Track page view with UTM data
  useEffect(() => {
    if (isInitialized && window.gtag) {
      const trackingData = utmData.current || utmData.last_touch || utmData.first_touch || {};
      
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_referrer: document.referrer,
        ...trackingData
      });
    }
  }, [pathname, utmData, isInitialized]);

  return {
    utmData,
    hasUTMParams: Object.keys(utmData.current || {}).length > 0,
    getAttributionData: () => ({
      first_touch: utmData.first_touch || {},
      last_touch: utmData.last_touch || utmData.current || {},
      multi_touch: getAllTouchPoints()
    }),
    clearUTMData: () => {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      setUtmData({});
    }
  };
}

// Helper functions
function getStoredUTMData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getSessionUTMData() {
  try {
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
    multi_touch: getAllTouchPoints()
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