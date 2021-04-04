import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import { CrossButton as CrossButtonComponent } from '../components/button/cross-button';
import { ButtonProps } from '../interfaces';

export default {
  title: 'Components/Button/Cross Button',
  component: CrossButtonComponent,
  args: {
    onClick: () => null,
    disabled: false,
  },
} as Meta;

export const CrossButton: Story<ButtonProps> = (args) => (
  <Box>
    <CrossButtonComponent {...args} />
  </Box>
);
