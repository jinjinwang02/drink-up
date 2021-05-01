import React, { useState } from 'react';
import { Typography } from './typography';
import { Box } from './box/box';
import { useSpring } from '@react-spring/core';
import { AnimatedBox } from './box/animatedBox';

export interface TextWithAnimatedUnderlineProps {
  children: string;
  focused: boolean;
  backgroundColor?: string;
  onClick?: () => void;
}

const TextWithAnimatedUnderline: React.FC<TextWithAnimatedUnderlineProps> = ({
  children,
  focused,
  backgroundColor = 'pureWhite',
  onClick,
}: TextWithAnimatedUnderlineProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  const props = useSpring({
    from: { transform: 'scaleX(0)' },
    to: {
      transform: isHovered || focused ? 'scaleX(1)' : 'scaleX(0)',
      transformOrigin: isHovered || focused ? 'left' : 'right',
    },
  });
  return (
    <Box
      flexDirection="column"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <Typography textStyle="copyL">{children}</Typography>
      <AnimatedBox
        position="absolute"
        top="30%"
        height="40%"
        zIndex={-1}
        width="120%"
        backgroundColor={backgroundColor}
        style={props}
      />
    </Box>
  );
};

export { TextWithAnimatedUnderline };
