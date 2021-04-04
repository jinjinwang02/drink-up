import React from 'react';
import { Box } from './box/box';
import { Typography } from './typography';

interface ErrorFieldsProps {
  errors: { name: string; errorMessage: string }[];
}

const ErrorFields: React.FC<ErrorFieldsProps> = ({
  errors,
}: ErrorFieldsProps) => (
  <Box width="100%" flexDirection="column" mt="one" alignItems="flex-start">
    {errors?.map((el) => (
      <Typography key={el.name} textStyle="bodyM" color="warningRed">
        {el.errorMessage}
      </Typography>
    ))}
  </Box>
);

export { ErrorFields };
