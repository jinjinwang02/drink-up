import React from 'react';
import { Box } from './box/box';

export interface IconProps {
  variant?: 'big' | 'small';
  cta?: string;
}

const Cloud = ({ variant = 'big', cta }: IconProps) => {
  return variant === 'big' ? (
    <Box width="100%">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 324.11 75.97"
        fill="#EDEDED" // lightest grey
        preserveAspectRatio="none"
      >
        <path
          d="M0,33.1c0,0,0.23-17.48,21.59-21.52s216.18-10.73,269.19-1.34s33.73,43.54,4.43,50.6
	s-139.75,8.17-191.84,6.51C51.28,65.69-0.61,63.48,0,33.1"
        />
      </svg>
    </Box>
  ) : (
    <Box>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 145.839 60.325"
        fill="#EDEDED"
        height={60}
        width={cta === 'log in' ? 145 : 160}
        preserveAspectRatio="none"
      >
        <path d="M0.024,26.434s.1-16.86,9.716-20.754,97.273-10.348,121.126-1.286,15.175,41.992,1.992,48.79-62.881,7.881-86.321,6.284-46.788-3.735-46.513-33.034" />
      </svg>
    </Box>
  );
};

export { Cloud };
