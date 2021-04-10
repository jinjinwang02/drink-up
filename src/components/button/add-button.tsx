import React, { useState } from 'react';
import { ButtonProps } from '../../interfaces';
import { theme } from '../../styles/theme';
import { Add } from '../icon/add';
import { ButtonContainer } from './button-container';

const AddButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  return (
    <ButtonContainer
      {...props}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      additionalStyles={{
        transition: theme.transitions.curve.slow,
        transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
      }}
    >
      <Add />
    </ButtonContainer>
  );
};

export { AddButton };
