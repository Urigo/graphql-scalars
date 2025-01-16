import { FC, ReactNode } from 'react';
import {
  GitHubIcon,
  HiveFooter,
  PaperIcon,
  PencilIcon,
  PRODUCTS,
  ToolsLogo,
} from '@theguild/components';
import { getDefaultMetadata, getPageMap, GuildLayout } from '@theguild/components/server';
import '@theguild/components/style.css';

const description = PRODUCTS.TOOLS.title;
const websiteName = 'GraphQL Tools';

export const metadata = getDefaultMetadata({
  description,
  websiteName,
  productName: 'TOOLS',
});

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <GuildLayout
      websiteName={websiteName}
      description={description}
      logo={<ToolsLogo fill="currentColor" className="h-auto w-8" />}
      layoutProps={{
        docsRepositoryBase: 'https://github.com/ardatan/graphql-tools/tree/master/website',
        footer: (
          <HiveFooter
            items={{
              resources: [
                {
                  children: 'Changelog',
                  href: '/changelog',
                  title: 'Changelog',
                },
              ],
            }}
          />
        ),
      }}
      pageMap={await getPageMap()}
      navbarProps={{
        developerMenu: [
          {
            href: '/docs',
            icon: <PaperIcon />,
            children: 'Documentation',
          },
          { href: 'https://the-guild.dev/blog', icon: <PencilIcon />, children: 'Blog' },
          {
            href: 'https://github.com/ardatan/graphql-tools',
            icon: <GitHubIcon />,
            children: 'GitHub',
          },
        ],
      }}
      lightOnlyPages={['/']}
    >
      {children}
    </GuildLayout>
  );
};

export default RootLayout;
