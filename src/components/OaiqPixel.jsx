'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// OpenAI Ads (ChatGPT Ads) measurement pixel, OAIQ SDK.
// Docs: https://developers.openai.com/ads/measurement-pixel
//
// Deliberately NOT loaded for visitors whose browser timezone is European:
// ChatGPT Ads only serve India for us, so EU visitors carry zero measurement
// value, and skipping them keeps the /de funnel entirely outside this
// pixel's cookie (DSGVO posture: no consent question arises for a script
// that never loads). Timezone is a heuristic, not geolocation, which is
// exactly as precise as this needs to be.
const PIXEL_ID = '3JSPzrFFQZuEHqoKqxcirJ';

function isEuropeanTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return tz.startsWith('Europe/');
  } catch {
    return false;
  }
}

export default function OaiqPixel() {
  const pathname = usePathname();
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || isEuropeanTimezone()) return;
    loaded.current = true;
    (function (w, d, s, u) {
      if (w.oaiq) return;
      const q = function () { q.q.push(arguments); };
      q.q = [];
      w.oaiq = q;
      const j = d.createElement(s);
      j.async = 1;
      j.src = u;
      const f = d.getElementsByTagName(s)[0];
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'https://bzrcdn.openai.com/sdk/oaiq.min.js');
    window.oaiq('init', { pixelId: PIXEL_ID, debug: false });
  }, []);

  // The SDK has no SPA auto-tracking; fire page_viewed on route changes.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.oaiq && loaded.current) {
      window.oaiq('measure', 'page_viewed', { type: 'customer_action' });
    }
  }, [pathname]);

  return null;
}
