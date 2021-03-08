import { FormikContextType } from 'formik';
import React from 'react';
import { theme } from '../../styles/theme';
import { Box } from '../box/box';
import { Logo } from '../icon/logo';
import { Input } from '../input';
import { Typography } from '../typography';

interface ContentProps {
  isCurrentStep: boolean;
  step: number;
  text: string;
  name: string;
  label: string;
  formik: FormikContextType<any>;
  type?: string;
  isLogin?: boolean;
  isLoading?: boolean;
}

const Content: React.FunctionComponent<ContentProps> = ({
  isCurrentStep,
  isLoading,
  isLogin = false,
  step,
  text,
  name,
  label,
  type,
  formik,
}: ContentProps) => {
  const totalSteps = isLogin ? 2 : 4;
  // login starts at position translateX(50%) and step 2 translateX(-50%)
  // signup starts at position translateX(150%) and step 2 translateX(50%)
  const translateX = `${(0.5 * (totalSteps - 1) - 1 * (step - 1)) * 100}%`;

  return (
    <Box
      flexDirection="column"
      height="100%"
      width={225}
      pt="three"
      pb="threePointFive"
      position="relative"
    >
      {isLoading ? (
        <Box
          width="100%"
          style={{
            transform: `translateX(${translateX})`,
          }}
        >
          <Logo animated />
        </Box>
      ) : (
        <Box
          flexDirection="column"
          width="100%"
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
          <Input name={name} label={label} type={type} formik={formik} />
        </Box>
      )}
    </Box>
  );
};

export { Content };
