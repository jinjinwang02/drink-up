import React from 'react';

interface EditProps {
  width?: number;
}

const Edit: React.FC<EditProps> = ({ width = 16 }: EditProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 67.23 67.23"
    fill="none"
    stroke="#000"
    height={width}
    width={width}
  >
    <path
      fill="#000"
      stroke="#000"
      strokeMiterlimit={10}
      d="M17.9,42.43v7.51h7.53l21.8-22L39.7,20.41ZM53,22.2a1.91,1.91,0,0,0,.07-2.71L53,19.42l-4.56-4.55a1.91,1.91,0,0,0-2.71-.07l-.06.07-3.57,3.56L49.61,26C49.42,26,53,22.2,53,22.2Z"
    />
    <circle fill="none" strokeWidth={3} cx="33.61" cy="33.61" r="32.11" />
  </svg>
);

export { Edit };
