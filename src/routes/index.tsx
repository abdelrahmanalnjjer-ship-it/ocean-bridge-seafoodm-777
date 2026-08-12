import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/data/species";
import { supabase } from "@/integrations/supabase/client";
import terminalNight from "@/assets/terminal-night.jpg.asset.json";
import marketChina from "@/assets/market-china.jpg.asset.json";
import marketEu from "@/assets/market-eu.jpg.asset.json";
import marketGcc from "@/assets/market-gcc.jpg.asset.json";
import marketUsa from "@/assets/market-usa.jpg.asset.json";

/* Hero rotation — widescreen cuts only, re-encoded to 1080p faststart. Every
 * clip stays mounted and crossfades on opacity, so switching never re-downloads
 * the file or flashes a black frame. The portrait flag clip lives on About. */
const HERO_SLIDES = [
  {
    src: "/videos/hero-1.mp4",
    kicker: "Origin · Muscat Coastline",
  },
  {
    src: "/videos/hero-2.mp4",
    kicker: "Compliance · Regulatory Pre-Clearance",
  },
];

const HERO_POSTER = "/videos/hero-poster.jpg";
const HERO_HEADLINE =
  "We don't just connect buyers and sellers. We engineer reliable, compliant, repeatable supply chains from Oman to the world.";

const HERO_INTERVAL = 7000;

const CATEGORY_IMAGES = [
  "/product-images/pelagic.png",
  "/product-images/demersal.png",
  "/product-images/cephalopods.png",
  "/product-images/seafood-02-yellowfin-tuna.jpg",
];
export const Route = createFileRoute("/")({
  component: Index,
});

const VALUE_PROPS = [
  { n: "01", title: "Verified Origin Access", body: "Direct, vetted access to Oman's coastal supply base through an established partner network — pre-qualified processors, cold-chain operators, and export licence holders." },
  { n: "02", title: "Regulatory Pre-Clearance", body: "Every shipment mapped against destination-market requirements before an offer is issued. GACC, EU TRACES, FDA FSVP, SFDA — cleared upstream, not at the border." },
  { n: "03", title: "Structured Commercial Terms", body: "Clear specifications, defined Incoterms, validity periods, and payment structures. No informal handshakes — every transaction documented and enforceable." },
  { n: "04", title: "Transaction Integrity", body: "Pre-shipment document validation, third-party inspection coordination, and real-time milestone tracking from purchase order to delivered container." },
];

const MARKETS = [
  { region: "China", body: "GACC Decree 248 / CIFER facility registration, accurate Field 519 declarations.", img: marketChina.url, alt: "Container terminal at the Port of Shanghai, Yangshan deep-water zone" },
  { region: "European Union", body: "TRACES documentation, IUU Catch Certificates, third-country establishment listing.", img: marketEu.url, alt: "Container terminal in the Port of Rotterdam" },
  { region: "Gulf Cooperation Council", body: "SFDA / ESMA / GSO standards, halal certification oversight, FASAH clearance.", img: marketGcc.url, alt: "Container yard at Jebel Ali free zone" },
  { region: "United States", body: "FDA Seafood HACCP (21 CFR 123) and Foreign Supplier Verification Program compliance.", img: marketUsa.url, alt: "Container cranes at a United States port terminal" },
];

/* Fix 5: Certification badges for the scrolling ticker */
const CERT_BADGES = [
  { label: "GACC", full: "China GACC Decree 248", color: "border-brand-marine" },
  { label: "TRACES", full: "EU TRACES / IUU", color: "border-brand-ocean" },
  { label: "SFDA", full: "SFDA / GSO Standards", color: "border-brand-olive" },
  { label: "FDA HACCP", full: "FDA Seafood HACCP", color: "border-brand-sand" },
  { label: "FSVP", full: "Foreign Supplier Verification", color: "border-brand-marine" },
  { label: "ESMA", full: "ESMA Conformity", color: "border-brand-ocean" },
  { label: "GSO", full: "GSO Standardization", color: "border-brand-olive" },
  { label: "HALAL", full: "Halal Certification", color: "border-brand-sand" },
];

