import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import { SPECIES, CATEGORIES, type Species } from "@/data/species";
import { Reveal } from "@/components/motion";

type CategoryId = (typeof CATEGORIES)[number]["id"];
type Filter = CategoryId | "all";

type ProductSearch = {
  category?: Filter;
  q?: string;
};

export const Route = createFileRoute("/products")({
  /* Filter state lives in the URL. Previously it was component state, so a
   * buyer could not send a colleague a link to "cephalopods" — which is most
   * of how a B2B catalogue actually gets shared. */
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    const raw = typeof search.category === "string" ? search.category : "all";
    const valid = raw === "all" || CATEGORIES.some((c) => c.id === raw);
    return {
      category: (valid ? raw : "all") as Filter,
      q: typeof search.q === "string" && search.q.trim() ? search.q : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Catalogue — Ocean Bridge Trade" },
      {
        name: "description",
        content:
          "Thirty-five Oman-origin species with seasons, size ranges, grades and HS codes. Filter by category, search by name, inquire on any line.",
      },
      { property: "og:title", content: "Oman-origin seafood catalogue" },
      {
        property: "og:description",
        content: "Seasons, size ranges, grades and HS codes for 35 species.",
      },
    ],
  }),
  component: ProductsPage,
});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function activeMonths(start: string, end: string): Set<number> {
  const si = MONTHS.indexOf(start);
  const ei = MONTHS.indexOf(end);
  const set = new Set<number>();
  if (si === -1 || ei === -1) return set;
  if (si === ei) {
    for (let i = 0; i < 12; i++) set.add(i);
  } else if (ei > si) {
    for (let i = si; i <= ei; i++) set.add(i);
  } else {
    for (let i = si; i < 12; i++) set.add(i);
    for (let i = 0; i <= ei; i++) set.add(i);
  }
  return set;
}

