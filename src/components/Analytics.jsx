'use client';
import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUTMTracking } from '@/hooks/useUTMTracking';
import { captureClickIds, getClickIds } from '@/lib/clickIds';
import { setClarityTag, isTrackableHost } from '@/lib/analytics';

// GA4 measurement ID (stackbinary.io property). Pinned in code: the legacy
// GTM container and the stale NEXT_PUBLIC_GA_MEASUREMENT_ID env value both
// point at properties this account can't access.
const GA_ID = 'G-WTDN6LFJQ8';

// Microsoft Clarity project ID (heatmaps + session recordings), pinned in
// code — same ownership rule as GA: never duplicated via GTM.
const CLARITY_ID = 'xtggkeesip';

// Meta Pixel, dataset "Stackbinary". Pinned like the others. The pixel is
// half the picture: lead conversions are also sent server-side through
// /api/capi with the same event_id, and Meta deduplicates the pair. That
// redundancy is what keeps conversions visible when an ad blocker or iOS
// tracking prevention kills the browser copy.
const META_PIXEL_ID = '1956271148635450';

// Do not load GA4 or Clarity outside production. Development sessions were
// landing in the live property as unattributed, zero-engagement traffic — about
// half the dataset — and Clarity was recording localhost sessions alongside
// real ones. Neither tool can retroactively remove that.
//
// NODE_ENV is inlined at build time and identical on server and client, so
// gating the <Script> tags on it cannot cause a hydration mismatch.
//
// To deliberately test tracking locally, set NEXT_PUBLIC_ANALYTICS_DEBUG=true
// in .env.local — but remember those hits are real and land in the live property.
const ANALYTICS_ENABLED =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true';

export default function Analytics() {
  const pathname = usePathname();
  const { utmData } = useUTMTracking();

  // Ad click IDs (gclid et al). Runs before anything else and on every route,
  // because this component sits in the root layout and a click ID appears
  // exactly once — in the URL of the ad click — and is unrecoverable after.
  useEffect(() => {
    captureClickIds();
  }, [pathname]);

  // GA4 page_view — the single owner of page views. `config` below runs with
  // send_page_view:false, so this fires for the initial load *and* every SPA
  // route change: exactly one hit per route.
  //
  // The retry covers the race where this effect commits before the ga4-init
  // script has defined gtag(). Waiting for gtag also guarantees `config` is
  // already queued ahead of the event — a page_view that lands in dataLayer
  // before its config is dropped by gtag.js.
  useEffect(() => {
    let cancelled = false;
    let timer;
    let attempts = 0;

    const send = () => {
      if (cancelled) return;
      if (!isTrackableHost()) return;
      if (typeof window.gtag !== 'function') {
        if (attempts++ > 50) return; // ~5s, then give up (blocked/offline)
        timer = setTimeout(send, 100);
        return;
      }
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    };

    send();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname]);

  // GTM page_view. Deliberately separate from the UTM push below: when both
  // lived in one effect keyed on [pathname, utmData], utmData settling after
  // mount re-fired the page view and double-pushed it.
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_path: pathname,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [pathname]);

  // Clarity session tags. Without these, recordings are an unsearchable pile;
  // with them you can ask "sessions from the ai calling agent keyword, on a
  // paid click, who reached the pricing section but never submitted".
  //
  // Retries because the Clarity snippet is afterInteractive and may not have
  // defined window.clarity when this first runs.
  useEffect(() => {
    let cancelled = false;
    let timer;
    let attempts = 0;

    const tag = () => {
      if (cancelled) return;
      if (typeof window.clarity !== 'function') {
        if (attempts++ > 50) return; // ~5s then give up
        timer = setTimeout(tag, 100);
        return;
      }

      const utm = utmData.current || utmData.last_touch || utmData.first_touch || {};
      const ids = getClickIds();

      setClarityTag('landing', pathname);
      setClarityTag('source', utm.utm_source || document.referrer ? (utm.utm_source || 'referral') : 'direct');
      setClarityTag('medium', utm.utm_medium);
      setClarityTag('campaign', utm.utm_campaign);
      // The single most useful filter: which keyword bought this session.
      setClarityTag('kw', utm.utm_term);
      setClarityTag('paid', ids.gclid ? 'google-ads' : 'organic');
    };

    tag();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname, utmData]);

  // GTM UTM push — only when there is something to send. The old guard tested
  // a `{}` fallback, which is truthy, so it fired an empty event every route.
  useEffect(() => {
    const currentUTM = utmData.current || utmData.last_touch || utmData.first_touch;
    if (!currentUTM || Object.keys(currentUTM).length === 0) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'utm_parameters',
      ...currentUTM,
    });
  }, [utmData]);


  // Careers is excluded from the ad platform only (see the pixel block below).
  // Computed here rather than inside JSX so the SPA page_view effect can use
  // the same rule: a candidate who browses from a job page to a product page
  // should not be counted as a buyer either.
  const isCareersRoute = pathname?.startsWith('/careers');

  // Nothing loads in development, so localhost can no longer pollute the
  // property. The effects above are harmless no-ops without gtag/clarity.
  if (!ANALYTICS_ENABLED) return null;

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
          // send_page_view:false — the page_view effect in this component owns
          // page views for every route. Leaving it on made config auto-send a
          // second hit for the landing page.
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>

      {/* Meta Pixel — ad attribution + retargeting audiences.
          DELIBERATELY NOT LOADED ON /careers: the 2026-08 applicant flood put
          6,000+ job seekers through those pages, which vastly outnumber buyers.
          Feeding them to the pixel would teach Meta that our customer looks
          like a job applicant, and every lookalike, retargeting pool and
          Advantage+ expansion built afterwards would inherit that. GA4 and
          Clarity still track careers in full; only the ad platform is spared.
          Revisit only if we ever run recruitment ads, which would want their
          own dataset anyway. */}
      {!isCareersRoute && (
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      )}

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

      {/* Google Tag Manager — the marketing team's self-serve tag workspace
          (ad pixels, conversion tags). Owner rule: GA4 and Clarity live in
          code above and must never be duplicated inside GTM. */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `}
        </Script>
      )}
    </>
  );
}