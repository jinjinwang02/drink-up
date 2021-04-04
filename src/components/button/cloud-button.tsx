import React, { useState } from 'react';
import { ButtonProps } from '../../interfaces';
import { theme } from '../../styles/theme';
import { Box } from '../box/box';
import { Cloud } from '../icon/cloud';
import { Typography } from '../typography';
import { ButtonContainer } from './button-container';

export interface CloudButtonProps extends ButtonProps {
  children: string;
  borderless?: boolean;
}

const CloudButton: React.FC<CloudButtonProps> = ({
  children,
  borderless,
  ...props
}: CloudButtonProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  return (
    <ButtonContainer
      {...props}
      flexDirection="column"
      border={borderless ? 'none' : 'regularBlack'}
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
    </ButtonContainer>
  );
};

export { CloudButton };
