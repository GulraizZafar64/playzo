/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gamesapp-lake.vercel.app', // Update this to your production domain
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // exclude server-side sitemap if any
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://gamesapp-lake.vercel.app/server-sitemap.xml', // if you add dynamic sitemap later
    ],
  },
}
