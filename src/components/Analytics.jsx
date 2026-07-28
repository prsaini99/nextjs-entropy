'use client';
import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUTMTracking } from '@/hooks/useUTMTracking';

// GA4 measurement ID; direct gtag installation because the legacy GTM
// container on this site is owned by an inaccessible account.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-WTDN6LFJQ8';

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

      {/* Google Tag Manager Only - All tracking goes through GTM */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <>
          {/* GTM Script */}
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}