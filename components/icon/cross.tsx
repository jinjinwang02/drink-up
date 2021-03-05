import React, { useState } from 'react';
import { theme } from '../../styles/theme';
import { ArrowProps, getHeight } from './arrow';
import { Box } from '../box/box';

type CrossProps = Pick<ArrowProps, 'size'>;

const Cross = ({ size = 'large' }: CrossProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  return (
    <Box
      style={{
        transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
        cursor: 'pointer',
      }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      transition={theme.transitions.medium}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 51.82 51.3"
        height={getHeight(size)}
        fill="none"
        stroke="#000"
        strokeWidth={3}
        strokeMiterlimit={10}
      >
        <path d="M51.47.36.35,51M.35.36,51.47,51" />
      </svg>
    </Box>
  );
};

export { Cross };
