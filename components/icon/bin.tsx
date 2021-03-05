import React, { useState } from 'react';
import { theme } from '../../styles/theme';
import { ArrowProps, getHeight } from './arrow';
import { Box } from '../box/box';

interface BinProps {
  size?: 'large' | 'small';
}

const Bin = ({ size = 'large' }: BinProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  return (
    <Box
      style={{ cursor: 'pointer' }}
      flexDirection="column"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <Box
        mb="zeroPointOne"
        style={{
          transform: isHovered ? 'rotate(-8deg)' : 'rotate(0deg)',
          transformOrigin: 'bottom left',
        }}
        transition={theme.transitions.medium}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 51.05 11.53"
          height={size === 'large' ? 5 : 3}
          fill="none"
          stroke="#000"
          strokeWidth={2.5}
          strokeMiterlimit={10}
        >
          <path d="M.38,4H13L16.54.38h18L38.1,4H50.67v7.18H.38Z" />
        </svg>
      </Box>
      <Box>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 43.86 51.99"
          height={size === 'large' ? 22 : 16}
          fill="none"
          stroke="#000"
          strokeWidth={2.5}
          strokeMiterlimit={10}
        >
          <path d="M43.49,45.93V.38H.38V45.94a5.67,5.67,0,0,0,5.67,5.67H37.81A5.68,5.68,0,0,0,43.49,45.93ZM21.93,7V44.21M8.7,7V44.21M35.4,7V44.21" />
        </svg>
      </Box>
    </Box>
  );
};

export { Bin };
