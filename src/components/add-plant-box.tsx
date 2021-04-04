import React from 'react';
import { usePlantContext } from '../context/plant-context';
import { Box } from './box/box';
import { BoxWithCloud } from './box/box-with-cloud';
import { ErrorFields } from './error-fields';
import { PlantInfo } from './plant-info';
import { Typography } from './typography';

export interface AddPlantBoxProps {
  plantId: string;
}

const AddPlantBox: React.FC<AddPlantBoxProps> = ({
  plantId,
}: AddPlantBoxProps) => {
  const { inputErrors } = usePlantContext();
  const errors = inputErrors && inputErrors[plantId];

  return (
    <Box flexDirection="column" alignItems="flex-start">
      <BoxWithCloud
        width={[350, 400]}
        topAccessory={
          <Typography textStyle="copyL">Woohoo! A new plant</Typography>
        }
        bottomAccessory={<PlantInfo plantId={plantId} />}
      />
      {Array.isArray(errors) ? (
        <Box ml="one">
          <ErrorFields errors={errors} />
        </Box>
      ) : null}
    </Box>
  );
};

export { AddPlantBox };
