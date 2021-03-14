import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { BoxyButton } from '../components/button/boxy-button';

export default {
  title: 'Boxy Button',
  component: BoxyButton,
} as Meta;

export const Basic: React.FC = () => (
  <BoxyButton onNext={() => null} onBack={() => null} />
);
