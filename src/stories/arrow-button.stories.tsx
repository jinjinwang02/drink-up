import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { ArrowButton } from '../components/button/arrow-button';
import { Box } from '../components/box/box';

export default {
  title: 'Arrow Button',
  component: ArrowButton,
} as Meta;

export const Basic: React.FC = () => (
  <Box flexDirection="column" height={200} justifyContent="space-around">
    <ArrowButton size="small" />
    <ArrowButton size="small" direction="left" />
    <ArrowButton />
    <ArrowButton direction="left" />
    <ArrowButton size="large" />
    <ArrowButton size="large" direction="left" />
  </Box>
);
