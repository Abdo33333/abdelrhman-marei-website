import { track } from "./lib/analytics";

const PORTFOLIO_URL =
  "https://drive.google.com/file/d/1QR9bJQoNHWeHwde5r68J68CzWwPb9T0b/view?usp=sharing";
const REVIEWS_URL =
  "https://drive.google.com/file/d/1oCLCiNI1kfWsGOAwyxq6lKS0SFO9a-8a/view";
const CV_PREFIX = "https://docs.google.com/document/d/1pAUdfGSd3s_tiqnWVERj-8QOAUn2QiKCqSMK7go5ycQ";
const LINKEDIN_PREFIX = "https://www.linkedin.com/in/abdelrhmanmariemarketing";

const clients = [
  ["CANARY", "مؤسسة كناري للإنتاج الفني"],
  ["SMART BODY", "SmartBody"],
  ["Abdullah Al Arbaosh", "Jewels"],
  ["Quite", "QUITE STORE"],
  ["QAWAM DIET", "قوام دايت"],
  ["Manal", "BEAUTYCARE"],
  ["COOLING BREEZ", "Cooling Breez"],
  ["SAYDALI DEAL", "صيدلية ديل"],
] as const;

function makeButton(label: string, href: string, trackLabel: string) {
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.dataset.enhancement = trackLabel;
  a.className =
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 hover:-translate-y-0.5";
  a.textContent = `${label} ↗`;
  a.addEventListener("click", () => track("resource_click", { resource: trackLabel }));
  return a;
}

function findLink(prefix: string) {
  return Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).find((a) => a.href.startsWith(prefix));
}

function enhanceAboutLinks() {
  const cv = findLink(CV_PREFIX);
  if (!cv || document.querySelector("[data-enhancement='about_portfolio']")) return;

  const portfolio = makeButton("View Portfolio", PORTFOLIO_URL, "about_portfolio");
  const linkedin = findLink(LINKEDIN_PREFIX);
  const target = linkedin?.parentElement || cv.parentElement;
  if (!target) return;

  target.appendChild(portfolio);
}

function findSectionByHeading(pattern: RegExp) {
  const heading = Array.from(document.querySelectorAll<HTMLElement>("h1,h2,h3,h4")).find((el) =>
    pattern.test(el.textContent?.trim() || ""),
  );
  return heading?.closest("section") as HTMLElement | null;
}

function enhanceTestimonials() {
  if (document.querySelector("[data-enhancement='full_reviews']")) return;

  const section = findSectionByHeading(/testimonial|client review|what clients/i);
  if (!section) return;

  const button = makeButton("View Full Reviews", REVIEWS_URL, "full_reviews");
  button.className += " mt-6";
  section.appendChild(button);
}

function createClientProofSection() {
  if (document.getElementById("selected-clients-proof")) return;

  const section = document.createElement("section");
  section.id = "selected-clients-proof";
  section.className = "py-20 sm:py-24 border-t border-white/10";
  section.setAttribute("aria-label", "Selected clients");

  section.innerHTML = `
    <div class="container-page">
      <div class="max-w-2xl">
        <p class="text-xs uppercase tracking-[0.24em] text-ink-soft">Selected clients</p>
        <h2 class="mt-3 font-serif text-4xl sm:text-5xl text-white">Businesses I’ve worked with</h2>
        <p class="mt-4 text-sm sm:text-base text-ink-soft leading-7">A selection of brands and businesses from marketing strategy, content, growth, and digital marketing engagements.</p>
      </div>
      <div data-client-grid class="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"></div>
    </div>
  `;

  const grid = section.querySelector<HTMLElement>("[data-client-grid]");
  clients.forEach(([brand, descriptor]) => {
    const card = document.createElement("div");
    card.className =
      "min-h-28 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-5 flex flex-col items-center justify-center text-center transition hover:bg-white/[0.06]";
    card.innerHTML = `
      <div class="font-serif text-lg sm:text-xl font-semibold text-white">${brand}</div>
      <div class="mt-2 text-[10px] sm:text-xs text-ink-soft">${descriptor}</div>
    `;
    grid?.appendChild(card);
  });

  const footer = document.querySelector("footer");
  if (footer?.parentElement) footer.parentElement.insertBefore(section, footer);
  else document.body.appendChild(section);
}

function enhanceTrustLogos() {
  if (document.querySelector("[data-client-grid]")) return;
  createClientProofSection();
}

export function initSiteEnhancements() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  let applied = false;
  const apply = () => {
    enhanceAboutLinks();
    enhanceTestimonials();
    enhanceTrustLogos();

    if (
      document.querySelector("[data-enhancement='about_portfolio']") &&
      document.querySelector("[data-client-grid]")
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
