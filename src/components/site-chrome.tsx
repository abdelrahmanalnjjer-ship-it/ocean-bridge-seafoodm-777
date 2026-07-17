import { Link } from "@tanstack/react-router";
import { useI18n, type Locale } from "@/i18n/i18n";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-8 w-8 border border-foreground/40 flex items-center justify-center font-display text-sm">O</div>
          <div className="leading-tight">
            <div className="font-display text-sm tracking-wide">Ocean Bridge Trade</div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Muscat · Oman</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-[13px] tracking-wide">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground transition-colors" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block"><LocaleSwitcher /></div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background px-6 py-6 space-y-4">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-sm">
              {l.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-border/60"><LocaleSwitcher /></div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl">Ocean Bridge Trade</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            {t("brand.tagline")} Structured seafood sourcing between Oman and global processors.
          </p>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">Navigate</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-foreground text-muted-foreground">{t("nav.home")}</Link></li>
            <li><Link to="/products" className="hover:text-foreground text-muted-foreground">{t("nav.products")}</Link></li>
            <li><Link to="/about" className="hover:text-foreground text-muted-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground text-muted-foreground">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Muscat, Sultanate of Oman</li>
            <li>info@oceanbridge-trade.com</li>
            <li className="font-mono text-xs">+968 77 62 1857</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-6 flex justify-between items-center text-[11px] tracking-widest uppercase text-muted-foreground">
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