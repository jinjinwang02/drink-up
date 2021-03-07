import React from 'react';
import { Box } from '../box/box';
import styled, { keyframes, css } from 'styled-components';

const firstPath = 'M57.71,81.58s-37.55-15.71-53.26,0';
const secondPath =
  'M31.29,74.31a7.2,7.2,0,0,1,.83-.06,5.06,5.06,0,0,1,2.24.49c1.75-4.81,3.36-16.94,3-25.25a5.07,5.07,0,0,1-2.14.44h-.11A61.18,61.18,0,0,1,31.29,74.31Z';
const thirdPath =
  'M56.4,9a41.82,41.82,0,0,1-1.86,21.9c-2.08,5.47-7.31,14.91-19,16.63a26,26,0,0,1-3.9.28h-.89c-17.72-.53-24.2-11.87-26.56-20a17.29,17.29,0,0,0,4.14.47A30.47,30.47,0,0,0,15,27.39,14.51,14.51,0,0,1,18.25,27c7.85,0,12.51,7.21,13.37,8.65a3.15,3.15,0,0,0,5.86-1.39c.93-12.86,4.37-16.83,13.57-21.59A21.34,21.34,0,0,0,56.4,9M55.58,0s4,4.9-5.9,10-14.16,9.76-15.19,24a.16.16,0,0,1-.16.15.16.16,0,0,1-.13-.08C33,32.11,27.63,24,18.25,24a17.63,17.63,0,0,0-3.9.45,27,27,0,0,1-6,.76C3,25.22,1,22.91.3,21.51a.16.16,0,0,0-.14-.09.15.15,0,0,0-.16.17C.52,27,4.26,50,30.7,50.75h1A30.26,30.26,0,0,0,36,50.45C61.16,46.74,64.67,10.85,55.58,0Z';

const line = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const StyledFirstLine = styled.path`
  stroke-dasharray: 55;
  stroke-dashoffset: 55;
  animation: ${line} 0.6s ease forwards;
`;

const StyledSecondLine = styled.path`
  stroke-dasharray: 55;
  stroke-dashoffset: 55;
  animation: ${line} 0.6s ease forwards 0.4s;
`;

const StyledThirdLine = styled.path`
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  animation: ${line} 2.2s ease forwards 1s;
`;

export interface IconProps {
  height?: number | string;
  width?: number | string;
  strokeWidth?: number;
  animated?: boolean;
}

const Logo = ({
  height = '100%',
  width = '100%',
  strokeWidth = 3,
  animated = false,
}: IconProps) => (
  <Box width={width} height={height}>
    <svg
      viewBox="0 0 66.14 89.96"
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
    >
      {animated ? (
        <>
          <StyledFirstLine strokeWidth={strokeWidth + 3} d={firstPath} />
          <StyledSecondLine strokeWidth={strokeWidth} d={secondPath} />
          <StyledThirdLine strokeWidth={strokeWidth} d={thirdPath} />
        </>
      ) : (
        <>
          <path strokeWidth={strokeWidth + 3} d={firstPath} />
          <path strokeWidth={strokeWidth} d={secondPath} />
          <path strokeWidth={strokeWidth} d={thirdPath} />
        </>
      )}
    </svg>
  </Box>
);

export { Logo };
