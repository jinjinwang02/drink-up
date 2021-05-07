import React, { forwardRef, useEffect, useState } from 'react';
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
import { theme, Theme } from '../theme';

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

const Typography = forwardRef(
  (
    {
      color,
      children,
      textStyle,
      ...rest
    }: React.ComponentProps<typeof StyledText>,
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState<number>(3);

    useEffect(() => {
      if (window.matchMedia(theme.device.mobile).matches) {
        setCurrentIndex(0);
      } else if (window.matchMedia(theme.device.tablet).matches) {
        setCurrentIndex(1);
      } else if (window.matchMedia(theme.device.landscape).matches) {
        setCurrentIndex(2);
      } else if (window.matchMedia(theme.device.desktop).matches) {
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
      if (currentTextStyle.match(/h5/)) {
        return <h5 style={currentTextStyleCSS}>{children}</h5>;
      }
      if (currentTextStyle.match(/body/) || currentTextStyle.match(/copy/)) {
        return <span style={currentTextStyleCSS}>{children}</span>;
      }
    };

    return !Array.isArray(textStyle) ? (
      <StyledText ref={ref} color={color} {...rest}>
        {setHTMLTag(textStyle)}
      </StyledText>
    ) : (
      <StyledText ref={ref} color={color} {...rest}>
        {setHTMLTag(
          textStyle[currentIndex]
            ? textStyle[currentIndex]
            : textStyle[textStyle.length - 1]
        )}
      </StyledText>
    );
  }
);

Typography.displayName = 'Typography';

export { Typography };
