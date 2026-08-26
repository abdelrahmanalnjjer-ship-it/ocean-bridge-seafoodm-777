import { SiteHeader } from 'ocean-bridge-ui';

/* ASSET DEPENDENCY: SiteHeader renders its wordmark from the absolute path
 * "/logos/logo-horizontal-reversed-saffron.png". That file is served by the
 * host app's public/ directory — it is NOT carried in this design system, so
 * the mark shows as a broken image anywhere /logos is not served.
 *
 * POSITIONING: the header is `fixed inset-x-0 top-0 z-50`, so to show it
 * inside a card the stage below establishes a containing block (any transform
 * does) and reserves the 4rem it occupies. In a page you just mount it. */

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative h-72 overflow-hidden border border-border"
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
      <div className="band-deep h-full pt-24">
        <div className="shell">
          <div className="eyebrow mb-5">Trade desk</div>
          <h1 className="h-display h-display-lg max-w-[14ch]">Oman&rsquo;s catch.</h1>
        </div>
      </div>
    </div>
  );
}

export function OverAMasthead() {
  return (
    <Stage>
      <SiteHeader />
    </Stage>
  );
}
