import React from 'react';
import { Box } from '../box/box';
import { Cloud } from '../cloud';
import { Typography } from '../typography';

export interface CloudButtonProps {
  cta: string;
  onClick?: () => void;
}

const CloudButton = ({ cta, onClick }: CloudButtonProps) => {
  return (
    <Box flexDirection="column" alignItems="center" onClick={onClick}>
      <Box
        position="absolute"
        height="100%"
        width="100%"
        top={0}
        left={0}
        zIndex={-1}
      >
        <Cloud variant="small" cta={cta} />
      </Box>
      <Typography px="five" textStyle="copyL">
        {cta}
      </Typography>
    </Box>
  );
};

export { CloudButton };
