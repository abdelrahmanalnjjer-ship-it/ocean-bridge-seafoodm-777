import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

const HARBOR_BOATS_IMAGE = "/website-images/harbor-boats.jpg";
const FISHERMEN_IMAGE = "/website-images/fishermen.jpg";
const PORT_CRANES_IMAGE = "/website-images/port-cranes.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ocean Bridge Trade" },
      { name: "description", content: "Elevating and professionalizing the Omani fish export industry — the corporate-grade representative of Oman-origin seafood for international buyers." },
      { property: "og:title", content: "About Ocean Bridge Trade" },
      { property: "og:description", content: "The world-class representative of Oman-origin seafood for international buyers." },
    ],
  }),
  component: AboutPage,
});

const BELIEFS = [
  { t: "Relationships over transactions", b: "Long-term buyer partnerships built on repeatable performance, not one-off shipments." },
  { t: "Transparency & integrity", b: "Every claim verifiable. Every document traceable. No informal handshakes." },
  { t: "Accuracy over speed", b: "Offers issued only when backed by verified data — origin, grade, volume, and compliance." },
  { t: "Professional standards", b: "Corporate KYC, defined SLAs, structured commercial terms applied to a historically informal trade." },
  { t: "Market intelligence", b: "Continuous ground-level insight from Oman's ports translated into decisions buyers can rely on." },
];

const NEVER = [
  "Misrepresent our role or capabilities.",
  "Issue offers based on unverified data.",
  "Overstate regulatory approvals or facility status.",
  "Engage in transactions we cannot document or verify end-to-end.",
];

const STATS = [
  { k: "Muscat", v: "Headquartered" },
  { k: "35+", v: "Species catalogued" },
  { k: "4", v: "Regulatory regimes mastered" },
  { k: "48h", v: "Buyer inquiry response" },
];

function AboutPage() {
  return (
    <div>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 pt-24 pb-20">
          <div className="eyebrow mb-6">About Ocean Bridge Trade</div>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="h-display h-display-xl"
            >
              The world-class representative of Oman-origin seafood.
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="media-frame aspect-[4/3]">
              <img src={HARBOR_BOATS_IMAGE} alt="Muscat harbour" className="h-full w-full object-cover object-[50%_30%]" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-slate border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-28 grid md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="eyebrow mb-6">Our Mission</div>
            <p className="font-display text-2xl md:text-3xl leading-snug text-white">
              To elevate and professionalize the Omani fish export industry — becoming the most trusted, corporate-grade representative of Oman-origin seafood for international buyers.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="eyebrow mb-6">What We Actually Do</div>
            <p className="font-display text-2xl md:text-3xl leading-snug text-white">
              We don't just connect buyers and sellers. We engineer reliable, compliant, repeatable supply chains from Oman to the world.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <motion.div key={s.v} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}>
              <div className="font-display text-3xl md:text-4xl text-white">{s.k}</div>
              <div className="mt-3 eyebrow-muted">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-slate border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-28">
          <div className="eyebrow mb-5">Core Beliefs</div>
          <h2 className="h-display h-display-md max-w-3xl mb-16">Principles that govern every transaction we touch.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BELIEFS.map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.07 }}
                className="card-lift border border-border bg-card p-8"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">0{i + 1}</div>
                <div className="font-display text-xl text-white mb-3">{b.t}</div>
                <p className="text-sm text-muted-foreground leading-[1.8]">{b.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-28">
          <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="eyebrow mb-5">Origin Infrastructure</div>
              <h2 className="h-display h-display-md mb-6">Supply is already secured.</h2>
              <p className="lede text-sm">
                From our Muscat headquarters we operate a deep-rooted, Oman-based commercial partner network — landing sites, processors, cold-chain operators, and licensed exporters. Continuous on-the-ground market intelligence, physical facility audits, and end-to-end cold-chain oversight are the baseline standard, not a premium tier.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="media-frame aspect-[4/3]">
              <img src={FISHERMEN_IMAGE} alt="Omani fishermen at work" className="h-full w-full object-cover object-[50%_22%]" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-slate border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-28 grid md:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <div className="eyebrow mb-5">Our Discipline</div>
            <h2 className="h-display h-display-md">What we will never do.</h2>
          </div>
          <ul className="space-y-6">
            {NEVER.map((n, i) => (
              <motion.li
                key={n}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-6 border-b border-border pb-6"
              >
                <span className="font-mono text-xs text-brand-marine shrink-0 pt-1">0{i + 1}</span>
                <span className="text-white/85">{n}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-28">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="media-frame aspect-[21/9]">
            <img src={PORT_CRANES_IMAGE} alt="Port export infrastructure" className="h-full w-full object-cover object-[50%_35%]" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
