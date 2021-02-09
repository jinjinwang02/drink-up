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
} from 'styled-system';
import styled from 'styled-components';
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
  children: string;
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
}: React.ComponentProps<typeof StyledText>) => {
  const [currentIndex, setCurrentIndex] = useState<number>(2);

  useEffect(() => {
    if (window.matchMedia(`(max-width: ${theme.breakpoints[0]})`).matches) {
      setCurrentIndex(0);
    } else if (window.matchMedia(`(max-width: ${theme.breakpoints[1]})`).matches) {
      setCurrentIndex(1);
    } else if (window.matchMedia(`(max-width: ${theme.breakpoints[2]})`).matches) {
      setCurrentIndex(2);
    } else if (window.matchMedia(`(min-width: ${theme.breakpoints[2]})`).matches) {
      setCurrentIndex(3);
    }
  }, []);

  const setHTMLTag = (textStyle: keyof Theme['textStyles']) => {
    if (textStyle.match(/h1/)) {
      return <h1 style={theme.textStyles[textStyle]}>{children}</h1>;
    }
    if (textStyle.match(/h2/)) {
      return <h2 style={theme.textStyles[textStyle]}>{children}</h2>;
    }
    if (textStyle.match(/h3/)) {
      return <h3 style={theme.textStyles[textStyle]}>{children}</h3>;
    }
    if (textStyle.match(/body/) || textStyle.match(/copy/)) {
      return <span style={theme.textStyles[textStyle]}>{children}</span>;
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
