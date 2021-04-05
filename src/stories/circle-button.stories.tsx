import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import {
  CircleButton as CircleButtonComponent,
  CircleBoxProps,
} from '../components/button/circle-button';

export default {
  title: 'Components/Button/Circle Button',
  component: CircleButtonComponent,
  args: {
    onClick: () => null,
    disabled: false,
    checked: true,
  },
} as Meta;

export const CircleButton: Story<CircleBoxProps> = (args) => (
  <Box>
    <CircleButtonComponent {...args} />
  </Box>
);
