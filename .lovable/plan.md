
# Ocean Bridge Trade — Corporate Website

Institutional B2B seafood trade site inspired by salmar.no + dongwon.com. Editorial, disciplined, cinematic scroll. You supply all media (logo, product photos, videos); we wire placeholders that you replace.

## Design system

- Palette (Navy Trust): background `#0f1b3d`, deep surface `#1e3a5f`, accent `#3b6fa0`, foreground `#e8edf3`. Muted line `rgba(232,237,243,0.12)`. Wired into `src/styles.css` via `@theme inline` tokens (`bg-background`, `text-foreground`, `bg-primary`, etc.) — no hardcoded hex in components.
- Typography: **Marcellus** (display/headings) + **Mulish** (body) loaded via `<link>` in `__root.tsx` head; `--font-display` and `--font-sans` tokens. Monospace (JetBrains Mono) for scientific names + Terminal Data View.
- Motion: framer-motion for section reveals, hero video overlay fade, product card hover glass glow, scroll-linked headline reveal (Dongwon-style).
- Spacing: architectural — generous 96–160px section padding, thin 1px hairline dividers, uppercase micro-labels (tracking-widest).

## Site structure (TanStack routes)

```
src/routes/
  __root.tsx              → nav + footer chrome, fonts, meta, i18n context
  index.tsx               → Home
  products.tsx            → The Institutional Trade Matrix
  about.tsx               → About Us
  contact.tsx             → Connect Us
```

Nav: logo · Home · Products · About · Contact · [EN/AR/CN switcher].

## Home page

Cinematic long-scroll (Salmar/Dongwon rhythm):

1. **Hero** — full-viewport background **video slot** (your footage) with dark navy overlay, Marcellus headline "Bridging Origin Markets with Global Processors.", sub "Structured Sourcing. Verified Supply.", two ghost CTAs (Explore Catalogue / Connect).
2. **Manifesto strip** — oversized serif statement with scroll-triggered word reveal.
3. **Vlog / Video Journal section** — horizontal-scroll rail of video cards (thumbnail + play, title, date). Placeholders you replace with your videos. Click opens inline modal player.
4. **Capabilities** — 3 columns: Structured Sourcing · Supplier Verification · Transaction Coordination (with hairline dividers, numbered 01/02/03).
5. **Species portfolio teaser** — 3 category cards (Pelagic / Demersal & Reef / Cephalopods & Crustaceans) → link to /products.
6. **Destination gateways** — China · EU · GCC · Asia, minimal map-style layout.
7. **Regulatory mastery band** — GACC 248 / EU TRACES / FDA HACCP / SFDA badges.
8. **CTA footer** — "Initiate an Inquiry" → /contact.

## Products page — The Institutional Trade Matrix

Header: "The Institutional Trade Matrix" + subhead.

Controls row:
- **Left**: 4 category tabs — Pelagic · Demersal & Reef · Cephalopods & Crustaceans · Tuna.
- **Right**: view toggle — **Visual Grid** (default) / **Terminal Data**.

### Visual Grid View (default)
3-column premium card grid. Each card:
- Image slot (your product photo)
- Common name (Marcellus, prominent)
- Scientific name (mono, subtle)
- 3 data tags: `Catch Season` (e.g. May–Oct) · `Size Grade` · `Compliance Status` (Available / Seasonal)
- Hover: glassmorphic glow (backdrop-blur + navy tint) + slide-up "Request Spec Sheet" text button → opens inquiry drawer prefilled with species.

### Terminal Data View
Sharp trading-screen table, monospace cells, sticky header:
`Species | Scientific Name | Size / Grades | HS Code | Season | Packaging | Status | ⟶ Initiate Inquiry`

### Data
All 35 species from your table seeded in `src/data/species.ts` (English name, scientific, HS code, size type + sizes array, status, season start/end, category). Arabic + Chinese names live on the record but render **only** in AR/CN locales — English UI hides them per your rule.

Category assignment:
- **Tuna**: #2–5 (Yellowfin, Longtail, Bigeye, Skipjack)
- **Pelagic**: #1, 6–9, 21–25, 33–35 (Amberjack, Kingfish, Mahi, Barracuda, Cobia, sardines, mackerels, scad, ribbon, wahoo, sailfish)
- **Demersal & Reef**: #10–20 (Grouper, Emperor, snappers, breams, pomfrets, mullet, catfish, lizardfish)
- **Cephalopods & Crustaceans**: #26–32 (cuttlefish, squid, octopus, lobsters, prawns, shrimp)

## About page

Editorial long-form with anchor sub-nav (Business Model · Governance · Origin Infrastructure · Competencies · Regulatory Mastery). Large serif pull-quotes for Vision / Mission. "What we DO / DO NOT do" as a two-column contrast block.

## Contact ("Connect Us") page

Split layout:
- Left: HQ (Muscat), phone +20 106 897 1773, WhatsApp +971 50 485 0309, +968 77 62 1857, info@oceanbridge-trade.com, LinkedIn, portal URL.
- Right: Inquiry form (Name, Company, Country, Species of interest [multiselect from catalogue], Volume, Message). Frontend-only submit → success state; wiring to a backend/email is a follow-up.

## Language switcher (EN/AR/CN)

Lightweight i18n via React context + JSON dictionaries in `src/i18n/{en,ar,zh}.json`. AR direction switches `<html dir="rtl">`. Product cards pull `name_en / name_ar / name_zh` based on locale. English locale never shows AR/CN names.

Scope note: initial dictionaries translate nav + hero + section headings + product UI labels + all 35 species names (AR + CN provided in your table). Long-form About/legal copy ships EN first; AR/CN show EN fallback with a "translation in progress" flag until you supply copy.

## Media placeholders (you replace, we do not generate)

- `/public/media/hero.mp4` — hero background video
- `/public/media/vlog/*.mp4` + posters — video journal
- `/public/media/products/<slug>.jpg` — 35 product photos
- `/public/media/logo.svg` — brand mark

Each slot renders a subtle "Media slot: …" placeholder tile in dev so gaps are visible.

## Technical notes

- Tailwind v4 tokens in `src/styles.css` (`@theme inline`); shadcn primitives restyled to navy.
- Fonts loaded via `<link>` in `__root.tsx` (never CSS `@import` URL).
- framer-motion already fine for reveals; no WebGL/Three.js.
- Route heads: unique title + description + og per route; no `og:image` at root.
- Products page uses local static data (no backend). Inquiry form is client-only for now — say the word if you want it wired to email / Lovable Cloud.

## Out of scope (ask if you want them)

- Real form delivery (email / DB / Cloud)
- CMS for editing species/vlogs
- Full AR/CN long-form copy translation
- Auth, buyer portal, spec-sheet PDF generation
