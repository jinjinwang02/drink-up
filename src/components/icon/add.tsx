import css from '@styled-system/css';
import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const Add: React.FC = () => {
  const { isXS } = useMediaQuery();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 66.23 66.23"
      fill="none"
      stroke="#000"
      height={isXS ? 24 : 29}
      width={isXS ? 24 : 29}
      // this controls the stroke width in `line` only
      strokeWidth={3}
      css={css({
        '&:hover': {
          strokeWidth: 4,
        },
      })}
    >
      <circle strokeWidth={2} cx="33.12" cy="33.12" r="32.11" />
      <line x1="15.61" y1="33.68" x2="50.62" y2="33.68" />
      <line x1="33.07" y1="16.18" x2="33.07" y2="51.19" />
    </svg>
  );
};

export { Add };
