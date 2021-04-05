import React from 'react';

interface WaterProps {
  width?: number;
}

const Water: React.FC<WaterProps> = ({ width = 16 }: WaterProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 66.23 66.23"
    fill="#87bdd1"
    width={width}
  >
    <path d="M0,40.84a18.76,18.76,0,0,1,1.47-7.29H1.42L1.71,33a17.84,17.84,0,0,1,1-1.83L19.22,0,35.75,31.16a17.76,17.76,0,0,1,1,1.83l.3.56H37a18.58,18.58,0,0,1,1.47,7.29,19.09,19.09,0,0,1-19.22,19A19.09,19.09,0,0,1,0,40.84Z" />
  </svg>
);

export { Water };
