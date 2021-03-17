import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Navbar as NavbarComponent } from '../components/navbar';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Navbar',
  component: NavbarComponent,
} as Meta;

export const Navbar: React.FC = () => (
  <Box px={['two', 'four', 'six', 'twelve']}>
    <NavbarComponent isUserLoggedIn />
  </Box>
);
