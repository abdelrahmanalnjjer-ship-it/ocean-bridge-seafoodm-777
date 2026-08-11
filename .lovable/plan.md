# Ocean Bridge Trade — UI/UX Fix Pass (Home + Products)

## What I verified first

- **Hero videos**: three widescreen clips exist in `public/videos`, but only two are wired into the rotation, and both are ~18 MB 4K files. The player also re-mounts the `<video>` element on every rotation, so each switch restarts a fresh 18 MB download — which is why in practice only the first clip is ever visible. One of the three files is a byte-identical duplicate of another.
- **Chinese**: a `zh` dictionary exists and translates nav labels and product names, but all long-form page copy on Home/About/Contact is hardcoded English. So 中文 only half-works.
- **GCC thumbnail**: the GCC row already uses a Jebel Ali image; the credit line is what reads confusingly, since it lists Hamburg, which belongs to a different image on the page.

## P0 fixes

**1. Hero video playback**
- Re-encode the clips to web-optimised 1080p MP4 (faststart), dropping them from ~18 MB to a couple of MB each.
- Drop the duplicate file; rotate across the remaining distinct clips.
- Render all clips stacked and always mounted, crossfading with opacity instead of unmounting — no re-download, no black frame.
- Keep a poster frame so the hero is never empty on load.

**2. Hero content above the fold**
- Reduce hero height from full screen to roughly 72–80vh (shorter on mobile) so the headline sits clearly above the fold.
- Promote the strongest line on the page into the hero as the primary H1: "We don't just connect buyers and sellers. We engineer reliable, compliant, repeatable supply chains from Oman to the world."
- Keep the per-clip kicker rotating and the single "Request a Buyer Consultation" pill CTA. Lighten the overlay so the footage reads as visual proof.
- Remove the duplicate paragraph version of that line below the hero.

**3. Chinese switcher**
- Gray out and disable 中文 in the header and mobile menu, with a "coming soon" tooltip, until real Chinese page copy exists. Arabic stays live.
- Porting your Chinese company profile into full zh content is tracked as a separate follow-up.

**4. Product card long names**
- Rework the species card as a flex column with a flexible title block: fixed image panel, then a title area that grows with two-line clamping, so "Indian Oil Sardine" and similar can never collide with the image. Cards stay equal height across the grid.

## P1 fixes

- **Markets & Compliance**: keep the Jebel Ali photo on the GCC row and rewrite the credit line so each port is attributed to the row it belongs to.
- **News from the origin desk**: replace the three empty placeholder cards with one signup module — "Get notified when we publish market updates and field dispatches" — with an email field and a confirmation state.
- **Season legend**: add a one-line legend beside the category tabs on Products, showing filled = in season, unfilled = out of season.
- **Category counts**: each tab shows its SKU count, e.g. "Pelagic (12)".
- **Mobile pass**: hero height, headline sizing, tab bar wrapping, and the product grid checked and corrected at 390px and 768px widths.

## P2 fixes

- **Count copy**: "12 items shown" becomes "12 of 35 shown".
- **CTA language**: unify on two intentional actions — "Request a Buyer Consultation" for the site-level CTA (hero and closing CTA), and "Inquire about this species" on product cards, so the per-SKU action is clearly distinct.

## Out of scope for this pass

Destination-market pages, company-history copy rewrite, and full Chinese content — flagged as follow-ups.

## Technical notes

- `src/routes/index.tsx`: hero restructure (stacked persistent videos, opacity crossfade, H1 promotion, height), markets credit line, news section replaced with signup module.
- `src/components/site-chrome.tsx`: disabled 中文 option in desktop and mobile nav.
- `src/routes/products.tsx`: flex-column card with clamped flexible title area, tab counts, legend, "X of Y shown".
- `public/videos/`: clips re-encoded to 1080p faststart, duplicate removed, filenames normalised (current names contain spaces and parentheses, which makes them fragile to reference).
- Email signup: stored via Lovable Cloud (a small insert-only signups table) so submissions are actually captured.

One decision needed: the signup module implies enabling Lovable Cloud to store addresses. If you'd rather keep it purely visual for now, say so and I'll make it a no-backend form instead.