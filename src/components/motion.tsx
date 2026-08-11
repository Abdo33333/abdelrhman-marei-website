"use client";

import {
  m,
  LazyMotion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
  useReducedMotion,
  type Variants,
  type MotionProps,
  type Transition,
} from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

/* ---------- Reveal (fade + slide + blur) ---------- */

type RevealProps = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "li" | "figure";
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
} & Omit<MotionProps, "variants" | "initial" | "whileInView" | "viewport">;

export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  className,
  once = true,
  amount = 0.2,
  ...rest
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const Comp = m[as] as typeof m.div;
  

  if (prefersReduced) {
    return <Comp className={className}>{children}</Comp>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: easeOut, delay },
    },
  };

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ---------- Stagger container ---------- */

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  once = true,
  amount = 0.2,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
  role?: string;
  tabIndex?: number;
  "aria-label"?: string;
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced)
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </m.div>
  );
}


export function StaggerItem({
  children,
  className,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: easeOut },
        },
      }}
    >
      {children}
    </m.div>
  );
}

/* ---------- Text reveal (word by word) ---------- */

export function TextReveal({
  children,
  className,
  delay = 0,
  as: As = "span",
}: {
  children: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <As className={className}>{children}</As>;

  const words = children.split(" ");
  return (
    <As className={className}>
      <m.span
        style={{ display: "inline" }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
        }}
      >
        {words.map((w, i) => (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
            <m.span
              style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
              variants={{
                hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
                show: {
                  y: "0%",
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: easeOut },
                },
              }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </m.span>
          </span>
        ))}
      </m.span>
    </As>
  );
}

/* ---------- Magnetic wrapper ---------- */

export function Magnetic({
  children,
  strength = 0.25,
  className,
  style,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });

  if (prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block", ...style }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.div>
  );
}

/* ---------- Animated card (lift + glow on hover) ---------- */

export function AnimatedCard({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "figure";
}) {
  const Comp = m[as] as typeof m.div;
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp
      className={className}
      whileHover={{ y: -6, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Floating background orbs ---------- */

export function FloatingOrbs({
  orbs,
  className,
}: {
  orbs: Array<{
    className: string;
    xRange?: number;
    yRange?: number;
    duration?: number;
    delay?: number;
  }>;
  className?: string;
}) {
  // CSS-only animation: zero JS on the main thread, compositor-driven.
  return (
    <div aria-hidden className={className}>
      {orbs.map((o, i) => (
        <div
          key={i}
          className={`${o.className} orb-drift`}
          style={
            {
              "--drift-x": `${o.xRange ?? 40}px`,
              "--drift-y": `${o.yRange ?? 40}px`,
              "--drift-duration": `${o.duration ?? 18}s`,
              "--drift-delay": `${o.delay ?? 0}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}


/* ---------- Scroll progress bar ---------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, oklch(0.62 0.16 265), oklch(0.86 0.13 85), oklch(0.78 0.14 55))",
      }}
    />
  );
}

/* ---------- Spotlight card (pointer-tracking glow) ---------- */

export function Spotlight({
  children,
  className,
  as = "div",
  lift = 6,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "figure" | "li";
  lift?: number;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const Comp = m[as] as typeof m.div;
  const glow = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, oklch(0.86 0.13 85 / 0.13), transparent 70%)`;

  return (
    <Comp
      ref={ref}
      className={`group relative isolate overflow-hidden ${className ?? ""}`}
      onPointerMove={(e) => {
        if (prefersReduced) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-500);
        my.set(-500);
      }}
      whileHover={prefersReduced ? undefined : { y: -lift }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
    >
      {!prefersReduced && (
        <m.div
          aria-hidden
          className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Comp>
  );
}

/* ---------- Lazy animation feature provider ---------- */

const loadFeatures = () => import("../lib/motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
