import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../styles/theme';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;
