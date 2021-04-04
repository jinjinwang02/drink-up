import React, { useState } from 'react';
import { ButtonProps } from '../../interfaces';
import { theme } from '../../styles/theme';
import { Cross } from '../icon/cross';
import { ButtonContainer } from './button-container';

const CrossButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  return (
    <ButtonContainer
      {...props}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      additionalStyles={{
        transition: theme.transitions.medium,
        transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
      }}
    >
      <Cross />
    </ButtonContainer>
  );
};

export { CrossButton };
