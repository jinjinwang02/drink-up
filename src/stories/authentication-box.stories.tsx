import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Authentication } from '../components/authentication/authentication';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Authentication Box',
  component: Authentication,
} as Meta;

export const AuthenticationBox: Story = () => (
  <Box>
    <Authentication />
  </Box>
);
