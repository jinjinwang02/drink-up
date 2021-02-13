import React, { useState } from 'react';
import { Box } from './box/box';
import { Cloud } from './cloud';
import { Typography } from './typography';

export interface ButtonProps {
  children: string;
  borderless?: boolean;
  onClick?: () => void;
}

const Button = ({ children, borderless, onClick }: ButtonProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      role="button"
      border={borderless ? undefined : 'regularBlack'}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <Box
        position="absolute"
        width="110%"
        left="50%"
        style={{
          transform: isHovered
            ? 'translate(-50%, 2%) scale(1.05)'
            : 'translate(-50%, 2%)',
        }}
        zIndex={-1}
      >
        <Cloud />
      </Box>
      <Typography
        py={['zeroPointFour', 'zero']}
        px={borderless ? 'five' : 'one'}
        textStyle={borderless ? 'copyL' : ['copyLBold', 'h4', 'h4', 'h4']}
      >
        {children}
      </Typography>
    </Box>
  );
};

export { Button };
