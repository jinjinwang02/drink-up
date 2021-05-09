import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import {
  WaterButton as WaterButtonComponent,
  WaterButtonProps,
} from '../components/button/water-button';

export default {
  title: 'Components/Button/Water Button',
  component: WaterButtonComponent,
  args: {
    onClick: () => null,
    isChecked: false,
    isSubmitting: true,
  },
} as Meta;

export const WaterButton: Story<WaterButtonProps> = (args) => (
  <Box>
    <WaterButtonComponent {...args} />
  </Box>
);
