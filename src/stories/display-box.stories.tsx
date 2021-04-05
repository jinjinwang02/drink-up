import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import {
  DisplayBox as DisplayBoxComponent,
  DisplayBoxProps,
} from '../components/display-box';

export default {
  title: 'Components/Display Box',
  component: DisplayBoxComponent,
  args: {
    commonName: 'Random Name',
    schedule: 7,
    lastWateredOn: '04/04/2021',
    notes: 'keep soil gently moist',
  },
} as Meta;

export const DisplayBox: Story<DisplayBoxProps> = (args) => (
  <Box>
    <DisplayBoxComponent {...args} />
  </Box>
);
