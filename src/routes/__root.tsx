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

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "../i18n/i18n";
import { SiteHeader, SiteFooter, HtmlLangSync } from "../components/site-chrome";
import { ProgressRail } from "../components/motion";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
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
      { name: "description", content: "Bridging origin markets with global processors. Structured seafood sourcing, verified supply and transaction coordination from Muscat, Oman." },
      { name: "author", content: "Ocean Bridge Trade" },
      { property: "og:title", content: "Ocean Bridge Trade — Structured Seafood Sourcing" },
      { property: "og:description", content: "Bridging origin markets with global processors. Verified supply from Muscat, Oman." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Ocean Bridge Trade" },
      { property: "og:url", content: "https://www.oceanbridge-trade.com/" },
      /* The live site declared twitter:card=summary_large_image with NO image,
       * so every link shared into LinkedIn, WhatsApp or email rendered as a
       * bare text stub. For a business whose first contact with a buyer is
       * often a pasted link, that is a real cost. og:image must be an
       * absolute URL — relative paths are ignored by every crawler. */
      { property: "og:image", content: "https://www.oceanbridge-trade.com/website-images/harbor-dusk.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Muscat harbour at dusk" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.oceanbridge-trade.com/website-images/harbor-dusk.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      /* Two families, not four. Cinzel was only referenced by an unused
       * .wordmark rule and JetBrains Mono is now a system stack, which takes
       * the webfont payload from thirteen files to nine. */
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap" },
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
