import React from 'react';
import { Box } from './box/box';
import { Input } from './input';
import { PlantInfoProps } from './plant-info';
import { Typography } from './typography';

export interface InputWithLabelProps extends Omit<PlantInfoProps, 'plantInfo'> {
  formik: any;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  placeholderSize?: number;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  formik,
  id,
  name,
  label,
  placeholder,
  inputTextStyle,
  labelTextStyle = ['copyS', 'copyM', 'copyM', 'copyM'],
  placeholderSize,
}: InputWithLabelProps) => (
  <Box my={['zeroPointEight', 'one']} width="100%">
    <Box flex={3} flexDirection="column" alignItems="flex-start">
      <Typography textStyle={labelTextStyle}>{label}</Typography>
    </Box>
    <Box flex={5}>
      <Input
        id={id}
        name={name}
        formik={formik}
        inputTextAlign="left"
        placeholder={placeholder}
        placeholderSize={placeholderSize}
        inputTextStyle={inputTextStyle}
      />
    </Box>
  </Box>
);

export { InputWithLabel };
