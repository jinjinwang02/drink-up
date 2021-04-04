import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { BoxyButton as BoxyButtonComponent } from '../components/button/boxy-button';

export default {
  title: 'Components/Button/Boxy Button',
  component: BoxyButtonComponent,
} as Meta;

export const BoxyButton: Story = () => (
  <BoxyButtonComponent onNext={() => null} onBack={() => null} />
);
