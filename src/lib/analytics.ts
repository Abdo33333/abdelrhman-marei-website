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
const LEAD_WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined;
const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "";

export const WHATSAPP_NUMBER = "201556711030";
export const CV_URL =
  "https://docs.google.com/document/d/1pAUdfGSd3s_tiqnWVERj-8QOAUn2QiKCqSMK7go5ycQ/edit?tab=t.0#heading=h.l4x0h4rnwuzy";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ttclid",
] as const;

const ATTRIBUTION_KEY = "am_attribution_v2";
const SESSION_KEY = "am_session_id";

function loadScript(src: string, id: string, onLoad?: () => void) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  if (onLoad) script.onload = onLoad;
  document.head.appendChild(script);
}

function getSessionId() {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return "unknown";
  }
}

function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const current: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) current[key] = value;
    }

    const stored = JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || "{}") as {
      first_touch?: Record<string, string>;
      last_touch?: Record<string, string>;
    };

    const landing = {
      ...current,
      landing_page: window.location.href,
      landing_path: window.location.pathname,
      referrer: document.referrer || "direct",
      captured_at: new Date().toISOString(),
    };

    if (Object.keys(current).length && !stored.first_touch) {
      stored.first_touch = landing;
    }
    if (Object.keys(current).length) {
      stored.last_touch = { ...landing, previous: stored.last_touch ? "true" : "false" };
    }

    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(stored));
  } catch {
    // Tracking must never break the site.
  }
}

export function getAttribution() {
  try {
    const stored = JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || "{}") as {
      first_touch?: Record<string, string>;
      last_touch?: Record<string, string>;
    };
    return {
      first_touch: stored.first_touch || null,
      last_touch: stored.last_touch || null,
    };
  } catch {
    return { first_touch: null, last_touch: null };
  }
}

function getContext() {
  const attribution = getAttribution();
  return {
    session_id: getSessionId(),
    page_path: window.location.pathname,
    page_location: window.location.href,
    referrer: document.referrer || "direct",
    language: navigator.language,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    device_type: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
    first_touch_source: attribution.first_touch?.utm_source,
    first_touch_medium: attribution.first_touch?.utm_medium,
    first_touch_campaign: attribution.first_touch?.utm_campaign,
    last_touch_source: attribution.last_touch?.utm_source,
    last_touch_medium: attribution.last_touch?.utm_medium,
    last_touch_campaign: attribution.last_touch?.utm_campaign,
    first_touch_gclid: attribution.first_touch?.gclid,
    first_touch_fbclid: attribution.first_touch?.fbclid,
    first_touch_ttclid: attribution.first_touch?.ttclid,
    last_touch_gclid: attribution.last_touch?.gclid,
    last_touch_fbclid: attribution.last_touch?.fbclid,
    last_touch_ttclid: attribution.last_touch?.ttclid,
  };
}

export function initAnalytics() {
  captureAttribution();
  getSessionId();

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

  // Persist lead submissions to a configured webhook in addition to the existing WhatsApp flow.
  // This is intentionally optional so the site remains functional before a CRM/Sheet webhook is configured.
  if (LEAD_WEBHOOK_URL) {
    document.addEventListener(
      "submit",
      (event) => {
        const form = event.target as HTMLFormElement | null;
        if (!form || form.id !== "lead-form") return;
        const data = new FormData(form);
        const payload = {
          event: "lead_submitted",
          name: String(data.get("name") || "").trim(),
          email: String(data.get("email") || "").trim(),
          goal: String(data.get("goal") || "").trim(),
          submitted_at: new Date().toISOString(),
          ...getContext(),
        };
        void fetch(LEAD_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {
          // Never block the lead/WhatsApp flow because a webhook is unavailable.
        });
      },
      true,
    );
  }
}

export function track(eventName: string, params: AnalyticsParams = {}) {
  const enriched = { ...params, ...getContext() };

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
    `Session: ${getSessionId()}`,
    `Page: ${window.location.href}`,
  ].filter(Boolean);

  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(lines.join("\n"))}&type=phone_number&app_absent=0`;
}

export function getSiteUrl(path = "/") {
  if (SITE_URL) return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  return path;
}
