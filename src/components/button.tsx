import React, { useState } from 'react';
import { Arrow, ArrowProps } from './icon/arrow';
import { Box } from './box/box';
import { Cloud } from './icon/cloud';
import { Typography } from './typography';

export interface ButtonProps {
  children: string;
  borderless?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  borderless,
  onClick,
}: ButtonProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      role="button"
      border={borderless ? undefined : 'regularBlack'}
      onClick={onClick}
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
        py={['zeroPointTwo', 'zero']}
        px={borderless ? 'five' : ['zeroPointSix', 'one']}
        textStyle={borderless ? 'copyL' : ['copyXLBold', 'h4', 'h4', 'h4']}
      >
        {children}
      </Typography>
    </Box>
  );
};

const ArrowButton: React.FC<ArrowProps> = ({ direction, size }: ArrowProps) => (
  <Box
    as="button"
    type="submit"
    background="transparent"
    border="none"
    style={{ outline: 'none' }}
  >
    <Arrow direction={direction} size={size} />
  </Box>
);

export { Button, ArrowButton };
