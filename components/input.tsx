import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Box } from './box/box';
import { Typography } from './typography';

const InputField = styled(Field)``;

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
  textAlign?: 'left' | 'center';
  placeholder?: string;
}

const Input = ({
  formik,
  name,
  type,
  label,
  textAlign = 'center',
  placeholder,
}: InputProps) => {
  const error = formik.errors[name];
  return (
    <Box flexDirection="column" width="100%" position="relative">
      <InputField
        name={name}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: theme.space.zeroPointFour,
          paddingTop: theme.space.zero,
          textAlign,
          outline: 'none',
          border: 'none',
          borderBottom: theme.borders.regularBlack,
          background: 'transparent',
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
