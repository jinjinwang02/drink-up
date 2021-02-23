import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { Box } from './box/box';

export interface ArrowProps {
  direction?: 'left' | 'right';
  size?: 'large' | 'medium' | 'small';
}

const Arrow = ({ direction = 'right', size = 'medium' }: ArrowProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  const getTranslate = () => {
    if (isHovered) {
      if (size === 'small') {
        return direction === 'right' ? 'translateX(20%)' : 'translateX(-20%)';
      } else if (size === 'medium') {
        return direction === 'right' ? 'translateX(25%)' : 'translateX(-25%)';
      } else if (size === 'large') {
        return direction === 'right' ? 'translateX(15%)' : 'translateX(-15%)';
      }
    }
    return 'translateX(0)';
  };
  const getHeight = () => {
    if (size === 'medium') {
      return 15;
    } else if (size === 'small') {
      return 12;
    } else if (size === 'large') {
      return 28;
    }
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
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 75.66 52.81"
        height={getHeight()}
        fill="none"
        stroke="#000"
        strokeWidth={size === 'small' || size === 'medium' ? 3 : 2}
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
