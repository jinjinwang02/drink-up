import Head from "next/head";
import React from "react";

const FontHead = () => (
  <Head>
    <style jsx global type="text/css">
      {`
        body,
        html {
          margin: 0;
          padding: 0;
          font: 14px "Helvetica Neue Light", , "Helvetica Neue", Helvetica,
            Arial, "Lucida Grande", sans-serif;
          -webkit-font-smoothing: antialiased;
          font-weight: 200;
        }
        ::placeholder,
        input[type="text"] {
          font-family: "HelveticaNeue-Light", "Helvetica Neue Light",
            "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
          font-weight: 200;
        }
        @font-face {
          font-family: "SaolDisplay-Regular";
          src: url("/fonts/SaolDisplay-Regular.ttf") format("opentype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Altero-Regular";
          src: url("/fonts/Altero-Outline.otf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}
    </style>
  </Head>
);

export { FontHead };
