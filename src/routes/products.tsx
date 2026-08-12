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

  const counts = useMemo(
    () =>
      SPECIES.reduce<Record<string, number>>((acc, s) => {
        acc[s.category] = (acc[s.category] ?? 0) + 1;
        return acc;
      }, {}),
    [],
  );

  const nameFor = (s: Species) =>
    locale === "ar" ? s.name_ar : locale === "zh" ? s.name_zh : s.name_en;

  return (
    <div>
      <section className="section-navy-deep relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B1A21,#10222B_52%,#1A2E35)]" />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_10%,rgba(59,111,160,0.30),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(59,111,160,0.16),transparent_26%)]" />
        <div className="relative mx-auto max-w-[1240px] px-6 lg:px-12 pt-28 pb-18 lg:pb-24">
          <div className="inline-flex items-center gap-3 border border-foreground/10 bg-foreground/5 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-md">
            Catalogue · 35 SKU
          </div>
          <h1 className="mt-8 h-display h-display-xl max-w-4xl">
            {t("products.title")}
          </h1>
          <p className="mt-7 max-w-2xl text-base md:text-lg leading-[1.65] text-muted-foreground">
            {t("products.sub")}
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3 max-w-3xl">
            {[
              { k: "Origin-verified", v: "Oman supply chain" },
              { k: "Premium format", v: "Local product imagery" },
              { k: "Direct action", v: "B2B inquiry button" },
            ].map((item) => (
              <div key={item.k} className="border border-foreground/10 bg-foreground/5 px-4 py-4 backdrop-blur-md">
                <div className="label-caps">{item.k}</div>
                <div className="mt-2 text-[15px] text-foreground">{item.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-navy sticky top-16 z-40 border-b border-border/60 bg-[#10222B]/88 backdrop-blur-xl">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 py-4 flex items-center justify-between gap-4 md:gap-6 flex-wrap">
          <div className="-mx-1 flex items-center gap-1 overflow-x-auto md:flex-wrap md:overflow-visible px-1">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`shrink-0 whitespace-nowrap min-h-[40px] px-3 md:px-4 py-2 text-[12px] uppercase tracking-[0.1em] md:tracking-[0.12em] transition-all border ${
                  category === c.id
                    ? "border-[color:var(--brand-accent)] text-foreground bg-[color:var(--brand-accent)]/12"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                style={category === c.id ? { borderColor: "var(--brand-accent)" } : undefined}
              >
                {locale === "ar" ? c.label_ar : locale === "zh" ? c.label_zh : c.label_en}{" "}
                <span className="text-subtle">({counts[c.id] ?? 0})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-4 rounded-[1px]" style={{ backgroundColor: "var(--brand-accent)" }} />
              In season
              <span className="ml-2 h-2.5 w-4 rounded-[1px] bg-track" />
              Out of season
            </span>
            <span className="tracking-[0.12em]">
              {filtered.length} of {SPECIES.length} shown
            </span>
          </div>
        </div>
      </section>

      <section className="section-ice">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 py-16 lg:py-20">
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
    <div
      className="flex flex-col gap-2"
      role="img"
      aria-label={`Available ${start}–${end}${isYearRound ? " (year-round)" : ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="label-caps">
          {isYearRound ? "Year-round" : `Season ${start}–${end}`}
        </span>
        <span className="label-caps">
          {isYearRound ? "12 months" : `${active.size} months`}
        </span>
      </div>
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-[1px] transition-colors ${
              active.has(i) ? "bg-[color:var(--brand-accent)]" : "bg-track"
            }`}
          />
        ))}
      </div>
      {/* Quarter anchors, not twelve labels. The previous version set every
        * month name at 7px, which is below any usable reading size — this
        * gives the same orientation at 11px. */}
      <div className="flex text-[11px] leading-none text-subtle">
        {["Jan", "Apr", "Jul", "Oct"].map((m) => (
          <span key={m} className="flex-1">{m}</span>
        ))}
      </div>
    </div>
  );
}

function SpeciesCard({ s, name, categoryLabel, image, t }: { s: Species; name: string; categoryLabel: string; image: string; t: (k: string) => string }) {
  return (
    <div className="card-lift group relative flex h-full flex-col overflow-hidden border border-border bg-card">
      <div className="relative shrink-0 overflow-hidden border-b border-border">
        <div className="h-48 flex items-center justify-center overflow-hidden bg-brand-black p-3">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="shrink-0 border-t border-border px-6 lg:px-7 py-3">
        {renderMonthIndicator(s.season_start, s.season_end)}
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7 pt-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <div className="label-caps">{categoryLabel}</div>
            <div className="mt-2 font-display text-xl md:text-2xl text-foreground leading-tight break-words hyphens-auto">{name}</div>
            <div className="mt-1 text-[13px] italic text-subtle break-words">{s.scientific}</div>
          </div>
          <div className="shrink-0 text-right label-caps">
            #{String(s.id).padStart(2, "0")}
          </div>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <SpecTag label={t("products.origin")} value={s.origin} />
          <SpecTag label={t("products.grade")} value={s.grade} />
        </div>

        {/* Every size, not just the first. `sizes.split(",")[0]` silently hid
          * most of the range a buyer can actually order. */}
        <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          {s.sizes.split(",").map((size) => (
            <span key={size} className="border border-border bg-foreground/5 px-2.5 py-1">
              {size.trim()}
            </span>
          ))}
        </div>

        {/* Named group: the card wrapper also uses `group`, and a nested plain
          * `group` makes group-hover resolve against the wrong ancestor. */}
        <Link
          to="/contact"
          aria-label={`Inquire about ${name}`}
          className="group/cta mt-auto pt-6 inline-flex w-full items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground"
        >
          <span className="inline-flex w-full items-center justify-center gap-2 border border-[color:var(--brand-accent)]/55 bg-[color:var(--brand-accent)]/12 px-4 py-3 transition-colors group-hover/cta:bg-[color:var(--brand-accent)]/20">
            {t("products.initiate")} <ArrowUpRight className="size-4 transition-transform group-hover/cta:rotate-45" />
          </span>
        </Link>
      </div>

    </div>
  );
}

function SpecTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-foreground/[0.04] px-3 py-2">
      <div className="label-caps">{label}</div>
      <div className="mt-1 text-[13px] text-foreground truncate">{value}</div>
    </div>
  );
}
