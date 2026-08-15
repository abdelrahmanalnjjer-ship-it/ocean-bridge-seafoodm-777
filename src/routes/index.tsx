import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORIES, SPECIES } from "@/data/species";
import { ARTICLES } from "@/data/insights";
import { supabase } from "@/integrations/supabase/client";
import {
  ComplianceCard,
  ComplianceMark,
  REGIMES,
} from "@/components/compliance-mark";
import {
  Counter,
  LineReveal,
  ParallaxMedia,
  Reveal,
  ScrollScale,
  Stagger,
  StaggerItem,
} from "@/components/motion";
import marketChina from "@/assets/market-china.jpg.asset.json";
import marketEu from "@/assets/market-eu.jpg.asset.json";
import marketGcc from "@/assets/market-gcc.jpg.asset.json";
import marketUsa from "@/assets/market-usa.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ocean Bridge Trade — Oman-origin seafood, cleared for arrival" },
      {
        name: "description",
        content:
          "We verify Oman-origin seafood supply, clear destination-market regulation before the offer is issued, and coordinate the transaction end to end. Muscat, Sultanate of Oman.",
      },
      { property: "og:title", content: "Ocean Bridge Trade" },
      {
        property: "og:description",
        content: "Oman-origin seafood, verified at source and cleared for arrival.",
      },
    ],
  }),
  component: Home,
});

/* ---------------------------------------------------------------------------
 * Content
 * ------------------------------------------------------------------------ */

/* All three clips in the media folder. Note oman-flag.mp4 is a portrait
 * recording — it fills a landscape hero by cropping hard to the centre. It
 * reads fine on mobile and loses the edges on desktop. */
const HERO_SLIDES = [
  {
    src: "/videos/hero-1.mp4",
    kicker: "Origin — Muscat coastline",
    lines: ["Oman's catch,", "cleared for arrival."],
    sub: "We verify the supply at source, settle destination-market regulation before the offer goes out, and stay on the transaction until the container lands.",
  },
  {
    src: "/videos/hero-2.mp4",
    kicker: "Compliance — regulatory pre-clearance",
    lines: ["Cleared before", "it ever ships."],
    sub: "GACC registration, EU catch certification, FDA supplier verification and Gulf conformity — settled upstream, so nothing is argued at the border.",
  },
  {
    src: "/videos/oman-flag.mp4",
    kicker: "Sultanate of Oman — verified origin",
    lines: ["Verified at", "the water's edge."],
    sub: "A partner network we built in person across two thousand kilometres of Arabian Sea coast — audited on the quay, not from a database.",
  },
];
const HERO_POSTER = "/videos/hero-poster.jpg";
const HERO_INTERVAL = 7000;

const DISCIPLINES = [
  {
    n: "01",
    title: "We verify the source",
    body: "Direct access to Oman's landing sites through a partner network we audit in person — processors, cold-chain operators, licensed exporters. Nothing enters an offer on the strength of a phone call.",
  },
  {
    n: "02",
    title: "We clear the paperwork first",
    body: "Every shipment is mapped against the destination market before you see a price. GACC facility registration, EU catch certification, FDA supplier verification, Gulf conformity — settled upstream, not argued at the border.",
  },
  {
    n: "03",
    title: "We write it down",
    body: "Specification, Incoterms, validity window, payment structure. A trade that has run on handshakes for decades, documented the way your procurement team already works.",
  },
  {
    n: "04",
    title: "We stay on it until it lands",
    body: "Pre-shipment document review, third-party inspection coordination, and milestone tracking from purchase order to delivered container.",
  },
];

const MARKETS = [
  {
    region: "China",
    lede: "Qingdao, Dalian, Xiamen",
    body: "GACC Decree 248 and CIFER facility registration, with Field 519 declarations prepared to match.",
    img: marketChina.url,
    alt: "Container terminal at the Port of Shanghai, Yangshan deep-water zone",
  },
  {
    region: "European Union",
    lede: "Rotterdam, Vigo, Piraeus",
    body: "TRACES documentation, validated IUU catch certificates, third-country establishment listing.",
    img: marketEu.url,
    alt: "Container terminal in the Port of Rotterdam",
  },
  {
    region: "Gulf Cooperation Council",
    lede: "Jebel Ali, Dammam, Jeddah",
    body: "SFDA and GSO conformity, FASAH clearance routing, halal certification oversight.",
    img: marketGcc.url,
    alt: "Container yard at Jebel Ali free zone",
  },
  {
    region: "United States",
    lede: "Seattle, Newark, Long Beach",
    body: "Seafood HACCP under 21 CFR Part 123 and a complete Foreign Supplier Verification file.",
    img: marketUsa.url,
    alt: "Container cranes at a United States port terminal",
  },
];

