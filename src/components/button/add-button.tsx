import React, { useState } from 'react';
import { useSpring } from '@react-spring/core';
import { ButtonProps } from '../../interfaces';
import { Add, AddProps } from '../icon/add';
import { ButtonContainer } from './button-container';
import { AnimatedBox } from '../box/animatedBox';

export type AddButtonProps = ButtonProps & AddProps;

const AddButton: React.FC<AddButtonProps> = (props: AddButtonProps) => {
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
        <Add size={props.size} />
      </AnimatedBox>
    </ButtonContainer>
  );
};

export { AddButton };
