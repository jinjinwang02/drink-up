import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export interface AddProps {
  size?: 'sm' | 'md';
}

const Add: React.FC<AddProps> = ({ size = 'md' }: AddProps) => {
  const { isXS } = useMediaQuery();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 66.23 66.23"
      fill="none"
      stroke="#000"
      height={isXS ? 24 : size === 'sm' ? 20 : 29}
      width={isXS ? 24 : size === 'sm' ? 20 : 29}
    >
      <circle strokeWidth={2} cx="33.12" cy="33.12" r="32.11" />
      <line strokeWidth={3} x1="15.61" y1="33.68" x2="50.62" y2="33.68" />
      <line strokeWidth={3} x1="33.07" y1="16.18" x2="33.07" y2="51.19" />
    </svg>
  );
};

export { Add };
