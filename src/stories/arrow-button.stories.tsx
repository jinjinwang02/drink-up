import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { ArrowButton as ArrowButtonComponent } from '../components/button/arrow-button';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Arrow Button',
  component: ArrowButtonComponent,
} as Meta;

export const ArrowButton: React.FC = () => (
  <Box flexDirection="column" height={200} justifyContent="space-around">
    <ArrowButtonComponent size="small" />
    <ArrowButtonComponent size="small" direction="left" />
    <ArrowButtonComponent />
    <ArrowButtonComponent direction="left" />
    <ArrowButtonComponent size="large" />
    <ArrowButtonComponent size="large" direction="left" />
  </Box>
);
