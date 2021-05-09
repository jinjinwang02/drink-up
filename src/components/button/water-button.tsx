import React from 'react';
import { ButtonProps } from '../../interfaces';
import { theme } from '../../theme';
import { Box } from '../box/box';
import { Water } from '../icon/water';
import { ButtonContainer } from './button-container';

export interface WaterButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick: () => void;
  isChecked: boolean;
  isSubmitting?: boolean;
}

const WaterButton: React.FC<WaterButtonProps> = ({
  isChecked,
  isSubmitting,
  onClick,
  ...props
}: WaterButtonProps) => (
  <ButtonContainer
    {...props}
    onClick={onClick}
    disabled={isSubmitting || isChecked}
  >
    <Box px="zeroPointThree">
      {isChecked ? (
        <Water width={12} />
      ) : (
        <Water
          width={12}
          fill={isSubmitting ? theme.colors.pastelBlue : theme.colors.pureWhite}
          isAnimated={isSubmitting}
        />
      )}
    </Box>
  </ButtonContainer>
);

export { WaterButton };
