import React from 'react';

const FontHead: React.FC = () => (
  <style jsx global type="text/css">
    {`
      @font-face {
        font-family: 'SaolDisplay-Regular';
        src: url('/fonts/SaolDisplay-Regular.ttf') format('truetype'),
          url('/fonts/SaolDisplay-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Altero-Regular';
        src: url('/fonts/Altero-Regular.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `}
  </style>
);

export { FontHead };
