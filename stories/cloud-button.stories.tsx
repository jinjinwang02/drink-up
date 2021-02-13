import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { CloudButton } from '../components/button/cloud-button';
import { Box } from '../components/box/box';

export default {
  title: 'Cloud button',
  component: CloudButton,
} as Meta;

export const Buttons = () => (
  <Box width="100%" justifyContent="space-evenly">
    <CloudButton cta="log in" />
    <CloudButton cta="sign up" />
  </Box>
);
