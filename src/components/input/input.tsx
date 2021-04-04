import { Field, FormikContextType } from 'formik';
import React, { useCallback } from 'react';
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
    props.hasInput
      ? 'scale(0.8) translateY(35px)'
      : 'scale(1) translateY(-5px)'};
  ${InputField}:focus + & {
    transform: scale(0.8) translateY(35px);
  }
`;

export interface InputProps {
  formik: FormikContextType<any>;
  plantId?: string;
  name: string;
  type?: string;
  label?: string;
  inputTextAlign?: 'left' | 'center';
  placeholder?: string;
  placeholderSize?: number;
}

const Input: React.FC<InputProps> = ({
  formik,
  plantId,
  name,
  type = 'text',
  label,
  inputTextAlign = 'center',
  placeholder,
  placeholderSize,
}: InputProps) => {
  const {
    plantCollection,
    plantCollectionWithInputs,
    setPlantCollectionWithInputs,
  } = usePlantContext();
  const error = formik.errors[name];

  const handleBlur = useCallback(() => {
    // find the plant in edit in collection
    // and add the input to the plant object
    if (!plantId) return;
    if (plantCollection.map((el) => el.id).includes(plantId)) {
      const currentPlant = plantCollectionWithInputs.filter(
        (el) => el.id === plantId
      )[0];
      setPlantCollectionWithInputs((prev) => [
        ...prev.filter((el) => el !== currentPlant),
        { ...currentPlant, [name]: formik.values[name] },
      ]);
    }
  }, [
    formik.values,
    name,
    plantCollection,
    plantCollectionWithInputs,
    plantId,
    setPlantCollectionWithInputs,
  ]);

  return (
    <Box flexDirection="column" width="100%" position="relative">
      <InputField
        onBlur={handleBlur}
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
