import React from 'react';
import Head from 'next/head';
import { Authentication } from '../components/authentication/container';
import { Box } from '../components/box/box';
import { Favicon } from '../components/favicon';
import { FontHead } from '../styles/font-head';
const Index = () => {
  return (
    <div>
      <Head>
        <title>Drink up | A water reminder for your plants</title>
        <Favicon />
        <FontHead />
      </Head>
      <Box ml={400} mt={200}>
        <Authentication />
      </Box>
    </div>
  );
};

export default Index;
