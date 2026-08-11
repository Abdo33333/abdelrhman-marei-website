import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
  Linkedin,
  Sparkles,
  TrendingUp,
  Compass,
  Rocket,
  Zap,
  ShieldCheck,
  Clock,
  Lock,
  CalendarCheck,
  LineChart,
  Target,
  Workflow,
  Layers,
  Gauge,
} from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  MotionProvider,
  Reveal,
  Stagger,
  StaggerItem,
  Magnetic,
  FloatingOrbs,
  Spotlight,
  ScrollProgress,
} from "../components/motion";
import { buildWhatsAppLeadUrl, CV_URL, initAnalytics, track } from "../lib/analytics";

const PAGE_TITLE = "Marketing Strategist for GCC Businesses | Abdelrhman Marei";
const PAGE_DESCRIPTION =
  "Marketing strategy and content strategy for growing GCC businesses. Abdelrhman Marei helps businesses turn unclear marketing into a clear strategy, stronger content, and a system designed around business growth.";

const SOCIAL_LINKS = {
  whatsapp: "https://api.whatsapp.com/send/?phone=201556711030&text&type=phone_number&app_absent=0",
  tiktok: "https://www.tiktok.com/@abdelrhmanmariemarketing",
  instagram: "https://www.instagram.com/abdelrhmanmariemarketing",
  linkedin: "https://www.linkedin.com/in/abdelrhmanmariemarketing",
  facebook: "https://www.facebook.com/abdelrhmanmariemarketing",
  youtube: "https://www.youtube.com/@abdelrhmanmariemarketing",
};

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Abdelrhman Marei · Marketing Strategist" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "/#person",
              name: "Abdelrhman Marei",
              jobTitle: "Marketing Strategist",
              description: PAGE_DESCRIPTION,
              knowsAbout: [
                "Marketing Strategy",
                "Content Strategy",
                "Brand Positioning",
                "Customer Journey",
                "Growth Marketing",
              ],
              areaServed: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait"],
            },
            {
              "@type": "ProfessionalService",
              "@id": "/#service",
              name: "Abdelrhman Marei · Marketing Strategy",
              description: PAGE_DESCRIPTION,
              url: "/",
              founder: { "@id": "/#person" },
              serviceType: "Growth marketing strategy and advisory",
              areaServed: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Advisory engagements",
                itemListElement: services.map((s) => ({
                  "@type": "Offer",
                  name: s.name,
                  description: s.outcome,
                  priceCurrency: "USD",
                })),
              },
            },
            {
              "@type": "FAQPage",
              "@id": "/#faq",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
});


/* ------------------------------ Data ------------------------------ */

const trustLogos = [
  "QAWAM DIET",
  "SMARTBODY",
  "PHARMACY AL-OROUDH",
  "KANARY",
];

const pressLogos: string[] = [];

const metrics = [
  { value: "$5,600", label: "Sales generated from zero", sub: "Verified result for a Kuwait pharmacy / e-commerce project" },
  { value: "99%", label: "Inventory sold", sub: "Verified result for SmartBody in Iraq" },
  { value: "+25%", label: "Engagement", sub: "Verified result for Qawam Diet in Saudi Arabia" },
];

const metricsNote =
  "Only verified results are published. Where revenue, ad spend, ROAS, conversion rate, timeframe, or other supporting details were not provided, they are intentionally not shown.";

const caseStudies = [
  {
    industry: "Diet & Food",
    client: "Qawam Diet",
    profile: "Saudi Arabia",
    timeframe: "Verified result",
    challenge: "Strategy details available in the full case study.",
    move: "Brand communication, content strategy, engagement, and audience understanding.",
    baseline: "Not publicly disclosed",
    after: "Not publicly disclosed",
    result: "+25%",
    resultLabel: "Engagement",
    verified: "Verified result",
    scope: "Strategy + content",
    tone: "from-[oklch(0.7_0.18_265)] to-[oklch(0.75_0.15_85)]",
  },
  {
    industry: "Supplements",
    client: "SmartBody",
    profile: "Iraq",
    timeframe: "Verified result",
    challenge: "Inventory needed to be moved before expiration.",
    move: "Marketing strategy, urgency-led communication, and campaign/content execution.",
    baseline: "Inventory challenge",
    after: "99% inventory sold",
    result: "99%",
    resultLabel: "Inventory sold",
    verified: "Verified result",
    scope: "Marketing + campaign execution",
    tone: "from-[oklch(0.75_0.16_85)] to-[oklch(0.72_0.17_55)]",
  },
  {
    industry: "Pharmacy / E-commerce",
    client: "Pharmacy Al-Oroudh",
    profile: "Kuwait",
    timeframe: "Verified result",
    challenge: "Strategy details available in the full case study.",
    move: "Strategy details available in the full case study.",
    baseline: "$0 sales",
    after: "$5,600 in sales",
    result: "$5,600",
    resultLabel: "Sales generated from zero",
    verified: "Verified result",
    scope: "Marketing strategy",
    tone: "from-[oklch(0.72_0.17_55)] to-[oklch(0.7_0.18_265)]",
  },
  {
    industry: "Marketing Strategy",
    client: "Kanary / مؤسسة كناري",
    profile: "Saudi Arabia",
    timeframe: "Professional experience",
    challenge: "Strategy details available in the full case study.",
    move: "Provided marketing strategy for Kanary, a company operating across projects involving major brands and organizations.",
    baseline: "Not publicly disclosed",
    after: "Marketing strategy",
    result: "Strategy",
    resultLabel: "Marketing strategy engagement",
    verified: "Professional experience",
    scope: "Marketing strategy",
    tone: "from-[oklch(0.68_0.16_200)] to-[oklch(0.75_0.15_85)]",
  },
];

const services = [
  {
    tier: "Strategy",
    name: "Marketing Strategy",
    price: "Tailored to scope",
    duration: "Project-based",
    outcome: "A clear marketing direction built around the business, market, customer journey, channels, priorities, and measurable KPIs.",
    includes: [
      "Market analysis and positioning",
      "Target audience and customer journey",
      "Marketing funnel and channel strategy",
      "Growth roadmap and KPIs",
    ],
    icon: Compass,
    featured: true,
    cta: "Discuss your strategy",
  },
  {
    tier: "Content",
    name: "Content Strategy",
    price: "Tailored to scope",
    duration: "Project-based",
    outcome: "A content system designed to support business goals, strengthen positioning, and move the audience toward action.",
    includes: [
      "Audience research and content positioning",
      "Content pillars and funnel",
      "Creative direction and calendar",
      "Platform strategy and conversion-focused content",
    ],
    icon: Layers,
    cta: "Build your content strategy",
  },
];

