import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Box } from '../box/box';

interface CloudProps {
  allowXS?: boolean;
  width?: number | number[];
}

const Cloud: React.FC<CloudProps> = ({ width, allowXS = true }: CloudProps) => {
  const isXS = useMediaQuery();
  return (
    <Box width={width}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 324.11 75.97"
        width="100%"
        height={isXS && allowXS ? 70 : 76}
        fill="#EDEDED" // lightest grey
        preserveAspectRatio="none"
      >
        <path
          d="M0,33.1c0,0,0.23-17.48,21.59-21.52s216.18-10.73,269.19-1.34s33.73,43.54,4.43,50.6
	s-139.75,8.17-191.84,6.51C51.28,65.69-0.61,63.48,0,33.1"
        />
      </svg>
    </Box>
  );
};

export { Cloud };
