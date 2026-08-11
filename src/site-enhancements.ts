const PORTFOLIO_URL =
  "https://drive.google.com/file/d/1QR9bJQoNHWeHwde5r68J68CzWwPb9T0b/view?usp=sharing";
const REVIEWS_URL =
  "https://drive.google.com/file/d/1oCLCiNI1kfWsGOAwyxq6lKS0SFO9a-8a/view";

const clients = [
  ["CANARY", "مؤسسة كناري للإنتاج الفني", "text-purple-300"],
  ["SMART BODY", "SmartBody", "text-amber-300"],
  ["abdullah al arbaosh", "مجوهرت عبدالله الأرباش", "text-yellow-300"],
  ["Quite", "QUITE STORE", "text-white"],
  ["QAWAM DIET", "قوام دايت", "text-pink-300"],
  ["Manal", "BEAUTYCARE", "text-rose-300"],
  ["COOLING BREEZ", "Cooling Breez", "text-sky-300"],
  ["SAYDALI DEAL", "صيدلية ديل", "text-lime-300"],
] as const;

function makeButton(label: string, href: string, trackLabel: string) {
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.dataset.track = "resource_click";
  a.dataset.trackLabel = trackLabel;
  a.className = "btn-ghost";
  a.innerHTML = `${label}<span aria-hidden="true">↗</span>`;
  return a;
}

function enhanceAboutLinks() {
  const cv = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).find(
    (a) => a.href.includes("docs.google.com/document/d/1pAUdfGSd3s_tiqnWVERj-8QOAUn2QiKCqSMK7go5ycQ"),
  );
  if (!cv || document.querySelector("[data-enhancement='portfolio-link']")) return;

  const linkedin = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).find(
    (a) => a.href.includes("linkedin.com/in/abdelrhmanmariemarketing"),
  );

  const portfolio = makeButton("View Portfolio", PORTFOLIO_URL, "about_portfolio");
  portfolio.dataset.enhancement = "portfolio-link";

  if (linkedin?.parentElement) {
    linkedin.parentElement.insertBefore(portfolio, linkedin);
  } else {
    cv.parentElement?.appendChild(portfolio);
  }
}

function enhanceTestimonials() {
  const section = document.querySelector<HTMLElement>('section[aria-label="Client testimonials"]');
  if (!section || section.querySelector("[data-enhancement='full-reviews']")) return;

  const button = makeButton("View Full Reviews", REVIEWS_URL, "full_reviews");
  button.dataset.enhancement = "full-reviews";
  button.className = "btn-accent mt-6 inline-flex";
  const container = section.querySelector(".container-page");
  container?.appendChild(button);
}

function enhanceTrustLogos() {
  const section = document.querySelector<HTMLElement>('section[aria-label="Featured clients"]');
  if (!section || section.querySelector("[data-enhancement='client-logo-grid']")) return;

  const marquee = section.querySelector<HTMLElement>(".marquee-track");
  if (!marquee) return;

  marquee.className = "client-logo-grid grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full";
  marquee.innerHTML = "";

  clients.forEach(([brand, descriptor, tone]) => {
    const card = document.createElement("div");
    card.className =
      "rounded-2xl glass min-h-[92px] sm:min-h-[112px] px-4 py-5 flex flex-col items-center justify-center text-center border border-white/10";
    card.dataset.enhancement = "client-logo-grid";
    card.innerHTML = `
      <div class="font-serif text-base sm:text-lg font-semibold tracking-tight ${tone}">${brand}</div>
      <div class="mt-1 text-[10px] sm:text-xs text-ink-soft">${descriptor}</div>
    `;
    marquee.appendChild(card);
  });

  const mask = marquee.parentElement;
  if (mask) {
    mask.style.maskImage = "none";
    mask.style.webkitMaskImage = "none";
    mask.classList.remove("relative", "overflow-hidden");
  }
}

export function initSiteEnhancements() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  let applied = false;
  const apply = () => {
    enhanceAboutLinks();
    enhanceTestimonials();
    enhanceTrustLogos();

    if (
      document.querySelector("[data-enhancement='portfolio-link']") &&
      document.querySelector("[data-enhancement='full-reviews']") &&
      document.querySelector("[data-enhancement='client-logo-grid']")
    ) {
      applied = true;
      observer.disconnect();
    }
  };

  const observer = new MutationObserver(() => {
    if (!applied) apply();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  apply();
  window.setTimeout(() => observer.disconnect(), 15000);
}