const capabilities = [
  {
    icon: Target,
    title: "Market positioning",
    desc: "Clarify where the business should compete, who it should prioritize, and why the market should choose it.",
    span: "md:col-span-3 lg:col-span-2 lg:row-span-2",
    feature: true,
  },
  {
    icon: Workflow,
    title: "Customer journey & funnel",
    desc: "Map the journey from awareness to consideration and conversion so every marketing activity has a role.",
    span: "md:col-span-3 lg:col-span-2",
  },
  {
    icon: Gauge,
    title: "Channel strategy",
    desc: "Choose channels based on audience, business objectives, economics, and the role each channel should play.",
    span: "md:col-span-3 lg:col-span-2",
  },
  {
    icon: Layers,
    title: "Content architecture",
    desc: "Build content pillars, messaging, formats, and platform roles around the customer's real questions and needs.",
    span: "md:col-span-3 lg:col-span-2",
  },
  {
    icon: LineChart,
    title: "Growth roadmap & KPIs",
    desc: "Turn strategy into prioritized actions with clear KPIs, ownership, and a practical roadmap for execution.",
    span: "md:col-span-3 lg:col-span-2",
  },
];

const processSteps = [
  { step: "01", title: "Business Understanding", time: "Initial discovery", desc: "Understand the business, market, audience, current marketing, challenges, and commercial priorities." },
  { step: "02", title: "Strategic Diagnostic", time: "Analysis phase", desc: "Assess positioning, audience, customer journey, funnel, channels, content, and marketing priorities." },
  { step: "03", title: "Strategy & Roadmap", time: "Strategy delivery", desc: "Translate the diagnosis into a clear marketing strategy, content direction, priorities, and measurable KPIs." },
  { step: "04", title: "Execution Direction", time: "Ongoing support", desc: "Turn the strategy into an executable system with clear actions, content priorities, and performance feedback loops." },
];

const testimonials = [
  {
    quote: "Ma sha Allah, articulate and highly professional — clearly fully aware of what he delivers. Thank you for your cooperation and patience, and inshallah this is not our last collaboration.",
    name: "Ms. Layan",
    role: "Client",
    company: "Abaya Store · Saudi Arabia",
    result: "Saudi Arabia",
  },
  {
    quote: "Excellent, truly understands the work the right way, and very cooperative. May Allah bless him.",
    name: "Ms. Noura",
    role: "Client",
    company: "Kozmantics Store · Saudi Arabia",
    result: "Saudi Arabia",
  },
  {
    quote: "Abdelrhman is refined in dealing and truly skilled at his work. Inshallah our cooperation continues.",
    name: "Mr. Omair",
    role: "Client",
    company: "Perfume Store · United Arab Emirates",
    result: "United Arab Emirates",
  },
];

const credentials = [
  { period: "2017 — Present", role: "Content & Marketing", org: "Digital marketing journey", detail: "Content creation journey began in 2017, followed by experience across digital marketing, strategy, content, and growth-focused work." },
  { period: "7+ Years", role: "Marketing Experience", org: "Digital & GCC / MENA markets", detail: "Experience working with businesses across GCC and MENA markets, with a business-first and data-driven approach." },
  { period: "Kanary", role: "Marketing Strategy", org: "مؤسسة كناري · Saudi Arabia", detail: "Provided marketing strategy for Kanary, a company operating across projects involving major brands and organizations including MBC Shahid, Amazon, Riyad Bank, and government entities." },
  { period: "Current Focus", role: "Marketing Strategist", org: "Abdelrhman Marei", detail: "Focused on Marketing Strategy and Content Strategy for growing businesses operating in or targeting GCC markets." },
];

const authorityFacts = [
  { value: "7+", label: "Years of experience", sub: "Content creation journey began in 2017" },
  { value: "GCC", label: "Primary market focus", sub: "Supporting businesses operating in or targeting GCC markets" },
  { value: "MENA", label: "Regional experience", sub: "Experience across GCC and MENA markets" },
];

const fitYes = [
  "Startups, restaurants, clinics, e-commerce brands, and growing businesses",
  "Businesses operating in or targeting GCC markets",
  "Businesses that care about growth, sales, positioning, and marketing efficiency",
  "Decision-makers looking for strategy rather than content posting alone",
  "Businesses with approximately 10K to 1–2M in monthly revenue",
];

const fitNo = [
  "Businesses looking only for the cheapest marketing service",
  "Clients who only want content posting without strategy",
  "Influencers looking primarily for social media management",
  "Businesses below the target commercial stage for strategic work",
];

const protections = [
  { title: "Clear strategic scope", desc: "The work starts from the business problem, objectives, priorities, and agreed deliverables.", icon: Lock },
  { title: "Data integrity", desc: "Only verified information and results are published. Unknown numbers are never invented to make a case study look stronger.", icon: ShieldCheck },
  { title: "Built for the business", desc: "Strategy, content systems, and recommendations are designed to be practical for the team that will execute them.", icon: Check },
];

const faqs = [
  { q: "What services do you provide?", a: "The primary services are Marketing Strategy and Content Strategy. The work can include market analysis, positioning, target audience, customer journey, funnel, channel strategy, content pillars, creative direction, and growth roadmaps." },
  { q: "Who do you work with?", a: "The primary focus is startups, restaurants, clinics, e-commerce brands, and growing businesses operating in or targeting GCC markets." },
  { q: "What makes your approach different?", a: "The work starts with the business problem rather than jumping directly into posting or campaigns. The goal is to build a clear strategy and content system connected to business growth." },
  { q: "Do you work with businesses outside Egypt?", a: "Yes. The positioning is focused on GCC businesses, with experience across GCC and MENA markets. Abdelrhman is based in Cairo, Egypt." },
  { q: "Can you also support execution?", a: "The primary positioning is strategic. Where execution support is needed, it should be defined clearly within the agreed scope rather than presenting execution as a separate primary service." },
  { q: "How do I start?", a: "Start a conversation through the contact form or your available direct channels. The first step is understanding the business, the current situation, and the outcome you want to achieve." },
];

/* ------------------------------ Shared ------------------------------ */

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-ink-soft">
      {children}
    </span>
  );
}

function Avatars() {
  const tones = [
    "from-[oklch(0.75_0.17_265)] to-[oklch(0.8_0.14_85)]",
    "from-[oklch(0.8_0.14_85)] to-[oklch(0.72_0.17_55)]",
    "from-[oklch(0.72_0.17_55)] to-[oklch(0.75_0.17_265)]",
    "from-[oklch(0.86_0.15_85)] to-[oklch(0.7_0.18_265)]",
  ];
  return (
    <div className="flex -space-x-2" aria-hidden>
      {tones.map((t, i) => (
        <span
          key={i}
          className={`h-7 w-7 rounded-full bg-gradient-to-br ${t} ring-2 ring-[oklch(0.09_0.012_265)]`}
        />
      ))}
    </div>
  );
}

