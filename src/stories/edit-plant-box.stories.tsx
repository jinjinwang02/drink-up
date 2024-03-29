import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import {
  EditPlantBox as EditPlantBoxComponent,
  EditPlantBoxProps,
} from '../components/edit-plant-box';

export default {
  title: 'Components/Edit Plant Box',
  component: EditPlantBoxComponent,
  args: {
    showControl: true,
    id: 'filleLeafFig',
    commonName: 'Fiddle-leaf Fig',
    schedule: '7',
    notes: 'Bright, indirect light',
    lastWateredOn: '01/03/2021',
    onCancel: () => null,
    onDelete: () => null,
    onSubmit: () => null,
  },
} as Meta;

export const EditPlantBox: Story<EditPlantBoxProps> = (args) => (
  <Box>
    <EditPlantBoxComponent {...args} />
  </Box>
);
