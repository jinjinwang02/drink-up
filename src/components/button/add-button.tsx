import React, { useState } from 'react';
import { useSpring } from '@react-spring/core';
import { ButtonProps } from '../../interfaces';
import { Add } from '../icon/add';
import { ButtonContainer } from './button-container';
import { AnimatedBox } from '../box/animatedBox';

const AddButton: React.FC<ButtonProps> = (props: ButtonProps) => {
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
        <Add />
      </AnimatedBox>
    </ButtonContainer>
  );
};

export { AddButton };
