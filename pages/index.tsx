import Head from 'next/head';
import React, { useState } from 'react';
import { Favicon } from '../components/favicon';
import { Box } from '../components/box/box';
import { Typography } from '../components/typography';
import { FontHead } from '../styles/font-head';
import { Logo } from '../components/logo';
import { BoxWithCloud } from '../components/box/box-with-cloud';
import { SelectableBox } from '../components/box/selectable-box';

const Index = () => {
  const [selected, setSelected] = useState<boolean>(false);
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
      <SelectableBox
        imageUrl="http://placeimg.com/640/360/any"
        bottomText="random image"
        setSelected={setSelected}
        selected={selected}
      />
    </div>
  );
};

export default Index;
