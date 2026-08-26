import { SiteFooter } from 'ocean-bridge-ui';

/* ASSET DEPENDENCY: the stacked wordmark is loaded from the absolute path
 * "/logos/logo-stacked-reversed-saffron.png", served by the host app's
 * public/ directory. It is not carried in this design system, so the mark is
 * a broken image wherever /logos is not served.
 *
 * The footer is static markup on .band-deep — no positioning tricks needed. */

export function Default() {
  return <SiteFooter />;
}
