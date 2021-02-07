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
} from "styled-system";
import styled from "styled-components";

export interface BoxProps
  extends LayoutProps,
    SpaceProps,
    ColorProps,
    FlexboxProps,
    BackgroundProps,
    Omit<PositionProps, "zIndex">,
    GridProps,
    BorderProps {
  zIndex?: string | number;
  onClick?: React.KeyboardEventHandler<HTMLElement>;
}

const Box = styled.div<BoxProps>(
  space,
  layout,
  color,
  flexbox,
  background,
  position,
  grid,
  border,
  zIndex
);

export { Box };
