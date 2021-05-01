import { useSpring } from '@react-spring/core';
import React, { useState } from 'react';
import { ButtonProps } from '../../interfaces';
import { AnimatedBox } from '../box/animatedBox';
import { Cross } from '../icon/cross';
import { ButtonContainer } from './button-container';

const CrossButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  const rotateProps = useSpring({
    to: { transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)' },
  });
  return (
    <ButtonContainer
      {...props}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <AnimatedBox style={rotateProps}>
        <Cross />
      </AnimatedBox>
    </ButtonContainer>
  );
};

export { CrossButton };
