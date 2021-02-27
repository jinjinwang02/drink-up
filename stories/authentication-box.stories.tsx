import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Authentication } from '../components/authentication/container';

export default {
  title: 'Authentication Box',
  component: Authentication,
} as Meta;

export const Basic = () => <Authentication />;
