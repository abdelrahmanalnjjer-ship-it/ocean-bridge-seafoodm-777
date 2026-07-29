# Product Catalog UI Fixes — Progress

## Fix 1: Month Indicator — Move off image + redesign
- [x] `src/routes/products.tsx` — Remove absolute-positioned badge from image container
- [x] `src/routes/products.tsx` — Add new dedicated seasonality row between image and text
- [x] `src/routes/products.tsx` — Redesign renderMonthIndicator with label + background track

## Fix 2: Typography — Replace Marcellus with Fraunces
- [x] `src/routes/__root.tsx` — Update Google Fonts link to Fraunces
- [x] `src/styles.css` — Update --font-display to Fraunces
- [x] `src/styles.css` — Remove Marcellus fake-italic workaround
- [x] `src/styles.css` — Update .h-display for Fraunces optical sizing
