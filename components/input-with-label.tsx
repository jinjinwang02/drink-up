import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Box } from './box/box';
import { Typography } from './typography';

const Input = styled(Field)``;

const InputLabel = styled(Typography)`
  transform: ${(props) =>
    props.hasInput
      ? 'scale(0.8) translateY(-60%)'
      : 'scale(1) translateY(-230%)'};
  ${Input}:focus + & {
    transform: scale(0.8) translateY(-60%);
  }
`;

export interface InputWithLabelProps {
  formik: any;
  name: string;
  label: string;
}

const InputWithLabel = ({ formik, name, label }: InputWithLabelProps) => {
  return (
    <Box flexDirection="column" width="100%">
      <Input
        name={name}
        autoComplete="off"
        style={{
          width: '100%',
          padding: theme.space.zeroPointSix,
          marginBottom: theme.space.onePointSix,
          textAlign: 'center',
          outline: 'none',
          border: 'none',
          borderBottom: theme.borders.regularBlack,
          background: 'transparent',
        }}
      />
      <InputLabel
        position="absolute"
        textStyle="bodyL"
        color="darkGrey"
        zIndex={-1}
        transition={theme.transitions.slow}
        hasInput={formik.values[name].length}
      >
        {label}
      </InputLabel>
    </Box>
  );
};

export { InputWithLabel };
