export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      identify?: (params: Record<string, unknown>) => void;
    };
  }
}

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const TIKTOK_PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID as string | undefined;

export const WHATSAPP_NUMBER = "201556711030";
export const CV_URL =
  "https://docs.google.com/document/d/1pAUdfGSd3s_tiqnWVERj-8QOAUn2QiKCqSMK7go5ycQ/edit?tab=t.0#heading=h.l4x0h4rnwuzy";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

function loadScript(src: string, id: string, onLoad?: () => void) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  if (onLoad) script.onload = onLoad;
  document.head.appendChild(script);
}

function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const current: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) current[key] = value;
    }

    if (Object.keys(current).length) {
      const previous = JSON.parse(localStorage.getItem("am_last_touch") || "null");
      if (!localStorage.getItem("am_first_touch")) {
        localStorage.setItem(
          "am_first_touch",
          JSON.stringify({ ...current, landing_page: window.location.href, captured_at: new Date().toISOString() }),
        );
      }
      localStorage.setItem(
        "am_last_touch",
        JSON.stringify({ ...current, landing_page: window.location.href, captured_at: new Date().toISOString(), previous }),
      );
    }
  } catch {
    // Tracking must never break the site.
  }
}

export function getAttribution() {
  try {
    return {
      first_touch: JSON.parse(localStorage.getItem("am_first_touch") || "null"),
      last_touch: JSON.parse(localStorage.getItem("am_last_touch") || "null"),
    };
  } catch {
    return { first_touch: null, last_touch: null };
  }
}

export function initAnalytics() {
  captureAttribution();

  if (GA4_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, {
      send_page_view: true,
      page_title: document.title,
      page_location: window.location.href,
    });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`, "ga4-script");
  }

  if (META_PIXEL_ID) {
    const w = window as Window & { fbq?: (...args: unknown[]) => void; _fbq?: (...args: unknown[]) => void };
    if (!w.fbq) {
      const fbq = function (...args: unknown[]) {
        (fbq as typeof fbq & { queue?: unknown[] }).queue = (fbq as typeof fbq & { queue?: unknown[] }).queue || [];
        (fbq as typeof fbq & { queue?: unknown[] }).queue?.push(args);
      };
      w.fbq = fbq;
      w._fbq = fbq;
    }
    w.fbq("init", META_PIXEL_ID);
    w.fbq("track", "PageView");
    loadScript("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel-script");
  }

  if (TIKTOK_PIXEL_ID) {
    const script = document.createElement("script");
    script.id = "tiktok-pixel-script";
    script.innerHTML = `!function (w,d,t) {w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var s=d.createElement("script");s.type="text/javascript";s.async=!0;s.src=r+"?sdkid="+e+"&lib="+t;var f=d.getElementsByTagName("script")[0];f.parentNode.insertBefore(s,f)};ttq.load('${TIKTOK_PIXEL_ID}');ttq.page()}(window, document, 'ttq');`;
    document.head.appendChild(script);
  }
}

export function track(eventName: string, params: AnalyticsParams = {}) {
  const attribution = getAttribution();
  const enriched = {
    ...params,
    page_path: window.location.pathname,
    page_location: window.location.href,
    first_touch_source: attribution.first_touch?.utm_source,
    first_touch_medium: attribution.first_touch?.utm_medium,
    first_touch_campaign: attribution.first_touch?.utm_campaign,
    last_touch_source: attribution.last_touch?.utm_source,
    last_touch_medium: attribution.last_touch?.utm_medium,
    last_touch_campaign: attribution.last_touch?.utm_campaign,
  };

  try {
    window.gtag?.("event", eventName, enriched);
  } catch {
    // Ignore analytics failures.
  }

  try {
    window.fbq?.("trackCustom", eventName, enriched);
  } catch {
    // Ignore analytics failures.
  }

  try {
    window.ttq?.track(eventName, enriched);
  } catch {
    // Ignore analytics failures.
  }
}

export function buildWhatsAppLeadUrl(name: string, email: string, goal: string) {
  const attribution = getAttribution();
  const first = attribution.first_touch;
  const last = attribution.last_touch;
  const lines = [
    "Hello Abdelrhman, I would like to request a Free Marketing Audit.",
    `Name: ${name}`,
    `Email: ${email}`,
    `Need: ${goal || "Not specified"}`,
    first?.utm_source ? `First source: ${first.utm_source}` : "",
    first?.utm_campaign ? `First campaign: ${first.utm_campaign}` : "",
    last?.utm_source && last.utm_source !== first?.utm_source ? `Latest source: ${last.utm_source}` : "",
    `Page: ${window.location.href}`,
  ].filter(Boolean);

  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(lines.join("\n"))}&type=phone_number&app_absent=0`;
}
