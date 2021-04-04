import React from 'react';
import { Box } from './box/box';
import { BoxWithCloud } from './box/box-with-cloud';
import { AddButton } from './button/add-button';
import { PlantInfo } from './plant-info';
import { Typography } from './typography';

const AddPlantBox: React.FC = () => (
  <Box flexDirection="column">
    <BoxWithCloud
      width={[350, 400]}
      topAccessory={
        <Typography textStyle="copyL">Woohoo! A new plant</Typography>
      }
      bottomAccessory={<PlantInfo plantId="" />}
    />
    <AddButton mt="three" onClick={() => null} />
  </Box>
);

export { AddPlantBox };
