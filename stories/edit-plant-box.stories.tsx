import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import { EditPlantBox } from '../components/edit-plant-box';

export default {
  title: 'Edit plant Box',
  component: EditPlantBox,
} as Meta;

export const Basic: React.FunctionComponent = () => (
  <Box>
    <EditPlantBox
      commonName="Fiddle-leaf Fig"
      scientificName="Ficus Lyrata"
      habit="Every week"
      notes="Bright, indirect light"
      date="01/03/2021"
    />
  </Box>
);
