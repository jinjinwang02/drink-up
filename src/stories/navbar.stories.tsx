import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Navbar } from '../components/navbar';
import { Box } from '../components/box/box';

export default {
  title: 'Navbar',
  component: Navbar,
} as Meta;

export const LoggedInNavBar: React.FC = () => (
  <Box px={['two', 'four', 'six', 'twelve']}>
    <Navbar isUserLoggedIn />
  </Box>
);
