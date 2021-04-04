import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const Cross: React.FC = () => {
  const isXS = useMediaQuery();
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 51.82 51.3"
      height={isXS ? 14 : 18}
      fill="none"
      stroke="#000"
      strokeWidth={3}
      strokeMiterlimit={10}
    >
      <path d="M51.47.36.35,51M.35.36,51.47,51" />
    </svg>
  );
};

export { Cross };
