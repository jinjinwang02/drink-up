import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
     *,
     *::after,
     *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
     }

    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      display: flex;
      -webkit-user-select: none; /* Safari */        
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
    }
     
    html,
    body,
    input,
    ::placeholder {
      font: 14px 'HelveticaNeue-Light', 'Helvetica Neue Light',
        'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
      -webkit-font-smoothing: antialiased;
      font-weight: 200;
    }

    h1, h2, h3, h4 {
      margin: 0;
      padding: 0;
    }

    a,
    a:active,
    a:visited,
    a:focus,
    a:hover {
      text-decoration: none;
      color: inherit;
    }

`;

const textStyles = {
  h1Brand: {
    fontFamily: 'Altero-Regular',
    fontSize: 58,
    lineHeight: '65px',
    textTransform: 'uppercase',
  },
  h1: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 64,
    lineHeight: '72px',
  },
  h2: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 40,

    lineHeight: '60px',
  },
  h2Brand: {
    fontFamily: 'Altero-Regular',
    fontSize: 36,
    lineHeight: '40px',
    textTransform: 'uppercase',
  },
  h3: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 36,
    lineHeight: '54px',
  },
  h4: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 32,
    lineHeight: '48px',
  },
  copyXL: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 21,
    lineHeight: '32px',
  },
  copyXLBold: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 21,
    fontWeight: 700,
    lineHeight: '32px',
  },
  copyL: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 18,
    lineHeight: '28px',
  },
  copyLBold: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '28px',
  },
  copyM: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 16,
    wordSpacing: 1,
    lineHeight: '24px',
  },
  copyS: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 14,
    lineHeight: '20px',
  },
  copyXS: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 12,
    lineHeight: '18px',
  },
  bodyXL: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 200,
    fontSize: 16,
    lineHeight: '20px',
  },
  bodyL: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 200,
    fontSize: 14,
    lineHeight: '18px',
  },
  bodyM: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 200,
    fontSize: 12,
    lineHeight: '14px',
  },
  bodyS: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 200,
    fontSize: 11,
    lineHeight: '12px',
  },
  bodySBold: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 700,
    fontSize: 11,
    lineHeight: '12px',
  },
  bodyXS: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 200,
    fontSize: 8,
    lineHeight: '10px',
  },
};

const space = {
  zero: 0,
  zeroPointOne: 1,
  zeroPointTwo: 2,
  zeroPointThree: 3,
  zeroPointFour: 4,
  zeroPointSix: 6,
  zeroPointEight: 8,
  one: 10,
  onePointTwo: 12,
  onePointSix: 16,
  two: 20,
  twoPointTwo: 22,
  twoPointFour: 24,
  twoPointSix: 26,
  twoPointEight: 28,
  three: 30,
  threePointFive: 35,
  four: 40,
  fourPointFive: 45,
  five: 50,
  six: 60,
  seven: 70,
  eight: 80,
  nine: 90,
  ten: 100,
  twelve: 120,
};

const breakpoints = ['576px', '768px', '1200px'];

const device = {
  mobile: `(max-width: ${breakpoints[0]})`,
  tablet: `(max-width: ${breakpoints[1]})`,
  landscape: `(max-width: ${breakpoints[2]})`,
  desktop: `(max-width: ${breakpoints[3]})`,
  desktopL: `(min-width: ${breakpoints[3]})`,
};

const colors = {
  pureWhite: 'rgba(255, 255, 255, 1)',
  pureWhiteThirty: 'rgba(255, 255, 255, 0.30)',
  pureBlack: 'rgba(0, 0, 0, 1)',
  darkGrey: 'rgba(121,121,121,1)',
  mediumGrey: 'rgba(190,190,190,1)',
  lightGrey: 'rgba(227,227,227,1)',
  lightestGrey: 'rgba(237,237,237,1)',
  pastelBlue: 'rgba(135,189,209,1)',
  warningRed: 'rgba(201, 10, 16, 1)',
};

const borders = {
  regularBlack: `1px solid ${colors.pureBlack}`,
  inactiveGrey: `1px solid ${colors.lightGrey}`,
};

const transitions = {
  quick: 'all 0.1s ease-in-out',
  medium: 'all 0.3s ease-in-out',
  slow: 'opacity 0.3s ease-in-out, transform 0.5s ease-in-out',
};

const theme = {
  textStyles,
  colors,
  space,
  device,
  breakpoints,
  borders,
  transitions,
};

export type Theme = typeof theme;
export { theme, GlobalStyle };
