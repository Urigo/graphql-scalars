export default {
  title: 'GraphQL Scalars',
  tagline: 'Query anything, run anywhere',
  url: 'https://graphql-scalars.dev',
  baseUrl: '/',
  baseUrlIssueBanner: false,
  favicon: 'img/graphql-scalars.svg',
  organizationName: 'urigo',
  projectName: 'graphql-scalars',
  themeConfig: {
    algolia: {
      appId: 'ANRJKXZTRW',
      apiKey: '811d453fc7f80306044dd5cc4b87e064',
      indexName: 'theguild',
      algoliaOptions: {},
      contextualSearch: false,
      searchParameters: {},
    },
    navbar: {
      title: 'GraphQL Scalars',
      logo: {
        alt: 'GraphQL Scalars',
        src: 'img/graphql-scalars.svg',
      },
      items: [
        {
          to: 'docs/introduction',
          activeBasePath: 'docs',
          label: 'API & Documentation',
          position: 'right',
        },
        {
          href: 'https://github.com/urigo/graphql-scalars',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://the-guild.dev/contact',
          label: 'Contact Us',
          position: 'right',
        },
      ],
      hideOnScroll: false,
    },
    footer: {
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'http://bit.ly/guild-chat',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/graphql-scalars',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Urigo/graphql-scalars/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/TheGuildDev',
            },
          ],
        },
      ],
      copyright: 'Copyright © 2021 GraphQL Scalars, The Guild, Inc. Built with Docusaurus.',
      style: 'light',
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
      switchConfig: {
        darkIcon: '🌜',
        darkIconStyle: {},
        lightIcon: '🌞',
        lightIconStyle: {},
      },
    },
    docs: {
      versionPersistence: 'localStorage',
    },
    metadatas: [],
    prism: {
      additionalLanguages: [],
    },
    hideableSidebar: false,
  },
  scripts: [
    {
      src: 'https://the-guild.dev/static/banner.js',
      async: true,
    },
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [null, null],
          sidebarPath: '/home/ardat_000/Guild/graphql-scalars/website/sidebars.js',
          editUrl: 'https://github.com/urigo/graphql-scalars/edit/master/website/',
        },
        theme: {
          customCss: '/home/ardat_000/Guild/graphql-scalars/website/src/css/custom.css',
        },
      },
    ],
  ],
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {},
  },
  onDuplicateRoutes: 'warn',
  customFields: {},
  plugins: [],
  themes: [],
  titleDelimiter: '|',
  noIndex: false,
};
