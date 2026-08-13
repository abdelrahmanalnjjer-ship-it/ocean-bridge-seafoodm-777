import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

/* ============================================================================
 * Scroll choreography primitives.
 *
 * Every component here degrades to static content when the visitor has
 * prefers-reduced-motion set. That check happens per component rather than
 * globally so the fallback is real layout, not an animation with a zero
 * duration — a 0ms transform still forces a composite layer.
 * ========================================================================= */

const EASE = [0.19, 1, 0.22, 1] as const;

/* Explicit map rather than motion[as] — indexing the motion proxy by a string
 * union type resolves to a very wide union and TypeScript chokes on the JSX. */
const TAGS = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  header: motion.header,
} as const;

type TagName = keyof typeof TAGS;

/* ---------------------------------------------------------------------------
 * Reveal — the workhorse. Fades and rises once when scrolled into view.
 * ------------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.8,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: TagName;
}) {
  const reduce = useReducedMotion();
  const Tag = TAGS[as];

  if (reduce) {
    const Plain = as as "div";
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
 * Stagger — parent/child pair for lists. Children animate in sequence
 * without each one needing its own delay prop threaded through.
 * ------------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  step = 0.08,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: step } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
 * ParallaxMedia — image drifts slower than the page inside a fixed frame.
 * The inner element is oversized so the drift never exposes an edge.
 * ------------------------------------------------------------------------ */
export function ParallaxMedia({
  src,
  alt,
  className,
  strength = 12,
  priority = false,
  objectPosition,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Drift distance as a percentage of frame height. */
  strength?: number;
  priority?: boolean;
  objectPosition?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={`media ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{
          y: reduce ? 0 : y,
          height: reduce ? "100%" : `${100 + strength * 2}%`,
          objectPosition,
        }}
        className="w-full object-cover"
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * ScrollScale — media eases from slightly oversized to true size as it
 * enters. Reads as the photograph "settling" rather than sliding.
 * ------------------------------------------------------------------------ */
export function ScrollScale({
  children,
  className,
  from = 1.14,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const scale = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ scale: reduce ? 1 : scale }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * LineReveal — headline rises out of a per-line mask. Pass an array of lines
 * so each gets its own overflow context; a single mask on a wrapped heading
 * clips descenders on every line but the last.
 * ------------------------------------------------------------------------ */
export function LineReveal({
  lines,
  className,
  delay = 0,
  immediate = false,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  /** Animate on mount rather than on scroll — for above-the-fold headings. */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((l) => (
          <span key={l} className="block">{l}</span>
        ))}
      </span>
    );
  }

  const animateProps = immediate
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport: { once: true, margin: "-12% 0px" } };

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...animateProps}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {lines.map((line) => (
        <span key={line} className="reveal-line">
          <motion.span
            variants={{
              hidden: { y: "110%" },
              shown: { y: "0%", transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ---------------------------------------------------------------------------
 * useSectionProgress — 0→1 as a section passes through the viewport.
 * Used by pinned sections to drive their own internal state.
 * ------------------------------------------------------------------------ */
export function useSectionProgress(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return scrollYProgress;
}

/* ---------------------------------------------------------------------------
 * Counter — number that counts up once on view. Small touch, big effect on
 * a stats strip.
 * ------------------------------------------------------------------------ */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------------------
 * ProgressRail — thin scroll progress bar. Sits under the header.
 * ------------------------------------------------------------------------ */
export function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-16 z-50 h-px origin-left bg-[color:var(--brand-teal)]"
    />
  );
}
