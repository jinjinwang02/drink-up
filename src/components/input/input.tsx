import { Field, useField } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { usePlantContext } from '../../context/plant-context';
import { theme } from '../../styles/theme';
import { blockInvalidChar } from '../../utils';
import { Box } from '../box/box';
import { Typography } from '../typography';

const InputField = styled(Field)`
  ::placeholder {
    font-size: ${(props) => props.placeholdersize}px;
  }
  @media ${theme.device.mobile} {
    font-style: ${theme.textStyles.bodyM};
  }
`;

const InputLabel = styled(Box)`
  transform: ${(props) =>
    (props.hasInput && props.isLabel) || !props.isLabel
      ? 'scale(0.8) translateY(35px)'
      : 'scale(1) translateY(-5px)'};
  ${InputField}:focus + & {
    transform: scale(0.8) translateY(35px);
  }
`;

export interface InputProps {
  plantId?: string;
  name: string;
  type?: string;
  label?: string;
  inputTextAlign?: 'left' | 'center';
  placeholder?: string;
  placeholderSize?: number;
}

const Input: React.FC<InputProps> = ({
  plantId,
  name,
  type = 'text',
  label,
  inputTextAlign = 'center',
  placeholder,
  placeholderSize,
}: InputProps) => {
  const { handleSetInput } = usePlantContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_field, meta] = useField(name);
  return (
    <Box flexDirection="column" width="100%" position="relative">
      <InputField
        onBlur={() => handleSetInput(plantId, name, meta.value)}
        onKeyDown={(e: KeyboardEvent) => blockInvalidChar(e, type)}
        name={name}
        disabled={name === 'lastWateredOn'}
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
          borderRadius: 0,
          background: 'transparent',
          color: 'black',
          cursor: name === 'lastWateredOn' ? 'pointer' : 'initial',
        }}
      />
      <InputLabel
        position="absolute"
        zIndex={-1}
        error={meta.error}
        transition={theme.transitions.basic.medium}
        hasInput={meta.value.length}
        isLabel={!meta.error}
      >
        <Typography
          textStyle="bodyL"
          textAlign="center"
          color={meta.error ? 'red' : 'darkGrey'}
        >
          {meta.error ? meta.error : label}
        </Typography>
      </InputLabel>
    </Box>
  );
};

export { Input };
