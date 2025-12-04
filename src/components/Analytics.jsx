'use client';
import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUTMTracking } from '@/hooks/useUTMTracking';

export default function Analytics() {
  const pathname = usePathname();
  const { utmData } = useUTMTracking();
  
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