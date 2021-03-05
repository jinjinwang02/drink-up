import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Box } from './box/box';
import { Typography } from './typography';

const InputField = styled(Field)`
  ::placeholder {
    font-size: ${(props) => props.placeholderSize}px;
  }
`;

const InputLabel = styled(Box)`
  transform: ${(props) =>
    props.hasInput
      ? 'scale(0.8) translateY(35px)'
      : 'scale(1) translateY(-5px)'};
  ${InputField}:focus + & {
    transform: scale(0.8) translateY(35px);
  }
`;

export interface InputProps {
  formik: any;
  name: string;
  type?: string;
  label?: string;
  inputTextStyle?: string | string[];
  inputTextAlign?: 'left' | 'center';
  placeholder?: string;
  placeholderSize?: number;
}

const Input = ({
  formik,
  name,
  type,
  label,
  inputTextAlign = 'center',
  inputTextStyle,
  placeholder,
  placeholderSize,
}: InputProps) => {
  const error = formik.errors[name];

  return (
    <Box flexDirection="column" width="100%" position="relative">
      <InputField
        name={name}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        placeholdersize={placeholderSize}
        style={{
          width: '100%',
          padding: theme.space.zeroPointFour,
          paddingTop: theme.space.zero,
          textAlign: inputTextAlign,
          outline: 'none',
          border: 'none',
          borderBottom: theme.borders.regularBlack,
          background: 'transparent',
          textStyle: inputTextStyle,
        }}
      />
      <InputLabel
        position="absolute"
        zIndex={-1}
        error={error}
        transition={theme.transitions.medium}
        hasInput={formik.values[name].length}
      >
        <Typography
          textStyle="bodyL"
          textAlign="center"
          color={error ? 'red' : 'darkGrey'}
        >
          {error ? error : label}
        </Typography>
      </InputLabel>
    </Box>
  );
};

export { Input };
