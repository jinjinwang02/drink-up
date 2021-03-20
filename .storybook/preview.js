import React from 'react';
import { ThemeProvider } from 'styled-components';
import { PlantProvider } from '../src/context/plant-context';
import { theme, GlobalStyle } from '../src/styles/theme';

// Global decorator to apply the styles to all stories
export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <PlantProvider>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </PlantProvider>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
