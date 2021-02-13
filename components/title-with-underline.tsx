import React from 'react';
import { Box } from './box/box';
import { Typography } from './typography';
import { Underline } from './underline';

export interface TitleWithUnderlineProps {
  children: string;
  variant?: 'primary' | 'secondary';
}

const TitleWithUnderline = ({
  children,
  variant = 'secondary',
}: TitleWithUnderlineProps) => {
  return (
    <Box ml={50} flexDirection="column">
      <Typography
        textStyle={
          variant === 'primary'
            ? ['copyXL', 'h2', 'h2', 'h2']
            : ['h2', 'h1', 'h1', 'h1']
        }
      >
        {children}
      </Typography>
      <Box
        position="absolute"
        width={variant === 'primary' ? '110%' : '120%'}
        top={variant === 'primary' ? 'three' : 'fourPointFive'}
        left="50%"
        style={{ transform: 'translateX(-50%)' }}
      >
        <Underline variant={variant} />
      </Box>
    </Box>
  );
};

export { TitleWithUnderline };
