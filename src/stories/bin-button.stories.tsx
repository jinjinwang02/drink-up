import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import { BinButton as BinButtonComponent } from '../components/button/bin-button';
import { ButtonProps } from '../interfaces';

export default {
  title: 'Components/Button/Bin Button',
  component: BinButtonComponent,
  args: {
    onClick: () => null,
    disabled: false,
  },
} as Meta;

export const BinButton: Story<ButtonProps> = (args) => (
  <Box>
    <BinButtonComponent {...args} />
  </Box>
);
