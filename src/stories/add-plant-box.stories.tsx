import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { AddPlantBox as AddPlantBoxComponent } from '../components/add-plant-box';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Add Plant Box',
  component: AddPlantBoxComponent,
} as Meta;

export const AddPlantBox: Story = () => (
  <Box>
    <AddPlantBoxComponent plantId="" />
  </Box>
);
