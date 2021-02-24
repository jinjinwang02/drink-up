import React from 'react';
import { theme } from '../../styles/theme';
import { Box } from '../box/box';
import { InputWithLabel } from '../input-with-label';
import { Typography } from '../typography';

interface ContentProps {
  isCurrentStep: boolean;
  isLogin: boolean;
  step: number;
  text: string;
  name: string;
  label: string;
  formik: any;
  type?: string;
  zIndex?: number;
}

const Content = ({
  isCurrentStep,
  isLogin,
  step,
  text,
  name,
  label,
  type,
  zIndex,
  formik,
}: ContentProps) => {
  const totalSteps = isLogin ? 2 : 4;
  // login starts at position translateX(50%) and step 2 translateX(-50%)
  // signup starts at position translateX(150%) and step 2 translateX(50%)
  const translateX = `${(0.5 * (totalSteps - 1) - 1 * (step - 1)) * 100}%`;

  return (
    <Box
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width={225}
      pt="three"
      pb="threePointFive"
      position="relative"
      zIndex={zIndex}
    >
      <Box
        flexDirection="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
        style={{
          transform: `translateX(${translateX})`,
          opacity: isCurrentStep ? 1 : 0,
        }}
        transition={theme.transitions.slow}
        mb="five"
        zIndex={2}
      >
        <Box height={75}>
          <Typography
            textStyle="copyM"
            textAlign="center"
            px="onePointFour"
            pb="two"
          >
            {text}
          </Typography>
        </Box>
        <Typography color="warningRed" textStyle="bodyM"></Typography>
        <InputWithLabel name={name} label={label} type={type} formik={formik} />
      </Box>
    </Box>
  );
};

export { Content };
