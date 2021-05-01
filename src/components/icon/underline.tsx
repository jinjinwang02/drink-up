import React, { useMemo } from 'react';
import { useSpring, animated } from 'react-spring';

export interface UnderlineProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  width?: number;
}

const Underline: React.FC<UnderlineProps> = ({
  variant,
  width,
}: UnderlineProps) => {
  const props = useSpring({
    config: { duration: 800, mass: 5, tension: 2000, friction: 200 },
    from: { x: 1004 },
    to: { x: 0 },
    delay: 2200,
  });
  const underline = useMemo(() => {
    switch (variant) {
      case 'primary':
        return (
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 125.5 15.7"
            width={width}
            fill="none"
            stroke="#000"
            strokeWidth={0.5}
            preserveAspectRatio="none"
          >
            <path
              d="M0,11.5c11.8-4.9,17.5,0.8,10,0s12.4-5,36.2-3.2S95.7,9,95.7,9s6.1-0.1,10,2.4
     c3.8,2.6-12.2-2.5-10.9-3.8s6.7-0.3,18.9,1.9s10.5-3.2,10.5-3.2"
            />
          </svg>
        );
      case 'secondary':
        return (
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 169.9 15.7"
            width={width}
            fill="none"
            stroke="#000"
            strokeWidth={0.5}
            preserveAspectRatio="none"
          >
            <path
              d="M0,9.8c0,0,8,3.5,36.7,2.1s63.1-2.1,63.1-2.1s12.2-1.3,10.6-0.4c-0.4,0.2-2.4,0.8-6.8,1.7
     c-17.8,3.6-5.1-1.2,2.4-2.3c7.5-1.1,26.6,2.9,36.9,1.1s12.3-3.9,12.3-3.9s-11.1,0-1.4,2.8c9.7,2.8,16.2-1,16.2-1"
            />
          </svg>
        );
      case 'tertiary':
        return (
          <animated.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 37.02 764.75"
            fill="none"
            stroke="#000"
            strokeWidth={2}
            height="99vh"
            strokeDashoffset={props.x}
            strokeDasharray={1004}
          >
            <path d="M5.05.38C35.26,73.05.22,107.8,5.05,61.61S36,137.78,25,283.87s-4.88,304.51-4.88,304.51.87,37.7-14.79,61.1,15.6-75.07,23.43-66.86,1.55,40.86-12,116.3,19.9,64.24,19.9,64.24" />
          </animated.svg>
        );
    }
  }, [props.x, variant, width]);

  return <>{underline}</>;
};

export { Underline };
