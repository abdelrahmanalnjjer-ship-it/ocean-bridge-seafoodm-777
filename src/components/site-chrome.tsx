import { Link } from "@tanstack/react-router";
import { useI18n, type Locale } from "@/i18n/i18n";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoHorizontal from "@/assets/logo-horizontal.png.asset.json";
import logoVertical from "@/assets/logo-vertical.png.asset.json";
import logoSubmark from "@/assets/logo-submark.png.asset.json";

/* Brand marks — secondary horizontal in the nav, primary vertical in the
 * footer, submark for the favicon and the compact mobile menu. */
const LOGO_HORIZONTAL = logoHorizontal.url;
const LOGO_VERTICAL = logoVertical.url;
const LOGO_SUBMARK = logoSubmark.url;

function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();
  const items: { id: Locale; label: string }[] = [
    { id: "en", label: "EN" },
    { id: "ar", label: "AR" },
    { id: "zh", label: "中文" },
  ];
  return (
    <div className="flex items-center gap-1 text-[11px] tracking-widest font-mono">
      {items.map((i, idx) => (
        <span key={i.id} className="flex items-center gap-1">
          <button
            onClick={() => setLocale(i.id)}
            className={`transition-colors ${locale === i.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {i.label}
          </button>
          {idx < items.length - 1 && <span className="text-muted-foreground/40">/</span>}
        </span>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;
  return (
    <header
      className={`section-navy-deep fixed top-0 inset-x-0 z-50 text-foreground transition-all duration-500 ${
        scrolled || open
          ? "border-b border-foreground/10 bg-[#0a1229]/92 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={LOGO_HORIZONTAL}
            alt="Ocean Bridge Trade"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-9" : "h-11"}`}
            style={{ filter: "brightness(1.9) saturate(1.1)" }}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-[13px] tracking-wide">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "nav-link text-foreground", "data-active": "true" } as any}
              inactiveProps={{ className: "nav-link text-foreground/70 hover:text-foreground transition-colors" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block"><LocaleSwitcher /></div>
        <button
          className="md:hidden transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--brand-ocean)]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden border-t border-foreground/10 bg-[#0a1229] px-6 py-6 space-y-4"
          >
            <img src={LOGO_SUBMARK} alt="" aria-hidden className="h-10 w-auto mb-2" />
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.04 * i }}
              >
                <Link to={l.to} onClick={() => setOpen(false)} className="block text-sm text-foreground/80 hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <div className="pt-4 border-t border-foreground/10"><LocaleSwitcher /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  const legal = [
    "Privacy and Cookies",
    "Cookie Preferences",
    "Terms & Conditions",
    "Security & Fraud Awareness",
    "Regulatory Disclosures",
  ];
  return (
    <footer className="section-navy-deep mt-32 text-foreground border-t border-foreground/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src={LOGO_VERTICAL}
            alt="Ocean Bridge Trade"
            className="h-36 w-auto mb-4"
            style={{ filter: "brightness(1.9) saturate(1.1)" }}
          />
          <p className="mt-3 text-sm text-foreground/70 max-w-sm leading-[1.8]">
            {t("brand.tagline")} Verified Oman-origin seafood, engineered for international processors and importers.
          </p>
        </div>
        <div>
          <div className="eyebrow-muted mb-4">Navigate</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-foreground text-foreground/70 transition-colors">{t("nav.home")}</Link></li>
            <li><Link to="/products" className="hover:text-foreground text-foreground/70 transition-colors">{t("nav.products")}</Link></li>
            <li><Link to="/about" className="hover:text-foreground text-foreground/70 transition-colors">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground text-foreground/70 transition-colors">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow-muted mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>Muscat, Sultanate of Oman</li>
            <li>info@oceanbridge-trade.com</li>
            <li className="font-mono text-xs">+968 77 62 1857</li>
          </ul>
        </div>
      </div>
      {/* Legal / regulatory sub-menu */}
      <div className="border-t border-foreground/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-5 flex flex-wrap gap-x-6 gap-y-2 text-[11px] tracking-wide text-foreground/60">
          {legal.map((label) => (
            <a key={label} href="#" className="hover:text-foreground transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-foreground/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-5 flex justify-between items-center text-[11px] tracking-widest uppercase text-foreground/50">
          <span>© {new Date().getFullYear()} Ocean Bridge Trade</span>
          <span>Bridging Origin. Verifying Supply.</span>
        </div>
      </div>
    </footer>
  );
}

export function MediaSlot({ label, className, aspect = "aspect-video" }: { label: string; className?: string; aspect?: string }) {
  return (
    <div className={`relative ${aspect} w-full overflow-hidden bg-card border border-border/60 flex items-center justify-center ${className ?? ""}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,111,160,0.25),transparent_60%)]" />
      <div className="relative text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Media Slot</div>
        <div className="mt-1 font-mono text-xs text-foreground/70">{label}</div>
      </div>
    </div>
  );
}
