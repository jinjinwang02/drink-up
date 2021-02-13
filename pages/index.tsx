import Head from 'next/head';
import React from 'react';
import { Favicon } from '../components/favicon';
import { TitleWithUnderline } from '../components/title-with-underline';
import { FontHead } from '../styles/font-head';
const Index = () => {
  return (
    <div>
      <Head>
        <title>Drink up | A water reminder for your plants</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', 'asdf');
    `,
          }}
        />
      </Head>
      <FontHead />
      <Favicon />
    </div>
  );
};

export default Index;
