import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
     *,
     *::after,
     *::before {
     margin: 0;
     padding: 0;
     box-sizing: inherit;
     }

     body {
        box-sizing: border-box;
        font-family: "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        color: #000;
        font-weight: 200;
        display: flex;        
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
    fontFamily: "Altero-Regular",
    fontSize: 58,
    lineHeight: "65px",
  },
  h1: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 64,
    fontWeight: 700,
    lineHeight: "72px",
  },
  h2: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 40,
    fontWeight: 700,
    lineHeight: "60px",
  },
  h2Brand: {
    fontFamily: "Altero-Regular",
    fontSize: 36,
    lineHeight: "40px",
  },
  h3: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 36,
    fontWeight: 700,
    lineHeight: "54px",
  },
  copyXL: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 21,
    lineHeight: "32px",
  },
  copyXLBold: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 21,
    fontWeight: 700,
    lineHeight: "32px",
  },
  copyL: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 18,
    lineHeight: "28px",
  },
  copyLBold: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 18,
    fontWeight: 700,
    lineHeight: "28px",
  },
  copyM: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 16,
    lineHeight: "24px",
  },
  copyMBold: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "24px",
  },
  copyS: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 14,
    lineHeight: "20px",
  },
  copySBold: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 14,
    fontWeight: 700,
    lineHeight: "20px",
  },
  copyXS: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 12,
    lineHeight: "18px",
  },
  copyXSBold: {
    fontFamily: "SaolDisplay-Regular",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "18px",
  },
  bodyXL: {
    fontFamily: "Helvetica Neue Light",
    fontWeight: 200,
    fontSize: 16,
    lineHeight: "20px",
  },
  bodyL: {
    fontFamily: "Helvetica Neue Light",
    fontWeight: 200,
    fontSize: 14,
    lineHeight: "18px",
  },
  bodyM: {
    fontFamily: "Helvetica Neue Light",
    fontWeight: 200,
    fontSize: 12,
    lineHeight: "14px",
  },
  bodyS: {
    fontFamily: "Helvetica Neue Light",
    fontWeight: 200,
    fontSize: 11,
    lineHeight: "12px",
  },
  bodySBold: {
    fontFamily: "Helvetica Neue Light",
    fontWeight: 700,
    fontSize: 11,
    lineHeight: "12px",
  },
  bodyXS: {
    fontFamily: "Helvetica Neue Light",
    fontWeight: 200,
    fontSize: 8,
    lineHeight: "10px",
  },
};

const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xlg: 32,
};

const breakpoints = [768, 998, 1200];

const colors = {
  pureWhite: "rgba(255, 255, 255, 1)",
  pureBlack: "rgba(0, 0, 0, 1)",
  mediumGrey: "rgba(190,190,190,1)",
  lightGrey: "rgba(227,227,227,1)",
  lightestGrey: "rgba(237,237,237,1)",
  pastelBlue: "rgba(135,189,209,1)",
};

const borders = {
  regularBlack: `1px solid ${colors.pureBlack}`,
  inactiveGrey: `1px solid ${colors.lightGrey}`,
};

const spaces = {
  zero: 0,
  zeroPointFive: 5,
  one: 10,
  onePointFive: 15,
  two: 20,
  twoPointFive: 25,
  three: 30,
  threePointThree: 33,
  threePointFive: 35,
  four: 40,
  fourPointFive: 45,
  five: 50,
  fivePointFive: 55,
  six: 60,
  sixPointFive: 65,
  seven: 70,
  eight: 80,
  nine: 90,
  ten: 100,
};

const theme = {
  textStyles,
  colors,
  spaces,
  // sizes,
  breakpoints,
  radii,
  // shadows,
  // zIndex, // These won't get picked up by styled-system
  // zIndices: zIndex, // These will
  // animations,
  borders,
};

export type Theme = typeof theme;
export { theme, GlobalStyle };
