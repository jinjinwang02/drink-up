import React, { useEffect, useState } from 'react';
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
  system,
  zIndex,
} from 'styled-system';
import styled, { CSSProperties } from 'styled-components';
import { theme, Theme } from '../styles/theme';

export interface TypographyProps
  extends LayoutProps,
    SpaceProps,
    ColorProps,
    BackgroundProps,
    TypographyBaseProps,
    FlexboxProps {
  textStyle: keyof Theme['textStyles'];
  href?: string;
  zIndex?: string | number;
  children: string;
}

const StyledText = styled.div<TypographyProps>(
  space,
  layout,
  styledSystemTextStyle,
  background,
  styledSystemColor,
  flexbox,
  typography,
  zIndex,
  system({
    transition: true,
  })
);

const Typography = ({
  color,
  children,
  textStyle,
  ...rest
}: React.ComponentProps<typeof StyledText>) => {
  const [currentIndex, setCurrentIndex] = useState<number>(2);

  useEffect(() => {
    if (window.matchMedia(`(max-width: ${theme.breakpoints[0]})`).matches) {
      setCurrentIndex(0);
    } else if (
      window.matchMedia(`(max-width: ${theme.breakpoints[1]})`).matches
    ) {
      setCurrentIndex(1);
    } else if (
      window.matchMedia(`(max-width: ${theme.breakpoints[2]})`).matches
    ) {
      setCurrentIndex(2);
    } else if (
      window.matchMedia(`(min-width: ${theme.breakpoints[2]})`).matches
    ) {
      setCurrentIndex(3);
    }
  }, []);

  const setHTMLTag = (currentTextStyle: keyof Theme['textStyles']) => {
    const currentTextStyleCSS = theme.textStyles[
      currentTextStyle
    ] as CSSProperties;
    if (currentTextStyle.match(/h1/)) {
      return <h1 style={currentTextStyleCSS}>{children}</h1>;
    }
    if (currentTextStyle.match(/h2/)) {
      return <h2 style={currentTextStyleCSS}>{children}</h2>;
    }
    if (currentTextStyle.match(/h3/)) {
      return <h3 style={currentTextStyleCSS}>{children}</h3>;
    }
    if (currentTextStyle.match(/h4/)) {
      return <h4 style={currentTextStyleCSS}>{children}</h4>;
    }
    if (currentTextStyle.match(/body/) || currentTextStyle.match(/copy/)) {
      return <span style={currentTextStyleCSS}>{children}</span>;
    }
  };

  return !Array.isArray(textStyle) ? (
    <StyledText color={color} {...rest}>
      {setHTMLTag(textStyle)}
    </StyledText>
  ) : (
    <StyledText color={color} {...rest}>
      {setHTMLTag(textStyle[currentIndex])}
    </StyledText>
  );
};

export { Typography };
