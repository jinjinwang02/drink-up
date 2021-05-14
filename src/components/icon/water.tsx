import React from 'react';
import { useSpring, animated } from 'react-spring';
import { theme } from '../../theme';
import { AnimatedBox } from '../box/animatedBox';
import { Box } from '../box/box';

interface WaterProps {
  fill?: string;
  width?: number;
  isAnimated?: boolean;
}

const path =
  'M18.33,66c12.53,0,17.41-8.37,18.46-14.43a22.71,22.71,0,0,0,.32-4.93,35.79,35.79,0,0,0-4-15.48L19.56,4.42,6,31.11A35.94,35.94,0,0,0,2,46.59a23.36,23.36,0,0,0,.32,4.93C3.38,57.58,8.27,66,20.79,66';

const Water: React.FC<WaterProps> = ({
  width = 10,
  fill = theme.colors.pastelBlue,
  isAnimated,
}: WaterProps) => {
  const fillProps = useSpring({
    delay: 200,
    from: { fill: '#fff' },
    to: { fill: '#87bdd1' },
  });

  const rippleOneProps = useSpring({
    config: { duration: 300 },
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: isAnimated && [
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(1.6)' },
    ],
    reset: isAnimated,
  });

  const rippleTwoProps = useSpring({
    delay: 200,
    config: { duration: 300 },
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: isAnimated && [
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(1.2)' },
    ],
    reset: isAnimated,
  });
  return isAnimated ? (
    <Box width="100%" height="100%">
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 39.13 67.95"
        fill={fillProps.fill}
        width={width}
        stroke="#87bdd1"
      >
        <path d={path} strokeWidth={4} />
      </animated.svg>
      <AnimatedBox
        top="-1px"
        position="absolute"
        zIndex={1}
        height={24}
        width={24}
        border="thickerBlue"
        borderRadius={20}
        style={rippleOneProps}
      />
      <AnimatedBox
        top="-1px"
        position="absolute"
        zIndex={1}
        height={24}
        width={24}
        border="thinBlue"
        borderRadius={20}
        style={rippleTwoProps}
      />
    </Box>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39.13 67.95"
      width={width}
      fill={fill}
      stroke="#87bdd1"
      strokeMiterlimit={10}
      strokeDasharray={154}
    >
      <path d={path} strokeWidth={4} />
    </svg>
  );
};

export { Water };
