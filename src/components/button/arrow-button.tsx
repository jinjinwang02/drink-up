import React from 'react';
import { Arrow, ArrowProps } from '../icon/arrow';
import { Box } from '../box/box';

interface ArrowButtonProps extends ArrowProps {
  onClick?: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  size,
  onClick,
}: ArrowButtonProps) => (
  <Box
    as="button"
    type="submit"
    background="transparent"
    border="none"
    style={{ outline: 'none' }}
    onClick={onClick}
  >
    <Arrow direction={direction} size={size} />
  </Box>
);

export { ArrowButton };
