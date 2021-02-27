import React from 'react';
import { Theme } from '../styles/theme';
import { Box } from './box/box';
import { Input } from './input';
import { PlantInfoProps } from './plant-info';
import { Typography } from './typography';

export interface InputWithLabelProps extends PlantInfoProps {
  formik: any;
  name: string;
  label: string;
  placeholder?: string;
}

const InputWithLabel = ({
  formik,
  name,
  label,
  placeholder,
  textStyle = ['copyS', 'copyM', 'copyM', 'copyM'],
}: InputWithLabelProps) => (
  <Box my={['zeroPointEight', 'one']} width="100%">
    <Box flex={3} flexDirection="column" alignItems="flex-start">
      <Typography textStyle={textStyle}>{label}</Typography>
    </Box>
    <Box flex={5}>
      <Input
        name={name}
        formik={formik}
        textAlign="left"
        placeholder={placeholder}
      />
    </Box>
  </Box>
);

export { InputWithLabel };
