import React from 'react';
import { ButtonProps } from '../../interfaces';
import { Box } from '../box/box';
import { Water } from '../icon/water';
import { ButtonContainer } from './button-container';

export interface CircleBoxProps extends Omit<ButtonProps, 'onClick'> {
  onClick: () => void;
  isChecked: boolean;
  isSubmitting?: boolean;
}

const CircleButton: React.FC<CircleBoxProps> = ({
  isChecked,
  isSubmitting,
  onClick,
  ...props
}: CircleBoxProps) => (
  <ButtonContainer
    {...props}
    onClick={onClick}
    disabled={isSubmitting || isChecked}
  >
    {isChecked ? (
      <Box px="zeroPointFour">
        <Water width={12} />
      </Box>
    ) : isSubmitting ? (
      <Box px="zeroPointFour">
        <Water width={12} isAnimated />
      </Box>
    ) : (
      <Box border="blue" height={20} width={20} borderRadius={20} />
    )}
  </ButtonContainer>
);

export { CircleButton };
