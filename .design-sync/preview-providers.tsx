/* PREVIEW HARNESS ONLY — not part of the design system's public API.
 *
 * Two components in this library read React context that a bare preview card
 * cannot supply:
 *
 *   - SiteHeader / SiteFooter render <Link> from @tanstack/react-router, which
 *     throws "Cannot read properties of null (reading 'stores')" with no router
 *     above it. RouterContextProvider supplies the context WITHOUT rendering a
 *     matched route, which is what makes it usable as a preview wrapper —
 *     RouterProvider would render the route tree instead of our children.
 *   - Everything that calls useI18n(). That hook has a sane default context
 *     (locale "en", t returns the key), so it does not throw — but without the
 *     real provider every translated string renders as its lookup key.
 *
 * This is wired through `provider` in .design-sync/config.json and wraps every
 * preview card. In a real app you mount I18nProvider yourself and the router
 * comes from TanStack Start.
 */
import type { ReactNode } from 'react';
import {
  RouterContextProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router';
import { I18nProvider } from '../src/i18n/i18n';

/* A single root route is enough: nothing is ever matched or rendered from it.
 * It exists only so `router` is a fully-formed object for the context. */
const rootRoute = createRootRoute();

const router = createRouter({
  routeTree: rootRoute,
  history: createMemoryHistory({ initialEntries: ['/'] }),
});

export function PreviewProviders({ children }: { children?: ReactNode }) {
  return (
    <RouterContextProvider router={router as never}>
      <I18nProvider>{children}</I18nProvider>
    </RouterContextProvider>
  );
}
