import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, LayoutGrid, Table2 } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import { SPECIES, CATEGORIES, type Category, type Species } from "@/data/species";
import catPelagic from "@/assets/cat-pelagic.png.asset.json";
import catDemersal from "@/assets/cat-demersal.png.asset.json";
import catCephalopods from "@/assets/cat-cephalopods.png.asset.json";
import catCrustaceans from "@/assets/cat-crustaceans.png.asset.json";

const CATEGORY_IMAGES: Record<Category, string> = {
  pelagic: catPelagic.url,
  demersal: catDemersal.url,
  cephalopod: catCephalopods.url,
  crustacean: catCrustaceans.url,
};

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "The Institutional Trade Matrix — Ocean Bridge Trade" },
      { name: "description", content: "35 species across Pelagic, Demersal & Reef, Cephalopods & Crustaceans and Tuna. Season-aware, transaction-specific supply." },
      { property: "og:title", content: "The Institutional Trade Matrix" },
      { property: "og:description", content: "Structured seafood supply from Oman: 35 species, four categories, full compliance." },
    ],
  }),
  component: ProductsPage,
});

type View = "grid" | "terminal";

function ProductsPage() {
  const { t, locale } = useI18n();
  const [category, setCategory] = useState<Category>("pelagic");
  const [view, setView] = useState<View>("grid");

  const filtered = useMemo(() => SPECIES.filter((s) => s.category === category), [category]);

  const nameFor = (s: Species) =>
    locale === "ar" ? s.name_ar : locale === "zh" ? s.name_zh : s.name_en;

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 pt-24 pb-16">
          <div className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground mb-6">Catalogue · 35 Species</div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl">
            {t("products.title")}
          </h1>
          <p className="mt-8 max-w-2xl text-muted-foreground">{t("products.sub")}</p>
        </div>
      </section>

      {/* Controls */}
      <section className="section-light sticky top-16 z-40 border-b border-border backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-4 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-1 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors border ${
                  category === c.id
                    ? "border-[#C73E1D] text-[#C73E1D] bg-[#C73E1D]/5"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {locale === "ar" ? c.label_ar : locale === "zh" ? c.label_zh : c.label_en}
              </button>
            ))}
          </div>
          <div className="flex items-center border border-border">
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-widest transition-colors ${
                view === "grid" ? "bg-[#C73E1D] text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="size-3.5" /> {t("products.view.grid")}
            </button>
            <button
              onClick={() => setView("terminal")}
              className={`flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-widest transition-colors ${
                view === "terminal" ? "bg-[#C73E1D] text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Table2 className="size-3.5" /> {t("products.view.terminal")}
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-light">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16">
          <AnimatePresence mode="wait">
            {view === "grid" ? (
              <motion.div
                key={"grid-" + category}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((s) => (
                  <SpeciesCard key={s.id} s={s} name={nameFor(s)} t={t} image={CATEGORY_IMAGES[s.category]} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={"term-" + category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TerminalTable rows={filtered} nameFor={nameFor} t={t} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function SpeciesCard({ s, name, t, image }: { s: Species; name: string; t: (k: string) => string; image: string }) {
  return (
    <div className="group relative border border-border/60 bg-card/40 overflow-hidden hover:border-foreground/40 transition-all">
      <div className="relative overflow-hidden">
        <div className="aspect-video overflow-hidden bg-[#06142e]">
          <img src={image} alt={name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="absolute top-3 right-3 font-mono text-[10px] px-2 py-1 bg-background/70 backdrop-blur-md border border-border/60">
          {s.status === "Available" ? "● AVAILABLE" : "○ SEASONAL"}
        </div>
      </div>
      <div className="p-6">
        <div className="font-display text-2xl leading-tight">{name}</div>
        <div className="font-mono text-[11px] italic text-muted-foreground mt-1">{s.scientific}</div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <Tag label={t("products.season")} value={`${s.season_start}–${s.season_end}`} />
          <Tag label={t("products.size")} value={s.sizes[0]} />
          <Tag label={t("products.hs")} value={s.hs_code} />
        </div>

        <div className="mt-6 h-px w-full bg-border/60" />
        <button className="mt-4 w-full text-left text-xs uppercase tracking-[0.25em] text-muted-foreground group-hover:text-foreground flex items-center justify-between transition-colors">
          <span>{t("products.request")}</span>
          <ArrowUpRight className="size-3.5 group-hover:rotate-45 transition-transform" />
        </button>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_0%,rgba(59,111,160,0.18),transparent_70%)]" />
    </div>
  );
}

function Tag({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border/60 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-mono text-[11px] mt-0.5 truncate">{value}</div>
    </div>
  );
}

function TerminalTable({ rows, nameFor, t }: { rows: Species[]; nameFor: (s: Species) => string; t: (k: string) => string }) {
  return (
    <div className="border border-border/60 overflow-x-auto font-mono text-[12px]">
      <table className="w-full min-w-[900px]">
        <thead className="bg-card/60 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-3 font-normal">Species</th>
            <th className="text-left px-4 py-3 font-normal">Scientific</th>
            <th className="text-left px-4 py-3 font-normal">Size / Grades</th>
            <th className="text-left px-4 py-3 font-normal">HS</th>
            <th className="text-left px-4 py-3 font-normal">Season</th>
            <th className="text-left px-4 py-3 font-normal">Status</th>
            <th className="text-right px-4 py-3 font-normal">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => (
            <tr key={s.id} className={`border-t border-border/60 ${i % 2 === 0 ? "bg-background" : "bg-card/20"} hover:bg-accent/10 transition-colors`}>
              <td className="px-4 py-3 text-foreground">{nameFor(s)}</td>
              <td className="px-4 py-3 italic text-muted-foreground">{s.scientific}</td>
              <td className="px-4 py-3 text-muted-foreground">{s.sizes.join(" · ")}</td>
              <td className="px-4 py-3 text-muted-foreground">{s.hs_code}</td>
              <td className="px-4 py-3 text-muted-foreground">{s.season_start}–{s.season_end}</td>
              <td className="px-4 py-3">
                <span className={s.status === "Available" ? "text-foreground" : "text-accent-foreground/70"}>
                  {s.status === "Available" ? "● AVAILABLE" : "○ SEASONAL"}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="text-[10px] uppercase tracking-[0.2em] hover:text-foreground text-muted-foreground inline-flex items-center gap-1">
                  {t("products.initiate")} <ArrowUpRight className="size-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}