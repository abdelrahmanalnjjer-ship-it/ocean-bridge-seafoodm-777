import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import { CATEGORIES } from "@/data/species";
import heroImg from "@/assets/hero-dhow.jpg.asset.json";
import vlog1 from "@/assets/vlog-1.mp4.asset.json";
import vlog2 from "@/assets/vlog-2.mp4.asset.json";
import portImg from "@/assets/port-cranes.jpg.asset.json";
import fishermenImg from "@/assets/fishermen.jpg.asset.json";
import muscatImg from "@/assets/muscat-skyline.jpg.asset.json";
import harborImg from "@/assets/harbor-dusk.jpg.asset.json";
import omanCoastImg from "@/assets/oman-coast.jpg.asset.json";
import harborBoatsImg from "@/assets/harbor-boats.jpg.asset.json";
import dhowDetailImg from "@/assets/dhow-detail.jpg.asset.json";

const VLOG_IMAGES = [portImg, muscatImg, fishermenImg, harborImg, dhowDetailImg];
const VLOG_VIDEOS: (typeof vlog1 | null)[] = [vlog1, vlog2, null, null, null];
const CATEGORY_IMAGES = [omanCoastImg, harborBoatsImg, fishermenImg, harborImg];

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
  { title: "Origin Waters — Muscat Coastline", date: "Jul 2026" },
  { title: "Dhow Fleet — Traditional Landing", date: "Jun 2026" },
  { title: "Qingdao Buyer Delegation", date: "May 2026" },
  { title: "Salalah Kingfish Season", date: "Apr 2026" },
  { title: "GACC CIFER Facility Walkthrough", date: "Mar 2026" },
];

function Index() {
  const { t } = useI18n();
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg.url} alt="Muscat harbor" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06142e]/70 via-[#06142e]/60 to-[#06142e]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 py-24 w-full">
          <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/70 mb-8">
            <span className="h-px w-8 bg-[#C73E1D]" />
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
            className="mt-8 max-w-xl text-base md:text-lg text-white/75"
          >
            {t("hero.sub")} A specialized commercial representation firm connecting fragmented origin markets with structured international buyers.
          </motion.p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/products" className="group inline-flex items-center gap-3 bg-[#C73E1D] hover:bg-[#a8321a] text-white px-8 py-4 text-sm tracking-wide transition-colors">
              {t("hero.cta.catalog")}
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-3 border border-white/40 hover:border-white px-8 py-4 text-sm tracking-wide text-white/80 hover:text-white transition-colors">
              {t("hero.cta.contact")}
            </Link>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="section-light">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 md:py-48">
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[3px] bg-[#C73E1D] mb-10"
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.15] max-w-5xl"
          >
            We engineer continuous, high-volume global supply lines.
            <span className="text-muted-foreground"> From rigorous origin-point due diligence to uncompromised cold-chain oversight, we control the complete commercial architecture for international processors.</span>
          </motion.p>
        </div>
      </section>

      {/* VLOG */}
      <section className="section-light border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#C73E1D] mb-4">03 — Field</div>
              <h2 className="font-display text-3xl md:text-5xl">{t("section.vlog")}</h2>
              <p className="mt-3 text-muted-foreground max-w-lg">{t("section.vlog.sub")}</p>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x">
            {VLOG.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="min-w-[320px] md:min-w-[420px] snap-start group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-video">
                  {VLOG_VIDEOS[i] ? (
                    <video
                      src={VLOG_VIDEOS[i]!.url}
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <>
                      <img src={VLOG_IMAGES[i % VLOG_IMAGES.length].url} alt={v.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <div className="size-14 rounded-full border border-white flex items-center justify-center text-white">
                          <Play className="size-5 ml-0.5" />
                        </div>
                      </div>
                    </>
                  )}
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
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#e07458] mb-4">04 — Competencies</div>
          <h2 className="font-display text-3xl md:text-5xl max-w-3xl mb-20">{t("section.capabilities")}</h2>
          <div className="grid md:grid-cols-3 gap-px bg-border/60">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-background p-10 border-t-2 border-transparent hover:border-[#C73E1D] transition-colors"
              >
                <div className="font-mono text-xs text-accent-foreground/60 mb-8">{c.n}</div>
                <div className="font-display text-2xl mb-6">{c.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIES TEASER */}
      <section className="section-light border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#C73E1D] mb-4">05 — Portfolio</div>
              <h2 className="font-display text-3xl md:text-5xl max-w-3xl">{t("section.species")}</h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm text-[#C73E1D] border-b border-[#C73E1D] pb-1 hover:opacity-70 transition-opacity">
              View full matrix <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border border-border bg-card overflow-hidden hover:border-[#C73E1D] transition-colors group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={CATEGORY_IMAGES[i % CATEGORY_IMAGES.length].url} alt={c.label_en} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="font-mono text-xs text-muted-foreground mb-3">0{i + 1}</div>
                  <div className="font-display text-xl mb-4">{c.label_en}</div>
                  <div className="h-px w-8 bg-[#C73E1D] group-hover:w-16 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GATEWAYS */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#e07458] mb-4">06 — Global</div>
              <h2 className="font-display text-3xl md:text-5xl">{t("section.gateways")}</h2>
              <p className="mt-6 text-muted-foreground max-w-md">
                Primary flow directed toward major international processing and distribution hubs.
              </p>
            </motion.div>
            <div className="divide-y divide-border/60">
              {GATEWAYS.map((g, i) => (
                <motion.div
                  key={g.region}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="py-6 flex items-baseline justify-between"
                >
                  <div className="font-display text-2xl">{g.region}</div>
                  <div className="font-mono text-xs text-muted-foreground">{g.hubs}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REGULATORY */}
      <section className="section-light border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-24">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#C73E1D] mb-8 text-center">Regulatory Mastery</div>
          <div className="flex flex-wrap justify-center gap-3">
            {REG.map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-border px-5 py-3 text-xs tracking-wide font-mono text-foreground/80 hover:border-[#C73E1D] hover:text-[#C73E1D] transition-colors"
              >
                {r}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-6xl max-w-3xl mx-auto"
          >
            Ready to initiate a sourcing inquiry?
          </motion.h2>
          <Link to="/contact" className="mt-12 inline-flex items-center gap-3 bg-[#C73E1D] hover:bg-[#a8321a] text-white px-10 py-5 text-sm tracking-wide transition-colors">
            Initiate Inquiry <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

