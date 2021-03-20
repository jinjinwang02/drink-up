import React from 'react';
import { Arrow, ArrowProps } from '../icon/arrow';
import { Box } from '../box/box';
import { theme } from '../../styles/theme';

interface ArrowButtonProps extends ArrowProps {
  onClick?: () => void;
  disabled?: boolean;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  size,
  disabled,
  onClick,
}: ArrowButtonProps) => (
  <Box
    as="button"
    type="submit"
    background="transparent"
    border="none"
    disabled={disabled}
    style={{ outline: 'none' }}
    onClick={onClick}
  >
    <Arrow
      direction={direction}
      color={disabled ? theme.colors.mediumGrey : theme.colors.pureBlack}
      size={size}
    />
  </Box>
);

export { ArrowButton };
