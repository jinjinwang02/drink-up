import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Navbar } from '../components/navbar';

export default {
  title: 'Navbar',
  component: Navbar,
} as Meta;

export const Basic: React.FC = () => <Navbar />;
