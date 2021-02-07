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
import parse from "html-react-parser";
import { theme, Theme } from "../styles/theme";

type HeaderLevel = 1 | 2 | 3;

export interface TypographyProps
  extends LayoutProps,
    SpaceProps,
    ColorProps,
    BackgroundProps,
    TypographyBaseProps,
    FlexboxProps {
  textStyle: keyof Theme["textStyles"];
  href?: string;
  "aria-level"?: HeaderLevel;
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
  color = "pureBlack",
  children,
  textStyle,
  ...rest
}: React.ComponentProps<typeof StyledText>) => {
  const options = {
    replace: () => {
      const style = theme.textStyles[textStyle as keyof Theme["textStyles"]];

      if (textStyle.match(/h1/)) {
        return <h1 style={style}>{children}</h1>;
      }
      if (textStyle.match(/h2/)) {
        return <h2 style={style}>{children}</h2>;
      }
      if (textStyle.match(/h3/)) {
        return <h3 style={style}>{children}</h3>;
      }
      if (textStyle.match(/body/) || textStyle.match(/copy/)) {
        return <span style={style}>{children}</span>;
      }
    },
  };

  return (
    <StyledText color={color} textStyle={textStyle} {...rest}>
      {parse(children, options)}
    </StyledText>
  );
};

export { Typography };
