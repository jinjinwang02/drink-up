import React from 'react';
import { animated, PickAnimated, SpringValues } from 'react-spring';
import { Box, BoxProps } from './box';

interface AnimatedBoxProps extends BoxProps {
  style?: SpringValues<PickAnimated<any>>;
  id?: string;
  children?: React.ReactNode;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({
  style,
  id,
  children,
  ...props
}: AnimatedBoxProps) => {
  const AnimatedBox = animated(Box);
  return (
    <AnimatedBox id={id} style={style} {...props}>
      {children}
    </AnimatedBox>
  );
};

export { AnimatedBox };
