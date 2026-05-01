/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export breaks `next dev` asset URLs after failed compiles / stale cache.
  // Use: STATIC_EXPORT=true npm run build — for GitHub Pages / pure static hosting.
  ...(process.env.STATIC_EXPORT === "true" ? { output: "export" } : {}),
  async redirects() {
    return [
      {
        source: "/category/unblocked-games-6x",
        destination: "/category/unblocked-games",
        permanent: true,
      },
      // Next.js serves `app/sitemap.ts` at /sitemap.xml — alias common /sitemap requests.
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap/", destination: "/sitemap.xml", permanent: true },
      // `app/robots.ts` is served at /robots.txt (not /robot.txt).
      { source: "/robot.txt", destination: "/robots.txt", permanent: true },
      { source: "/robots", destination: "/robots.txt", permanent: true },
    ];
  },
};

export default nextConfig;
