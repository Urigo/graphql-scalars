import { defineConfig, Giscus, ScalarsLogo, useTheme } from '@theguild/components';
import { useRouter } from 'next/router';

const SITE_NAME = 'GraphQL Scalars';

export default defineConfig({
  titleSuffix: ` – ${SITE_NAME}`,
  docsRepositoryBase: 'https://github.com/urigo/graphql-scalars/tree/master/website', // base URL for the docs repository
  logo: (
    <>
      <ScalarsLogo className="mr-1.5 h-9 w-9" />
      <div>
        <h1 className="md:text-md text-sm font-medium">{SITE_NAME}</h1>
        <h2 className="hidden text-xs sm:!block">
          Common custom GraphQL Scalars for precise type-safe GraphQL schemas
        </h2>
      </div>
    </>
  ),
  head: () => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={`${SITE_NAME}: documentation`} />
      <meta name="og:title" content={`${SITE_NAME}: documentation`} />
    </>
  ),
  main: {
    extraContent() {
      const { resolvedTheme } = useTheme();
      const { route } = useRouter();

      if (route === '/') {
        return null;
      }
      return (
        <Giscus
          // ensure giscus is reloaded when client side route is changed
          key={route}
          repo="Urigo/graphql-scalars"
          repoId="MDEwOlJlcG9zaXRvcnk5NDU2MjE3Mw=="
          category="Docs Discussions"
          categoryId="DIC_kwDOBaLnfc4CSDVs"
          mapping="pathname"
          theme={resolvedTheme}
        />
      );
    },
  },
});
