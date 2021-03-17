import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { BoxyButton as BoxyButtonComponent } from '../components/button/boxy-button';

export default {
  title: 'Components/Boxy Button',
  component: BoxyButtonComponent,
} as Meta;

export const BoxyButton: React.FC = () => (
  <BoxyButtonComponent onNext={() => null} onBack={() => null} />
);
