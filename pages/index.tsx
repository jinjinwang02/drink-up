import React from 'react';
import Head from 'next/head';
import { Box } from '../components/box/box';
import { Favicon } from '../components/favicon';
import { FontHead } from '../styles/font-head';
import { AddPlantBox } from '../components/add-plant-box';
const Index = () => {
  return (
    <div>
      <Head>
        <title>Drink up | A water reminder for your plants</title>
        <Favicon />
        <FontHead />
      </Head>

      <Box m={10}>
        <AddPlantBox />
      </Box>
    </div>
  );
};

export default Index;
