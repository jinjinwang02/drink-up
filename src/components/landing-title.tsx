import React from 'react';
import { useSpring } from 'react-spring';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { AnimatedBox } from './box/animatedBox';
import { Box } from './box/box';
import { Logo } from './icon/logo';
import { TitleWithUnderline } from './title-with-underline';
import { Typography } from './typography';

const LandingTitle: React.FC = () => {
  const { isXS, isLG } = useMediaQuery();
  const titleFadeInProps = useSpring({
    from: { opacity: 0, y: 40, x: isLG ? '24vw' : '0' },
    to: [
      { opacity: 1, y: 0, x: isLG ? '24vw' : '0' },
      { opacity: 1, y: 0, x: '0' },
    ],
  });
  const footerFadeInProps = useSpring({
    from: { opacity: 0, y: 30, x: isLG ? '16vw' : '0' },
    to: [
      { opacity: 1, y: 0, x: isLG ? '16vw' : '0' },
      { opacity: 1, y: 0, x: '0' },
    ],
    delay: isLG ? 0 : 300,
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
        {isLG ? (
          <TitleWithUnderline variant="secondary">
            A water reminder for your plants.
          </TitleWithUnderline>
        ) : (
          <Typography textStyle={['copyXL', 'h4', 'h2', 'h2']}>
            A water reminder for your plants.
          </Typography>
        )}
      </AnimatedBox>
    </Box>
  );
};

export { LandingTitle };
