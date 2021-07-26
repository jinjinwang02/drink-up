import { createGlobalStyle } from 'styled-components';

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
  h5: {
    fontFamily: 'SaolDisplay-Regular',
    fontSize: 28,
    lineHeight: '44px',
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
  bodyXLBold: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '20px',
  },
  bodyL: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 200,
    fontSize: 14,
    lineHeight: '18px',
  },
  bodyLBold: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '18px',
  },
  bodyM: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 200,
    fontSize: 12,
    lineHeight: '14px',
  },
  bodyMBold: {
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue',
    fontWeight: 700,
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
    fontSize: 9,
    lineHeight: '10px',
  },
};

const space = {
  zero: 0,
  zeroPointOne: 1,
  zeroPointTwo: 2,
  zeroPointThree: 3,
  zeroPointFour: 4,
  zeroPointFive: 5,
  zeroPointSix: 6,
  zeroPointSeven: 7,
  zeroPointEight: 8,
  one: 10,
  onePointTwo: 12,
  onePointFour: 14,
  onePointSix: 16,
  two: 20,
  twoPointTwo: 22,
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
  eleven: 110,
  twelve: 120,
  fourteen: 140,
  eighteen: 180,
  calendarHeight: 255,
};

const zIndices = {
  calendar: 9,
  boxyButton: 49,
  navbar: 99,
  dropdown: 149,
};

const breakpoints = ['576px', '768px', '998px', '1200px'];

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
  pureBlackTen: 'rgba(0, 0, 0, 0.10)',
  darkGrey: 'rgba(121,121,121,1)',
  mediumGrey: 'rgba(190,190,190,1)',
  lightGrey: 'rgba(227,227,227,1)',
  lightestGrey: 'rgba(237,237,237,1)',
  pastelBlue: 'rgba(135,189,209,1)',
  warningRed: 'rgba(229, 29, 29, 1)',
};

const borders = {
  regularBlack: `1px solid ${colors.pureBlack}`,
  inactiveGrey: `1px solid ${colors.lightGrey}`,
  mediumGrey: `1px solid ${colors.mediumGrey}`,
  thickerBlue: `2px solid ${colors.pastelBlue}`,
  thinBlue: `1px solid ${colors.pastelBlue}`,
  thickWarningRed: `2px solid ${colors.warningRed}`,
  transparent: '1px solid transparent',
};

const transitions = {
  basic: {
    quick: 'all 0.1s ease-in-out',
    medium: 'all 0.3s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },
  curve: {
    quick: 'all 0.1s cubic-bezier(0.83, 0, 0.17, 1)',
    medium: 'all 0.3s cubic-bezier(0.83, 0, 0.17, 1)',
    slow: 'all 0.5s cubic-bezier(0.83, 0, 0.17, 1)',
  },
};

const theme = {
  textStyles,
  colors,
  space,
  zIndices,
  device,
  breakpoints,
  borders,
  transitions,
};

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
      -ms-overflow-style: none;
      scrollbar-width: none;
      overflow-y: scroll; 
    }

    body::-webkit-scrollbar {
      display: none;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
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

    h1, h2, h3, h4, h5 {
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

    svg line {
      transition: ${transitions.basic.medium};
    }
`;

export type Theme = typeof theme;
export { theme, GlobalStyle };
