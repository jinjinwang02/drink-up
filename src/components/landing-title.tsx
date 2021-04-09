import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Box } from './box/box';
import { Logo } from './icon/logo';
import { TitleWithUnderline } from './title-with-underline';
import { Typography } from './typography';

const LandingTitle: React.FC = () => {
  const { isXS } = useMediaQuery();
  return (
    <Box
      flexDirection="column"
      alignItems={['flex-start', 'center', 'center', 'flex-start']}
      pb={['zero', 'eight', 'eight', 'zero']}
    >
      <Box pb="zeroPointFour">
        <Typography
          textStyle={['h2Brand', 'h2Brand', 'h1Brand']}
          mr={['two', 'three']}
        >
          DRINK UP
        </Typography>
        <Box pb={['zeroPointFour', 'one']}>
          <Logo size={isXS ? 'small' : 'medium'} />
        </Box>
      </Box>
      <TitleWithUnderline variant="secondary">
        A water reminder for your plants.
      </TitleWithUnderline>
    </Box>
  );
};

export { LandingTitle };
