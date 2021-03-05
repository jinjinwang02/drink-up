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
import { theme } from '../../styles/theme';

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

const Box = ({ children, ...rest }: React.ComponentProps<typeof StyledBox>) => (
  <StyledBox
    display="flex"
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    position="relative"
    transition={theme.transitions.quick}
    {...rest}
  >
    {children}
  </StyledBox>
);

export { Box };
