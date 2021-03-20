import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

type Size = 'extraLarge' | 'large' | 'medium' | 'small';
export interface ArrowProps {
  direction?: 'left' | 'right';
  size?: Size;
  color?: string;
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
  color,
}: ArrowProps) => {
  const isXS = useMediaQuery();
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 75.66 52.81"
      height={getHeight(isXS ? 'medium' : size)}
      fill="none"
      stroke={color}
      strokeWidth={size === 'extraLarge' ? 2 : 2.5}
      style={{
        transform: direction === 'left' ? 'rotate(180deg)' : 'rotate(0)',
      }}
    >
      <path d="M0.93,26.19l73.42-0.01 M47.04,51.99l27.3-25.81L47.28,0.88" />
    </svg>
  );
};

export { Arrow };
