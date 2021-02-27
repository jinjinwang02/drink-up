import React from 'react';
import { BoxWithCloud } from './box/box-with-cloud';
import { PlantInfo } from './plant-info';
import { Typography } from './typography';

const AddPlantBox = () => (
  <BoxWithCloud
    width={[350, 400]}
    topAccessory={
      <Typography textStyle="copyL">Woohoo! A new plant</Typography>
    }
    bottomAccessory={<PlantInfo />}
  />
);

export { AddPlantBox };
