import React from 'react';
import { Box } from '../box/box';

type Size = 'extraLarge' | 'large' | 'medium' | 'small';
export interface ArrowProps {
  direction?: 'left' | 'right';
  size?: Size;
  color?: string;
}

export const getHeight: (size: Size) => 12 | 15 | 20 | 28 = (size: Size) => {
  switch (size) {
    case 'small':
      return 12;
    case 'medium':
      return 15;
    case 'large':
      return 20;
    case 'extraLarge':
      return 28;
    default:
      return 15;
  }
};

const Arrow: React.FC<ArrowProps> = ({
  direction = 'right',
  size = 'medium',
  color,
}: ArrowProps) => (
  <Box height={[getHeight('medium'), getHeight(size)]}>
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 75.66 52.81"
      height="100%"
      fill="none"
      stroke={color}
      strokeWidth={size === 'extraLarge' ? 2 : 2.5}
      style={{
        transform: direction === 'left' ? 'rotate(180deg)' : 'rotate(0)',
      }}
    >
      <path d="M0.93,26.19l73.42-0.01 M47.04,51.99l27.3-25.81L47.28,0.88" />
    </svg>
  </Box>
);

export { Arrow };
