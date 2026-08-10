/**
 * Pixelette Holdings — Next.js configuration.
 *
 * The site is fully static: no server-rendered data, no database, no runtime
 * API. `output: 'export'` therefore produces a plain static build that can be
 * hosted anywhere, which keeps hosting simple and the attack surface small.
 *
 * If a server-backed feature is added later (live form handling, a gated
 * investor area, a dashboard), remove `output: 'export'` and deploy to a Node
 * runtime instead. Nothing else in the codebase needs to change.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Required for a static export. Images are optimised at build time
    // instead, so add width/height on every <Image> to protect CLS.
    unoptimized: true,
  },

  // Legacy URLs from the previous website. Preserved to protect search
  // authority through the rebuild.
  //
  // NOTE: redirects() does not apply to `output: 'export'` — for a static
  // deploy these are served from _redirects / host config instead. They are
  // declared here so the mapping lives in one reviewable place and works
  // immediately if the site later moves to a Node runtime.
  async redirects() {
    return [
      { source: '/how-it-works', destination: '/hse-model', permanent: true },
      // Banned-term slug. Points DIRECT at the destination — never chained
      // through /how-it-works, which would create a two-hop redirect.
      { source: '/accelerator', destination: '/hse-model', permanent: true },
      { source: '/start-your-venture', destination: '/apply', permanent: true },

      // COUNSEL GATE — /for-investors must NOT redirect to the new capital
      // page until the s.21 FSMA position is cleared. Deliberately absent.
      // { source: '/for-investors', destination: '/partners/capital', permanent: true },
    ];
  },
};

export default nextConfig;
