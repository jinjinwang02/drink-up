import React from "react";
import {
  LayoutProps,
  layout,
  space,
  SpaceProps,
  flexbox,
  FlexboxProps,
  TypographyProps as TypographyBaseProps,
  typography,
  textStyle as styledSystemTextStyle,
  ColorProps,
  color as styledSystemColor,
  background,
  BackgroundProps,
} from "styled-system";
import styled from "styled-components";
import { Theme } from "../styles/theme";

export interface TypographyProps
  extends LayoutProps,
    SpaceProps,
    ColorProps,
    BackgroundProps,
    TypographyBaseProps,
    FlexboxProps {
  textStyle: keyof Theme["textStyles"];
  href?: string;
}

const StyledText = styled.div<TypographyProps>(
  space,
  layout,
  styledSystemTextStyle,
  background,
  styledSystemColor,
  flexbox,
  typography
);

const Typography = ({
  color,
  children,
  textStyle,
  ...rest
}: React.ComponentProps<typeof StyledText>) => (
  <StyledText color={color} textStyle={textStyle} {...rest}>
    {children}
  </StyledText>
);

export { Typography };
