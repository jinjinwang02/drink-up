import React, { useState } from 'react';
import { Arrow, ArrowProps } from '../icon/arrow';
import { Box } from '../box/box';
import { theme } from '../../styles/theme';

interface ArrowButtonProps extends ArrowProps {
  onClick?: () => void;
  disabled?: boolean;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction = 'right',
  size = 'medium',
  disabled,
  onClick,
}: ArrowButtonProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  const getTranslate = () => {
    if (isHovered) {
      if (size === 'small') {
        return direction === 'right' ? 'translateX(20%)' : 'translateX(-20%)';
      } else if (size === 'medium') {
        return direction === 'right' ? 'translateX(25%)' : 'translateX(-25%)';
      } else if (size === 'large' || size === 'extraLarge') {
        return direction === 'right' ? 'translateX(15%)' : 'translateX(-15%)';
      }
    }
    return 'translateX(0)';
  };
  return (
    <Box
      as="button"
      type="submit"
      background="transparent"
      border="none"
      disabled={disabled}
      onClick={onClick}
      style={{
        transform: disabled ? undefined : getTranslate(),
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      transition={theme.transitions.medium}
    >
      <Arrow
        direction={direction}
        color={disabled ? theme.colors.mediumGrey : theme.colors.pureBlack}
        size={size}
      />
    </Box>
  );
};

export { ArrowButton };
