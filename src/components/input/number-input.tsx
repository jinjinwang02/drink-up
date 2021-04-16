import React from 'react';
import { Input, InputProps } from '../input/input';
import { Typography } from '../typography';

export interface NumberInputProps extends InputProps {
  startText?: string;
  endText?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  startText,
  endText,
  plantId,
  name,
  placeholder,
  placeholderSize,
}: NumberInputProps) => {
  return (
    <>
      <Typography textStyle={['bodyM', 'bodyL']} mr="two">
        {startText}
      </Typography>
      <Input
        plantId={plantId}
        type="number"
        name={name}
        inputTextAlign="center"
        placeholder={placeholder}
        placeholderSize={placeholderSize}
      />
      <Typography textStyle={['bodyM', 'bodyL']} ml="two">
        {endText}
      </Typography>
    </>
  );
};

export { NumberInput };
