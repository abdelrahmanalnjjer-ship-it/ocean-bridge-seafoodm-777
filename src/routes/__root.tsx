import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
/* ?url gives the hashed, content-addressed path Vite emits for the file, so
 * the preload always points at the asset the stylesheet will actually ask
 * for. Hardcoding /fonts/... would break on the next build. */
import montserrat400 from "@fontsource/montserrat/files/montserrat-latin-400-normal.woff2?url";
import cormorant400 from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2?url";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "../i18n/i18n";
import { SiteHeader, SiteFooter, HtmlLangSync } from "../components/site-chrome";
import { ProgressRail } from "../components/motion";

/* Both of these were generated scaffolding: rounded-md (3px in this theme,
 * where every real button is a 999px pill), text-7xl font-bold in Montserrat
 * where the display face is Cormorant, and bg-primary/90 — hierarchy from
 * opacity, which is rule 1 of this design system, violated. A 404 is a page
 * real buyers hit. */
function NotFoundComponent() {
  return (
    <div className="band-deep flex min-h-screen items-center">
      <div className="shell">
        <div className="eyebrow mb-7">Error 404</div>
        <h1 className="h-display h-display-lg max-w-[16ch]">
          This one didn't make it to the quay.
        </h1>
        <p className="lede mt-6">
          The page you asked for doesn't exist, or it has moved since the link was written. The
          catalogue and the trade desk are both a click away.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/products" className="btn-pill">
            Browse the catalogue
            <span className="pill-badge">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
          <Link to="/" className="btn btn-outline">
            Back to the homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="band-deep flex min-h-screen items-center">
      <div className="shell">
        <div className="eyebrow mb-7">Something went wrong</div>
        <h1 className="h-display h-display-lg max-w-[16ch]">This page didn't load.</h1>
        <p className="lede mt-6">
          The fault is on our side, not yours. Try again — and if it keeps happening, the trade desk
          is reachable at{" "}
          <a
            href="mailto:info@oceanbridge-trade.com"
            className="text-[color:var(--accent)] underline underline-offset-4"
          >
            info@oceanbridge-trade.com
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn-solid"
          >
            Try again
          </button>
          <a href="/" className="btn btn-outline">
            Back to the homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ocean Bridge Trade — Structured Seafood Sourcing" },
      {
        name: "description",
        content:
          "Bridging origin markets with global processors. Structured seafood sourcing, verified supply and transaction coordination from Muscat, Oman.",
      },
      { name: "author", content: "Ocean Bridge Trade" },
      { property: "og:title", content: "Ocean Bridge Trade — Structured Seafood Sourcing" },
      {
        property: "og:description",
        content:
          "Bridging origin markets with global processors. Verified supply from Muscat, Oman.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Ocean Bridge Trade" },
      { property: "og:url", content: "https://www.oceanbridge-trade.com/" },
      /* The live site declared twitter:card=summary_large_image with NO image,
       * so every link shared into LinkedIn, WhatsApp or email rendered as a
       * bare text stub. For a business whose first contact with a buyer is
       * often a pasted link, that is a real cost. og:image must be an
       * absolute URL — relative paths are ignored by every crawler. */
      { property: "og:image", content: "https://www.oceanbridge-trade.com/og-default.jpg" },
      /* A real 1200x630 export at 182 KB. The tags declared those dimensions
       * before, but pointed at the 6000x3375, 4 MB source file — so WhatsApp
       * (which caps previews well under a megabyte) showed nothing, and where
       * a preview did render it was cropped to the wrong ratio. */
      /* Mobile browser chrome. Without this Safari and Chrome paint the
       * address bar white above a near-black page. #080705 is .band-deep,
       * which is what the header sits on at the top of every route. */
      { name: "theme-color", content: "#080705" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Muscat harbour at dusk" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.oceanbridge-trade.com/og-default.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },

      /* THE FONTS ARE SELF-HOSTED NOW — see the block at the top of
       * styles.css for why. What used to sit here was two preconnects and a
       * render-blocking stylesheet on fonts.googleapis.com, which made Google
       * the only third party this site talked to.
       *
       * Preloading the two faces that paint first: the body text and the
       * headline. Everything else is discovered from the stylesheet. Both are
       * same-origin now, so there is no handshake in front of them. */
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: montserrat400,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: cormorant400,
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Scroll-reveal is an enhancement, not a precondition for reading
         * the site. Everything in components/motion.tsx starts at opacity 0
         * or translated out of a clipping mask; without this, a visitor with
         * scripting disabled — or a hydration failure — gets a blank page.
         * See the note at the top of motion.tsx. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal] *{opacity:1!important;transform:none!important;visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <HtmlLangSync />
        <div className="min-h-screen bg-background text-foreground font-sans antialiased">
          <SiteHeader />
          <ProgressRail />
          <main className="pt-16">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}
