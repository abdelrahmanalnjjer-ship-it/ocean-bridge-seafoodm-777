# Ocean Bridge Trade — how to build with this system

**This system is dark-only.** There is no light mode. `:root` carries the ground
(`--background: #16130F`, warm charcoal), `html { color-scheme: dark }` is declared, and
`styles.css` paints `html body` with the ground and `--font-sans`. Do not add a light
theme, and never hardcode a hex in JSX — use the tokens or the band classes below.

## Build with the utility layer, not the primitives

The library exports 46 shadcn/ui primitives (`Button`, `Card`, `Input`, `Dialog`, …). They
are themed and they work, **but the real site uses none of them.** Every page — including
its contact form — is built from the utility classes below on plain elements. Match that.
Reach for a primitive only when you need real interactive behaviour (a dialog, a select, a
menu). For layout, type, buttons and surfaces, use the classes.

The three components the site genuinely ships are `SiteHeader` / `SiteFooter` (chrome),
the `motion` primitives (`Reveal`, `Stagger`+`StaggerItem`, `LineReveal`, `Counter`,
`ParallaxMedia`, `ScrollScale`, `ProgressRail`), and `ComplianceMark` / `ComplianceCard`.

## The class vocabulary

**Bands** — every section is one. They re-scope `--background`, `--card`, `--border`, so a
tokenised child inverts for free. Three only:
`band-paper` (default ground) · `band-wash` (one step up, alternating sections) ·
`band-deep` (the floor — hero, CTA, footer). `band-ink` is a retained alias of `band-deep`.

**Type** — `h-display` + one of `h-display-xl|lg|md|sm` (Cormorant Garamond, the display
face) · `h-statement` · `eyebrow` (11px caps, draws its own leading rule; `eyebrow-bare`
drops the rule, `eyebrow-muted` is the quiet variant) · `lede` / `lede-lg` · `label-caps`
(the smallest label — nothing renders below 11px) · `num` (tabular figures).

**Buttons** — `btn` plus `btn-solid` or `btn-outline`; `btn-pill` (with a nested
`pill-badge` for the arrow) and `btn-pill-ghost` for the rounded CTA. Links:
`link-underline`, `nav-link`.

**Layout** — `shell` (the page gutter) / `shell-wide` · `section` / `section-lg` (the only
two vertical rhythms — do not invent a third) · `plate` · `rail` · `pin`.

**Media** — `media` (fixed frame) · `media-frame` (hairline border) · `card-lift` (hover
lift on a card) · `scrim-hero` / `scrim-masthead` / `scrim-panel` for gradients over
photography · `bar-float` / `bar-ground` / `bar-solid`.

**Tokens** — Tailwind v4 utilities resolve to the theme, so `bg-card`, `text-foreground`,
`text-muted-foreground`, `text-fg-subtle`, `border-border`, `bg-background` all work. Brand
colours: `--brand-saffron` `#D9A05B` (the accent — buttons, links, active state; also
`--accent` and `--primary`), `--brand-terracotta` `#C4653F` (**large text only**, fails AA
under 24px), `--brand-stone`, `--brand-dill`, `--brand-teal`. For a scrim use
`rgb(var(--scrim) / 0.86)`, never a literal.

## Where the truth is

Read `_ds/<folder>/styles.css` and the files it imports before styling — the palette,
band and utility definitions all carry the reasoning for why each value is what it is.
Per-component API is in `<Name>.d.ts`; usage is in `<Name>.prompt.md`.

## Idiomatic section

```jsx
<section className="band-wash">
  <div className="shell section">
    <div className="eyebrow mb-7">Trade desk</div>
    <h2 className="h-display h-display-md max-w-[16ch]">Oman&rsquo;s catch, cleared for arrival.</h2>
    <p className="lede mt-6 max-w-2xl">
      Documentation prepared and checked before the offer is issued.
    </p>
    <div className="mt-10 flex flex-wrap gap-4">
      <a href="/products" className="btn btn-solid">Explore the catalogue</a>
      <a href="/contact" className="btn btn-outline">Start an inquiry</a>
    </div>
  </div>
</section>
```

**Asset note:** `SiteHeader` and `SiteFooter` load their wordmark from `/logos/*.png`,
served by the host app. That file is not carried in this design system, so the mark renders
broken unless the host serves `/logos`.
