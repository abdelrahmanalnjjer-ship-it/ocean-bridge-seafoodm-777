# Implementation Checklist

## Step 1: `src/styles.css`
- [ ] Add colored ambient shadow utility classes (shadow-marine, shadow-ocean, shadow-olive, shadow-sand)
- [ ] Add varied animation keyframes (scale-in, slide-left, slide-right, fade-in-up, fade-in-down)
- [ ] Add utility classes for the new animations

## Step 2: `src/routes/index.tsx`
- [ ] Remove HERO_POSTER constant and poster attribute
- [ ] Fix Oman flag video (Untitled design.mp4) — add object-scale-down class for third slide
- [ ] Replace VLOG_CARDS with "Coming soon" placeholder entries (no stock photos)
- [ ] Add certification compliance scrolling ticker below MARKETS section
- [ ] Vary entrance animations across sections (hero: scale-in, value props: slide-left/right stagger, portfolio: rotate-in, stats: fade-up)
- [ ] Sprinkle color accents (Ocean Blue on hover borders, Olive on category indicators, Sand on premium badges)

## Step 3: `src/routes/about.tsx`
- [ ] Add harbor-dusk.jpg and dhow-detail.jpg as additional imagery

## Step 4: `src/routes/products.tsx`
- [ ] Redesign availability bar with 12 month labels (Jan-Dec) — active months highlighted
- [ ] Vary entrance animations (card stagger with slide-up)
- [ ] Sprinkle color accents (Ocean Blue, Olive, Sand)

## Step 5: Verify
- [ ] Run `npx tsc --noEmit` to check TypeScript compilation
- [ ] Start dev server for visual review