const STATS = [
  { value: 35, suffix: "", label: "Species in the catalogue" },
  { value: 4, suffix: "", label: "Regulatory regimes cleared" },
  { value: 48, suffix: "h", label: "Buyer inquiry response" },
  { value: 100, suffix: "%", label: "Pre-shipment document review" },
];

/* ---------------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------------ */

function Home() {
  return (
    <div>
      <Hero />
      <Positioning />
      <Numbers />
      <Disciplines />
      <Catalogue />
      <Compliance />
      <Gateways />
      <Origin />
      <Insights />
      <Updates />
      <ClosingCta />
    </div>
  );
}

/* ---- 1. Hero -------------------------------------------------------------- */

function Hero() {
  const [slide, setSlide] = useState(0);
  const [warm, setWarm] = useState(false);
  const reduce = useReducedMotion();
  const active = HERO_SLIDES[slide];

  useEffect(() => {
    const id = window.setTimeout(() => setWarm(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      HERO_INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="band-deep relative -mt-16 flex min-h-[640px] items-end overflow-hidden h-[92vh]">
      <div className="absolute inset-0">
        {HERO_SLIDES.map((s, i) => (
          <video
            key={s.src}
            src={s.src}
            poster={HERO_POSTER}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: i === slide ? 1 : 0 }}
            autoPlay
            loop
            muted
            playsInline
            /* The glitch: preload="none" on inactive clips meant a slide became
              * visible before it had buffered a single frame, so the crossfade
              * landed on black and then jumped. Current AND next are always
              * warm, so the clip is decoded before it is ever shown. */
            preload={
              i === slide || i === (slide + 1) % HERO_SLIDES.length || warm ? "auto" : "metadata"
            }
            aria-hidden
          />
        ))}
        {/* Weighted to the bottom-left, where the type sits. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,20,25,0.94)_0%,rgba(8,20,25,0.62)_38%,rgba(8,20,25,0.18)_70%,rgba(8,20,25,0.35)_100%)]" />
      </div>

      <div className="shell relative flex w-full flex-col pb-16 pt-28 md:pb-24">
        {/* The editorial wordmark, left-aligned directly under the bar. */}
        <span className="wordmark-hero text-foreground">Ocean Bridge</span>

        {/* Headline block, bottom-right. Keyed on `slide` so the whole thing
          * re-mounts and re-animates each time the footage changes — copy and
          * video turn over together rather than the video changing under a
          * fixed headline. */}
        <div className="mt-auto flex flex-col items-start pt-20 md:items-end md:pt-28 md:text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-start md:items-end"
            >
              <div className="eyebrow mb-6 md:flex-row-reverse">{active.kicker}</div>

              <h1 className="h-display h-display-xl max-w-[15ch]">
                <LineReveal immediate lines={active.lines} />
              </h1>

              <p className="lede lede-lg mt-7 max-w-lg text-foreground/90">{active.sub}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.19, 1, 0.22, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4 md:justify-end"
          >
            <Link to="/products" className="btn btn-outline">
              See the catalogue
              <ArrowRight className="size-4" />
            </Link>
            <Link to="/contact" className="btn-pill">
              Start a buyer inquiry
              <span className="pill-badge">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-3 left-3 flex items-center lg:left-9"
        role="group"
        aria-label="Hero footage"
      >
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-pressed={i === slide}
            aria-label={`Show segment ${i + 1}: ${s.kicker}`}
            onClick={() => setSlide(i)}
            className="grid place-items-center p-3"
          >
            <span
              className={`block h-[3px] rounded-full transition-all duration-500 ${
                i === slide ? "w-10 bg-[color:var(--foreground)]" : "w-4 bg-[color:var(--foreground)]/40"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---- 2. Positioning ------------------------------------------------------- */

function Positioning() {
  return (
    <section className="band-paper">
      <div className="shell section-lg">
        <Reveal>
          <div className="eyebrow mb-10">What we are</div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="h-statement max-w-5xl text-foreground">
            Ocean Bridge Trade is not a fishing company and not a broker.
            <span className="text-muted-foreground">
              {" "}
              We are the layer of corporate discipline between Oman's fragmented
              origin market and the procurement standards of an international
              buyer — the party that does the verification, holds the
              documentation, and answers for it.
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
            <div>
              <div className="label-caps">We do not</div>
              <p className="mt-3 text-[15px] leading-[1.7] text-muted-foreground">
                Own fleets, plants or cold stores. Take title to the goods. Issue an
                offer on data we have not verified ourselves.
              </p>
            </div>
            <div>
              <div className="label-caps">We do</div>
              <p className="mt-3 text-[15px] leading-[1.7] text-muted-foreground">
                Audit facilities on the ground, enforce cold-chain protocol, and run
                the commercial workflow from first introduction to delivered container.
              </p>
            </div>
            <div>
              <div className="label-caps">Based in</div>
              <p className="mt-3 text-[15px] leading-[1.7] text-muted-foreground">
                Muscat, Sultanate of Oman — inside the supply base, not representing it
                from a distance.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- 3. Numbers ----------------------------------------------------------- */

function Numbers() {
  return (
    <section className="band-wash border-y border-border">
      <div className="shell section">
        <Stagger className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {STATS.map((s) => (
            <StaggerItem key={s.label}>
              <div className="font-display text-5xl leading-none text-foreground md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="label-caps mt-4">{s.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---- 4. Disciplines (pinned heading, scrolling list) ---------------------- */

function Disciplines() {
  return (
    <section className="band-paper">
      <div className="shell section-lg grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="pin self-start">
          <Reveal>
            <div className="eyebrow mb-6">How it works</div>
            <h2 className="h-display h-display-lg">Four things happen before you get a price.</h2>
            <p className="lede mt-6">
              Not a service tier and not an upsell. This is the minimum that has to be
              true before we are willing to put a number in front of a buyer.
            </p>
            <Link to="/about" className="link-underline mt-8">
              How we operate <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div>
          {DISCIPLINES.map((d, i) => (
            <Reveal key={d.n} delay={i * 0.05}>
              <div className="group border-t border-border py-10 first:border-t-0 first:pt-0">
                <div className="num label-caps mb-5 text-[color:var(--brand-teal)]">{d.n}</div>
                <h3 className="h-display h-display-sm mb-4">{d.title}</h3>
                <p className="text-[16px] leading-[1.75] text-muted-foreground">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- 5. Catalogue rail ---------------------------------------------------- */

function Catalogue() {
  const counts = SPECIES.reduce<Record<string, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="band-wash border-t border-border">
      <div className="shell section-lg">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <div className="eyebrow mb-6">The catalogue</div>
            <h2 className="h-display h-display-lg max-w-[16ch]">
              Four groups, thirty-five species.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/products" className="link-underline">
              Open the full catalogue <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        {/* The four commercial groups, using the category artwork rather than
          * individual species — a buyer picks a group first, then drills in. */}
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" step={0.08}>
          {CATEGORIES.map((c) => (
            <StaggerItem key={c.id}>
              <Link
                to="/products"
                search={{ category: c.id }}
                className="card-lift group flex h-full flex-col border border-border bg-card"
              >
                <div className="plate aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.label_en}
                    loading="lazy"
                    className="transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-border p-6">
                  <div className="label-caps">{counts[c.id] ?? 0} species</div>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">
                    {c.label_en}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">
                    {c.blurb}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-[13px] font-semibold text-[color:var(--accent)]">
                    View group
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---- 6. Compliance -------------------------------------------------------- */

function Compliance() {
  return (
    <section className="band-ink">
      <div className="section-lg">
        <div className="shell">
          <Reveal>
            <div className="eyebrow mb-6">Certified establishments</div>
            <h2 className="h-display h-display-lg max-w-[20ch]">
              Detained cargo is a paperwork failure, not bad luck.
            </h2>
            <p className="lede mt-6 max-w-2xl">
              The certifications below are held by the processing establishments in our
              vetted Oman network — we verify them, we do not issue them. Ocean Bridge
              Trade's job is to confirm each certificate is current, that the issuing
              body is recognised in your destination market, and that the file is
              complete before a consignment moves.
            </p>
          </Reveal>
        </div>

        {/* Marks ticker. */}
        <Reveal delay={0.1}>
          <div className="marquee-track mt-14 border-y border-border py-8">
            <div className="marquee-content">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                  {REGIMES.map((r) => (
                    <div
                      key={`${copy}-${r.code}`}
                      className="flex shrink-0 items-center gap-4 px-8"
                    >
                      <span className="text-[color:var(--brand-teal)]">
                        <ComplianceMark regime={r} size={56} />
                      </span>
                      <span>
                        <span className="block font-display text-xl leading-none text-foreground">
                          {r.code}
                        </span>
                        <span className="label-caps mt-1 block">{r.jurisdiction}</span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="shell">
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
            {REGIMES.slice(0, 8).map((r) => (
              <StaggerItem key={r.code}>
                <ComplianceCard regime={r} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ---- 7. Gateways ---------------------------------------------------------- */

function Gateways() {
  return (
    <section className="band-paper">
      <div className="shell section-lg">
        <Reveal>
          <div className="eyebrow mb-6">Destination markets</div>
          <h2 className="h-display h-display-lg max-w-[18ch]">Where the containers go.</h2>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {MARKETS.map((m, i) => (
            <Reveal key={m.region} delay={(i % 2) * 0.08}>
              <article className="group">
                <ScrollScale className="aspect-[16/10]">
                  <img
                    src={m.img}
                    alt={m.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </ScrollScale>
                <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-border pt-5">
                  <h3 className="font-display text-3xl leading-none text-foreground">
                    {m.region}
                  </h3>
                  <span className="label-caps shrink-0">{m.lede}</span>
                </div>
                <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">{m.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 max-w-3xl border-t border-border pt-6 text-[12px] leading-relaxed text-fg-subtle">
            Terminal photography via Wikimedia Commons — Yangshan, Shanghai (public
            domain); Rotterdam (CC BY 2.0); Jebel Ali, UAE (CC BY-SA 3.0); Seattle
            (CC BY 2.0).
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- 8. Origin ------------------------------------------------------------ */

function Origin() {
  return (
    <section className="band-wash border-y border-border">
      <div className="shell section-lg">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="eyebrow mb-6">Origin</div>
            <h2 className="h-display h-display-lg">The supply is already secured.</h2>
            <p className="lede mt-6">
              Our advantage is not a database. It is a partner network in Oman that we
              built in person and audit in person — landing sites, processors,
              cold-chain operators and licensed exporters, in a country whose coastline
              runs the length of the Arabian Sea.
            </p>
            <p className="lede mt-4">
              That proximity is why we can tell you in the same week whether a species
              is running, what grade is realistic, and which plant can actually hold the
              temperature.
            </p>
            <Link to="/about" className="link-underline mt-8">
              More about how we operate <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={0.1}>
              <ParallaxMedia
                src="/website-images/fishermen.jpg"
                alt="Omani fishermen landing the day's catch"
                className="aspect-[4/3]"
                objectPosition="50% 25%"
              />
            </Reveal>
            <div className="grid grid-cols-2 gap-6">
              <Reveal delay={0.18}>
                <ParallaxMedia
                  src="/website-images/harbor-dusk.jpg"
                  alt="Muscat harbour at dusk"
                  className="aspect-square"
                  strength={8}
                />
              </Reveal>
              <Reveal delay={0.24}>
                <ParallaxMedia
                  src="/website-images/dhow-detail.jpg"
                  alt="Detail of a traditional Omani dhow"
                  className="aspect-square"
                  strength={8}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- 8b. Insights --------------------------------------------------------- */

function Insights() {
  const [lead, ...rest] = ARTICLES.slice(0, 5);

  return (
    <section id="insights" className="band-paper scroll-mt-24">
      <div className="shell section-lg">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <div className="eyebrow mb-6">Insights</div>
            <h2 className="h-display h-display-lg max-w-[16ch]">
              What we learn clearing cargo.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Lead */}
          <Reveal>
            <Link to="/article/$slug" params={{ slug: lead.slug }} className="group block h-full">
              <ScrollScale className="aspect-[16/10]">
                <img
                  src={lead.image}
                  alt={lead.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </ScrollScale>
              <div className="mt-6 flex items-center gap-3">
                <span className="label-caps text-[color:var(--brand-teal)]">{lead.topic}</span>
                <span className="label-caps">{lead.dateLabel}</span>
                <span className="label-caps">{lead.readingMinutes} min</span>
              </div>
              <h3 className="h-display h-display-sm mt-4">{lead.title}</h3>
              <p className="lede mt-4">{lead.standfirst}</p>
              <span className="link-underline mt-6">
                Read <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
              </span>
            </Link>
          </Reveal>

          {/* The other four, as a list */}
          <Stagger className="flex flex-col" step={0.06}>
            {rest.map((a) => (
              <StaggerItem key={a.slug}>
                <Link
                  to="/article/$slug"
                  params={{ slug: a.slug }}
                  className="group flex gap-6 border-b border-border py-6 first:pt-0"
                >
                  <div className="media hidden h-24 w-32 shrink-0 sm:block">
                    <img
                      src={a.image}
                      alt={a.imageAlt}
                      loading="lazy"
                      className="transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="label-caps text-[color:var(--brand-teal)]">{a.topic}</span>
                      <span className="label-caps">{a.readingMinutes} min</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl leading-tight text-foreground transition-colors group-hover:text-[color:var(--accent)]">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ---- 9. Updates ----------------------------------------------------------- */

function Updates() {
  return (
    <section className="band-paper">
      <div className="shell section-lg">
        <NewsletterSignup />
      </div>
    </section>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "saving") return;
    setState("saving");
    const { error } = await supabase
      .from("newsletter_signups")
      .insert({ email: email.trim().toLowerCase(), source: "home" });

    if (error) {
      /* A duplicate address is a success from the visitor's point of view. */
      if (error.code === "23505") {
        setState("done");
        setMessage("You're already on the list — we'll be in touch.");
        return;
      }
      setState("error");
      setMessage("That didn't go through. Check the address and try again.");
      return;
    }
    setState("done");
    setMessage("You're on the list. Market notes will land in your inbox.");
  };

  return (
    <Reveal>
      <div className="grid gap-10 border border-border bg-card p-8 md:p-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="eyebrow mb-6">Market notes</div>
          <h2 className="h-display h-display-md max-w-[20ch]">
            Season shifts and rule changes, before they cost you a container.
          </h2>
          <p className="lede mt-5">
            Origin pricing signals, season turns, and regulatory changes across China,
            the EU, the GCC and the US. Sent only when something has actually moved.
          </p>
        </div>

        {state === "done" ? (
          <p
            className="border-l-2 pl-5 text-[16px] text-foreground"
            style={{ borderColor: "var(--accent)" }}
          >
            {message}
          </p>
        ) : (
          <form onSubmit={submit} className="w-full">
            <label htmlFor="newsletter-email" className="eyebrow-muted mb-3 block">
              Work email
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="min-w-0 flex-1 border border-border bg-background px-4 py-3.5 text-base text-foreground placeholder:text-fg-subtle focus:border-[color:var(--accent)] focus:outline-none"
              />
              <button type="submit" disabled={state === "saving"} className="btn btn-solid shrink-0">
                {state === "saving" ? "Sending…" : "Notify me"}
              </button>
            </div>
            {state === "error" && (
              <p className="mt-3 text-[14px] text-[color:var(--destructive)]">{message}</p>
            )}
          </form>
        )}
      </div>
    </Reveal>
  );
}

/* ---- 10. Closing CTA ------------------------------------------------------ */

function ClosingCta() {
  return (
    <section className="band-deep relative overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <img
          src="/website-images/port-cranes.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover object-[50%_40%]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,20,25,0.75),rgba(8,20,25,0.95))]" />

      <div className="shell section-lg relative text-center">
        <Reveal>
          <h2 className="h-display h-display-lg mx-auto max-w-[20ch]">
            Tell us what you need to land, and where.
          </h2>
          <p className="lede mx-auto mt-6 max-w-xl">
            Species, grade, volume, destination market and preferred Incoterms is enough
            to start. Buyer inquiries are reviewed within 48 business hours.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-pill">
              Start a buyer inquiry
              <span className="pill-badge">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
            <Link to="/products" className="btn btn-outline">
              Browse the catalogue first
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
