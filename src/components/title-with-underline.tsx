import React from 'react';
import { Box } from './box/box';
import { Typography } from './typography';
import { Underline } from './icon/underline';

export interface TitleWithUnderlineProps {
  children: string;
  width: number;
  variant?: 'primary' | 'secondary';
}

const TitleWithUnderline: React.FC<TitleWithUnderlineProps> = ({
  children,
  variant = 'secondary',
  width,
}: TitleWithUnderlineProps) => (
  <Box flexDirection="column">
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
      // width={variant === 'primary' ? '110%' : ['115%', '120%']}
      top={variant === 'primary' ? 'three' : ['four', 'fourPointFive']}
      left="50%"
      style={{ transform: 'translateX(-50%)' }}
    >
      <Underline variant={variant} width={width} />
    </Box>
  </Box>
);

export { TitleWithUnderline };
