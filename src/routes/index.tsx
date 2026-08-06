import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { CATEGORIES } from "@/data/species";

/* Hero rotation — the three real uploaded cuts, in sequence.
 * NOTE: "9831955-uhd_3840_2160_30fps (online-video-cutter.com) (1).mp4" is a
 * byte-identical duplicate of the first video and is intentionally excluded. */
const HERO_SLIDES = [
  {
    src: "/videos/9031955-uhd_3840_2160_30fps.mp4",
    kicker: "Origin · Muscat Coastline",
    headline: "Oman-origin seafood, engineered for global buyers.",
    pos: "object-cover",
  },
  {
    src: "/videos/6618035-uhd_3840_2160_24fps(1) (online-video-cutter.com) (2).mp4",
    kicker: "Compliance · Regulatory Pre-Clearance",
    headline: "Every shipment cleared before it leaves the dock.",
    pos: "object-cover",
  },
  {
    src: "/videos/Untitled design.mp4",
    kicker: "Logistics · Cold-Chain Integrity",
    headline: "From Oman's coast to your processing line — verified.",
    pos: "object-contain",
  },
];

const CATEGORY_IMAGES = [
  "/product-images/pelagic.png",
  "/product-images/demersal.png",
  "/product-images/cephalopods.png",
  "/product-images/seafood-02-yellowfin-tuna.jpg",
];
/* Fix 4: Replace stock photo VLOG_CARDS with "Coming soon" placeholder entries */
const VLOG_PLACEHOLDERS = [
  { title: "Coming soon — origin stories, market updates, and field dispatches.", icon: "📝" },
  { title: "Real content being prepared for Q3 2026.", icon: "🎬" },
  { title: "Subscribe to be notified when new posts publish.", icon: "🔔" },
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
  { region: "China", body: "GACC Decree 248 / CIFER facility registration, accurate Field 519 declarations." },
  { region: "European Union", body: "TRACES documentation, IUU Catch Certificates, third-country establishment listing." },
  { region: "Gulf Cooperation Council", body: "SFDA / ESMA / GSO standards, halal certification oversight, FASAH clearance." },
  { region: "United States", body: "FDA Seafood HACCP (21 CFR 123) and Foreign Supplier Verification Program compliance." },
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = HERO_SLIDES[slide];

  const goTo = (next: number) => {
    setSlide(((next % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <div>
      {/* HERO — full-bleed rotating footage, chrome floating over it */}
      <section className="section-navy-deep relative -mt-16 min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={active.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            >
              <video
                ref={videoRef}
                src={active.src}
                className={`h-full w-full ${active.pos === "object-contain" ? "object-contain bg-brand-black" : "object-cover"}`}
                autoPlay
                muted
                playsInline
                onEnded={() => goTo(slide + 1)}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1229]/45 via-transparent to-[#0a1229]/85" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 pb-16 pt-40 w-full flex flex-col items-end text-right">
          {/* Caption keyed to the active video — fades and drifts on change */}
          <div className="max-w-2xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="mb-5 flex items-center justify-end gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-marine">
                  {active.kicker}
                  <span className="h-px w-6 bg-brand-marine" />
                </div>
                <h1 className="h-display h-display-lg">
                  {active.headline}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-6 max-w-md text-sm md:text-base text-foreground/75 leading-[1.8]"
          >
            Verified supply and regulatory pre-clearance, from Oman's coast to international processors and importers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-9"
          >
            <Link to="/contact" className="btn-pill">
              Request a Buyer Consultation
              <span className="pill-badge"><ArrowUpRight className="size-4" /></span>
            </Link>
          </motion.div>
        </div>

        {/* Minimal sequence dots, bottom-left */}
        <div
          className="absolute bottom-10 left-6 lg:left-12 flex items-center gap-3"
          role="tablist"
          aria-label="Hero footage selector"
        >
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.src}
              role="tab"
              aria-selected={i === slide}
              aria-label={`Play segment ${i + 1}: ${s.kicker}`}
              onClick={() => goTo(i)}
              className={`size-2 rounded-full transition-all duration-500 ${
                i === slide ? "bg-foreground scale-125" : "bg-foreground/35 hover:bg-foreground/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="section-ice">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 md:py-40">
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
            className="font-display text-3xl md:text-5xl leading-[1.15] max-w-5xl text-foreground"
          >
            We don't just connect buyers and sellers.
            <span className="text-muted-foreground"> We engineer reliable, compliant, repeatable supply chains from Oman to the world — bringing corporate-grade structure to a trade that has historically operated informally.</span>
          </motion.p>
        </div>
      </section>

      {/* BUYER VALUE PROPOSITION */}
      <section className="section-navy border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="eyebrow mb-5">Buyer Proposition</div>
          <h2 className="h-display h-display-md max-w-3xl mb-20">Four disciplines a global buyer receives on every transaction.</h2>
          <div className="grid md:grid-cols-2 gap-px bg-border/60">
            {VALUE_PROPS.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="bg-background p-10 border-t-2 border-transparent hover:border-brand-marine transition-colors"
              >
                <div className="font-mono text-xs text-muted-foreground mb-8">{c.n}</div>
                <div className="font-display text-2xl mb-5 text-foreground">{c.title}</div>
                <p className="text-sm text-muted-foreground leading-[1.8] max-w-md">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS strip — small, calm */}
      <section className="section-navy-deep border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="font-display text-4xl md:text-5xl text-foreground">{s.k}</div>
              <div className="mt-3 eyebrow-muted">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO teaser */}
      <section className="section-ice border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
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
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="eyebrow mb-5">Markets & Compliance</div>
              <h2 className="h-display h-display-md">We've already cleared the compliance maze.</h2>
              <p className="mt-6 lede max-w-md text-sm">
                Buyers should never worry about detained or rejected cargo. Regulatory pre-clearance is the baseline, not a service tier.
              </p>
            </motion.div>
            <div className="divide-y divide-border/60">
              {MARKETS.map((g, i) => (
                <motion.div
                  key={g.region}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 8 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                  className="py-6 grid md:grid-cols-[220px_1fr] gap-6 items-start"
                >
                  <div className="font-display text-xl text-foreground">{g.region}</div>
                  <div className="text-sm text-muted-foreground leading-[1.8]">{g.body}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION TICKER — auto-scrolling compliance badges */}
      <section className="section-navy-deep border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="eyebrow-bare text-[10px] uppercase tracking-[0.32em] text-brand-marine font-semibold whitespace-nowrap">
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                    {b.label.slice(0, 3)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground whitespace-nowrap">{b.label}</div>
                    <div className="text-[10px] text-foreground/50 whitespace-nowrap">{b.full}</div>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {CERT_BADGES.map((b) => (
                <div
                  key={`dup-${b.label}`}
                  className={`flex items-center gap-4 shrink-0 border-l-2 ${b.color} pl-4 py-3`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                    {b.label.slice(0, 3)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground whitespace-nowrap">{b.label}</div>
                    <div className="text-[10px] text-foreground/50 whitespace-nowrap">{b.full}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VLOG — placeholder cards until real content is published */}
      <section className="section-ice border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
            <div>
              <div className="eyebrow mb-5">Vlog · Field Notes</div>
              <h2 className="h-display h-display-md">News from the origin desk.</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VLOG_PLACEHOLDERS.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                className="card-lift border border-dashed border-border/40 bg-card/50 p-10 flex flex-col items-center justify-center text-center min-h-[200px] shadow-ambient-ocean"
              >
                <span className="text-3xl mb-4">{v.icon}</span>
                <p className="font-display text-base text-foreground/60 leading-relaxed">{v.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-navy-deep border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-display h-display-lg max-w-3xl mx-auto"
          >
            Sourcing Oman-origin seafood?
          </motion.h2>
          <p className="mt-6 lede max-w-lg mx-auto text-sm">Send us your specifications, target volumes, destination market, and preferred Incoterms. Buyer inquiries are reviewed within 48 business hours.</p>
          <Link to="/contact" className="btn-primary mt-12 group shadow-ambient-marine">
            Initiate Buyer Inquiry <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
