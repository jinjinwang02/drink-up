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
  const [media, setMedia] = useState<string>('md');

  useEffect(() => {
    if (window.matchMedia(`(max-width: ${theme.breakpoints[0]})`).matches) {
      setMedia('xs');
    } else if (window.matchMedia(`(max-width: ${theme.breakpoints[1]})`).matches) {
      setMedia('sm');
    } else if (window.matchMedia(`(max-width: ${theme.breakpoints[2]})`).matches) {
      setMedia('md');
    } else if (window.matchMedia(`(min-width: ${theme.breakpoints[2]})`).matches) {
      setMedia('lg');
    }
  }, []);

  const setHTMLTag = (textStyle: keyof Theme['textStyles']) => {
    if (textStyle.match(/h1/)) {
      return <h1>{children}</h1>;
    }
    if (textStyle.match(/h2/)) {
      return <h2>{children}</h2>;
    }
    if (textStyle.match(/h3/)) {
      return <h3>{children}</h3>;
    }
    if (textStyle.match(/body/) || textStyle.match(/copy/)) {
      return <span>{children}</span>;
    }
  };

  if (!Array.isArray(textStyle)) {
    return (
      <StyledText textStyle={textStyle} color={color} {...rest}>
        {setHTMLTag(textStyle)}
      </StyledText>
    );
  } else {
    if (media === 'xs') {
      return (
        <StyledText textStyle={textStyle} color={color} {...rest}>
          {setHTMLTag(textStyle[0])}
        </StyledText>
      );
    } else if (media === 'sm') {
      return (
        <StyledText textStyle={textStyle} color={color} {...rest}>
          {setHTMLTag(textStyle[1])}
        </StyledText>
      );
    } else if (media === 'md') {
      return (
        <StyledText textStyle={textStyle} color={color} {...rest}>
          {setHTMLTag(textStyle[2])}
        </StyledText>
      );
    }
    return (
      <StyledText color={color} {...rest}>
        {setHTMLTag(textStyle[textStyle.length - 1])}
      </StyledText>
    );
  }
};

export { Typography };