function ProductsPage() {
  const { t, locale } = useI18n();
  const navigate = useNavigate({ from: "/products" });
  const { category = "all", q } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");

  /* `prev` needs an explicit type: the router cannot infer the shape of a
   * search updater back from validateSearch, so it lands as implicit any. */
  const setCategory = (next: Filter) =>
    navigate({
      search: (prev: ProductSearch) => ({ ...prev, category: next }),
      replace: true,
    });

  const commitQuery = (next: string) =>
    navigate({
      search: (prev: ProductSearch) => ({
        ...prev,
        q: next.trim() ? next.trim() : undefined,
      }),
      replace: true,
    });

  const counts = useMemo(
    () =>
      SPECIES.reduce<Record<string, number>>((acc, s) => {
        acc[s.category] = (acc[s.category] ?? 0) + 1;
        return acc;
      }, {}),
    [],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return SPECIES.filter((s) => {
      if (category !== "all" && s.category !== category) return false;
      if (!needle) return true;
      return (
        s.name_en.toLowerCase().includes(needle) ||
        s.scientific.toLowerCase().includes(needle) ||
        s.name_ar.includes(needle) ||
        s.hs_code.includes(needle)
      );
    });
  }, [category, query]);

  const nameFor = (s: Species) =>
    locale === "ar" ? s.name_ar : locale === "zh" ? s.name_zh : s.name_en;

  const labelFor = (c: (typeof CATEGORIES)[number]) =>
    locale === "ar" ? c.label_ar : locale === "zh" ? c.label_zh : c.label_en;

  return (
    <div>
      {/* ---- Masthead ---- */}
      <section className="band-deep relative -mt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/website-images/harbor-boats.webp"
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-[50%_45%]"
          />
        </div>
        <div className="scrim-masthead absolute inset-0" />

        <div className="shell relative pb-20 pt-36">
          <Reveal>
            <div className="eyebrow mb-7">Catalogue</div>
            <h1 className="h-display h-display-xl max-w-[15ch]">
              Thirty-five species, fully specified.
            </h1>
            <p className="lede lede-lg mt-8 max-w-2xl">
              Season windows, size ranges, grade, freezing method and HS code for every line.
              Nothing here is speculative inventory — supply is confirmed per transaction against
              live availability.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Filter bar ---- */}
      <section className="band-paper bar-ground sticky top-16 z-40 border-b border-border backdrop-blur-xl">
        <div className="shell flex flex-wrap items-center gap-x-6 gap-y-4 py-4">
          <div className="-mx-1 flex items-center gap-1 overflow-x-auto px-1 md:flex-wrap md:overflow-visible">
            <FilterChip
              active={category === "all"}
              count={SPECIES.length}
              onClick={() => setCategory("all")}
            >
              All
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c.id}
                active={category === c.id}
                count={counts[c.id] ?? 0}
                onClick={() => setCategory(c.id)}
              >
                {labelFor(c)}
              </FilterChip>
            ))}
          </div>

          <div className="relative ms-auto min-w-[220px] flex-1 md:max-w-xs">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                commitQuery(e.target.value);
              }}
              placeholder="Search species, latin name, HS code"
              aria-label="Search the catalogue"
              className="w-full border border-border bg-transparent py-2.5 pe-9 ps-9 text-[15px] text-foreground placeholder:text-fg-subtle focus:border-[color:var(--accent)] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  commitQuery("");
                }}
                aria-label="Clear search"
                className="absolute end-1 top-1/2 grid size-8 -translate-y-1/2 place-items-center text-fg-subtle hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="label-caps shrink-0" aria-live="polite">
            {filtered.length} of {SPECIES.length}
          </div>
        </div>
      </section>

      {/* ---- Grid ---- */}
      <section className="band-wash">
        <div className="shell section">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="h-display h-display-md">Nothing matches “{query}”.</p>
              <p className="lede mx-auto mt-4">
                Try a latin name, or clear the filters to see all {SPECIES.length} species.
              </p>
              <button
                type="button"
                className="btn btn-outline mt-8"
                onClick={() => {
                  setQuery("");
                  commitQuery("");
                  setCategory("all");
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((s, i) => (
                  <motion.article
                    key={s.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i * 0.02, 0.3),
                      ease: [0.19, 1, 0.22, 1],
                    }}
                  >
                    <SpeciesCard s={s} name={nameFor(s)} t={t} />
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ---- Closing ---- */}
      <section className="band-paper border-t border-border">
        <div className="shell section text-center">
          <Reveal>
            <h2 className="h-display h-display-md mx-auto max-w-[22ch]">
              Need a species that isn't listed?
            </h2>
            <p className="lede mx-auto mt-5">
              The catalogue covers what we source regularly. If your specification sits outside it,
              tell us — our partner network is wider than this page.
            </p>
            <Link to="/contact" className="btn-pill mt-10">
              Talk to the trade desk
              <span className="pill-badge">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function FilterChip({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-[13px] font-medium transition-colors ${
        active
          ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--accent-foreground)]"
          : "border-border text-muted-foreground hover:border-[color:var(--accent)] hover:text-foreground"
      }`}
    >
      {children}{" "}
      {/* The count used to be a .text-subtle span passed in as a child, which
       * meant clay (#948A79) sat on the saffron fill of the ACTIVE chip at
       * 1.48:1 — the one thing on the site still under AA after this pass.
       * The chip owns the count now, so it can pick a colour that works
       * against whichever fill it is currently wearing. */}
      <span className={active ? "text-[color:var(--accent-foreground)]" : "text-subtle"}>
        ({count})
      </span>
    </button>
  );
}

function SeasonBar({ start, end }: { start: string; end: string }) {
  const active = activeMonths(start, end);
  const yearRound = active.size === 12;

  return (
    <div
      role="img"
      aria-label={yearRound ? "Available year-round" : `In season ${start} to ${end}`}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="label-caps">{yearRound ? "Year-round" : `${start} – ${end}`}</span>
        <span className="label-caps">{active.size} months</span>
      </div>
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-[1px] ${
              active.has(i) ? "bg-[color:var(--accent)]" : "bg-track"
            }`}
          />
        ))}
      </div>
      {/* Quarter anchors, not twelve labels — the old version set every month
       * name at 7px, which is below any usable reading size. */}
      <div className="flex text-[12px] leading-none text-fg-subtle">
        {["Jan", "Apr", "Jul", "Oct"].map((m) => (
          <span key={m} className="flex-1">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function SpeciesCard({ s, name, t }: { s: Species; name: string; t: (k: string) => string }) {
  return (
    <div className="card-lift group flex h-full flex-col border border-border bg-card">
      <div className="plate h-56 overflow-hidden">
        <img
          src={s.image}
          alt={s.alt || name}
          loading="lazy"
          decoding="async"
          className="transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-2xl leading-tight text-foreground">{name}</h3>
            <p className="mt-1 text-[13px] italic text-fg-subtle">{s.scientific}</p>
          </div>
          <span className="num label-caps shrink-0">#{String(s.id).padStart(2, "0")}</span>
        </div>

        <div className="mt-6">
          <SeasonBar start={s.season_start} end={s.season_end} />
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border pt-5">
          <Spec label={t("products.origin")} value={s.origin} />
          <Spec label={t("products.grade")} value={s.grade} />
          <Spec label={t("products.hs")} value={s.hs_code} mono />
          <Spec label={t("products.status")} value={s.status} />
        </dl>

        {/* The full range, not sizes[0]. The old card silently hid every size
         * after the first, which is a commercial problem, not a visual one. */}
        <div className="mt-5">
          <div className="label-caps mb-2">Sizes</div>
          <div className="flex flex-wrap gap-2">
            {s.sizes.split(",").map((size) => (
              <span
                key={size}
                className="border border-border px-2.5 py-1 text-[12px] text-muted-foreground"
              >
                {size.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-7">
          {/* The CTA carries the species with it.
           *
           * This used to be a bare <Link to="/contact"> labelled "Inquire
           * about this species" — the same words on all thirty-five cards,
           * every one of them landing on an empty form that had no idea
           * which fish had been clicked. The buyer's first task on arrival
           * was to retype what they had just told us. */}
          <Link
            to="/contact"
            search={{ species: name, hs: s.hs_code }}
            aria-label={`Inquire about ${name}`}
            className="btn btn-outline group/cta w-full justify-between"
          >
            <span className="truncate">{t("products.initiateNamed").replace("{name}", name)}</span>
            <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover/cta:rotate-45" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <dt className="label-caps">{label}</dt>
      <dd
        className={`mt-1 truncate text-[14px] text-foreground ${mono ? "num" : ""}`}
        title={value}
      >
        {value}
      </dd>
    </div>
  );
}
