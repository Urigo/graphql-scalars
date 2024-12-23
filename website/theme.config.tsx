/* eslint sort-keys: error */
import { useRouter } from 'next/router';
import { defineConfig, Giscus, PRODUCTS, useTheme } from '@theguild/components';

export default defineConfig({
  docsRepositoryBase: 'https://github.com/urigo/graphql-scalars/tree/master/website', // base URL for the docs repository
  main: function Main({ children }) {
    const { resolvedTheme } = useTheme();
    const { route } = useRouter();

    const comments = route !== '/' && (
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
    return (
      <>
        {children}
        {comments}
      </>
    );
  },
  websiteName: 'GraphQL-Scalars',
  description: PRODUCTS.SCALARS.title,
  // @ts-expect-error - Typings are not updated
  logo: PRODUCTS.SCALARS.logo({ className: 'w-8' }),
});
