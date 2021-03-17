import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Container } from '../components/authentication/container';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Authentication Box',
  component: Container,
} as Meta;

export const AuthenticationBox: React.FC = () => (
  <Box>
    <Container />
  </Box>
);