const STATS = [
  { k: "35+", v: "Species catalogued" },
  { k: "4", v: "Destination regulatory regimes" },
  { k: "48h", v: "Buyer inquiry response" },
  { k: "100%", v: "Pre-shipment document review" },
];

function Index() {
  const [slide, setSlide] = useState(0);
  /* Only the first clip preloads. Previously every slide carried
   * preload="auto", so a first-time visitor downloaded both 1080p files before
   * the hero settled — the single biggest cost on the page. The rest stay cold
   * until the hero has been on screen a moment. */
  const [warm, setWarm] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = HERO_SLIDES[slide];

  const goTo = (next: number) => {
    setSlide(((next % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    const id = window.setTimeout(() => setWarm(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  /* Depends on reduceMotion only. Keying this on `slide` rebuilt the interval
   * on every tick, so a manual dot click gave an inconsistent next interval. */
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      HERO_INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div>
      {/* HERO — full-bleed rotating footage, chrome floating over it */}
      <section className="section-navy-deep relative -mt-16 min-h-[600px] h-[78vh] md:h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {HERO_SLIDES.map((s, i) => (
            <video
              key={s.src}
              src={s.src}
              poster={HERO_POSTER}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out"
              style={{ opacity: i === slide ? 1 : 0 }}
              autoPlay
              loop
              muted
              playsInline
              preload={i === 0 || warm ? "auto" : "none"}
              aria-hidden
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1A21]/55 via-[#0B1A21]/25 to-[#0B1A21]/90" />
        </div>
        <div className="relative mx-auto max-w-[1240px] px-6 lg:px-12 pb-14 md:pb-16 pt-28 md:pt-36 w-full flex flex-col items-start md:items-end text-left md:text-right">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="mb-4 flex items-center gap-3 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.14em] md:tracking-[0.16em] text-brand-marine"
            >
              {active.kicker}
              <span className="h-px w-6 bg-brand-marine" />
            </motion.div>
          </AnimatePresence>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="h-display h-display-lg max-w-3xl"
          >
            {HERO_HEADLINE}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-5 max-w-md text-base text-foreground/85 leading-[1.7]"
          >
            Verified supply and regulatory pre-clearance, from Oman's coast to international processors and importers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-7"
          >
            <Link to="/contact" className="btn-pill">
              Request a Buyer Consultation
              <span className="pill-badge"><ArrowUpRight className="size-4" /></span>
            </Link>
          </motion.div>
        </div>

        {/* Minimal sequence dots, bottom-left */}
        <div
          className="absolute bottom-3 md:bottom-7 left-3 lg:left-9 flex items-center"
          role="group"
          aria-label="Hero footage selector"
        >
          {/* Was role="tablist" / role="tab" with no tabpanel and no
            * aria-controls — an invalid tab pattern. These are just toggles. */}
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-pressed={i === slide}
              aria-label={`Show segment ${i + 1}: ${s.kicker}`}
              onClick={() => goTo(i)}
              className="grid place-items-center p-3"
            >
              {/* 8px dot, 44px hit area — the dot alone was an 8px target. */}
              <span
                className={`block size-2 rounded-full transition-all duration-500 ${
                  i === slide ? "bg-foreground scale-125" : "bg-foreground/45 hover:bg-foreground/80"
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="section-ice">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[2px] mb-10"
            style={{ backgroundColor: "var(--brand-accent)" }}
          />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-display text-2xl md:text-4xl leading-[1.2] max-w-4xl text-foreground"
          >
            Corporate-grade structure for a trade that has historically operated informally.
            <span className="text-muted-foreground"> Documented specifications, verified establishments, and destination-market compliance settled before an offer is issued — so buyers receive certainty, not promises.</span>
          </motion.p>
        </div>
      </section>

      {/* BUYER VALUE PROPOSITION */}
      <section className="section-navy border-t border-border/60">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 py-16 md:py-24">
          <div className="eyebrow mb-5">Buyer Proposition</div>
          <h2 className="h-display h-display-md max-w-3xl mb-10">Four disciplines a global buyer receives on every transaction.</h2>
          <div className="grid md:grid-cols-2 gap-px bg-border/60">
            {VALUE_PROPS.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="bg-background p-8 border-t-2 border-transparent hover:border-brand-marine transition-colors"
              >
                <div className="font-mono text-xs text-muted-foreground mb-8">{c.n}</div>
                <div className="font-display text-xl mb-3 text-foreground">{c.title}</div>
                <p className="text-[15px] text-muted-foreground leading-[1.7] max-w-md">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS strip — small, calm */}
      <section className="section-navy-deep border-t border-border">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="font-display text-3xl md:text-4xl text-foreground">{s.k}</div>
              <div className="mt-3 eyebrow-muted">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO teaser */}
      <section className="section-ice border-t border-border/60">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 py-16 md:py-24">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
            <div>
              <div className="eyebrow mb-5">Product Scope</div>
              <h2 className="h-display h-display-md max-w-3xl">Verified Oman-origin species, ready to source.</h2>
            </div>
            <Link to="/products" className="link-underline">
              View full matrix <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                className="card-lift border border-border bg-card overflow-hidden group shadow-ambient-ocean"
              >
                <div className="h-44 flex items-center justify-center overflow-hidden bg-brand-black p-3">
                  <img
                    src={CATEGORY_IMAGES[i % CATEGORY_IMAGES.length]}
                    alt={c.label_en}
                    className="max-h-full max-w-full object-contain group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="font-mono text-xs text-muted-foreground mb-3">0{i + 1}</div>
                  <div className="font-display text-xl text-foreground mb-4">{c.label_en}</div>
                  <div className="h-px w-8 group-hover:w-16 transition-all" style={{ backgroundColor: "var(--brand-accent)" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETS & COMPLIANCE */}
      <section className="section-navy border-t border-border">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="lg:sticky lg:top-24"
            >
              <div className="eyebrow mb-4">Markets &amp; Compliance</div>
              <h2 className="h-display h-display-md">We've already cleared the compliance maze.</h2>
              <p className="mt-4 lede max-w-md">
                Buyers should never worry about detained or rejected cargo. Regulatory pre-clearance is the baseline, not a service tier.
              </p>
              <div className="media-frame mt-8 aspect-[4/3]">
                <img
                  src={terminalNight.url}
                  alt="Container terminal working under floodlights at night"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
            <div className="divide-y divide-border/60">
              {MARKETS.map((g, i) => (
                <motion.div
                  key={g.region}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.19, 1, 0.22, 1] }}
                  className="py-5 grid grid-cols-[92px_1fr] gap-5 items-center group"
                >
                  <div className="aspect-[4/3] overflow-hidden border border-border">
                    <img
                      src={g.img}
                      alt={g.alt}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div>
                    <div className="font-display text-xl text-foreground">{g.region}</div>
                    <div className="mt-1.5 text-[15px] text-muted-foreground leading-[1.65]">{g.body}</div>
                  </div>
                </motion.div>
              ))}
              <p className="pt-5 text-[12px] text-subtle leading-relaxed">
                Terminal photography via Wikimedia Commons — China: Yangshan, Shanghai (public domain) · European Union: Rotterdam (CC BY 2.0) · GCC: Jebel Ali, UAE (CC BY-SA 3.0) · United States: Seattle (CC BY 2.0). Section image: Hamburg Altenwerder (CC0).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION TICKER — auto-scrolling compliance badges */}
      <section className="section-navy-deep border-t border-border/60">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="eyebrow-bare text-[11px] uppercase tracking-[0.14em] text-brand-marine font-semibold whitespace-nowrap">
              Certifications & Compliance
            </div>
            <span className="h-px flex-1 bg-foreground/10" />
          </motion.div>
          <div className="marquee-track">
            <div className="marquee-content">
              {/* First copy */}
              {CERT_BADGES.map((b) => (
                <div
                  key={b.label}
                  className={`flex items-center gap-4 shrink-0 border-l-2 ${b.color} pl-4 py-3`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-bold uppercase tracking-[0.06em] text-foreground">
                    {b.label.slice(0, 3)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground whitespace-nowrap">{b.label}</div>
                    <div className="text-[12px] text-subtle whitespace-nowrap">{b.full}</div>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {CERT_BADGES.map((b) => (
                <div
                  key={`dup-${b.label}`}
                  className={`flex items-center gap-4 shrink-0 border-l-2 ${b.color} pl-4 py-3`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-bold uppercase tracking-[0.06em] text-foreground">
                    {b.label.slice(0, 3)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground whitespace-nowrap">{b.label}</div>
                    <div className="text-[12px] text-subtle whitespace-nowrap">{b.full}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARKET UPDATES — one signup module instead of empty placeholder cards */}
      <section className="section-ice border-t border-border/60">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 py-16 md:py-24">
          <NewsletterSignup />
        </div>
      </section>

      {/* CTA */}
      <section className="section-navy-deep border-t border-border/60">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 py-16 md:py-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-display h-display-md max-w-2xl mx-auto"
          >
            Sourcing Oman-origin seafood?
          </motion.h2>
          <p className="mt-4 lede max-w-lg mx-auto">Send us your specifications, target volumes, destination market, and preferred Incoterms. Buyer inquiries are reviewed within 48 business hours.</p>
          <Link to="/contact" className="btn-pill mt-12">
            Request a Buyer Consultation <span className="pill-badge"><ArrowUpRight className="size-4" /></span>
          </Link>
        </div>
      </section>
    </div>
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
      // A duplicate address is a success from the visitor's point of view.
      if (error.code === "23505") {
        setState("done");
        setMessage("You're already on the list — we'll be in touch.");
        return;
      }
      setState("error");
      setMessage("That didn't go through. Please check the address and try again.");
      return;
    }
    setState("done");
    setMessage("You're on the list. Market updates will land in your inbox.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="border border-border bg-card p-8 md:p-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center"
    >
      <div>
        <div className="eyebrow mb-4">Market Updates</div>
        <h2 className="h-display h-display-md">Get notified when we publish market updates and field dispatches.</h2>
        <p className="mt-4 text-[15px] text-muted-foreground leading-[1.7] max-w-md">
          Origin pricing signals, season shifts, and regulatory changes across China, the EU, GCC, and the US — sent only when there is something worth reading.
        </p>
      </div>

      {state === "done" ? (
        <p className="text-sm text-foreground border-l-2 pl-4" style={{ borderColor: "var(--brand-accent)" }}>
          {message}
        </p>
      ) : (
        <form onSubmit={submit} className="w-full">
          <label htmlFor="newsletter-email" className="eyebrow-muted block mb-3">
            Work email
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="min-w-0 flex-1 border border-border bg-background px-4 py-3 text-[15px] text-foreground placeholder:text-subtle focus:outline-none focus:border-[color:var(--brand-accent)]"
            />
            <button
              type="submit"
              disabled={state === "saving"}
              className="shrink-0 border border-[color:var(--brand-accent)] bg-[color:var(--brand-accent)]/12 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-[color:var(--brand-accent)]/22 disabled:opacity-60"
            >
              {state === "saving" ? "Sending…" : "Notify me"}
            </button>
          </div>
          {state === "error" && <p className="mt-3 text-[13px] text-destructive">{message}</p>}
        </form>
      )}
    </motion.div>
  );
}
