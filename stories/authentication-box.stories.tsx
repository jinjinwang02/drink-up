import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Authentication } from '../components/authentication/container';
import { Box } from '../components/box/box';

export default {
  title: 'Authentication Box',
  component: Authentication,
} as Meta;

export const Basic = () => (
  <Box>
    <Authentication />
  </Box>
);
