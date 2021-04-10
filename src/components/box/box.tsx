import React, { forwardRef } from 'react';
import {
  LayoutProps,
  layout,
  space,
  SpaceProps,
  ColorProps,
  color,
  flexbox,
  FlexboxProps,
  background,
  BackgroundProps,
  position,
  PositionProps,
  grid,
  GridProps,
  border,
  BorderProps,
  zIndex,
  system,
} from 'styled-system';
import styled from 'styled-components';

export interface BoxProps
  extends LayoutProps,
    SpaceProps,
    ColorProps,
    FlexboxProps,
    BackgroundProps,
    Omit<PositionProps, 'zIndex'>,
    GridProps,
    BorderProps {
  zIndex?: string | number;
  onClick?: React.KeyboardEventHandler<HTMLElement>;
  onMouseOver?: React.MouseEventHandler<HTMLElement>;
  onMouseOut?: React.MouseEventHandler<HTMLElement>;
}

const StyledBox = styled.div<BoxProps>(
  space,
  layout,
  color,
  flexbox,
  background,
  position,
  grid,
  border,
  zIndex,
  system({
    transition: true,
  })
);

const Box: React.FC<React.ComponentProps<typeof StyledBox>> = forwardRef(
  ({ children, ...rest }: React.ComponentProps<typeof StyledBox>, ref) => (
    <StyledBox
      ref={ref}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      position="relative"
      {...rest}
    >
      {children}
    </StyledBox>
  )
);

Box.displayName = 'Box';

export { Box };
