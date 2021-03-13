import React, { useState } from 'react';
import { theme } from '../../styles/theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Box } from '../box/box';

type Size = 'extraLarge' | 'large' | 'medium' | 'small';
export interface ArrowProps {
  direction?: 'left' | 'right';
  size?: Size;
}

export const getHeight: (size: Size) => 18 | 12 | 28 | 15 | undefined = (
  size: Size
) => {
  if (size === 'medium') {
    return 15;
  } else if (size === 'small') {
    return 12;
  } else if (size === 'large') {
    return 18;
  } else if (size === 'extraLarge') {
    return 28;
  }
};

const Arrow: React.FC<ArrowProps> = ({
  direction = 'right',
  size = 'medium',
}: ArrowProps) => {
  const isXS = useMediaQuery();
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
      style={{
        transform: getTranslate(),
        cursor: 'pointer',
      }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      transition={theme.transitions.medium}
    >
      <svg
        viewBox="0 0 75.66 52.81"
        height={getHeight(isXS ? 'medium' : size)}
        fill="none"
        stroke="#000"
        strokeWidth={size === 'extraLarge' ? 2 : 2.5}
        style={{
          transform: direction === 'left' ? 'rotate(180deg)' : 'rotate(0)',
        }}
      >
        <path d="M0.93,26.19l73.42-0.01 M47.04,51.99l27.3-25.81L47.28,0.88" />
      </svg>
    </Box>
  );
};

export { Arrow };