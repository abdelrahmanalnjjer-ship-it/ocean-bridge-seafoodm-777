import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import { SPECIES, CATEGORIES, type Species } from "@/data/species";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Institutional Seafood Portfolio — Ocean Bridge Trade" },
      { name: "description", content: "A premium B2B seafood portfolio with local product imagery, origin-verified specifications, and direct inquiry access for processors and importers." },
      { property: "og:title", content: "Institutional Seafood Portfolio" },
      { property: "og:description", content: "Premium B2B seafood grid with local product photography and direct inquiry actions." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { t, locale } = useI18n();
  const [category, setCategory] = useState<"pelagic" | "tuna" | "demersal" | "cephalopod">("pelagic");

  const filtered = useMemo(() => SPECIES.filter((s) => s.category === category), [category]);

  const nameFor = (s: Species) =>
    locale === "ar" ? s.name_ar : locale === "zh" ? s.name_zh : s.name_en;

  return (
    <div>
      <section className="section-navy-deep relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0a1229,#0f1b3d_52%,#16264d)]" />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_10%,rgba(59,111,160,0.30),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(59,111,160,0.16),transparent_26%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 pt-28 pb-18 lg:pb-24">
          <div className="inline-flex items-center gap-3 border border-foreground/10 bg-foreground/5 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-foreground/70 backdrop-blur-md">
            Catalogue · 35 SKU
          </div>
          <h1 className="mt-8 h-display h-display-xl max-w-4xl">
            {t("products.title")}
          </h1>
          <p className="mt-7 max-w-2xl text-sm md:text-base text-foreground/70">
            {t("products.sub")}
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3 max-w-3xl">
            {[
              { k: "Origin-verified", v: "Oman supply chain" },
              { k: "Premium format", v: "Local product imagery" },
              { k: "Direct action", v: "B2B inquiry button" },
            ].map((item) => (
              <div key={item.k} className="border border-foreground/10 bg-foreground/5 px-4 py-4 backdrop-blur-md">
                <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">{item.k}</div>
                <div className="mt-2 text-sm text-foreground">{item.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-navy sticky top-16 z-40 border-b border-border/60 bg-[#0f1b3d]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-4 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-1 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.22em] transition-all border ${
                  category === c.id
                    ? "border-[color:var(--brand-accent)] text-foreground bg-[color:var(--brand-accent)]/12"
                    : "border-transparent text-foreground/50 hover:text-foreground"
                }`}
                style={category === c.id ? { borderColor: "var(--brand-accent)" } : undefined}
              >
                {locale === "ar" ? c.label_ar : locale === "zh" ? c.label_zh : c.label_en}
              </button>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            {filtered.length} items shown
          </div>
        </div>
      </section>

      <section className="section-ice">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-20">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((s, index) => (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
              >
                <SpeciesCard
                  s={s}
                  name={nameFor(s)}
                  categoryLabel={locale === "ar" ? CATEGORIES.find((c) => c.id === s.category)?.label_ar ?? s.category : locale === "zh" ? CATEGORIES.find((c) => c.id === s.category)?.label_zh ?? s.category : CATEGORIES.find((c) => c.id === s.category)?.label_en ?? s.category}
                  image={s.image}
                  t={t}
                />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function renderMonthIndicator(start: string, end: string) {
  const monthIndex = (m: string) => MONTHS_SHORT.findIndex((x) => x === m);
  const si = monthIndex(start);
  const ei = monthIndex(end);
  if (si === -1 || ei === -1) return null;

  const isYearRound = si === ei;
  const active = new Set<number>();

  if (isYearRound) {
    for (let i = 0; i < 12; i++) active.add(i);
  } else if (ei > si) {
    for (let i = si; i <= ei; i++) active.add(i);
  } else {
    for (let i = si; i < 12; i++) active.add(i);
    for (let i = 0; i <= ei; i++) active.add(i);
  }

  return (
    <div className="flex flex-col gap-1.5" role="img" aria-label={`Available ${start}–${end}${isYearRound ? " (Year-Round)" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-[0.22em] text-foreground/50">
          {isYearRound ? "Year-Round" : `Season: ${start} – ${end}`}
        </span>
        <span className="text-[9px] uppercase tracking-[0.22em] text-foreground/30">
          {isYearRound ? "All months" : `${active.size} months`}
        </span>
      </div>
      <div className="flex items-center gap-[2px] bg-foreground/5 rounded-sm px-2 py-1.5">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5 min-w-0">
            <span
              className={`block h-3 w-full rounded-[1px] transition-colors ${
                active.has(i) ? "bg-[color:var(--brand-accent)]" : "bg-foreground/8"
              }`}
            />
            <span className={`text-[7px] leading-tight font-medium ${
              active.has(i) ? "text-foreground/70" : "text-foreground/25"
            }`}>
              {MONTHS_SHORT[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeciesCard({ s, name, categoryLabel, image, t }: { s: Species; name: string; categoryLabel: string; image: string; t: (k: string) => string }) {
  return (
    <div className="card-lift group relative h-full overflow-hidden border border-border bg-card">
      <div className="relative overflow-hidden border-b border-border">
        <div className="aspect-[4/3] overflow-hidden bg-brand-black">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(10,18,41,0.55))]" />
      </div>

      <div className="border-t border-border px-6 lg:px-7 py-3">
        {renderMonthIndicator(s.season_start, s.season_end)}
      </div>

      <div className="p-6 lg:p-7 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">{categoryLabel}</div>
            <div className="mt-2 font-display text-2xl text-foreground leading-tight">{name}</div>
            <div className="mt-1 text-[11px] italic text-foreground/50">{s.scientific}</div>
          </div>
          <div className="text-right text-[10px] uppercase tracking-[0.22em] text-foreground/50">
            #{String(s.id).padStart(2, "0")}
          </div>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <SpecTag label={t("products.origin")} value={s.origin} />
          <SpecTag label={t("products.grade")} value={s.grade} />
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-foreground/50">
          <span className="border border-foreground/10 bg-foreground/5 px-2.5 py-1">{s.sizes.split(",")[0].trim()}</span>
        </div>

        <Link
          to="/contact"
          aria-label={`B2B inquiry for ${name}`}
          className="group mt-6 inline-flex w-full items-center justify-center gap-2 border border-[color:var(--brand-accent)]/55 bg-[color:var(--brand-accent)]/12 px-4 py-3 text-xs uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-[color:var(--brand-accent)]/20"
        >
          {t("products.initiate")} <ArrowUpRight className="size-3.5 transition-transform group-hover:rotate-45" />
        </Link>
      </div>

    </div>
  );
}

function SpecTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-foreground/[0.04] px-3 py-2">
      <div className="text-[9px] uppercase tracking-[0.26em] text-foreground/50">{label}</div>
      <div className="mt-1 text-[12px] text-foreground truncate">{value}</div>
    </div>
  );
}
