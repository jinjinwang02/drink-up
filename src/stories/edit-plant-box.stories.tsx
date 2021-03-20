import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import { EditPlantBox as EditPlantBoxComponent } from '../components/edit-plant-box';

export default {
  title: 'Components/Edit Plant Box',
  component: EditPlantBoxComponent,
} as Meta;

export const EditPlantBox: React.FC = () => (
  <Box>
    <EditPlantBoxComponent
      imageUrl=""
      id=""
      commonName="Fiddle-leaf Fig"
      habit="Every week"
      notes="Bright, indirect light"
      lastWateredOn="01/03/2021"
    />
  </Box>
);
