/* ---------------------------------------------------------------------------
 * BUILD CONFIG — plain Vite, no vendor wrapper.
 *
 * This file used to be four lines calling a third-party `defineConfig` that
 * assembled the entire build behind the scenes: the router plugin, React,
 * Tailwind, tsconfig paths, Nitro, env injection, module dedupe, an error
 * reporter and some host-detection logic. Convenient, and completely opaque —
 * you could not read this file and know what built your site, could not change
 * the plugin order, and the whole project stopped building the moment that one
 * package went away.
 *
 * Everything it did is written out below, using packages that were already in
 * package.json. Two things it did are deliberately NOT reproduced: the vendor's
 * error-reporting plugin and its editor bridge. Both only ever functioned
 * inside that vendor's own preview iframe.
 *
 * Plugin order matters — tsconfig paths and Tailwind resolve first, the router
 * transforms routes, Nitro packages the server, React refresh comes last.
 * ------------------------------------------------------------------------ */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),

    tailwindcss(),

    tanstackStart({
      /* Points Nitro at src/server.ts, our SSR error wrapper, instead of the
       * bundled default entry. */
      server: { entry: "server" },
    }),

    /* cloudflare_module, stated explicitly.
     *
     * The wrapper defaulted to this without saying so anywhere, which meant
     * the deploy target was invisible — and Nitro silently falls back to a
     * Node build if it cannot infer one. The site runs on Cloudflare, so the
     * preset is named here where you can see it. */
    nitro({ preset: "cloudflare_module" }),

    react(),
  ],

  /* A second copy of React or the router in the graph produces hook errors
   * and a router context that silently resolves to undefined. */
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-start",
      "@tanstack/react-query",
    ],
  },

  server: {
    port: 8080,
    host: true,
  },
});
