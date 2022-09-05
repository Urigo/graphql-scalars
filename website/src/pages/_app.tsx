import Script from 'next/script';
import { AppProps } from 'next/app';
import { FooterExtended, Header, ThemeProvider } from '@theguild/components';
import 'guild-docs/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Header accentColor="#FF3388" themeSwitch searchBarProps={{ version: 'v2' }} />
      <Component {...pageProps} />
      <FooterExtended />
    </ThemeProvider>
  );
}

// const defaultSeo: AppSeoProps = {
//   title: 'GraphQL Scalars',
//   description: 'GraphQL Scalars',
//   logo: {
//     url: 'https://the-guild-docs.vercel.app/assets/subheader-logo.png',
//     width: 50,
//     height: 54,
//   },
// };
