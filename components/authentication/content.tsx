import React from 'react';
import { theme } from '../../styles/theme';
import { Box } from '../box/box';
import { InputWithLabel } from '../input-with-label';
import { Typography } from '../typography';

interface ContentProps {
  isCurrentStep: boolean;
  text: string;
  name: string;
  label: string;
  formik: any;
  type?: string;
  zIndex?: number;
  translateXPosition?: string;
}

const Content = ({
  isCurrentStep,
  text,
  name,
  label,
  type,
  zIndex,
  formik,
  translateXPosition,
}: ContentProps) => {
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
          transform: translateXPosition,
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
