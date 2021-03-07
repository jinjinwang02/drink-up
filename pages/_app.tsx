import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../styles/theme';
import { AuthProvider } from '../utils/context/auth';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  </>
);

export default App;
