/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || 'https://the-guild.dev/graphql/scalars',
  generateIndexSitemap: false,
  exclude: ['*/_meta'],
  output: 'export',
};
