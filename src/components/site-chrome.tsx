import { Link } from "@tanstack/react-router";
import { useI18n, type Locale } from "@/i18n/i18n";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
/* Local files, not the Lovable-hosted /__l5e/ asset URLs the project shipped
 * with. Those break the moment the project leaves Lovable. */
/* Exact filenames as they sit in public/logos. The stacked one contains
 * spaces, hence the %20 — an unencoded space in a src silently 404s. */
const LOGO_HORIZONTAL = "/logos/Ocean_Bridge_Trade_Secondary_Horizontal_Logo.png";
const LOGO_STACKED = "/logos/Ocean%20bridge%20logo.png";

/* Plate removed at the client's request — the mark now sits directly on the
 * dark ground.
 *
 * THIS ONLY LOOKS RIGHT IF THE PNG HAS A TRANSPARENT BACKGROUND. If the file
 * carries a white background baked in, you will see a white rectangle behind
 * the logo, and no CSS can remove it: `multiply` only drops white on light
 * grounds, `screen` keeps white white, and a knockout filter turns the whole
 * rectangle solid. Transparency has to come from the export.
 *
 * If a white box appears after this build, re-export the three logos as PNGs
 * with a transparent background and drop them in over the top. */

const NAV = [
  { to: "/", key: "nav.home" },
  { to: "/products", key: "nav.products" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
] as const;

/* ---------------------------------------------------------------------------
 * Keeps <html lang> and <html dir> in step with the active locale.
 * Without this, switching to Arabic swapped the strings but left the document
 * in LTR — punctuation, alignment and scroll direction all stayed wrong.
 * Mount inside I18nProvider.
 * ------------------------------------------------------------------------ */
export function HtmlLangSync() {
  const { locale } = useI18n();
  useEffect(() => {
    const el = document.documentElement;
    el.lang = locale;
    el.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);
  return null;
}

function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();
  /* zh stays out until the Chinese content pass ships. A permanently disabled
   * control just advertises a dead end. */
  const items: { id: Locale; label: string }[] = [
    { id: "en", label: "EN" },
    { id: "ar", label: "العربية" },
  ];

  return (
    <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
      {items.map((i, idx) => (
        <span key={i.id} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocale(i.id)}
            aria-current={locale === i.id ? "true" : undefined}
            className={`px-1 py-2 transition-colors ${
              locale === i.id ? "text-foreground" : "hover:text-foreground"
            }`}
          >
            {i.label}
          </button>
          {idx < items.length - 1 && <span aria-hidden className="opacity-40">/</span>}
        </span>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape closes, and the page behind stops scrolling while the panel is up. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Two tones: floating over the dark hero, or a solid paper bar once the
   * page has moved. */
  const solid = scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid
          ? "border-b border-border bg-[#0E1315]/92 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* The bar is tall and transparent over the hero so the wordmark can run
        * large, then collapses to a conventional 64px bar once the page moves.
        * The hero is full-bleed underneath either way, so changing this height
        * does not shift any layout. */}
      <div
        className={`shell flex items-center justify-between transition-[height] duration-500 ${
          solid ? "h-16" : "h-28"
        }`}
      >
        {/* Over the hero this is SET TYPE, not the logo image.
          *
          * The old approach put the PNG here and pushed it through
          * filter: brightness(1.9), because the artwork is dark and the hero
          * is dark. That filter is what was wrong with the logo colour — you
          * cannot brighten a dark mark into a white one, you can only wash it
          * out. It desaturated the blue and left a muddy grey-blue.
          *
          * A drawn wordmark has no such problem, matches the reference layout,
          * and scales to any size. The real logo returns, unfiltered, on the
          * white scrolled bar where it was always legible. */}
        {/* Scaled ~150% from the plated version. */}
        <Link to="/" aria-label="Ocean Bridge Trade — home" className="flex items-center">
          <img
            src={LOGO_HORIZONTAL}
            alt="Ocean Bridge Trade"
            className={`w-auto transition-all duration-500 ${solid ? "h-11" : "h-14 md:h-[4.5rem]"}`}
          />
        </Link>

        <nav className="hidden items-center gap-9 text-[14px] md:flex">
          {NAV.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{
                className: "nav-link text-foreground",
                "data-active": "true",
              } as never}
              inactiveProps={{
                className: "nav-link text-muted-foreground transition-colors hover:text-foreground",
              }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LocaleSwitcher />
          {/* No `!` prefixes: .btn lives in @layer components, so plain
            * utilities already win. (v4 also moved important to a suffix.) */}
          <Link
            to="/contact"
            className={`btn min-h-[40px] px-5 text-[13px] ${solid ? "btn-solid" : "btn-outline"}`}
          >
            Buyer inquiry
          </Link>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="band-deep h-[calc(100dvh-4rem)] overflow-y-auto md:hidden"
          >
            <div className="shell flex h-full flex-col py-10">
              <nav className="flex flex-col">
                {NAV.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="h-display h-display-md block border-b border-border py-5"
                    >
                      {t(l.key)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-10">
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-pill w-full justify-between">
                  Start a buyer inquiry
                  <span className="pill-badge">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
                <div className="mt-8 border-t border-border pt-6">
                  <LocaleSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();

  const legal = [
    "Privacy and cookies",
    "Terms and conditions",
    "Security and fraud awareness",
    "Regulatory disclosures",
  ];

  return (
    <footer className="band-deep border-t border-border">
      <div className="shell section">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={LOGO_STACKED} alt="Ocean Bridge Trade" className="mb-7 h-40 w-auto" />
            <p className="lede max-w-sm">
              {t("brand.tagline")} Oman-origin seafood, verified at source and cleared
              for arrival.
            </p>
            <Link to="/contact" className="link-underline mt-8">
              Start a buyer inquiry <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow-muted mb-5">Navigate</div>
            <ul className="space-y-3 text-[15px]">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow-muted mb-5">Trade desk</div>
            <ul className="space-y-3 text-[15px] text-muted-foreground">
              <li>Muscat, Sultanate of Oman</li>
              <li>
                <a href="mailto:info@oceanbridge-trade.com" className="transition-colors hover:text-foreground">
                  info@oceanbridge-trade.com
                </a>
              </li>
              <li className="num">+968 77 62 1857</li>
              <li>
                <a
                  href="https://www.linkedin.com/company/oceanbridge-trade"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 text-[13px] text-fg-subtle">
          <span>© {new Date().getFullYear()} Ocean Bridge Trade</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((label) => (
              <li key={label}>
                {/* Deliberately not links yet — five href="#" placeholders read
                  * worse than plain text on a compliance-led brand. Swap to
                  * <Link> as each page is written. */}
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
