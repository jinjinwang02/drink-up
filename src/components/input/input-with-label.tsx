import React from 'react';
import { usePlantContext } from '../../context/plant-context';
import { CollectionWithInputs } from '../../interfaces';
import { Box } from '../box/box';
import { PlantInfoProps } from '../plant-info';
import { Typography } from '../typography';

export interface InputWithLabelProps extends Omit<PlantInfoProps, 'plantInfo'> {
  plantId: string;
  Input: React.ReactNode;
  name: string;
  label: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  plantId,
  name,
  label,
  Input,
  labelTextStyle = ['copyS', 'copyM', 'copyM', 'copyM'],
}: InputWithLabelProps) => {
  const { inputErrors } = usePlantContext();
  const errorFields = inputErrors && inputErrors[plantId].map((el) => el.name);
  return (
    <Box my={['zeroPointEight', 'one']} width="100%">
      <Box flex={3} flexDirection="column" alignItems="flex-start">
        <Typography
          color={
            errorFields?.includes(name as keyof CollectionWithInputs)
              ? 'red'
              : 'black'
          }
          textStyle={labelTextStyle}
        >
          {label}
        </Typography>
      </Box>
      <Box flex={5}>{Input}</Box>
    </Box>
  );
};

export { InputWithLabel };
