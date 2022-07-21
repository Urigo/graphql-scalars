import Script from 'next/script';
import { AppProps } from 'next/app';
import { AppSeoProps } from '@guild-docs/client';
import { FooterExtended, Header, ThemeProvider } from '@theguild/components';

import 'nextra-theme-docs/style.css';
import '../../public/style.css';
import '@algolia/autocomplete-theme-classic';
import '@theguild/components/dist/static/css/SearchBarV2.css';

const accentColor = '#1cc8ee';

export default function App(appProps: AppProps) {
  const { Component, pageProps } = appProps;
  // @ts-expect-error
  const { getLayout } = Component;
  // @ts-ignore
  const childComponent = <Component {...pageProps} />;
  return (
    <ThemeProvider>
      <Script src="https://the-guild.dev/static/crisp.js" />
      <Header
        accentColor={accentColor}
        themeSwitch
        searchBarProps={{ version: 'v2' }}
      />
      {getLayout ? getLayout(childComponent) : childComponent}
      <FooterExtended />
    </ThemeProvider>
  );
}

const defaultSeo: AppSeoProps = {
  title: 'GraphQL Scalars',
  description: 'GraphQL Scalars',
  logo: {
    url: 'https://the-guild-docs.vercel.app/assets/subheader-logo.png',
    width: 50,
    height: 54,
  },
};