/* ------------------------------ Analytics ------------------------------ */

function AnalyticsRuntime() {
  const formTracked = useRef(false);

  useEffect(() => {
    initAnalytics();
    track("page_view_custom", { page_name: "home" });

    const clickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const tracked = target?.closest<HTMLElement>("[data-track]");
      if (tracked) {
        track(tracked.dataset.track || "click", {
          label: tracked.dataset.trackLabel || tracked.textContent?.trim().slice(0, 80),
          destination: (tracked as HTMLAnchorElement).href || undefined,
        });
      }

      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (anchor) {
        const href = anchor.href;
        if (href.startsWith("https://") && !href.includes(window.location.host)) {
          track("outbound_click", { destination: href, label: anchor.textContent?.trim().slice(0, 80) });
        }
      }
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            if (id) track("section_view", { section: id });
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );

    document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
    document.addEventListener("click", clickHandler, true);

    const form = document.getElementById("lead-form");
    const onFocus = () => {
      if (!formTracked.current) {
        formTracked.current = true;
        track("lead_form_start", { form: "free_marketing_audit" });
      }
    };
    form?.addEventListener("focusin", onFocus);

    const thresholds = [25, 50, 75, 90];
    const fired = new Set<number>();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.round((window.scrollY / scrollable) * 100);
      thresholds.forEach((threshold) => {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          track("scroll_depth", { percent: threshold });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", clickHandler, true);
      form?.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", onScroll);
      sectionObserver.disconnect();
    };
  }, []);

  return null;
}

/* ------------------------------ Sections ------------------------------ */

