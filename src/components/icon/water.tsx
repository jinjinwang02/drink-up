import React from 'react';
import { useSpring, animated } from 'react-spring';

interface WaterProps {
  width?: number;
  isAnimated?: boolean;
}

const path =
  'M18.33,66c12.53,0,17.41-8.37,18.46-14.43a22.71,22.71,0,0,0,.32-4.93,35.79,35.79,0,0,0-4-15.48L19.56,4.42,6,31.11A35.94,35.94,0,0,0,2,46.59a23.36,23.36,0,0,0,.32,4.93C3.38,57.58,8.27,66,20.79,66';

const Water: React.FC<WaterProps> = ({
  width = 10,
  isAnimated,
}: WaterProps) => {
  const strokeProps = useSpring({
    config: { duration: 800 },
    from: { x: 154 },
    to: { x: 0 },
  });
  const fillProps = useSpring({
    delay: 1000,
    from: { fill: '#fff' },
    to: { fill: '#87bdd1' },
  });
  return isAnimated ? (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39.13 67.95"
      width={width}
      stroke="#87bdd1"
      strokeMiterlimit={10}
      strokeDasharray={154}
      fill={fillProps.fill}
    >
      <animated.path
        strokeDashoffset={strokeProps.x}
        strokeWidth={4}
        d={path}
      />
    </animated.svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39.13 67.95"
      width={width}
      fill="#87bdd1"
      stroke="#87bdd1"
      strokeMiterlimit={10}
      strokeDasharray={154}
    >
      <path d={path} strokeWidth={4} />
    </svg>
  );
};

export { Water };
