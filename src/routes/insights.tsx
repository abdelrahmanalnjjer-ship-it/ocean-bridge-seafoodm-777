import { createFileRoute, redirect } from "@tanstack/react-router";

/* The standalone insights index was removed at the client's request — the
 * articles live only as a section on the home page now.
 *
 * This file exists purely so that /insights does not 404 for anyone who
 * already has the link. Individual articles are still reachable at
 * /article/$slug, which is what the home page cards point to.
 *
 * DELETE THIS FILE once you are happy nothing links to /insights:
 *   git rm "src/routes/insights.tsx"
 * The route tree regenerates on the next build.
 */
export const Route = createFileRoute("/insights")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "insights" });
  },
});
