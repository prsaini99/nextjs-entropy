'use client';
import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUTMTracking } from '@/hooks/useUTMTracking';

// GA4 measurement ID (stackbinary.io property). Pinned in code: the legacy
// GTM container and the stale NEXT_PUBLIC_GA_MEASUREMENT_ID env value both
// point at properties this account can't access.
const GA_ID = 'G-WTDN6LFJQ8';

// Microsoft Clarity project ID (heatmaps + session recordings), pinned in
// code — same ownership rule as GA: never duplicated via GTM.
const CLARITY_ID = 'xtggkeesip';

export default function Analytics() {
  const pathname = usePathname();
  const { utmData } = useUTMTracking();

  // SPA route changes: send page_view to GA4 directly
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [pathname]);

  // Push page view events to dataLayer for GTM
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      // Push page view event to dataLayer
      window.dataLayer.push({
        event: 'page_view',
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href
      });
      
      // Push UTM data if available
      const currentUTM = utmData.current || utmData.last_touch || utmData.first_touch;
      if (currentUTM) {
        window.dataLayer.push({
          event: 'utm_parameters',
          ...currentUTM
        });
      }
    }
  }, [pathname, utmData]);
  
  // Initialize dataLayer before GTM loads
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
  }, []);
  
  return (
    <>
      {/* Google Analytics 4 — direct gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>

      {/* Microsoft Clarity — heatmaps + session recordings */}
      <Script id="ms-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}
      </Script>

      {/* GTM intentionally not used — analytics tools are integrated directly.
          If a marketing team needs self-serve tag management later, create a
          GTM container under the company account and load it here. */}
    </>
  );
}