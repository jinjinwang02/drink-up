import React, { useState } from 'react';
import { Typography } from './typography';
import { Box } from './box/box';
import { theme } from '../styles/theme';

export interface TextWithAnimatedUnderlineProps {
  children: string;
  focused: boolean;
  backgroundColor?: string;
  onClick?: () => void;
}

const TextWithAnimatedUnderline: React.FunctionComponent<TextWithAnimatedUnderlineProps> = ({
  children,
  focused,
  backgroundColor = 'pureWhite',
  onClick,
}: TextWithAnimatedUnderlineProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);

  return (
    <Box
      flexDirection="column"
      onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <Typography textStyle="copyL">{children}</Typography>
      <Box
        position="absolute"
        top="30%"
        height="40%"
        zIndex={-1}
        width="120%"
        backgroundColor={backgroundColor}
        style={{
          transform: isHovered || focused ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: isHovered ? 'right' : 'left',
        }}
        transition={theme.transitions.medium}
      />
    </Box>
  );
};

export { TextWithAnimatedUnderline };
