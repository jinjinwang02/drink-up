import { useSpring } from '@react-spring/core';
import React, { useState } from 'react';
import { ButtonProps } from '../../interfaces';
import { AnimatedBox } from '../box/animatedBox';
import { Cloud } from '../icon/cloud';
import { Typography } from '../typography';
import { ButtonContainer } from './button-container';

export interface CloudButtonProps extends ButtonProps {
  children: string;
  borderless?: boolean;
}

const CloudButton: React.FC<CloudButtonProps> = ({
  children,
  borderless,
  ...props
}: CloudButtonProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  const transformProps = useSpring({
    to: {
      transform: isHovered
        ? 'translate(-50%, 2%) scale(1.05)'
        : 'translate(-50%, 2%) scale(1)',
    },
  });
  return (
    <ButtonContainer
      {...props}
      flexDirection="column"
      border={borderless ? 'none' : 'regularBlack'}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <AnimatedBox
        position="absolute"
        width="110%"
        left="50%"
        style={transformProps}
        zIndex={-1}
      >
        <Cloud width="100%" />
      </AnimatedBox>
      <Typography
        py={['zeroPointTwo', 'zero']}
        px={borderless ? 'four' : ['zeroPointSix', 'one']}
        textStyle={borderless ? 'copyL' : ['copyXLBold', 'h4', 'h4', 'h4']}
      >
        {children}
      </Typography>
    </ButtonContainer>
  );
};

export { CloudButton };
