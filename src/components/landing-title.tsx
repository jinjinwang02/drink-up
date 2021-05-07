import React from 'react';
import { useSpring } from 'react-spring';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { AnimatedBox } from './box/animatedBox';
import { Box } from './box/box';
import { Logo } from './icon/logo';
import { TitleWithUnderline } from './title-with-underline';
import { Typography } from './typography';

const LandingTitle: React.FC = () => {
  const { isXS } = useMediaQuery();
  const titleFadeInProps = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
  });
  const footerFadeInProps = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 250,
  });
  return (
    <Box
      flexDirection="column"
      alignItems={['flex-start', 'center', 'center', 'flex-start']}
      pb={['zero', 'eight', 'eight', 'zero']}
    >
      <AnimatedBox style={titleFadeInProps} pb="zeroPointFour">
        <Typography
          textStyle={['h2Brand', 'h2Brand', 'h1Brand']}
          mr={['two', 'three']}
        >
          DRINK UP
        </Typography>
        <Box pb={['zeroPointFour', 'one']}>
          <Logo size={isXS ? 'small' : 'medium'} />
        </Box>
      </AnimatedBox>
      <AnimatedBox style={footerFadeInProps}>
        <TitleWithUnderline variant="secondary">
          A water reminder for your plants.
        </TitleWithUnderline>
      </AnimatedBox>
    </Box>
  );
};

export { LandingTitle };
