import { useSpring } from '@react-spring/core';
import React from 'react';
import { AnimatedBox } from '../box/animatedBox';
import { Box } from '../box/box';
import { Logo } from '../icon/logo';
import { Input } from '../input/input';
import { Typography } from '../typography';

interface ContentProps {
  isCurrentStep: boolean;
  step: number;
  text: string;
  name: string;
  label: string;
  type?: string;
  isLogin?: boolean;
  isLoading?: boolean;
}

const Content: React.FC<ContentProps> = ({
  isCurrentStep,
  isLoading,
  isLogin = false,
  step,
  text,
  name,
  label,
  type,
}: ContentProps) => {
  const totalSteps = isLogin ? 2 : 4;
  // login starts at position translateX(50%) and step 2 translateX(-50%)
  // signup starts at position translateX(150%) and step 2 translateX(50%)
  const translateX = `${(0.5 * (totalSteps - 1) - 1 * (step - 1)) * 100}%`;
  const slideProps = useSpring({
    to: {
      transform: `translateX(${translateX})`,
      opacity: isCurrentStep ? 1 : 0,
    },
  });
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
        <Box width="100%" style={{ transform: `translateX(${translateX})` }}>
          <Logo animated />
        </Box>
      ) : (
        <AnimatedBox
          flexDirection="column"
          width="100%"
          style={slideProps}
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
          <Input name={name} label={label} type={type} />
        </AnimatedBox>
      )}
    </Box>
  );
};

export { Content };
