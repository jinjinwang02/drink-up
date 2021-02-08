import React, { useEffect, useState } from "react";
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
import styled, { CSSProperties } from "styled-components";
import parse from "html-react-parser";
import { theme, Theme } from "../styles/theme";

export interface TypographyProps
  extends LayoutProps,
    SpaceProps,
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
  flexbox,
  typography
);

const Typography = ({
  children,
  textStyle,
  ...rest
}: React.ComponentProps<typeof StyledText>) => {
  const [media, setMedia] = useState<string>("md");

  useEffect(() => {
    if (window.matchMedia(`(max-width: ${theme.breakpoints[0]})`).matches) {
      setMedia("xs");
    } else if (
      window.matchMedia(`(max-width: ${theme.breakpoints[1]})`).matches
    ) {
      setMedia("sm");
    } else if (
      window.matchMedia(`(max-width: ${theme.breakpoints[2]})`).matches
    ) {
      setMedia("md");
    } else if (
      window.matchMedia(`(min-width: ${theme.breakpoints[2]})`).matches
    ) {
      setMedia("lg");
    }
  }, []);

  const setHTMLTag = (textStyle: string, style: CSSProperties | undefined) => {
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
  };
  const options = {
    replace: () => {
      if (!Array.isArray(textStyle)) {
        return setHTMLTag(
          textStyle,
          theme.textStyles[textStyle as keyof Theme["textStyles"]]
        );
      } else {
        if (media === "xs") {
          return setHTMLTag(
            textStyle[0],
            theme.textStyles[textStyle[0] as keyof Theme["textStyles"]]
          );
        } else if (media === "sm") {
          return setHTMLTag(
            textStyle[1],
            theme.textStyles[textStyle[1] as keyof Theme["textStyles"]]
          );
        } else if (media === "md") {
          return setHTMLTag(
            textStyle[2],
            theme.textStyles[textStyle[2] as keyof Theme["textStyles"]]
          );
        }
        return setHTMLTag(
          textStyle[textStyle.length - 1],
          theme.textStyles[
            textStyle[textStyle.length - 1] as keyof Theme["textStyles"]
          ]
        );
      }
    },
  };

  return (
    <StyledText textStyle={textStyle} {...rest}>
      {parse(children, options)}
    </StyledText>
  );
};

export { Typography };
