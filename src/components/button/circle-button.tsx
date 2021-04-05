import React from 'react';
import { ButtonProps } from '../../interfaces';
import { Box } from '../box/box';
import { Water } from '../icon/water';
import { ButtonContainer } from './button-container';

export interface CircleBoxProps extends ButtonProps {
  checked: boolean;
}

const CircleButton: React.FC<CircleBoxProps> = ({
  checked,
  ...props
}: CircleBoxProps) =>
  checked ? (
    <Box pb="zeroPointFour" pr="onePointFour">
      <Water width={12} animated />
    </Box>
  ) : (
    <ButtonContainer {...props}>
      <Box border="blue" height={20} width={20} borderRadius={20} />
    </ButtonContainer>
  );

export { CircleButton };
