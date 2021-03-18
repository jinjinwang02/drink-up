import React, { useState } from 'react';
import { theme } from '../../styles/theme';
import { Box } from '../box/box';
import { Cloud } from '../icon/cloud';
import { Typography } from '../typography';

export interface CloudButtonProps {
  children: string;
  borderless?: boolean;
  onClick?: () => void;
}

const CloudButton: React.FC<CloudButtonProps> = ({
  children,
  borderless,
  onClick,
}: CloudButtonProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      role="button"
      border={borderless ? 'none' : 'regularBlack'}
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
        transition={theme.transitions.medium}
        zIndex={-1}
      >
        <Cloud />
      </Box>
      <Typography
        py={['zeroPointTwo', 'zero']}
        px={borderless ? 'four' : ['zeroPointSix', 'one']}
        textStyle={borderless ? 'copyL' : ['copyXLBold', 'h4', 'h4', 'h4']}
      >
        {children}
      </Typography>
    </Box>
  );
};

export { CloudButton };
