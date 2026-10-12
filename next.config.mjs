/**
 * Pixelette Holdings — Next.js configuration.
 *
 * Server Actions handle contact, partnership backup storage, and Pix H lead
 * capture (Supabase + Resend). That requires a Node runtime on the host
 * (e.g. Vercel), so `output: 'export'` was removed on 2026-10-12. Pages remain
 * statically generated where possible; only the action endpoints need the
 * server. Legacy redirects also live in `vercel.json` / `public/_redirects`.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Keep unoptimized until an image loader decision is approved. Add
    // width/height on every <Image> to protect CLS.
    unoptimized: true,
  },

  // Legacy URLs from the previous website. Preserved to protect search
  // authority through the rebuild. Also listed in vercel.json.
  async redirects() {
    return [
      { source: '/how-it-works', destination: '/hse-model', permanent: true },
      // Banned-term slug. Points DIRECT at the destination — never chained
      // through /how-it-works, which would create a two-hop redirect.
      { source: '/accelerator', destination: '/hse-model', permanent: true },
      { source: '/start-your-venture', destination: '/apply', permanent: true },

      { source: '/hse-model/founder-protection', destination: '/hse-model/#protecting-the-partnership', permanent: true },
      { source: '/validation-sprint', destination: '/hse-model/#how-it-works', permanent: true },
      { source: '/capabilities', destination: '/about/#the-group', permanent: true },
      { source: '/portfolio/investments', destination: '/about/#relationships', permanent: true },
      { source: '/portfolio/hse-ventures', destination: '/portfolio/#selected-ventures', permanent: true },
      { source: '/portfolio/delivered-ventures', destination: '/portfolio/#selected-ventures', permanent: true },
      { source: '/portfolio/2connect', destination: '/portfolio/#2connect', permanent: true },
      { source: '/partners/capital', destination: '/contact/#capital-relationships', permanent: true },
      { source: '/partners/capital/qualification', destination: '/contact/#capital-relationships', permanent: true },
      { source: '/partners/capital/thank-you', destination: '/contact/', permanent: true },
      { source: '/partners/accelerators', destination: '/startups/', permanent: true },
      { source: '/social-impact', destination: '/about/#initiatives', permanent: true },

      // /for-investors stays unredirected. It is not pointed at a capital page.
    ];
  },
};

export default nextConfig;
