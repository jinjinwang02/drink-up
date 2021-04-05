import React from 'react';
import styled, { keyframes } from 'styled-components';
import { pathAnimation } from './logo';

interface WaterProps {
  width?: number;
  animated?: boolean;
}

const path =
  'M18.33,66c12.53,0,17.41-8.37,18.46-14.43a22.71,22.71,0,0,0,.32-4.93,35.79,35.79,0,0,0-4-15.48L19.56,4.42,6,31.11A35.94,35.94,0,0,0,2,46.59a23.36,23.36,0,0,0,.32,4.93C3.38,57.58,8.27,66,20.79,66';

const fillAnimation = keyframes`
  to {
    fill: #87bdd1;
  }
`;

const StyledPath = styled.path`
  stroke-dasharray: 155;
  stroke-dashoffset: 155;
  animation: ${pathAnimation} 1.2s ease forwards 0.2s;
`;
const StyledSvg = styled.svg`
  animation: ${fillAnimation} 0.4s ease forwards 1.4s;
`;

const Water: React.FC<WaterProps> = ({ width = 10, animated }: WaterProps) =>
  animated ? (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39.13 67.95"
      fill="#fff"
      stroke="#87bdd1"
      width={width}
      strokeMiterlimit={10}
    >
      <StyledPath strokeWidth={4} d={path} />
    </StyledSvg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 43.13 67.95"
      fill="#87bdd1"
      width={width}
    >
      <path d={path} />
    </svg>
  );

export { Water };
