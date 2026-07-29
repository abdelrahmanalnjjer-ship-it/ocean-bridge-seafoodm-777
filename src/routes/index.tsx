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
  },
  {
    src: "/videos/6618035-uhd_3840_2160_24fps(1) (online-video-cutter.com) (2).mp4",
    kicker: "Compliance · Regulatory Pre-Clearance",
    headline: "Every shipment cleared before it leaves the dock.",
  },
  {
    src: "/videos/Untitled design.mp4",
    kicker: "Logistics · Cold-Chain Integrity",
    headline: "From Oman's coast to your processing line — verified.",
  },
];
const HERO_POSTER = "/website-images/hero-poster.jpg";
const CATEGORY_IMAGES = [
  "/product-images/pelagic.png",
  "/product-images/demersal.png",
  "/product-images/cephalopods.png",
  "/product-images/crustaceans.png",
];
/* Aspect ratios vary per shot so each frame keeps its subject; the first
 * card spans two columns so all five align to a consistent row height. */
const VLOG_CARDS = [
  { title: "Origin Waters — Muscat Coastline", date: "Jul 2026", image: "/website-images/harbor-boats.jpg", aspect: "aspect-[16/9]", pos: "object-center" },
  { title: "Qingdao Buyer Delegation Concludes Muscat Visit", date: "Jun 2026", image: "/website-images/harbor-dusk.jpg", aspect: "aspect-[16/9]", pos: "object-[50%_38%]" },
  { title: "Salalah Kingfish Season — Volume & Grade Outlook", date: "Apr 2026", image: "/website-images/fishermen.jpg", aspect: "aspect-[16/9]", pos: "object-[50%_22%]" },
  { title: "GACC CIFER Facility Walkthrough", date: "Mar 2026", image: "/website-images/port-cranes.jpg", aspect: "aspect-[16/9]", pos: "object-[50%_35%]" },
  { title: "Dhow Fleet — Traditional Landing at Dawn", date: "Feb 2026", image: "/website-images/dhow-detail.jpg", aspect: "aspect-[16/9]", pos: "object-[50%_30%]" },
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
      {/* HERO — rotating origin footage with captions synced to each cut */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-brand-black">
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
                poster={HERO_POSTER}
                className="h-full w-full object-cover opacity-70"
                autoPlay
                muted
                playsInline
                onEnded={() => goTo(slide + 1)}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/40 via-[#121212]/70 to-[#121212]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 pb-28 pt-40 w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/70 mb-10"
          >
            <span className="h-px w-8 shrink-0 bg-brand-marine" />
            Ocean Bridge Trade · Muscat, Sultanate of Oman
          </motion.div>

          {/* Caption keyed to the active video — fades and drifts on change */}
          <div className="min-h-[9.5rem] md:min-h-[13rem] lg:min-h-[15rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-marine">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/50">
                    {String(slide + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
                  </span>
                  <span className="h-px w-6 bg-brand-marine" />
                  {active.kicker}
                </div>
                <h1 className="h-display h-display-xl max-w-4xl">
                  {active.headline}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-8 max-w-xl text-base md:text-lg text-white/70 leading-[1.8]"
          >
            Verified supply. Regulatory pre-clearance. Reliable, repeatable supply chains from Oman's coast to international processors and importers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <Link to="/contact" className="btn-primary group">
              Request a Buyer Consultation
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </Link>
            {/* Sequence indicators — click to jump between cuts */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero footage selector">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  role="tab"
                  aria-selected={i === slide}
                  aria-label={`Play segment ${i + 1}: ${s.kicker}`}
                  onClick={() => goTo(i)}
                  className={`h-px transition-all duration-500 ${
                    i === slide ? "w-12 bg-brand-marine" : "w-6 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="section-slate">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[2px] mb-10"
            style={{ backgroundColor: "var(--color-brand-accent)" }}
          />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-display text-3xl md:text-5xl leading-[1.15] max-w-5xl text-white"
          >
            We don't just connect buyers and sellers.
            <span className="text-muted-foreground"> We engineer reliable, compliant, repeatable supply chains from Oman to the world — bringing corporate-grade structure to a trade that has historically operated informally.</span>
          </motion.p>
        </div>
      </section>

      {/* BUYER VALUE PROPOSITION */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="eyebrow mb-5">Buyer Proposition</div>
          <h2 className="h-display h-display-md max-w-3xl mb-20">Four disciplines a global buyer receives on every transaction.</h2>
          <div className="grid md:grid-cols-2 gap-px bg-border/60">
            {VALUE_PROPS.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
                className="bg-background p-10 border-t-2 border-transparent hover:border-brand-marine transition-colors"
              >
                <div className="font-mono text-xs text-muted-foreground mb-8">{c.n}</div>
                <div className="font-display text-2xl mb-5 text-white">{c.title}</div>
                <p className="text-sm text-muted-foreground leading-[1.8] max-w-md">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS strip — small, calm */}
      <section className="section-slate border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="font-display text-4xl md:text-5xl text-white">{s.k}</div>
              <div className="mt-3 eyebrow-muted">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO teaser */}
      <section className="border-t border-border/60">
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="card-lift border border-border bg-card overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-brand-black">
                  <img src={CATEGORY_IMAGES[i % CATEGORY_IMAGES.length]} alt={c.label_en} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="font-mono text-xs text-muted-foreground mb-3">0{i + 1}</div>
                  <div className="font-display text-xl text-white mb-4">{c.label_en}</div>
                  <div className="h-px w-8 group-hover:w-16 transition-all" style={{ backgroundColor: "var(--color-brand-accent)" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETS & COMPLIANCE */}
      <section className="section-slate border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="py-6 grid md:grid-cols-[220px_1fr] gap-6 items-start"
                >
                  <div className="font-display text-xl text-white">{g.region}</div>
                  <div className="text-sm text-muted-foreground leading-[1.8]">{g.body}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VLOG — editorial grid: lead story spans two columns, frames aligned */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
            <div>
              <div className="eyebrow mb-5">Vlog · Field Notes</div>
              <h2 className="h-display h-display-md">News from the origin desk.</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VLOG_CARDS.map((v, i) => (
              <motion.article
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                className={`card-lift group bg-card ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
              >
                <div className={`media-frame overflow-hidden ${v.aspect}`}>
                  <img
                    src={v.image}
                    alt={v.title}
                    loading="lazy"
                    className={`h-full w-full object-cover ${v.pos} group-hover:scale-105 transition-transform duration-700`}
                  />
                </div>
                <div className="px-1 pt-5 pb-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2.5">{v.date}</div>
                  <div className="font-display text-lg text-white leading-snug">{v.title}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60">
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
          <Link to="/contact" className="btn-primary mt-12 group">
            Initiate Buyer Inquiry <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
