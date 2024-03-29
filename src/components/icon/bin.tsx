import React, { useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Box } from '../box/box';
import { useSpring } from '@react-spring/core';
import { AnimatedBox } from '../box/animatedBox';

const Bin: React.FC = () => {
  const { isXS } = useMediaQuery();
  const [isHovered, setHovered] = useState<boolean>(false);
  const rotateProps = useSpring({
    to: {
      transform: isHovered ? 'rotate(-8deg)' : 'rotate(0deg)',
      transformOrigin: 'bottom left',
    },
  });
  return (
    <Box
      flexDirection="column"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <AnimatedBox mb="zeroPointOne" style={rotateProps}>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 51.05 11.53"
          width={isXS ? 15 : 21}
          fill="none"
          stroke="#000"
          strokeWidth={isXS ? 3 : 2.5}
          strokeMiterlimit={10}
        >
          <path d="M.38,4H13L16.54.38h18L38.1,4H50.67v7.18H.38Z" />
        </svg>
      </AnimatedBox>
      <Box>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 43.86 51.99"
          height={isXS ? 16 : 21}
          fill="none"
          stroke="#000"
          strokeWidth={isXS ? 3 : 2.5}
          strokeMiterlimit={10}
        >
          <path d="M43.49,45.93V.38H.38V45.94a5.67,5.67,0,0,0,5.67,5.67H37.81A5.68,5.68,0,0,0,43.49,45.93ZM21.93,7V44.21M8.7,7V44.21M35.4,7V44.21" />
        </svg>
      </Box>
    </Box>
  );
};

export { Bin };
