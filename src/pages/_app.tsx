import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../styles/theme';
import { AuthProvider } from '../context/auth-context';
import { PlantProvider } from '../context/plant-context';

const App: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => (
  <>
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