function Nav() {
  return (
    <m.header
      className="fixed top-2 sm:top-4 inset-x-0 z-50 px-3 sm:px-4"
      initial={{ y: -32, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="glass-strong rounded-full grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pl-4 pr-1.5 py-1.5 sm:pl-5 sm:pr-2 sm:py-2 md:flex md:justify-between">
          <a href="#top" className="flex min-w-0 items-center gap-2.5 font-serif text-base sm:text-lg">
            <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.75_0.17_265)] to-[oklch(0.8_0.14_85)]">
              <span className="absolute inset-0 rounded-full blur-md bg-[oklch(0.72_0.17_265)] opacity-60" aria-hidden />
              <Sparkles className="relative h-3 w-3 text-[oklch(0.1_0.02_265)]" aria-hidden />
            </span>
            <span className="truncate tracking-tight leading-none">
              Abdelrhman Marei
              <span className="hidden lg:inline text-[0.65rem] uppercase tracking-[0.22em] text-ink-soft ml-2 not-italic font-sans">Marketing Strategist</span>
            </span>
          </a>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm text-ink-soft">
            {[
              { href: "#work", label: "Case work" },
              { href: "#services", label: "Advisory" },
              { href: "#system", label: "System" },
              { href: "#about", label: "About" },
              { href: "#process", label: "Method" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-quiet relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold/70 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Magnetic strength={0.35} className="shrink-0">
            <a
              href="#contact"
              className="btn-primary !min-h-[2.6rem] !py-2 !px-4 !text-sm"
              aria-label="Get Your Free Marketing Audit"
              data-track="cta_click"
              data-track-label="header_free_marketing_audit"
            >
              <span className="sm:hidden">Briefing</span>
              <span className="hidden sm:inline">Get Your Free Marketing Audit</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </Magnetic>
        </div>
      </div>
    </m.header>
  );
}

function Hero() {
  return (
    <section aria-label="Introduction" id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-52 md:pb-32">
      {/* Aurora orbs — animated */}
      <FloatingOrbs
        className="pointer-events-none absolute inset-0 -z-10"
        orbs={[
          { className: "absolute top-20 left-1/2 -translate-x-1/2 h-[520px] w-[900px] rounded-full bg-[oklch(0.55_0.2_265)] opacity-30 blur-[120px]", xRange: 60, yRange: 40, duration: 22 },
          { className: "absolute top-40 right-10 h-[300px] w-[420px] rounded-full bg-[oklch(0.7_0.16_85)] opacity-25 blur-[120px]", xRange: 50, yRange: 60, duration: 18, delay: 1.5 },
          { className: "absolute -bottom-20 left-10 h-[300px] w-[420px] rounded-full bg-[oklch(0.6_0.2_55)] opacity-25 blur-[120px]", xRange: 70, yRange: 50, duration: 26, delay: 0.8 },
        ]}
      />
      {/* Grid */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
      }} />

      <div className="container-page">
        <Reveal className="flex justify-center mb-6 sm:mb-8" y={12}>
          <Chip>
            <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-75" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_oklch(0.86_0.13_85)]" />
            </span>
            <span className="sm:hidden">Now accepting selected strategy projects</span>
            <span className="hidden sm:inline">Marketing Strategist for GCC Businesses</span>
          </Chip>
        </Reveal>
        <Reveal as="div" delay={0.05}>
          <h1 className="mx-auto max-w-5xl text-center h1-display">
            <span className="gradient-text">Marketing Strategist</span>
            <br className="hidden sm:block" />{" "}
            <span className="text-ink">for <em className="italic text-ink-soft">GCC Businesses.</em></span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-5 sm:mt-8 max-w-2xl text-center lead">
            I help growing businesses turn unclear marketing into a clear strategy, stronger content, and a system designed around business growth.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center sm:justify-center gap-3">
          <Magnetic className="w-full sm:w-auto">
            <a href="#contact" data-track="cta_click" data-track-label="hero_free_marketing_audit" className="btn-primary w-full sm:w-auto">
              Get Your Free Marketing Audit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Magnetic>
          <Magnetic strength={0.2} className="w-full sm:w-auto">
            <a href="#work" data-track="cta_click" data-track-label="hero_success_stories" className="btn-ghost w-full sm:w-auto">View Success Stories</a>
          </Magnetic>
        </Reveal>
        {/* Risk-reversal microcopy */}
        <Reveal delay={0.35}>
          <ul className="mx-auto mt-5 grid max-w-sm gap-2 text-sm text-ink-soft sm:mt-4 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-2 sm:text-xs">
            {[
              "Confidential conversation",
              "Advisory, never a sales pitch",
              "Clear next steps",
            ].map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>{t}</span>
                {i < 2 && <span className="hidden sm:inline opacity-40 ml-1">·</span>}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Social proof cluster */}
        <Reveal delay={0.4} className="mt-8 sm:mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-3">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-gold" aria-hidden />
            <div className="text-xs text-ink-soft">
              <div className="font-medium text-ink">Real client testimonials</div>
              <div>From GCC and MENA projects</div>
            </div>
          </div>
          <span className="hidden sm:block h-8 w-px bg-white/10" />
          <div className="flex items-start gap-2 text-xs text-ink-soft max-w-sm text-left">
            <ShieldCheck className="h-4 w-4 shrink-0 text-gold" aria-hidden />
            <span><span className="text-ink font-medium">Clear scope & honest expectations</span> — Outcomes and scope are agreed transparently.</span>
          </div>
        </Reveal>

        {/* Metrics — snap rail on mobile, panel on desktop */}
        <Reveal delay={0.15} y={40} className="mt-12 md:mt-20 mx-auto max-w-5xl">
          <div className="md:glass-strong md:rounded-3xl md:p-2">
            <div className="md:rounded-[calc(1.5rem-4px)] md:bg-gradient-to-br md:from-[oklch(0.14_0.02_265)] md:to-[oklch(0.11_0.02_265)] md:p-12">
              <Stagger
                className="rail md:grid md:grid-cols-3 md:gap-4 md:m-0 md:p-0 md:overflow-visible focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]"
                stagger={0.12}
                role="group"
                aria-label="Engagement outcome metrics — scrollable"
                tabIndex={0}
              >
                {metrics.map((m, i) => (
                  <StaggerItem
                    key={m.label}
                    className={`rail-item glass rounded-3xl p-6 md:max-w-none md:flex-none md:rounded-none md:bg-none md:p-0 md:shadow-none md:border-0 ${i > 0 ? "md:pl-8 md:border-l md:border-white/5" : ""}`}
                  >
                    <span className="font-serif text-5xl md:text-7xl leading-none gradient-text">{m.value}</span>
                    <div className="mt-3 md:mt-4">
                      <div className="text-sm font-medium text-ink">{m.label}</div>
                      <div className="text-xs text-ink-soft mt-1">{m.sub}</div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
          <p className="mt-3 text-center note text-[0.7rem] md:hidden" aria-hidden>Swipe for more →</p>
          <details className="group mt-4 md:mt-6 mx-auto max-w-3xl text-center">
            <summary className="note inline-flex items-center gap-1.5 list-none hover:text-ink transition-colors">
              How these figures are calculated
              <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 note text-left sm:text-center">{metricsNote}</p>
          </details>
        </Reveal>
      </div>

    </section>
  );
}

function TrustBar() {
  const track = [...trustLogos, ...trustLogos];
  return (
    <section aria-label="Featured clients" className="pb-12 pt-2 sm:pb-20 sm:pt-4">
      <div className="container-page">
        <p className="text-center eyebrow mb-6 sm:mb-10">Selected projects across GCC & MENA</p>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="marquee-track flex w-max items-center gap-10 sm:gap-16 whitespace-nowrap">
            {track.map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                aria-hidden={i >= trustLogos.length}
                className="font-serif italic text-xl sm:text-2xl md:text-3xl text-ink/75"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 sm:mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-soft">
          <span className="eyebrow text-[0.62rem] w-full text-center sm:w-auto">Markets & focus</span>
          {pressLogos.map((p) => (
            <span key={p} className="font-serif italic text-ink/90 text-sm sm:text-base">{p}</span>
          ))}
        </div>
      </div>
    </section>

  );
}

function CaseStudies() {
  return (
    <section aria-label="Case work" id="work" className="section-pad cv-auto">
      <div className="container-page">
        <Reveal className="mb-8 sm:mb-16 max-w-3xl md:flex md:items-end md:justify-between md:gap-6">
          <div>
            <p className="chapter-mark mb-4 sm:mb-6">I &nbsp;·&nbsp; Case work</p>
            <h2 className="h2-display">
              Operating businesses. <br />
              <span className="text-ink-soft italic">Audited results.</span>
            </h2>
          </div>
          <p className="mt-4 text-sm text-ink-soft md:mt-0 md:max-w-xs">
            Only verified results are published. Supporting details are shown only when they have been provided and verified.
          </p>
        </Reveal>
        <Stagger
          className="rail md:grid md:grid-cols-2 md:gap-5 md:m-0 md:p-0 md:overflow-visible focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]"
          stagger={0.1}
          role="group"
          aria-label="Case work — scrollable list"
          tabIndex={0}
        >
          {caseStudies.map((c) => (
            <StaggerItem key={c.client} className="rail-item md:max-w-none md:flex-none">
              <Spotlight as="article" lift={8} className="rounded-3xl glass p-6 sm:p-8 h-full">
                <div
                  className={`orb-breathe absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-40 bg-gradient-to-br ${c.tone}`}
                  aria-hidden
                />
                <div className="relative flex items-center justify-between gap-3 mb-6 sm:mb-8">
                  <span className="eyebrow">{c.industry}</span>
                  <span className="eyebrow text-[0.62rem] text-ink-soft">{c.timeframe}</span>
                </div>
                <h3 className="relative font-serif text-2xl sm:text-3xl mb-1.5">{c.client}</h3>
                <p className="relative text-xs text-ink-soft mb-5 sm:mb-7">{c.profile}</p>
                <dl className="relative text-sm space-y-4 text-ink-soft mb-6 sm:mb-8">
                  <div>
                    <dt className="eyebrow text-[0.62rem] mb-1">Starting position</dt>
                    <dd className="text-ink/90 leading-relaxed">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[0.62rem] mb-1">Mandate</dt>
                    <dd className="text-ink/90 leading-relaxed">{c.move}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[0.62rem] mb-1">Baseline → outcome</dt>
                    <dd className="text-ink/90 leading-relaxed">
                      <span className="text-ink-soft">{c.baseline}</span>
                      <span className="mx-2 opacity-50">→</span>
                      <span className="text-ink font-medium">{c.after}</span>
                    </dd>
                  </div>
                </dl>
                <div className="relative pt-5 sm:pt-6 border-t border-white/8">
                  <div className="eyebrow text-[0.62rem] mb-2">Headline result</div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-serif text-4xl gradient-text">{c.result}</span>
                    <span className="text-xs text-ink-soft">{c.resultLabel}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1.5 text-[0.7rem] text-ink-soft">
                      <ShieldCheck className="h-3 w-3 shrink-0 text-gold" aria-hidden />
                      {c.verified}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1.5 text-[0.7rem] text-ink-soft">
                      <Zap className="h-3 w-3 shrink-0 text-gold" aria-hidden />
                      {c.scope}
                    </span>
                  </div>
                </div>
              </Spotlight>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-3 text-center note text-[0.7rem] md:hidden" aria-hidden>Swipe for more →</p>
        <Reveal y={20} className="mt-6 sm:mt-8">
          <div className="mb-4 eyebrow text-[0.62rem]">Original client feedback screenshots</div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["/testimonial-1.png", "Client feedback screenshot 1"],
              ["/testimonial-2.png", "Client feedback screenshot 2"],
              ["/testimonial-3.png", "Client feedback screenshot 3"],
            ].map(([src, alt]) => (
              <a key={src} href={src} target="_blank" rel="noopener noreferrer" data-track="testimonial_proof_click" data-track-label={alt}>
                <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full rounded-2xl border border-white/10 glass object-contain" />
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal y={20} className="mt-4 sm:mt-6 rounded-3xl glass p-5 sm:p-6 flex items-start gap-3">
          <Lock className="h-4 w-4 shrink-0 mt-0.5 text-gold" aria-hidden />
          <p className="text-sm text-ink-soft leading-relaxed">
            Case studies use verified project information only. Where supporting details are unavailable, they are intentionally omitted rather than estimated.
          </p>
        </Reveal>


        {/* Mid-page conversion band */}
        <Reveal className="mt-8 sm:mt-14 rounded-3xl glass p-6 md:p-8 md:flex md:flex-wrap md:items-center md:justify-between md:gap-5" y={30}>
          <div>
            <div className="font-serif text-2xl md:text-3xl text-balance">Want to understand what your marketing should do next?</div>
            <div className="text-sm text-ink-soft mt-2">Start with a clear conversation about the business, the challenge, and the growth objective.</div>
          </div>
          <Magnetic className="mt-5 block w-full md:mt-0 md:w-auto">
            <a href="#contact" className="btn-accent w-full md:w-auto">
              Get Your Free Marketing Audit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>

  );
}

function Services() {
  return (
    <section aria-label="Advisory engagements" id="services" className="section-pad cv-auto relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-[oklch(0.55_0.18_265)] opacity-15 blur-[140px]" />
      </div>
      <div className="container-page">
        <Reveal className="max-w-3xl mb-8 sm:mb-16">
          <p className="chapter-mark mb-4 sm:mb-6">III &nbsp;·&nbsp; Advisory</p>
          <h2 className="h2-display">
            Two ways to engage. <br />
            <span className="text-ink-soft italic">Focused on strategy that supports business growth.</span>
          </h2>
        </Reveal>
        <Stagger className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5 md:items-stretch" stagger={0.1}>
          {services.map((s) => {
            const Icon = s.icon;
            const featured = s.featured;
            return (
              <StaggerItem key={s.name} className={featured ? "order-first md:order-none md:-translate-y-4" : ""}>
                <Spotlight
                  className={[
                    "rounded-3xl p-6 sm:p-8 h-full",
                    featured ? "glass-strong mt-4 md:mt-0" : "glass",
                  ].join(" ")}
                >
                  {featured && (
                    <div aria-hidden className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[oklch(0.72_0.17_265)]/10 to-transparent pointer-events-none" />
                  )}
                  {featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-medium bg-gradient-to-r from-[oklch(0.86_0.15_85)] to-[oklch(0.8_0.17_265)] text-[oklch(0.1_0.02_265)]">
                      <Zap className="h-3 w-3" aria-hidden /> Focused on your business needs
                    </span>
                  )}
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10">
                        <Icon className="h-5 w-5 text-ink" aria-hidden />
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-xl sm:text-2xl leading-none">{s.price}</div>
                        <div className="text-[0.7rem] text-ink-soft mt-1">{s.duration}</div>
                      </div>
                    </div>
                    <div className="eyebrow mb-2">{s.tier}</div>
                    <h3 className="font-serif text-2xl sm:text-3xl mb-3">{s.name}</h3>
                    <p className="text-[0.95rem] sm:text-sm text-ink-soft mb-6 sm:mb-8 leading-relaxed">{s.outcome}</p>
                    <ul className="space-y-3 mb-6 sm:mb-8 text-[0.95rem] sm:text-sm">
                      {s.includes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                            <Check className="h-3 w-3 text-gold" aria-hidden />
                          </span>
                          <span className="text-ink/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative mt-auto">
                    <div className="flex items-start gap-2 text-xs text-ink-soft mb-4">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5 text-gold" aria-hidden />
                      <span>Clear scope and deliverables agreed before work begins.</span>
                    </div>
                    <div className="hairline mb-5" />
                    <a href="#contact" className={featured ? "btn-accent w-full" : "btn-ghost w-full"}>
                      {s.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  </div>
                </Spotlight>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

    </section>
  );
}

function About() {
  return (
    <section aria-label="About the strategist" id="about" className="section-pad cv-auto">
      <div className="container-page">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
          <Reveal className="md:col-span-5" y={30}>
            <div className="relative aspect-[5/4] sm:aspect-[4/5] rounded-3xl overflow-hidden glass-strong p-1.5">
              <div className="relative h-full w-full rounded-[calc(1.5rem-6px)] overflow-hidden bg-black">
                <img
                  src="/abdelrhman-marei.jpg"
                  alt="Abdelrhman Marei, Marketing Strategist"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden />
                <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                  <div className="glass rounded-2xl p-4 sm:p-5">
                    <div className="font-serif text-3xl sm:text-4xl leading-none gradient-text">7+ yrs</div>
                    <div className="text-[0.8rem] sm:text-sm text-ink-soft mt-1.5">Marketing Strategy + Content Strategy for growing GCC businesses.</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="md:col-span-7" delay={0.1}>
            <p className="chapter-mark mb-4 sm:mb-6">V &nbsp;·&nbsp; The strategist</p>
            <h2 className="h2-display mb-6 sm:mb-10">
              A strategist first. <br />
              <span className="gradient-text italic">A marketer second.</span>
            </h2>
            <div className="space-y-5 lead max-w-xl">
              <p>
                I am a Marketing Strategist focused on helping growing businesses turn unclear marketing into a clear strategy, stronger content, and a system designed around business growth.
              </p>
              <p>
                My approach is business-first and data-driven. I focus on understanding the market, positioning, audience, customer journey, funnel, channels, content, and priorities before deciding what should be executed.
              </p>
            </div>
            {/* Credibility chips */}
            <Stagger className="mt-7 sm:mt-10 flex flex-wrap gap-2" stagger={0.04}>
              {[
                "7+ years of experience",
                "GCC-focused marketing strategist",
                "Marketing Strategy + Content Strategy",
                "GCC & MENA market experience",
                "Real, verified case-study results",
              ].map((c) => (
                <StaggerItem key={c} y={8}>
                  <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-2 text-xs text-ink/90">
                    <Check className="h-3 w-3 shrink-0 text-gold" aria-hidden /> {c}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-7 sm:mt-10 flex flex-wrap gap-3">
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" data-track="cv_click" data-track-label="about_cv" className="btn-ghost">
                View My CV
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" data-track="social_click" data-track-label="about_linkedin" className="btn-ghost">
                LinkedIn
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <blockquote className="mt-7 sm:mt-10 relative rounded-2xl glass p-5 sm:p-6">
              <p className="font-serif text-xl sm:text-2xl italic text-ink text-pretty">
                "I do not believe in marketing for the sake of marketing. The strategy should make the business clearer, the content stronger, and the path to growth more intentional."
              </p>
            </blockquote>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section aria-label="The growth system" id="system" className="section-pad cv-auto relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[900px] max-w-full rounded-full bg-[oklch(0.55_0.18_265)] opacity-[0.12] blur-[150px]" />
      </div>
      <div className="container-page">
        <Reveal className="mb-8 sm:mb-14 max-w-3xl">
          <p className="chapter-mark mb-4 sm:mb-6">IV &nbsp;·&nbsp; The system</p>
          <h2 className="h2-display">
            Strategy built around the business. <br />
            <span className="text-ink-soft italic">Clear direction. Stronger execution.</span>
          </h2>
          <p className="mt-5 text-[0.95rem] sm:text-base text-ink-soft leading-relaxed max-w-xl">
            A practical framework connecting positioning, audience, customer journey, channels, content, priorities, and KPIs.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5 lg:grid-cols-6" stagger={0.08}>
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.title} className={c.span}>
                <Spotlight
                  className={[
                    "rounded-3xl p-6 sm:p-8 h-full",
                    c.feature ? "glass-strong" : "glass",
                  ].join(" ")}
                >
                  <div className="mb-5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02]">
                    <Icon className="h-5 w-5 text-gold" aria-hidden />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl mb-2.5">{c.title}</h3>
                  <p className="text-[0.95rem] sm:text-sm text-ink-soft leading-relaxed">{c.desc}</p>
                  {c.metric && (
                    <div className="mt-auto pt-8">
                      <div className="hairline mb-5" />
                      <div className="font-serif text-4xl sm:text-5xl gradient-text leading-none">{c.metric}</div>
                      <div className="mt-2 text-xs text-ink-soft">{c.metricLabel}</div>
                    </div>
                  )}
                </Spotlight>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section aria-label="Working method" id="process" className="section-pad cv-auto">
      <div className="container-page">
        <Reveal className="max-w-3xl mb-8 sm:mb-16">
          <p className="chapter-mark mb-4 sm:mb-6">VII &nbsp;·&nbsp; Method</p>
          <h2 className="h2-display">
            A four-stage engagement. <br />
            <span className="text-ink-soft italic">Transparent from day one.</span>
          </h2>
        </Reveal>
        <div aria-hidden className="hidden md:block hairline mb-[-2.5rem] translate-y-[5.5rem]" />
        <Stagger className="flex flex-col gap-3 md:grid md:grid-cols-4 md:gap-5" stagger={0.08}>
          {processSteps.map((p) => (
            <StaggerItem key={p.step}>
              <Spotlight className="rounded-3xl glass p-5 sm:p-7 h-full">
                <div className="flex items-baseline gap-4 md:block">
                  <div className="font-serif text-4xl md:mb-8 md:text-6xl leading-none gradient-text">{p.step}</div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl sm:text-2xl mb-1 md:mb-2">{p.title}</h3>
                    <div className="eyebrow text-[0.62rem] mb-2 md:mb-3">{p.time}</div>
                  </div>
                </div>
                <p className="text-[0.95rem] sm:text-sm text-ink-soft leading-relaxed">{p.desc}</p>
              </Spotlight>
            </StaggerItem>
          ))}
        </Stagger>

      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section aria-label="Client testimonials" className="section-pad cv-auto">
      <div className="container-page">
        <Reveal className="max-w-3xl mb-8 sm:mb-16">
          <p className="chapter-mark mb-4 sm:mb-6">II &nbsp;·&nbsp; Client voices</p>
          <h2 className="h2-display">
            What clients say. <br />
            <span className="gradient-text italic">In their own words.</span>
          </h2>
        </Reveal>
        <Stagger className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5" stagger={0.12}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <Spotlight
                as="figure"
                className="rounded-3xl glass p-6 sm:p-10 h-full"
              >
                <div
                  aria-hidden
                  className="orb-breathe absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[oklch(0.72_0.17_265)] opacity-20 blur-3xl"
                />
                <div className="relative">
                  <div className="flex items-center gap-1 mb-4" role="img" aria-label="Client testimonial">
                    <MessageCircle className="h-4 w-4 text-gold" aria-hidden />
                  </div>
                  <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl leading-[1.3] sm:leading-[1.2] text-ink text-pretty">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-ink-soft">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden />
                      Client feedback
                    </span>
                  </div>

                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-[oklch(0.75_0.17_265)] to-[oklch(0.8_0.14_85)]" aria-hidden />
                    <div className="text-sm min-w-0">
                      <div className="font-medium text-ink">{t.name}</div>
                      <div className="text-ink-soft">{t.role}</div>
                      <div className="text-xs text-ink-soft mt-0.5">{t.company}</div>
                    </div>
                  </figcaption>
                </div>
              </Spotlight>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal y={20} className="mt-4 sm:mt-6 rounded-3xl glass p-5 sm:p-6 flex items-start gap-3">
          <Lock className="h-4 w-4 shrink-0 mt-0.5 text-gold" aria-hidden />
          <p className="text-sm text-ink-soft leading-relaxed">
            Testimonials are presented as provided by clients. Additional context can be shared when available.
          </p>
        </Reveal>

      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section aria-label="Frequently asked questions" className="section-pad cv-auto">
      <div className="container-page">
        <div className="grid md:grid-cols-12 gap-7 md:gap-12">
          <div className="md:col-span-4">
            <p className="chapter-mark mb-4 sm:mb-6">IX &nbsp;·&nbsp; Questions</p>
            <h2 className="h2-display">
              Before the <br />
              <span className="gradient-text italic">first call.</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-sm text-ink-soft max-w-xs">
              Direct answers to the questions founders and executives raise before engaging.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="rounded-3xl glass overflow-hidden">
              {faqs.map((f, i) => (
                <details key={f.q} className={`group ${i > 0 ? "border-t border-white/8" : ""}`} open={i === 0}>
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-5 sm:px-7 sm:py-6 min-h-[3.5rem] active:bg-white/[0.04] transition-colors">
                    <h3 className="font-serif text-lg sm:text-xl min-w-0">{f.q}</h3>
                    <span aria-hidden className="h-9 w-9 shrink-0 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-lg leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 sm:px-7 sm:pb-6 text-[0.95rem] text-ink-soft leading-relaxed max-w-2xl">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section aria-label="Contact and briefing request" id="contact" className="section-pad cv-auto relative overflow-hidden">
      <div className="container-page">
        <div className="relative rounded-[2rem] glass-strong overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-0">
            <div className="absolute -top-40 -left-20 h-[500px] w-[500px] rounded-full bg-[oklch(0.55_0.2_265)] opacity-40 blur-[100px]" />
            <div className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-[oklch(0.7_0.16_85)] opacity-30 blur-[100px]" />
          </div>
          <div className="relative flex flex-col gap-8 p-6 sm:p-10 md:grid md:grid-cols-12 md:gap-12 md:p-16">
            <div className="md:col-span-7">
              <p className="chapter-mark mb-4 sm:mb-6">X &nbsp;·&nbsp; Begin</p>
              <div className="mb-5 sm:mb-6 flex">
                <span className="inline-flex items-start gap-2 rounded-full glass px-3.5 py-2 text-xs text-ink">
                  <span className="relative inline-flex h-1.5 w-1.5 mt-1.5 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-75" />
                    <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  Accepting selected strategy projects
                </span>
              </div>
              <h2 className="h2-display-lg">
                Start with a conversation. <br />
                <span className="gradient-text italic">No unnecessary pitch.</span>
              </h2>
              <p className="mt-5 sm:mt-8 lead max-w-xl">
                Share a short brief on where the business stands today. We will start by understanding the business, the challenge, and the outcome you want to achieve.
              </p>
              {/* Reassurance strip */}
              <ul className="mt-6 sm:mt-8 grid gap-2.5 sm:grid-cols-3 sm:gap-3 text-[0.8rem] sm:text-xs text-ink-soft">
                <li className="flex items-start gap-2"><Clock className="h-4 w-4 shrink-0 text-gold" aria-hidden /> Clear communication and next steps</li>
                <li className="flex items-start gap-2"><CalendarCheck className="h-4 w-4 shrink-0 text-gold" aria-hidden /> No unnecessary sales sequence</li>
                <li className="flex items-start gap-2"><Lock className="h-4 w-4 shrink-0 text-gold" aria-hidden /> Your information stays confidential</li>
              </ul>
              {/* What happens next — removes uncertainty before contact */}
              <div className="mt-6 sm:mt-8 rounded-3xl glass p-5 sm:p-6">
                <div className="eyebrow text-[0.62rem] mb-4">What happens next</div>
                <ol className="space-y-3 text-[0.9rem] text-ink-soft">
                  {[
                    "You share the business context and the challenge you want to solve.",
                    "We review the situation and clarify whether the project is a fit.",
                    "If it fits, we agree on the appropriate strategy scope and next step.",
                  ].map((s, i) => (
                    <li key={s} className="flex items-start gap-3">
                      <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-[0.65rem] text-ink">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-[0.8rem] text-ink/90">
                  The scope and deliverables are agreed clearly before work begins.
                </p>
              </div>

              <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <a href="#lead-form" className="btn-accent w-full sm:w-auto">
                  Get Your Free Marketing Audit
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-label="contact_whatsapp" className="btn-ghost w-full sm:w-auto">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Reach me on WhatsApp
                </a>
              </div>
            </div>

            {/* Low-friction lead form */}
            <div className="md:col-span-5 md:self-start lg:sticky lg:top-28">
              <form
                id="lead-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = String(formData.get("name") || "").trim();
                  const email = String(formData.get("email") || "").trim();
                  const goal = String(formData.get("goal") || "").trim();
                  const whatsappUrl = buildWhatsAppLeadUrl(name, email, goal);
                  track("generate_lead", {
                    form: "free_marketing_audit",
                    goal,
                    lead_channel: "whatsapp",
                  });
                  setSent(true);
                  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                }}
                className="glass rounded-3xl p-5 sm:p-7 space-y-4 scroll-mt-24"
                aria-label="Get Your Free Marketing Audit"
              >
                <div>
                  <label htmlFor="lf-name" className="text-xs eyebrow mb-2 block">Your name</label>
                  <input
                    id="lf-name"
                    name="name"
                    required
                    type="text"
                    autoComplete="name"
                    enterKeyHint="next"
                    className="field"
                    placeholder="Layla Al-Mansour"
                  />
                </div>
                <div>
                  <label htmlFor="lf-email" className="text-xs eyebrow mb-2 block">Email</label>
                  <input
                    id="lf-email"
                    name="email"
                    required
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    enterKeyHint="next"
                    className="field"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="lf-goal" className="text-xs eyebrow mb-2 block">What do you need help with?</label>
                  <select id="lf-goal" name="goal" className="field" defaultValue="">
                    <option value="" disabled>Select the closest match…</option>
                    <option>Marketing strategy</option>
                    <option>Content strategy</option>
                    <option>Positioning / audience</option>
                    <option>Growth roadmap / KPIs</option>
                    <option>Other</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full" disabled={sent}>
                  {sent ? "Briefing requested" : "Send my request"}
                  {sent ? <Check className="h-4 w-4" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}
                </button>
                <p aria-live="polite" className="sr-only">
                  {sent ? "Your briefing request has been received. Your request has been submitted." : ""}
                </p>
                {sent && (
                  <p className="flex items-start gap-2 rounded-2xl border border-gold/25 bg-gold/[0.06] px-3.5 py-3 text-[0.8rem] text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                    Received. We will review your request and get back to you.
                  </p>
                )}
                <p className="text-[11px] text-ink-soft flex items-start gap-1.5">
                  <Lock className="h-3 w-3 shrink-0 mt-0.5" aria-hidden />
                  Your information is handled confidentially.
                </p>
              </form>
              <div className="mt-5 grid gap-3 text-sm sm:mt-6">
                <a href="#contact" data-track="cta_click" data-track-label="contact_form" className="link-quiet flex items-center gap-3 rounded-2xl glass px-4 py-3.5 transition-colors hover:bg-white/[0.06] active:bg-white/[0.06]">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  Email / Contact form
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="social_click"
                  data-track-label="linkedin"
                  aria-label="Connect on LinkedIn"
                  className="link-quiet flex items-center gap-3 rounded-2xl glass px-4 py-3.5 transition-colors hover:bg-white/[0.06] active:bg-white/[0.06]"
                >
                  <Linkedin className="h-4 w-4 shrink-0" aria-hidden />
                  LinkedIn
                </a>
              </div>
              <div className="mt-3 rounded-2xl glass p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-ink">
                  <MessageCircle className="h-4 w-4 text-gold" aria-hidden />
                  Real client testimonials
                </div>
                <p className="mt-2.5 note">
                  Client testimonials and verified project results are presented throughout the website.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    const onScroll = () => {
      const pastHero = window.scrollY > 420;
      const contactTop = contact?.getBoundingClientRect().top ?? Infinity;
      setVisible(pastHero && contactTop > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          role="region"
          aria-label="Quick contact"
          className="md:hidden fixed inset-x-3 z-40"
          style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="glass-strong rounded-full p-1.5 flex items-center gap-1.5">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-label="sticky_whatsapp"
              aria-label="Message me on WhatsApp"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/12 bg-white/5 text-ink"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
            </a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-label="sticky_cta" className="btn-accent flex-1 !min-h-12 !text-[0.95rem]">
              Get Your Free Marketing Audit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <p className="mt-1.5 text-center text-[11px] text-ink-soft">
            Now accepting selected strategy projects · 30 min · advisory only
          </p>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function Credentials() {
  return (
    <section aria-label="Track record and credentials" id="credentials" className="section-pad cv-auto">
      <div className="container-page">
        <Reveal className="mb-8 sm:mb-14 max-w-3xl">
          <p className="chapter-mark mb-4 sm:mb-6">VI &nbsp;·&nbsp; Track record</p>
          <h2 className="h2-display">
            7+ years of experience. <br />
            <span className="text-ink-soft italic">Built on real work and verified results.</span>
          </h2>
        </Reveal>

        <Stagger className="flex flex-col gap-3 md:grid md:grid-cols-4 md:gap-5" stagger={0.08}>
          {credentials.map((c) => (
            <StaggerItem key={c.period}>
              <m.div
                className="rounded-3xl glass p-5 sm:p-7 h-full"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
              >
                <div className="eyebrow text-[0.62rem] mb-3">{c.period}</div>
                <h3 className="font-serif text-xl sm:text-2xl mb-1.5">{c.role}</h3>
                <div className="text-xs text-ink-soft mb-3">{c.org}</div>
                <p className="text-[0.95rem] sm:text-sm text-ink-soft leading-relaxed">{c.detail}</p>
              </m.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal y={24} className="mt-4 sm:mt-6 grid gap-3 md:grid-cols-3 md:gap-5">
          {authorityFacts.map((a) => (
            <div key={a.label} className="rounded-3xl glass p-5 sm:p-7">
              <div className="font-serif text-4xl sm:text-5xl leading-none gradient-text">{a.value}</div>
              <div className="mt-3 text-sm font-medium text-ink">{a.label}</div>
              <div className="mt-1 text-xs text-ink-soft">{a.sub}</div>
            </div>
          ))}
        </Reveal>

        <Reveal y={20} className="mt-4 sm:mt-6 rounded-3xl glass p-5 sm:p-7">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-gold mt-0.5" aria-hidden />
            <p className="text-sm text-ink-soft leading-relaxed max-w-3xl">
              <span className="text-ink font-medium">Data integrity.</span> Only verified information is published. If a number, timeframe, ad spend, ROAS, conversion rate, or client detail is unavailable, it is not invented.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FitCheck() {
  return (
    <section aria-label="Engagement fit" id="fit" className="section-pad cv-auto">
      <div className="container-page">
        <Reveal className="mb-8 sm:mb-14 max-w-3xl">
          <p className="chapter-mark mb-4 sm:mb-6">VIII &nbsp;·&nbsp; Fit</p>
          <h2 className="h2-display">
            The right fit matters <br />
            <span className="gradient-text italic">than I accept.</span>
          </h2>
          <p className="mt-4 sm:mt-6 lead max-w-2xl">
            Two of every three enquiries are declined or referred elsewhere. Reading this before you write saves us both a call — and tells you exactly how I decide.
          </p>
        </Reveal>

        <div className="grid gap-3 md:grid-cols-2 md:gap-5">
          <Reveal y={26} className="rounded-3xl glass p-6 sm:p-8">
            <div className="eyebrow text-[0.62rem] mb-4 text-gold">A strong fit</div>
            <ul className="space-y-3.5 text-[0.95rem] text-ink/90">
              {fitYes.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 mt-1 text-gold" aria-hidden />
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal y={26} delay={0.08} className="rounded-3xl glass p-6 sm:p-8">
            <div className="eyebrow text-[0.62rem] mb-4">Not a fit — and I will say so</div>
            <ul className="space-y-3.5 text-[0.95rem] text-ink-soft">
              {fitNo.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1 w-3 shrink-0 rounded-full bg-white/25" />
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal y={24} className="mt-4 sm:mt-6 grid gap-3 md:grid-cols-3 md:gap-5">
          {protections.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="rounded-3xl glass p-5 sm:p-7">
                <Icon className="h-5 w-5 text-gold" aria-hidden />
                <h3 className="font-serif text-xl mt-4 mb-2">{p.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const links = [
    { href: "#work", label: "Case work" },
    { href: "#services", label: "Advisory" },
    { href: "#system", label: "System" },
    { href: "#about", label: "About" },
    { href: "#process", label: "Method" },
    { href: "#fit", label: "Fit" },
  ];

  return (
    <footer className="border-t border-white/8 pb-28 md:pb-12">
      <div className="container-page pt-10 sm:pt-14">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 font-serif text-lg text-ink">
              <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-[oklch(0.75_0.17_265)] to-[oklch(0.8_0.14_85)]" aria-hidden />
              Abdelrhman Marei
            </div>
            <p className="mt-3 max-w-sm note">
              Marketing Strategy + Content Strategy for businesses operating in or targeting GCC markets.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-[0.7rem] text-ink-soft">
                <Clock className="h-3 w-3 shrink-0 text-gold" aria-hidden />
                Clear communication
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-[0.7rem] text-ink-soft">
                <ShieldCheck className="h-3 w-3 shrink-0 text-gold" aria-hidden />
                Confidential by default
              </span>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <div className="eyebrow text-[0.62rem] mb-4">Sections</div>
            <ul className="grid grid-cols-2 gap-y-2.5 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-quiet">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <div className="eyebrow text-[0.62rem] mb-4">Direct</div>
            <ul className="grid gap-2.5 text-sm">
              <li>
                <a href="#contact" className="link-quiet inline-flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden /> Email / Contact form
                </a>
              </li>
              <li>
                <a href="#contact" className="link-quiet inline-flex items-center gap-2">
                  <Linkedin className="h-3.5 w-3.5 shrink-0" aria-hidden /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#contact" className="link-quiet inline-flex items-center gap-2">
                  <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
          {[
            ["Instagram", SOCIAL_LINKS.instagram],
            ["TikTok", SOCIAL_LINKS.tiktok],
            ["Facebook", SOCIAL_LINKS.facebook],
            ["YouTube", SOCIAL_LINKS.youtube],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" data-track="social_click" data-track-label={label.toLowerCase()} className="link-quiet rounded-full glass px-3 py-2">{label}</a>
          ))}
        </div>

        <div className="hairline mt-10" />
        <div className="flex flex-col items-center justify-between gap-2 py-6 text-center sm:flex-row sm:text-left">
          <p className="note">© {new Date().getFullYear()} Abdelrhman Marei. All rights reserved.</p>
          <p className="note">Only verified figures are published.</p>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <MotionProvider>
      <AnalyticsRuntime />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <div aria-hidden className="header-scrim" />
      <Nav />
      <main id="main">

        <Hero />
        <TrustBar />
        <CaseStudies />
        <Testimonials />
        <Services />
        <Platform />
        <About />
        <Credentials />
        <Process />
        <FitCheck />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <StickyMobileCta />
    </MotionProvider>
  );
}
