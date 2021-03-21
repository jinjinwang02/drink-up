import { Field } from 'formik';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { usePlantContext } from '../context/plant-context';
import { theme } from '../styles/theme';
import { Box } from './box/box';
import { Typography } from './typography';

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
    props.hasInput
      ? 'scale(0.8) translateY(35px)'
      : 'scale(1) translateY(-5px)'};
  ${InputField}:focus + & {
    transform: scale(0.8) translateY(35px);
  }
`;

export interface InputProps {
  formik: any;
  id: string;
  name: string;
  type?: string;
  label?: string;
  dateValue?: string;
  inputTextStyle?: string | string[];
  inputTextAlign?: 'left' | 'center';
  placeholder?: string;
  placeholderSize?: number;
  onChange?: () => void;
}

const Input: React.FC<InputProps> = ({
  formik,
  id,
  name,
  type = 'text',
  label,
  dateValue,
  inputTextAlign = 'center',
  inputTextStyle,
  placeholder,
  placeholderSize,
}: InputProps) => {
  const {
    plantCollection,
    plantCollectionWithInputs,
    setPlantCollectionWithInputs,
  } = usePlantContext();
  const error = formik.errors[name];

  const handleBlur = useCallback(
    (id) => {
      // find the plant in edit in collection
      // and add the input to the plant object
      if (plantCollection.map((el) => el.id).includes(id)) {
        const currentPlant = plantCollectionWithInputs.filter(
          (el) => el.id === id
        )[0];
        setPlantCollectionWithInputs((prev) => [
          ...prev.filter((el) => el !== currentPlant),
          { ...currentPlant, [name]: formik.values[name] },
        ]);
      }
    },
    [
      formik.values,
      name,
      plantCollection,
      plantCollectionWithInputs,
      setPlantCollectionWithInputs,
    ]
  );

  return (
    <Box flexDirection="column" width="100%" position="relative">
      <InputField
        id={id}
        onBlur={() => handleBlur(id)}
        name={name}
        value={name === 'lastWateredOn' ? dateValue : formik.values[name]}
        disabled={name === 'lastWateredOn'}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        placeholdersize={placeholderSize}
        textstyle={inputTextStyle}
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
