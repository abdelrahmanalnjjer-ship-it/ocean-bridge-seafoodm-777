import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import { MediaSlot } from "@/components/site-chrome";
import { CATEGORIES } from "@/data/species";

export const Route = createFileRoute("/")({
  component: Index,
});

const CAPABILITIES = [
  { n: "01", title: "Structured Sourcing", body: "Vetted Oman partner network matched to buyer specifications, seasonal availability, and processing capabilities." },
  { n: "02", title: "Supplier Verification", body: "Remote KYC, HACCP and GACC CIFER audits combined with on-the-ground facility and cold-chain inspection." },
  { n: "03", title: "Transaction Coordination", body: "End-to-end orchestration: blind introductions, negotiation structuring, export documentation, and freight alignment." },
];

const GATEWAYS = [
  { region: "China", hubs: "Qingdao · Dalian · Xiamen" },
  { region: "European Union", hubs: "Rotterdam · Vigo · Piraeus" },
  { region: "GCC / Middle East", hubs: "Dubai · Riyadh · Doha" },
  { region: "Select Asia", hubs: "Bangkok · Ho Chi Minh · Jakarta" },
];

const REG = ["GACC Decree 248", "CIFER Registration", "EU TRACES", "IUU Catch Cert.", "FDA HACCP 21 CFR 123", "SFDA FASAH", "Halal Oversight"];

const VLOG = [
  { title: "Sohar Port — Q3 Cold-Chain Audit", date: "Sept 2025" },
  { title: "Muscat Wholesale Landing", date: "Aug 2025" },
  { title: "Qingdao Buyer Delegation", date: "Jul 2025" },
  { title: "Salalah Kingfish Season", date: "Apr 2025" },
  { title: "GACC CIFER Facility Walkthrough", date: "Mar 2025" },
];

function Index() {
  const { t } = useI18n();
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <MediaSlot label="/public/media/hero.mp4" aspect="h-full" className="!aspect-auto h-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 py-24 w-full">
          <div className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground mb-8">
            Ocean Bridge Trade · Est. Muscat
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-5xl"
          >
            {t("hero.headline")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground"
          >
            {t("hero.sub")} A specialized commercial representation firm connecting fragmented origin markets with structured international buyers.
          </motion.p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/products" className="group inline-flex items-center gap-3 border border-foreground/60 hover:bg-foreground hover:text-primary-foreground px-8 py-4 text-sm tracking-wide transition-colors">
              {t("hero.cta.catalog")}
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-3 border border-border/60 hover:border-foreground/60 px-8 py-4 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors">
              {t("hero.cta.contact")}
            </Link>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 md:py-48">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.15] max-w-5xl"
          >
            We do not own fleets, plants, or warehouses. We own the discipline —
            <span className="text-muted-foreground"> due diligence, cold-chain oversight, and the transaction itself.</span>
          </motion.p>
        </div>
      </section>

      {/* VLOG */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">03 — Field</div>
              <h2 className="font-display text-3xl md:text-5xl">{t("section.vlog")}</h2>
              <p className="mt-3 text-muted-foreground max-w-lg">{t("section.vlog.sub")}</p>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x">
            {VLOG.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="min-w-[320px] md:min-w-[420px] snap-start group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <MediaSlot label={`/public/media/vlog/${i + 1}.mp4`} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/40">
                    <div className="size-14 rounded-full border border-foreground/70 flex items-center justify-center">
                      <Play className="size-5 ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div className="font-display text-lg">{v.title}</div>
                  <div className="font-mono text-[11px] text-muted-foreground">{v.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">04 — Competencies</div>
          <h2 className="font-display text-3xl md:text-5xl max-w-3xl mb-20">{t("section.capabilities")}</h2>
          <div className="grid md:grid-cols-3 gap-px bg-border/60">
            {CAPABILITIES.map((c) => (
              <div key={c.n} className="bg-background p-10">
                <div className="font-mono text-xs text-accent-foreground/60 mb-8">{c.n}</div>
                <div className="font-display text-2xl mb-6">{c.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIES TEASER */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">05 — Portfolio</div>
              <h2 className="font-display text-3xl md:text-5xl max-w-3xl">{t("section.species")}</h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm border-b border-foreground/40 pb-1 hover:border-foreground transition-colors">
              View full matrix <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border/60 p-8 hover:border-foreground/40 transition-colors group"
              >
                <div className="font-mono text-xs text-muted-foreground mb-6">0{i + 1}</div>
                <div className="font-display text-xl mb-4">{c.label_en}</div>
                <div className="h-px w-8 bg-foreground/40 group-hover:w-16 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GATEWAYS */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">06 — Global</div>
              <h2 className="font-display text-3xl md:text-5xl">{t("section.gateways")}</h2>
              <p className="mt-6 text-muted-foreground max-w-md">
                Primary flow directed toward major international processing and distribution hubs.
              </p>
            </div>
            <div className="divide-y divide-border/60">
              {GATEWAYS.map((g) => (
                <div key={g.region} className="py-6 flex items-baseline justify-between">
                  <div className="font-display text-2xl">{g.region}</div>
                  <div className="font-mono text-xs text-muted-foreground">{g.hubs}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REGULATORY */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-24">
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8 text-center">Regulatory Mastery</div>
          <div className="flex flex-wrap justify-center gap-3">
            {REG.map((r) => (
              <div key={r} className="border border-border/60 px-5 py-3 text-xs tracking-wide font-mono text-muted-foreground">
                {r}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 text-center">
          <h2 className="font-display text-4xl md:text-6xl max-w-3xl mx-auto">
            Ready to initiate a sourcing inquiry?
          </h2>
          <Link to="/contact" className="mt-12 inline-flex items-center gap-3 border border-foreground/60 hover:bg-foreground hover:text-primary-foreground px-10 py-5 text-sm tracking-wide transition-colors">
            Initiate Inquiry <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

