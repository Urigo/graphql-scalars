/* eslint-disable react-hooks/rules-of-hooks */
/* eslint sort-keys: error */
import { defineConfig, Giscus, useTheme } from '@theguild/components'
import { useRouter } from 'next/router'

export default defineConfig({
  docsRepositoryBase: 'https://github.com/urigo/graphql-scalars/tree/master/website', // base URL for the docs repository
  main({ children }) {
    const { resolvedTheme } = useTheme()
    const { route } = useRouter()

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
    )
    return (
      <>
        {children}
        {comments}
      </>
    )
  },
  siteName: 'SCALARS',
})

