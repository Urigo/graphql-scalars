module.exports = {
  title: 'GraphQL Scalars',
  tagline: 'Query anything, run anywhere',
  url: 'https://graphql-scalars.dev',
  baseUrl: '/',
  baseUrlIssueBanner: false,
  favicon: 'img/graphql-scalars.svg',
  organizationName: 'urigo',
  projectName: 'graphql-scalars',
  themeConfig: {
    colorMode: {
      disableSwitch: true,
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
    },
    footer: {
      links: [
        /* {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1'
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2'
            }
          ]
        }, */
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'http://bit.ly/guild-chat',
            },
            {
              label: 'Stack Overflow',
              href:
                'https://stackoverflow.com/questions/tagged/graphql-scalars',
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
      copyright: `Copyright © ${new Date().getFullYear()} GraphQL Scalars, The Guild, Inc. Built with Docusaurus.`,
    },
  },
  scripts: [
    'https://the-guild.dev/static/crisp.js'
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [
            require('remark-code-import'),
            require('remark-import-partial'),
          ],
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/urigo/graphql-scalars/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
};
