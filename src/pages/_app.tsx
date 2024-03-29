import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../theme';
import { AuthProvider } from '../context/auth-context';
import { PlantProvider } from '../context/plant-context';
import { Favicon } from '../components/favicon';
import Head from 'next/head';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <link href="/fonts/font-head.css" rel="stylesheet" />
      <Favicon />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${process.env.GA_TRACKING_ID}');
        `,
        }}
      />
    </Head>

    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <PlantProvider>
          <Component {...pageProps} />
        </PlantProvider>
      </AuthProvider>
    </ThemeProvider>
  </>
);

export default App;
