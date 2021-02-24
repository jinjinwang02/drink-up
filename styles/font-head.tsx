import Head from 'next/head';
import React from 'react';

const FontHead = () => (
  <Head>
    <style jsx global type="text/css">
      {`
        @font-face {
          font-family: 'SaolDisplay-Regular';
          src: url('/fonts/SaolDisplay-Regular.ttf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Altero-Regular';
          src: url('/fonts/Altero-Outline.otf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}
    </style>
  </Head>
);

export { FontHead };
